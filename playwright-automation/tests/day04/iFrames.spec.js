import { test, expect } from "@playwright/test";

test.describe("iFrames Test Group", () => {
    test.beforeAll(async () => { });

    test.afterAll(async () => { });

    test.beforeEach(async () => { });

    test.afterEach(async () => { });

    test("iFrames Test", async ({ page }) => {
        await page.goto("https://the-internet-5chk.onrender.com/iframe");
        let myFrame = page.frameLocator("//iframe[@id='mce_0_ifr']");
        let elementInsideFrame = myFrame.locator("//body[@id='tinymce']']");
        let xButton = page.locator("//button[contains(@class,'tox-notification__dismiss')]");
        await page.waitForTimeout(3000);
        await xButton.click();
        await page.waitForTimeout(3000);
        await elementInsideFrame.clear();
        await elementInsideFrame.press("Control+A", "BackSpace");
        await page.waitForTimeout(3000);
        await elementInsideFrame.fill("Hello");





    });

    test("iframe auth", async ({ page }) => {

        let encodedCred = Buffer.from("automation-user:123abc").toString("base64");
        await page.setExtraHTTPHeaders({ 'Authorization': `Basic ${encodedCred}` });
        await page.goto("https://qa.sep.tdtm.cydeo.com/taws");
        await page.waitForTimeout(2000)
        await page.locator("//input[@formcontrolname='firstName']").fill("John");
        await page.locator("//input[@formcontrolname='lastName']").fill("Doe");
        await page.locator("//input[@formcontrolname='email']").fill("john.doe@example.com");
        await page.waitForTimeout(3000)
    });

    test("Test 3", async () => { });
});
