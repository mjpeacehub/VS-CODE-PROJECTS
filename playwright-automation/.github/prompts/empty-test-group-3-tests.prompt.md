---
name: Empty Playwright Test Group with 3 Tests
description: Generate an empty Playwright test group with three tests and all four lifecycle hooks using ES module imports.
agent: agent
---

Generate exactly one empty Playwright test group containing the four lifecycle hooks and exactly three empty tests.

Requirements:

- Use `import { test } from "@playwright/test";`.
- Use an empty group description: `""`.
- Use `test.describe("", () => {`.
- Include one each of `test.beforeAll`, `test.beforeEach`, `test.afterEach`, and `test.afterAll`.
- Use async callbacks; include the `page` fixture in the `beforeEach` and `afterEach` callbacks.
- Leave all four hook bodies empty.
- Inside the group, include exactly three empty tests using `test("", async ({ page }) => { });`.
- Leave each test body empty.
- Return only the code.

```js
import { test } from "@playwright/test";

test.describe("", () => {
  test.beforeAll(async () => {});

  test.beforeEach(async ({ page }) => {});

  test.afterEach(async ({ page }) => {});

  test.afterAll(async () => {});

  test("", async ({ page }) => {});

  test("", async ({ page }) => {});

  test("", async ({ page }) => {});
});
```
