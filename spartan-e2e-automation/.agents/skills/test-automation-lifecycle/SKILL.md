---
name: test-automation-lifecycle
description: "Master Test Automation Orchestration Skill that coordinates the 4 SDET sub-agents (Planner, Explorer, Generator, Healer) and PR creation to automate Jira or Azure DevOps user stories into verified Playwright + TypeScript tests and Pull Requests."
command: "/test-automation-lifecycle <jira-or-azuredev-id-or-tag>"
parameters:
  work_item_id:
    type: string
    description: "The Jira Issue Key (e.g. SPARTAN-101, SPARTAN-204) OR Azure DevOps Work Item ID (e.g. #4521, 4521) OR a local feature tag (e.g. @ui, @api) or spec file path."
    required: true
---

# Test Automation Lifecycle Skill (Master SDET Orchestrator)

The `/test-automation-lifecycle` skill is the **central master orchestrator** of the Spartan Test Automation Framework.
When triggered with a Jira Key (e.g. `/test-automation-lifecycle SPARTAN-101`), an Azure DevOps ID (e.g. `/test-automation-lifecycle #4521`), or a test tag, it coordinates the **4 specialized SDET sub-agents** through an autonomous end-to-end engineering workflow on an isolated git branch, transforming user story acceptance criteria into verified, production-grade Playwright tests and a peer-reviewed Pull Request.

> 💡 **Visual Architecture:** Open [WORKFLOW.html](WORKFLOW.html) in your browser for the interactive visual workflow dashboard, sub-agent dossiers, and failure classification simulator.

---

## 🔄 The 9-Stage Orchestration Pipeline

```text
[1. Work Item Ingestion] ────► Ingests Jira / Azure DevOps ticket via Atlassian / Azure DevOps MCP
            │
            ▼
[2. Git Branch Isolation] ───► Creates feature/<WORK_ITEM_ID>-automation on top of clean main
            │
            ▼
[3. Planner Agent] ──────────► Parses ACs ──► 1-to-1 AC-to-Test mapping & POM / API gap audit
            │
            ▼
[4. Explorer Agent] ─────────► Launches Browser subagent / MCP ──► Audits live DOM & Swagger APIs
            │
            ▼
[5. Generator Agent] ────────► Synthesizes Page Objects in pages/ & Spec files under tests/
            │
            ▼
[6. Playwright Execution] ───► Executes tests with @ui or @api tag & ComprehensiveReporter
            │
       ┌────┴────┐
    [Pass]    [Fail]
       │         │
       │         ▼
       │  [7. Healer Agent] ──► 3-Tier Diagnosis ──► Autonomously patches code & re-runs (3x)
       │         │
       ▼         ▼
[8. Ephemeral Cleanup] ──────► Automatically purges scratch folder .temp/
            │
            ▼
[9. Jira Update & PR] ───────► Updates Jira/Azure ticket & opens Pull Request via GitHub MCP
```

---

## 📋 Detailed Stage Execution Protocol

### Stage 1: Work Item Ingestion & Input Normalization
- The orchestrator parses the user input:
  - **Jira Issue Key (e.g. `SPARTAN-101`):** Calls Atlassian MCP tool:
    ```javascript
    jira_get_issue({ issueKey: 'SPARTAN-101' })
    ```
  - **Azure DevOps Work Item ID (e.g. `#4521` or `4521`):** Calls Azure DevOps MCP tool:
    ```javascript
    get_work_item({ id: 4521 })
    ```
  - **Local Tag or Path (e.g. `@ui`, `tests/tasks/add-spartan.spec.ts`):** Scans the local codebase directly.
- **Data Extracted:**
  - Issue Title & Narrative (`As a <role>, I want <goal>...`)
  - All Acceptance Criteria (`AC1`, `AC2`, `AC3`, etc.)
  - Applicable layer: Web UI, REST API, or Dual-Tier Hybrid

### Stage 2: Git Branch Isolation
- Checks out the main branch and ensures clean baseline:
  ```bash
  git checkout main
  git pull origin main
  git checkout -B feature/<WORK_ITEM_ID>-automation
  ```
- Guarantees complete test isolation; prevents work from polluting other feature branches.

### Stage 3: Planner Agent Invocation
- Invokes the **[Planner Agent](../../agents/planner.agent.md)** with the ingested requirements.
- **Enforces 1-to-1 AC Rule:**
  - `AC1` ➜ Dedicated test case (`TC01` or `API-01`)
  - `AC2` ➜ Dedicated test case (`TC02` or `API-02`)
- **Layer & Tag Allocation:**
  - UI specs ➜ Placed in `tests/tasks/<story-slug>.spec.ts` tagged with `@ui`
  - API specs ➜ Placed in `tests/APItests/<story-slug>.spec.ts` tagged with `@api`
- **Gap Analysis:**
  - Checks existing Page Objects in `pages/` for missing locators and actions.
  - Checks `utilities/spartan-api-client.ts` for missing endpoints.
  - Plans mock data generation via `SpartanDataGenerator` (`@faker-js/faker`).

### Stage 4: Explorer Agent Invocation
- Invokes the **[Explorer Agent](../../agents/explorer.agent.md)**:
  - **For Web UI:** Interacts with live Spartan app (`https://spartan-app-new-nonsecure.onrender.com/web/...`) using Playwright browser tools or Playwright MCP. Validates user-facing `getBy*` locators (`getByRole`, `getByLabel`), dynamic badge counters (`#total`), and table captions.
  - **For REST API:** Probes `/swagger-ui/index.html` and `/v3/api-docs` to confirm request payloads, query parameters, response headers, and status codes.
- Writes verified selectors and contracts to `.temp/exploration-summary.json`.

### Stage 5: Generator Agent Invocation
- Invokes the **[Generator Agent](../../agents/generator.agent.md)**:
  - **Page Objects (`pages/*.page.ts`):** Implements or extends Page Objects inheriting from `BasePage`. Strictly uses `getBy*` locators and eliminates raw sleeps.
  - **API Client (`utilities/spartan-api-client.ts`):** Adds typed endpoint methods wrapping `APIRequestContext`.
  - **Test Specs (`tests/tasks/*.spec.ts` / `tests/APItests/*.spec.ts`):** Synthesizes test files adhering strictly to the 1-to-1 AC mapping.
  - **TypeScript Verification:** Executes `npm run lint` (`tsc --noEmit`) to verify 0 compiler errors.

### Stage 6: Playwright Execution & Comprehensive Reporting
- Executes the generated test suite:
  ```bash
  # For UI stories:
  npx playwright test tests/tasks/<story-name>.spec.ts --grep @ui --project=chromium

  # For API stories:
  npx playwright test tests/APItests/<story-name>.spec.ts --grep @api --project=api
  ```
- Playwright's `ComprehensiveReporter` logs the execution dashboard:
  - Overall Tests Run, Passed, Failed
  - UI Tests Breakdown (`@ui`)
  - API Tests Breakdown (`@api`)
  - Writes `test-results/execution-summary.json` & `test-results/execution-summary.md`.

### Stage 7: Healer Agent (Conditional Self-Healing)
- If any test fails, the orchestrator passes logs, failure screenshots, and traces to the **[Healer Agent](../../agents/healer.agent.md)**:
  - **Tier 1 (`automation-code`):** Stale locator or timing race. Healer autonomously patches the Page Object or spec file and re-runs (up to 3 iterative healing loops).
  - **Tier 2 (`environment data`):** Backend 500 error, DB server unreachable. Healer halts and logs an Environment Discrepancy Alert without modifying assertions.
  - **Tier 3 (`product defect`):** Spartan application violates Acceptance Criteria. Healer preserves failure screenshots, traces, and drafts a Bug Defect Report for Jira / Azure DevOps.

### Stage 8: Ephemeral Scratch Purge
- Upon 100% test pass verification, automatically cleans up scratch files in `.temp/`.

### Stage 9: Jira/Azure DevOps Update & Pull Request Creation
- Updates the Jira ticket or Azure DevOps work item:
  - Comments test execution summary (Tests Run, Passed, Failed, Duration).
  - Attaches test summary markdown.
- Invokes the **[`/pr-summary`](../pr-summary/SKILL.md)** skill:
  - Gathers git diff and test metrics.
  - Runs local 6-point PR Reviewer checklist.
  - Opens a Pull Request to `main` via **GitHub MCP** ready for human peer review.

---

## 🚀 How to Trigger the Skill

### By Jira Issue Key:
```text
agy> /test-automation-lifecycle SPARTAN-101
agy> /test-automation-lifecycle SPARTAN-204
```

### By Azure DevOps Work Item ID:
```text
agy> /test-automation-lifecycle #4521
agy> /test-automation-lifecycle 4521
```

### By Local Tag or Spec Path:
```text
agy> /test-automation-lifecycle @ui
agy> /test-automation-lifecycle @api
agy> /test-automation-lifecycle tests/tasks/add-spartan.spec.ts
```
