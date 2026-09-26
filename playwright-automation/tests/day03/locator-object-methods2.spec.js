import { test } from "@playwright/test";

test.describe("Retrieval Methods", () => {

     test.beforeEach(async ({ page }) => {
       await page.goto("https://the-internet-5chk.onrender.com/  ");
     });

  test("innerText", async ({ page }) => {
    let headerElement = page.locator("//span[contains(@class,'h1y')]");
    let actualText = await headerElement.innerText();
    console.log(actualText);

  });

  test("inputValue:inputs,text area and selected values", async ({ page }) => {
    let inputsLink = page.getByText("Inputs");
    inputsLink.click();
    let inputBox = page.locator("//input[@type='number']");
    await inputBox.fill("1245");
    await page.waitForTimeout(2000);
    let actualInput = await inputBox.inputValue();
      console.log(actualInput);

  });

  test("getAttribute: retrieves attribute value", async ({ page }) => {
    let testingLink = page.getByText('A/B Testing');
    let hrefLink = await testingLink.getAttribute("href")
    console.log(hrefLink);

  });
});