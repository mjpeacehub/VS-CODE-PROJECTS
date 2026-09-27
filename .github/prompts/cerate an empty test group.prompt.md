---
name: Create an empty test group
description: Create a Playwright test group with three empty tests and all lifecycle hooks.
argument-hint: Provide the test group name and, if needed, the target test file.
agent: agent
---

Create a Playwright test group in the target test file with three empty tests and all lifecycle hooks.

Requirements:

- Use the existing Playwright conventions in the file, including its import style and indentation.
- Add a `test.describe()` block with the requested group name: `${input:testGroupName}`.
- Add exactly three empty tests inside the group.
- Add all four empty lifecycle hooks: `beforeAll`, `afterAll`, `beforeEach`, and `afterEach`.
- Do not add assertions, locators, or placeholder comments inside the tests or hooks.
- Keep the group syntactically valid and place it alongside the file's other test groups without changing unrelated code.
- If the target file is not clear, use the currently open Playwright test file.
- If the requested group already exists, do not create a duplicate; report that it already exists.

Expected shape:

```js
test.describe("${input:testGroupName}", () => {
  test.beforeAll(async () => {});
  test.afterAll(async () => {});
  test.beforeEach(async () => {});
  test.afterEach(async () => {});

  test("Test 1", async () => {});
  test("Test 2", async () => {});
  test("Test 3", async () => {});
});
```

After editing, briefly report the file changed and the group created.
