import { test } from "@playwright/test";

test.describe("Alerts Group Test", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://the-internet-5chk.onrender.com/javascript_alerts");


    });

    test("Regular Alert", async ({ page }) => {

        page.on("dialog", async (alert) => {        //handles the alert box as soon as it pops
            console.log(`Alert Message : ${alert.message()}`);
            //page.waitForTimeout(3000);
            await alert.accept();
        });
        let jsAlertButton = page.locator("//button[@onclick='jsAlert()']");

        await jsAlertButton.click();
    });

    test("Confirmation Alert", async ({ page }) => {
        page.on("dialog", async (alert) => {
            console.log(`Alert Message : ${alert.message()}`);
            //page.waitForTimeout(3000);
            //await alert.accept(); // Accept the confirmation alert
            await alert.dismiss(); // Dismiss the confirmation alert
        });
        let jsAlertButton = page.locator("//button[@onclick='jsConfirm()']");
        await jsAlertButton.click();
    });

    test("Prompt Alert", async ({ page }) => {

        page.on("dialog", async (alert) => {
            console.log(`Alert Message : ${alert.message()}`);
            await page.waitForTimeout(3000);
            await alert.accept("Playwright"); // Accept the prompt alert with input

        });
        let jsPromptAlertButton = page.locator("//button[@onclick='jsPrompt()']");
        await jsPromptAlertButton.click();
        await page.waitForTimeout(3000);

    });

});