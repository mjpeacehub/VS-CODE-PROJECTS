import { test } from "@playwright/test";

test("Get title of the page", async ({ page }) => {
  await page.goto("https://the-internet-5chk.onrender.com/");
  let actualTitle = await page.title();
  //await page.waitForTimeout(3000); -- not recommended in actual testing
  console.log(actualTitle);
});

test("get URL of the page ", async ({ page }) => {
  await page.goto("https://the-internet-5chk.onrender.com/");
  let actualURL = await page.url();
  console.log(actualURL);
});

test("Set the window size ", async ({ page }) => {
  await page.goto("https://the-internet-5chk.onrender.com/");
  await page.waitForTimeout(3000);
  await page.setViewportSize({ width: 3440, height: 1440 });
  await page.waitForTimeout(3000);
});
