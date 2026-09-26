---
name: Empty Playwright Test Group with 3 Tests
description: Generate an empty Playwright test group with three empty tests using ES module imports.
agent: agent
---
Generate exactly one empty Playwright test group containing exactly three empty tests.

Requirements:
- Use `import { test } from "@playwright/test";`.
- Use an empty group description: `""`.
- Use `test.describe("", () => {`.
- Inside the group, include exactly three empty tests using `test("", async ({ page }) => { });`.
- Leave each test body empty.
- Return only the code.

```js
import { test } from "@playwright/test";

test.describe("", () => {
  test("", async ({ page }) => {
  });

  test("", async ({ page }) => {
  });

  test("", async ({ page }) => {
  });
});
```
