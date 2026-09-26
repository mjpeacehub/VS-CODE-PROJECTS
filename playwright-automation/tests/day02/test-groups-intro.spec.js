import { test } from "@playwright/test";

test.describe("", () => {
  test.beforeAll(async () => {
    console.log("Before ALL");
  });
  test.afterAll(async () => {
    console.log("After ALL");
  });
  test.beforeEach(async () => {
    console.log("Before Each TEST CASE");
  });

  test.afterEach(async () => {
    console.log(" After each TEST CASE");
  });
  test("TestCase1", async () => {
    console.log("TEST CASE1 executed");
  });
  test("TestCase2", async () => {
    console.log("TEST CASE2 executed");
  });

  test("TestCase3", async () => {
    console.log("TEST CASE3 executed");
  });
});
