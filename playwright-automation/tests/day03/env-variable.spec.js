import { test } from "@playwright/test"

test('@env-test Testing Env variables', async () => {
    console.log(`Username is ${process.env.PRACTICE_USER}`);
    console.log(`Password is ${process.env.PRACTICE_PASSWORD}`);
});

test("By using credentials from environment variables", async ({ page }) => {
    let encodedCred = Buffer.from(`${process.env.PRACTICE_USER}:${process.env.PRACTICE_PASSWORD}`).toString("base64");
    console.log(encodedCred)
    await page.setExtraHTTPHeaders({ 'Authorization': `Basic ${encodedCred}` });
    await page.goto("https://the-internet-5chk.onrender.com/basic_auth")
    await page.waitForTimeout(2000)
});