---
name: pr-summary
description: "Pull Request Summary & Creation Skill that analyzes git branch diffs, Acceptance Criteria coverage, and Playwright execution metrics to generate an executive-level PR description and open a Pull Request via GitHub MCP."
command: "/pr-summary [base-branch]"
parameters:
  base_branch:
    type: string
    description: "The base branch to target for the Pull Request. Defaults to main."
    required: false
---

# PR Summary & Creation Skill (`/pr-summary`)

The `/pr-summary` skill is an automated **Pull Request Authoring and Creation Gate**.
It inspects your current git branch changes, parses the user story acceptance criteria, analyzes the latest Playwright test execution results from `test-results/execution-summary.json`, synthesizes an executive-grade Pull Request description, and opens the PR via the **GitHub MCP Server**.

---

## 🎯 What the Skill Evaluates

When invoked, the skill audits 4 dimensions of the working branch:
1. **Requirements & Scope:** Reads the Jira Key / Azure DevOps ID, story statement, and all Acceptance Criteria.
2. **File Modifications (Git Diff):** Categorizes changes across `tests/tasks/`, `tests/APItests/`, `pages/`, `utilities/`, `fixtures/`, and `models/`.
3. **Execution Metrics:** Reads `test-results/execution-summary.json` to extract exact test counts, pass rates, and durations broken down by Overall, UI, and API suites.
4. **Quality Gate:** Verifies zero hardcoded sleeps, web-first retrying assertions, clean POM encapsulation, and absence of hardcoded credentials.

---

## 📋 Standard PR Output Schema

The skill constructs a Pull Request formatted according to this enterprise template:

```markdown
# feat(automation): implement and verify [<STORY_ID>] <Feature Title>

## 📌 1. Feature Overview
- **Feature Name:** <Feature Title>
- **Jira / AzureDevOps ID:** `<STORY_ID>`
- **User Story:** As a <role>, I want <goal>, so that <benefit>.
- **Target Layer:** Web UI (@ui) / REST API (@api) / Hybrid

---

## 🎯 2. Acceptance Criteria Coverage (1-to-1 Traceability)
Each acceptance criterion from the story is verified by a dedicated, isolated test:
- [x] **AC1:** <Criterion 1 description> (Test: `TC01 / API-01`)
- [x] **AC2:** <Criterion 2 description> (Test: `TC02 / API-02`)
- [x] **AC3:** <Criterion 3 description> (Test: `TC03 / API-03`)

---

## 🛠️ 3. Branch Changes
| Component | File Path | Action | Description |
| :--- | :--- | :---: | :--- |
| **UI Spec** | `tests/tasks/<story-name>.spec.ts` | Added | Dedicated Playwright test cases tagged with `@ui` |
| **API Spec** | `tests/APItests/<story-name>.spec.ts` | Added | REST API test cases tagged with `@api` |
| **Page Object** | `pages/<PageName>.page.ts` | Updated | Added user-facing `getBy*` locators & action methods |
| **API Client** | `utilities/spartan-api-client.ts` | Updated | Added typed endpoint methods & models |

---

## 🧪 4. Playwright Test Execution Results
- **Execution Command:** `npm test`
- **Verdict:** **`PASS ✅`** (100% Tests Passed)
- **Overall Suite:** `<passed>` passed / `<total>` total (`<duration>`s)
- **UI Tests (@ui):** `<ui_passed>` passed / `<ui_total>` total (`<ui_duration>`s)
- **API Tests (@api):** `<api_passed>` passed / `<api_total>` total (`<api_duration>`s)
- **Summary Report:** `test-results/execution-summary.md` (Generated)
- **Failure Screenshots:** 0 (Clean run)

---

## 🛡️ 5. Pre-Commit Quality Gate Checklist
- [x] **1. Locator Strategy:** Semantic user-facing locators utilized (`getByRole`, `getByLabel`); zero brittle absolute XPaths.
- [x] **2. Timing & Auto-Wait:** ZERO hardcoded sleeps (`page.waitForTimeout` / `setTimeout`) detected.
- [x] **3. Web-First Assertions:** Retrying `expect(...)` assertions present in every test.
- [x] **4. POM Discipline:** Locators and action workflows encapsulated in `pages/` extending `BasePage`.
- [x] **5. Secret Hygiene:** Base URLs and config loaded via `process.env` from `.env`.
- [x] **6. Test Isolation:** Dynamic `@faker-js/faker` data utilized to ensure parallel safety.

---

> 🚀 **Ready for peer review before merging to `main`.**
```

---

## 🤖 GitHub MCP Execution Protocol

Upon generating the summary:
1. Calls GitHub MCP `create_pull_request` (or Git CLI):
  - **Title:** `feat(automation): implement and verify [<STORY_ID>] <Feature Title>`
  - **Head Branch:** Current feature branch (`feature/<STORY_ID>-automation`)
  - **Base Branch:** `main`
  - **Body:** The generated markdown report above.
2. Returns the URL of the newly created Pull Request in the console.
