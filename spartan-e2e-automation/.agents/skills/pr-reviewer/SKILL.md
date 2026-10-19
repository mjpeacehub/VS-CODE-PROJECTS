---
name: pr-reviewer
description: "Local Automated Quality Gate Reviewer that audits uncommitted and committed branch changes against the Spartan 6-point enterprise Playwright + TypeScript quality standards before opening a Pull Request."
command: "/pr-reviewer"
---

# Local PR Reviewer Skill (`/pr-reviewer`)

The `/pr-reviewer` skill is an automated **Local Quality Gate Audit** for the Spartan Test Automation Framework.
Before submitting code for human peer review or opening a Pull Request, this skill inspects your local working tree, git diff, and test files to guarantee compliance with enterprise Playwright, TypeScript, and POM architectural standards.

---

## 🎯 What the Reviewer Checks

- Catches accidental hardcoded sleeps (`page.waitForTimeout` or `setTimeout`) before committing.
- Flags brittle absolute XPaths (`/html/body/...`) and ensures semantic user-facing locators (`getByRole`, `getByLabel`, etc.).
- Confirms that every Acceptance Criterion has a dedicated, separate test (**1-to-1 AC Rule**).
- Verifies that all test assertions use web-first retrying assertions (`await expect(locator)...`).
- Enforces strict Page Object Model (POM) encapsulation (locators inside `pages/*.page.ts`; test assertions inside `tests/`).
- Confirms proper test tagging with `@ui` or `@api`.
- Verifies strict TypeScript type checking (`npm run lint`).
- Scans for leaked credentials, passwords, or tokens outside `.env`.

---

## 📋 The 6-Point Quality Checklist

| # | Quality Gate Criterion | Requirement & Enforcement |
| :-: | :--- | :--- |
| **1** | **1-to-1 AC Coverage** | Every Acceptance Criterion has a dedicated, numbered test (`TC01`, `API-01`). No merged or skipped criteria. |
| **2** | **Locator Strategy** | Uses user-facing locators (`getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`). **Bans brittle absolute XPaths.** |
| **3** | **Timing & Auto-Wait** | Relies on Playwright's native auto-waiting and retrying assertions. **Strictly bans `page.waitForTimeout()` and `setTimeout()`.** |
| **4** | **Web-First Assertions** | Tests use retrying web-first assertions (`await expect(locator)...`). **Bans non-retrying synchronous assertions.** |
| **5** | **POM Discipline & Tags** | Locators and action workflows are encapsulated in `pages/` extending `BasePage`. Tests are properly tagged with `@ui` or `@api`. |
| **6** | **Security & Secret Hygiene** | Credentials are loaded exclusively via `process.env` from `.env`. **Bans hardcoded credentials in code or docs.** |

---

## 📝 Diagnostic Output Format

```markdown
════════════════════════════════════════════════════════════════════════════════
                SPARTAN LOCAL PR QUALITY REVIEWER AUDIT REPORT
════════════════════════════════════════════════════════════════════════════════

  ✔ [PASS] 1. 1-to-1 AC Coverage: Dedicated tests verified for all ACs.
  ✔ [PASS] 2. Locator Strategy: Clean semantic & role-based locators verified.
  ✔ [PASS] 3. Timing & Auto-Wait: ZERO hardcoded sleeps (waitForTimeout) detected.
  ✔ [PASS] 4. Web-First Assertions: Retrying assertions verified across all specs.
  ✔ [PASS] 5. Page Object Model & Tags: Proper POM encapsulation & @ui/@api tags.
  ✔ [PASS] 6. Security Hygiene: Zero credentials hardcoded in code.

────────────────────────────────────────────────────────────────────────────────
 VERDICT: PASS ✅ 
 All automated criteria satisfied.
 Ready for /pr-summary execution and Pull Request creation via GitHub MCP.
════════════════════════════════════════════════════════════════════════════════
```
