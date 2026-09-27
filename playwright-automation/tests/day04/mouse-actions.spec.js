import { test, expect } from "@playwright/test";

test.describe("mouseActions", () => {
    test.beforeAll(async () => { });
    test.afterAll(async () => { });
    test.beforeEach(async ({ page }) => {
        await page.goto("https://the-internet-5chk.onrender.com/");
        await page.waitForTimeout(3000);

    });
    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(3000);
    });

    test("Left Click", async ({ page }) => {
        await page.click("text=A/B Testing");
    });
    test("Right Click", async ({ page }) => { });

    test("Hover", async ({ page }) => {
        await page.click("text = Hovers");
        await page.waitForTimeout(3000);

        //let avatars = page.locator("//div[@class='figure']").all();
        let elements = page.locator("//img[@alt='User Avatar']");
        console.log(elements);
        // Hover over each avatar
        for (let each of elements) {
            await each.hover();
            await page.waitForTimeout(3000);
        }
    });

    test("Scroll", async ({ page }) => {
        await page.click("text = Hovers");
        await page.waitForTimeout(3000);
        await page.hover("//img[@alt='User Avatar']");
        await page.waitForTimeout(3000);


    });
    test("Scrolling to specific element", async ({ page }) => {

        const avatars = page.locator("//img[@alt='User Avatar']");
        const avatarCount = await avatars.count();
        console.log(`Total avatars found: ${avatarCount}`);

        for (let i = 0; i < avatarCount; i++) {
            await avatars.nth(i).hover();
            await page.waitForTimeout(3000);
        }
    });

    test("Mouse scroll to a specific element", async ({ page }) => {
        let inputElement = page.getByText("Input");
        await inputElement.scrollIntoViewIfNeeded();
        await page.waitForTimeout(3000);
        await inputElement.click();
    });


    test("Drag and Drop", async ({ page }) => {

        await page.click("text=Drag and Drop");
        await page.waitForTimeout(3000);
        const source = page.locator("#column-a");
        const target = page.locator("#column-b");
        await source.dragTo(target);
        await page.waitForTimeout(3000);

    });

});
