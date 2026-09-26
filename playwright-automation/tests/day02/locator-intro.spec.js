import { test } from "@playwright/test";

test("", async ({ page }) => {
  await page.goto("https://google.com");
  await page.waitForTimeout(3000);
  //let searchBox = await page.locator("//textarea[@class = 'gLFyf']"); //manually input
  let searchBox = await page.locator("//textarea[@name='q']"); // using Perplexity AI
  await searchBox.fill("CYDEO");
  await page.waitForTimeout(3000);
  await searchBox.press("Enter");
  await page.waitForTimeout(3000);
});



