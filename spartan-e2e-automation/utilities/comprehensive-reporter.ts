import type {
  Reporter,
  FullConfig,
  Suite,
  TestCase,
  TestResult,
  FullResult,
} from '@playwright/test/reporter';
import fs from 'fs';
import path from 'path';

interface Metrics {
  run: number;
  passed: number;
  failed: number;
  skipped: number;
  flaky: number;
  durationMs: number;
}

interface TestDetail {
  title: string;
  suite: string;
  file: string;
  category: 'UI' | 'API' | 'Other';
  tags: string[];
  status: string;
  durationMs: number;
  error?: string;
}

/**
 * Custom Playwright Reporter that tracks and displays:
 * - Tests Run, Tests Passed, and Tests Failed across Overall, UI (@ui), and API (@api) suites.
 * - Exports machine-readable JSON (test-results/execution-summary.json)
 * - Exports formatted Markdown summary (test-results/execution-summary.md)
 */
export default class ComprehensiveReporter implements Reporter {
  private startTime = Date.now();
  private scheduledTests = 0;

  private overall: Metrics = { run: 0, passed: 0, failed: 0, skipped: 0, flaky: 0, durationMs: 0 };
  private ui: Metrics = { run: 0, passed: 0, failed: 0, skipped: 0, flaky: 0, durationMs: 0 };
  private api: Metrics = { run: 0, passed: 0, failed: 0, skipped: 0, flaky: 0, durationMs: 0 };

  private testDetails: TestDetail[] = [];

  onBegin(_config: FullConfig, suite: Suite) {
    this.startTime = Date.now();
    this.scheduledTests = suite.allTests().length;
    console.log(`\n🚀 Starting Test Execution: ${this.scheduledTests} total tests scheduled.\n`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const outcome = test.outcome();
    const tags = test.tags || [];

    // Determine category based on tags, file path, or suite title
    const isUI =
      tags.includes('@ui') ||
      test.title.includes('@ui') ||
      test.location.file.includes('tasks');
    const isAPI =
      tags.includes('@api') ||
      test.title.includes('@api') ||
      test.location.file.includes('APItests');

    const category: 'UI' | 'API' | 'Other' = isUI ? 'UI' : isAPI ? 'API' : 'Other';

    // Update overall metrics
    this.overall.run++;
    this.overall.durationMs += result.duration;

    if (outcome === 'expected') {
      this.overall.passed++;
    } else if (outcome === 'unexpected') {
      this.overall.failed++;
    } else if (outcome === 'flaky') {
      this.overall.flaky++;
    } else if (outcome === 'skipped') {
      this.overall.skipped++;
    }

    // Update category-specific metrics
    if (isUI) {
      this.ui.run++;
      this.ui.durationMs += result.duration;
      if (outcome === 'expected') this.ui.passed++;
      else if (outcome === 'unexpected') this.ui.failed++;
      else if (outcome === 'flaky') this.ui.flaky++;
      else if (outcome === 'skipped') this.ui.skipped++;
    } else if (isAPI) {
      this.api.run++;
      this.api.durationMs += result.duration;
      if (outcome === 'expected') this.api.passed++;
      else if (outcome === 'unexpected') this.api.failed++;
      else if (outcome === 'flaky') this.api.flaky++;
      else if (outcome === 'skipped') this.api.skipped++;
    }

    const testFile = path.relative(process.cwd(), test.location.file);
    const suiteName = test.parent ? test.parent.title : 'Root';

    this.testDetails.push({
      title: test.title,
      suite: suiteName,
      file: testFile,
      category,
      tags,
      status: result.status,
      durationMs: result.duration,
      error: result.error?.message,
    });
  }

  onEnd(result: FullResult) {
    const totalDurationSec = ((Date.now() - this.startTime) / 1000).toFixed(2);
    const uiDurationSec = (this.ui.durationMs / 1000).toFixed(2);
    const apiDurationSec = (this.api.durationMs / 1000).toFixed(2);

    const calcPassRate = (passed: number, total: number) =>
      total > 0 ? ((passed / total) * 100).toFixed(1) : '0.0';

    const overallPassRate = calcPassRate(this.overall.passed, this.overall.run);
    const uiPassRate = calcPassRate(this.ui.passed, this.ui.run);
    const apiPassRate = calcPassRate(this.api.passed, this.api.run);

    const divider = '═'.repeat(65);
    const thinDivider = '─'.repeat(65);

    // ─── 1. Terminal Output Dashboard ──────────────────────────────────────
    console.log(`\n${divider}`);
    console.log('              📊 TEST EXECUTION SUMMARY REPORT');
    console.log(divider);
    console.log(`  ▶ Total Tests Run     : ${this.overall.run}`);
    console.log(`  ✓ Tests Passed        : ${this.overall.passed}`);
    console.log(`  ✘ Tests Failed        : ${this.overall.failed}`);
    console.log(`  ○ Tests Skipped       : ${this.overall.skipped}`);
    console.log(`  ⚡ Flaky Tests         : ${this.overall.flaky}`);
    console.log(`  📈 Pass Rate          : ${overallPassRate}%`);
    console.log(`  ⏱ Total Duration      : ${totalDurationSec}s`);
    console.log(`  🏁 Overall Status     : ${result.status.toUpperCase()}`);
    console.log(thinDivider);
    console.log('  🖥️  UI TESTS BREAKDOWN (@ui)');
    console.log(`  ▶ UI Tests Run        : ${this.ui.run}`);
    console.log(`  ✓ UI Tests Passed     : ${this.ui.passed}`);
    console.log(`  ✘ UI Tests Failed     : ${this.ui.failed}`);
    console.log(`  ○ UI Tests Skipped    : ${this.ui.skipped}`);
    console.log(`  ⚡ UI Flaky Tests     : ${this.ui.flaky}`);
    console.log(`  📈 UI Pass Rate       : ${uiPassRate}%`);
    console.log(`  ⏱ UI Execution Time   : ${uiDurationSec}s`);
    console.log(thinDivider);
    console.log('  🔌 API TESTS BREAKDOWN (@api)');
    console.log(`  ▶ API Tests Run       : ${this.api.run}`);
    console.log(`  ✓ API Tests Passed    : ${this.api.passed}`);
    console.log(`  ✘ API Tests Failed    : ${this.api.failed}`);
    console.log(`  ○ API Tests Skipped   : ${this.api.skipped}`);
    console.log(`  ⚡ API Flaky Tests    : ${this.api.flaky}`);
    console.log(`  📈 API Pass Rate      : ${apiPassRate}%`);
    console.log(`  ⏱ API Execution Time  : ${apiDurationSec}s`);
    console.log(thinDivider);

    // ─── 2. JSON File Report Generation ────────────────────────────────────
    const summaryDir = path.resolve(process.cwd(), 'test-results');
    if (!fs.existsSync(summaryDir)) {
      fs.mkdirSync(summaryDir, { recursive: true });
    }

    const summaryReport = {
      summary: {
        totalTestsRun: this.overall.run,
        testsPassed: this.overall.passed,
        testsFailed: this.overall.failed,
        testsSkipped: this.overall.skipped,
        flakyTests: this.overall.flaky,
        passRate: `${overallPassRate}%`,
        durationSeconds: parseFloat(totalDurationSec),
        status: result.status,
        timestamp: new Date().toISOString(),
      },
      ui: {
        testsRun: this.ui.run,
        testsPassed: this.ui.passed,
        testsFailed: this.ui.failed,
        testsSkipped: this.ui.skipped,
        flakyTests: this.ui.flaky,
        passRate: `${uiPassRate}%`,
        durationSeconds: parseFloat(uiDurationSec),
      },
      api: {
        testsRun: this.api.run,
        testsPassed: this.api.passed,
        testsFailed: this.api.failed,
        testsSkipped: this.api.skipped,
        flakyTests: this.api.flaky,
        passRate: `${apiPassRate}%`,
        durationSeconds: parseFloat(apiDurationSec),
      },
      tests: this.testDetails,
    };

    const jsonPath = path.join(summaryDir, 'execution-summary.json');
    fs.writeFileSync(jsonPath, JSON.stringify(summaryReport, null, 2), 'utf-8');

    // ─── 3. Markdown File Report Generation ────────────────────────────────
    let mdReport = `# Test Execution Summary Report 📊\n\n`;
    mdReport += `Generated on: **${new Date().toLocaleString()}**\n\n`;
    mdReport += `### 📈 Test Execution Breakdown by Category\n\n`;
    mdReport += `| Category | Tests Run | Tests Passed | Tests Failed | Tests Skipped | Flaky | Pass Rate | Duration |\n`;
    mdReport += `| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n`;
    mdReport += `| 🌐 **Overall Suite** | **${this.overall.run}** | <span style="color:green">**${this.overall.passed}**</span> | <span style="color:red">**${this.overall.failed}**</span> | **${this.overall.skipped}** | **${this.overall.flaky}** | **${overallPassRate}%** | **${totalDurationSec}s** |\n`;
    mdReport += `| 🖥️ **UI Tests (\`@ui\`)** | **${this.ui.run}** | <span style="color:green">**${this.ui.passed}**</span> | <span style="color:red">**${this.ui.failed}**</span> | **${this.ui.skipped}** | **${this.ui.flaky}** | **${uiPassRate}%** | **${uiDurationSec}s** |\n`;
    mdReport += `| 🔌 **API Tests (\`@api\`)** | **${this.api.run}** | <span style="color:green">**${this.api.passed}**</span> | <span style="color:red">**${this.api.failed}**</span> | **${this.api.skipped}** | **${this.api.flaky}** | **${apiPassRate}%** | **${apiDurationSec}s** |\n\n`;

    mdReport += `## Detailed Test Results\n\n`;
    mdReport += `| Type | Suite / File | Test Case | Status | Duration |\n`;
    mdReport += `| :---: | :--- | :--- | :---: | :---: |\n`;
    for (const t of this.testDetails) {
      const statusIcon =
        t.status === 'passed'
          ? '✅ PASSED'
          : t.status === 'failed'
          ? '❌ FAILED'
          : '⚠️ ' + t.status.toUpperCase();
      const badge = t.category === 'UI' ? '`🖥️ UI`' : t.category === 'API' ? '`🔌 API`' : '`Other`';
      mdReport += `| ${badge} | \`${t.file}\` | ${t.title} | ${statusIcon} | ${(
        t.durationMs / 1000
      ).toFixed(2)}s |\n`;
    }

    const mdPath = path.join(summaryDir, 'execution-summary.md');
    fs.writeFileSync(mdPath, mdReport, 'utf-8');

    console.log(`  📄 Comprehensive summary files generated:`);
    console.log(`     JSON: ${jsonPath}`);
    console.log(`     Markdown: ${mdPath}`);
    console.log(`${divider}\n`);
  }
}
