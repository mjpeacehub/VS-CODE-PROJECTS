import { test } from "@playwright/test";

test("Google test", async ({ page }) => {
  //navigate to https://google.com
  await page.goto("https://google.com");

  //wait for 3000ms
  await page.waitForTimeout(3000);
});

test("Youtube test", async ({ page }) => {
  //navigate to https://youtube.com
  await page.goto("https://youtube.com")
  await page.waitForTimeout(2999);
});
