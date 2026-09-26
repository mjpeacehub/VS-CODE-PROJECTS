---
name: Empty Playwright Test
description: Generate an empty Playwright test using ES module imports.
agent: agent
---
Generate exactly one empty Playwright test.

Requirements:
- Use `import { test } from "@playwright/test";`.
- Use an empty test description: `""`.
- Use an async test function with the `page` fixture.
- Leave the test body empty.
- Return only the code.

```js
import { test } from "@playwright/test";

test("", async ({ page }) => {
});
```
