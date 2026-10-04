import { test, expect } from "@playwright/test";
test.describe("Window Popups Test Group", () => {

    test("Handle Window Popups", async ({ page }) => {

        let popupPromise = page.waitForEvent("popup"); // create an event listener for the popup window
                                                        // the event doesnt trigger until the Click here is clicked - so we dont use the await.
        await page.goto("https://the-internet-5chk.onrender.com/");
        await page.click("text = Multiple Windows");
        await page.waitForTimeout(3000);
        await page.click("text = Click Here");


        // Add your window popup handling code here
        let newPage = await popupPromise; // wait for the popup to appear
        await expect(newPage).toHaveTitle("New Window");
        await expect(page).toHaveTitle("Windows");

        let FirstWindowElement = await (page).getByText("Opening a new Window");
        await expect(FirstWindowElement).toBeVisible();

        await newPage.bringToFront();
        let secondWindowElement = await (newPage).getByText("New Window");
        await expect(secondWindowElement).toBeVisible();
        await newPage.waitForTimeout(2000);
    });
});
