# Spartan Enterprise E2E & API Automation Framework 🛡️

A world-class, dual-tier Test Automation Framework for the **Spartan Web Application & REST API** (`https://spartan-app-new-nonsecure.onrender.com/`) built using **Playwright**, **TypeScript**, **Page Object Model (POM)**, and **Test-Driven Development (TDD)** principles.

---

## 🏗️ Architecture & Folder Structure

```text
spartan-e2e-automation/
├── .agents/                       # Antigravity Agentic Customization Root
│   ├── agents/                    # Specialized SDET Sub-Agents
│   │   ├── planner.agent.md       # Ingests Jira/ADO stories, plans 1:1 AC mapping
│   │   ├── explorer.agent.md      # Live Playwright DOM & Swagger API exploration
│   │   ├── generator.agent.md     # Synthesizes POM, models, API client, & test specs
│   │   └── healer.agent.md        # 3-tier failure classification & autonomous healing
│   ├── skills/                    # Antigravity Slash Command Skills
│   │   ├── test-automation-lifecycle/ # Master SDET orchestrator (with WORKFLOW.html)
│   │   ├── pr-reviewer/           # 6-point local pre-commit quality gate
│   │   └── pr-summary/            # Automated PR authoring via GitHub MCP
│   └── mcp_config.json            # Atlassian, Azure DevOps, Playwright, GitHub MCP configs
├── agents/ ──► .agents/agents/    # Root symlink for CLI/IDE discovery
├── skills/ ──► .agents/skills/    # Root symlink for CLI/IDE discovery
├── pages/                         # Page Object Model classes (UI locators + actions)
│   ├── base.page.ts               # Shared locators, navbar, and footer assertions
│   ├── home.page.ts               # Spartan Home dashboard view
│   ├── spartans.page.ts           # Web Data table, search/filter, and row actions
│   ├── add-spartan.page.ts        # Add Spartan creation form
│   ├── edit-spartan.page.ts       # Edit Spartan form
│   └── spartan-detail.page.ts     # View Spartan readonly details view
├── tests/                         # Root Test Automation Directory
│   ├── tasks/                     # UI Spec test suites (TDD tasks - @ui)
│   │   ├── home.spec.ts               # Navigation & branding tests (TC01 - TC03)
│   │   ├── add-spartan.spec.ts        # Creation tests with Faker (TC04 - TC06)
│   │   ├── spartans-table.spec.ts     # Headers, count, search & filter tests (TC07 - TC10)
│   │   ├── view-edit-spartan.spec.ts  # View details & edit tests (TC11 - TC12)
│   │   ├── delete-spartan.spec.ts     # Spartan deletion & removal verification (TC13)
│   │   └── ui-element-validation.spec.ts # Full element sanity suite (TC-ELEM-01 - 05)
│   └── APItests/                  # REST API Spec test suites (@api)
│       ├── spartan-crud.spec.ts       # Full CRUD lifecycle (POST -> GET -> PUT -> PATCH -> DELETE)
│       ├── spartan-search.spec.ts     # Query parameter testing (nameContains, gender)
│       ├── spartan-validation.spec.ts # Negative testing (400 Bad Request, 404 Not Found, Schemas)
│       ├── hello-healthcheck.spec.ts  # Service greeting & healthcheck (GET /api/v2/hello)
│       └── hybrid-e2e.spec.ts         # Hybrid UI + API workflow integration test
├── utilities/                     # Reusable utility services & custom reporters
│   ├── spartan-api-client.ts      # Strongly-typed API client wrapping APIRequestContext
│   ├── spartan-data-generator.ts  # Mock data generator using @faker-js/faker
│   ├── comprehensive-reporter.ts  # Custom reporter outputting metrics (Run, Passed, Failed, %)
│   └── env-config.ts              # Typed environment configuration
├── fixtures/                      # Custom Playwright test fixtures
│   ├── test-fixtures.ts           # Injects Page Objects and API client into tests
│   └── api-fixtures.ts            # Auto-cleaning API fixtures with teardown lifecycle
├── models/                        # TypeScript data contracts & schemas
│   ├── spartan.model.ts           # UI entity models, search filters, table rows
│   └── spartan-api.model.ts       # REST API DTOs, ResponseWrapper, ExceptionWrapper
├── test-results/                  # Generated execution reports & artifacts
│   ├── execution-summary.json     # Machine-readable test execution metrics
│   └── execution-summary.md       # Markdown summary table with status & durations
├── playwright-report/             # Interactive HTML test execution reports
├── playwright.config.ts           # Multi-browser & API project Playwright config
├── tsconfig.json                  # Strict TypeScript compiler config with path aliases
├── package.json                   # Dependencies and npm test runners
└── .env                           # Application environment variables
```

---

## 🤖 Autonomous Agentic Testing Framework (Antigravity CLI)

This framework functions as an **Autonomous Agentic Testing Framework** powered by **Google Antigravity (`agy`)**, **Playwright MCP**, and **Atlassian / Azure DevOps MCP** tool integration.

### The 4 Specialized SDET Sub-Agents:
1. **[Planner Agent](.agents/agents/planner.agent.md):** Ingests Jira / Azure DevOps user stories, parses Acceptance Criteria, enforces 1-to-1 AC-to-Test mapping, and performs POM & API Client gap audits.
2. **[Explorer Agent](.agents/agents/explorer.agent.md):** Connects to live Spartan Web & REST API environments via browser subagent and Swagger docs, verifying user-facing semantic locators (`getByRole`, `getByLabel`), dynamic badge counters, and endpoint schemas.
3. **[Generator Agent](.agents/agents/generator.agent.md):** Synthesizes type-safe Page Objects in `pages/`, API Client methods in `utilities/`, and test specs under `tests/` tagged with `@ui` or `@api`.
4. **[Healer Agent](.agents/agents/healer.agent.md):** Executes generated tests, diagnoses failure traces using a 3-tier taxonomy (`automation-code`, `environment data`, `product defect`), and autonomously self-heals code issues (up to 3 loops).

### Master Orchestration Slash Commands:
- **`/test-automation-lifecycle <JIRA-KEY | AZURE-ID>`**: End-to-end autonomous lifecycle orchestrating all 4 agents from ticket ingestion to verified Pull Request.
  - Example: `agy> /test-automation-lifecycle SPARTAN-101`
  - Example: `agy> /test-automation-lifecycle #4521`
- **`/pr-reviewer`**: Audits uncommitted changes against the 6-point enterprise Playwright quality checklist before opening a PR.
- **`/pr-summary`**: Gathers test execution metrics from `execution-summary.json` and opens a PR via GitHub MCP.
- **[WORKFLOW.html](.agents/skills/test-automation-lifecycle/WORKFLOW.html)**: Interactive visual dashboard with architecture diagrams, agent dossiers, and failure classification simulator.

---

## 🚀 Key Framework Features

### 1. Unified `tests/` Test Suite Structure
All test suites are cleanly categorized under `tests/`:
- **`tests/tasks/`**: UI end-to-end and element validation suites.
- **`tests/APItests/`**: Backend REST API suites and hybrid end-to-end integration workflows.

### 2. Test Tagging (`@ui` & `@api`) & Independent Execution
All suites are tagged with Playwright tags to support granular, independent execution:
- **`@ui`**: Tags all UI suites under `tests/tasks/` (`home`, `add-spartan`, `spartans-table`, `view-edit-spartan`, `delete-spartan`, `ui-element-validation`).
- **`@api`**: Tags all backend API suites under `tests/APItests/` (`spartan-crud`, `spartan-search`, `spartan-validation`, `hello-healthcheck`, `hybrid-e2e`).
- Run UI tests independently: `npm run test:ui` or `npx playwright test --grep @ui`
- Run API tests independently: `npm run test:api` or `npx playwright test --grep @api`
- Run full suite: `npm test`

### 3. Comprehensive Test Execution Reporting (`utilities/comprehensive-reporter.ts`)
A custom reporter automatically logs and exports detailed metrics for every test run with separate breakdowns for UI and API tests:
- **Metrics Tracked**:
  - **Overall**: Tests Run, Passed, Failed, Skipped, Flaky, Pass Rate %, Duration.
  - **UI Tests (`@ui`)**: UI Run, UI Passed, UI Failed, UI Skipped, UI Pass Rate, UI Duration.
  - **API Tests (`@api`)**: API Run, API Passed, API Failed, API Skipped, API Pass Rate, API Duration.
- **Console Dashboard**: Real-time terminal output with category breakdowns and status icons.
- **JSON Report (`test-results/execution-summary.json`)**: Machine-readable format with `summary`, `ui`, and `api` blocks.
- **Markdown Report (`test-results/execution-summary.md`)**: Beautiful table summarizing Overall, UI, and API metrics with individual test runtimes.

### 3. Dedicated REST API Client Service (`utilities/spartan-api-client.ts`)
Encapsulates all endpoints under `/api/v2/*` with typed responses, headers, and deserialization helpers:
```typescript
const response = await apiClient.createSpartan(payload);
expect(response.status()).toBe(201);
```

### 4. Auto-Cleaning API Fixtures (`fixtures/api-fixtures.ts`)
Tracks created entity IDs during test execution and automatically cleans them up in the teardown phase to prevent database test pollution:
```typescript
test('API-01: CRUD', async ({ apiClient, createdSpartanIds }) => {
  const res = await apiClient.createSpartan(newSpartan);
  createdSpartanIds.push(res.data.id); // Automatically deleted on test completion!
});
```

### 5. User-Facing `getBy*` Locators for UI
Prioritizes Playwright's user-centric accessibility locators (`getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`), falling back to CSS selectors only where accessible semantic roles are absent.

### 6. Dynamic Mock Data with Faker (`utilities/spartan-data-generator.ts`)
Leverages `@faker-js/faker` to dynamically generate realistic names, valid 10-digit phone numbers, and unique prefixes for both UI forms and API JSON payloads.

### 7. Enterprise Hybrid Integration Testing (`tests/APItests/hybrid-e2e.spec.ts`)
Bridges the gap between backend and frontend:
1. Seeds a Spartan record in milliseconds via `POST /api/v2/spartans`
2. Validates UI table rendering in Chromium
3. Modifies data using the Web UI edit form
4. Directly asserts database persistence via `GET /api/v2/spartans/{id}`
5. Deletes the test record via `DELETE /api/v2/spartans/{id}`

---

## 🛠️ Test Execution Commands

| Command | Target | Description |
| :--- | :--- | :--- |
| `npm test` | All (`tests/`) | Run all UI (`tests/tasks`) and API (`tests/APItests`) tests |
| `npm run test:api` | `tests/APItests/` | Run all REST API test suites |
| `npm run test:ui` | `tests/tasks/` | Run all Web UI test suites on Chromium |
| `npm run test:all` | All Browsers | Run all tests across Chromium, Firefox, and WebKit |
| `npm run test:headed` | `tests/tasks/` | Run UI tests in headed browser mode |
| `npm run test:debug` | Interactive | Run Playwright Inspector step-by-step |
| `npm run test:summary` | Terminal | Display the latest markdown test execution summary |
| `npm run test:report` | Reporting | Open interactive HTML test report in browser |
| `npm run lint` | TypeScript | Strict type checking (`tsc --noEmit`) |

---

## 📊 Test Coverage Summary (30 Tests Total)

### UI Suites (`tests/tasks/` - 18 Tests)
- **`home.spec.ts`**: Home dashboard branding, title, CYDEO footer, and page navigation (TC01 - TC03).
- **`add-spartan.spec.ts`**: Form submission (Male/Female) with Faker, form cancellation (TC04 - TC06).
- **`spartans-table.spec.ts`**: Table headers, total count badge, search filter by name, filter by gender, clear filter (TC07 - TC10).
- **`view-edit-spartan.spec.ts`**: Details view data inspection, edit form updates (TC11 - TC12).
- **`delete-spartan.spec.ts`**: Row deletion and verification of removal (TC13).
- **`ui-element-validation.spec.ts`**: Complete UI sanity & element validation for every element on all 5 web pages (TC-ELEM-01 - 05).

### API Suites (`tests/APItests/` - 12 Tests)
- **`spartan-crud.spec.ts`**: Full CRUD lifecycle (`POST`, `GET by ID`, `PUT`, `PATCH`, `DELETE`, verify 404), `GET all spartans` array schema verification (API-01, API-02).
- **`spartan-search.spec.ts`**: Query parameter filtering (`nameContains`, `gender`, combined queries, empty search results) (API-03 - API-06).
- **`spartan-validation.spec.ts`**: Negative testing (400 Bad Request on invalid phone, missing name, 404 Not Found on nonexistent ID, `ExceptionWrapper` validation) (API-07 - API-10).
- **`hello-healthcheck.spec.ts`**: Service healthcheck (`GET /api/v2/hello`, 200 OK, `text/plain`) (API-11).
- **`hybrid-e2e.spec.ts`**: End-to-end integration combining API seeding, UI table verification, UI editing, API database assertion, and API cleanup (HYBRID-01).
