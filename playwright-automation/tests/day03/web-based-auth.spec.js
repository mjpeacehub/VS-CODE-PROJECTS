import { test } from "@playwright/test";

test.describe("Web-Based Authentication", () => {


    test("Bypassing Auth by embedding credentials in the URL", async ({ page }) => {
        //https://user:password@URL bypasses the webpage authentication
        await page.goto("https://admin:admin@the-internet-5chk.onrender.com/basic_auth")
        await page.waitForTimeout(2000)
    });

    test("By using encoded credentials", async ({ page }) => {
        let encodedCred = Buffer.from("admin:admin").toString("base64");
        page.setExtraHTTPHeaders({ 'Authorization': `Basic ${encodedCred}` });
        await page.goto("https://the-internet-5chk.onrender.com/basic_auth")
        await page.waitForTimeout(2000)
    });


});
