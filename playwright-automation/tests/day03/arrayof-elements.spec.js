import { test, expect } from "@playwright/test";

test.describe("Array of Elements", () => {
    let locatorElements;

    test.beforeEach(async ({ page }) => {

        await page.goto("https://the-internet-5chk.onrender.com/");
        expect(await page.title()).toBe("Practice");
        locatorElements = await page.locator("//ul[@class='list-group']/li/a").all();

    });

    test("Verify the number of elements", async ({ page }) => {

        expect(locatorElements.length).toBe(50);
        expect(locatorElements.length).toBeGreaterThanOrEqual(20);
    });

    test("Verify that all the elements are visible and clickable", async ({ page }) => {
        for (let e of locatorElements) {
            await expect(e).toBeVisible();  // visibility check
            // expect(await e.isVisible()).toBeTruthy();

            await expect(e).toBeEnabled();

        }

    });

    test("Verify if all the 50 elements has href attribute", async ({ page }) => {
        for (let e of locatorElements) {
            await expect(e).toHaveAttribute("href");
            console.log(await e.getAttribute("href"));


        }
    });
});
