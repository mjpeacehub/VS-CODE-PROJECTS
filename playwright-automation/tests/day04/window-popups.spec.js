import { test, expect } from "@playwright/test";
test.describe("Window Popups Test Group", () => {
    test("Handle Window Popups", async ({ page }) => {

        let popupPromise = page.waitForEvent('popup');
        await page.goto("https://the-internet-5chk.onrender.com/");
        await page.click("text = Multiple Windows");
        await page.waitForTimeout(3000);
        await page.click("text = Click Here");
        // Add your window popup handling code here
    });
});