import { test } from "@playwright/test";

test.describe("TestGroup", () => {

        test.beforeEach(async({page} )=> {

        await page.goto("https://the-internet-5chk.onrender.com/  ");
        });

    test("Check by Locator", async ({ page }) => {
        let checkboxesLink = page.locator("//a[text()='Checkboxes']");
        await checkboxesLink.click();
        await page.waitForTimeout(3000);
        
        let checkbox1 = page.locator("//input[@id='box1']");
        await checkbox1.check();
        await page.waitForTimeout(3000);

        


    });
    test("Check by Text", async ({ page }) => {
      let checkboxesLink = page.getByText("Checkboxes");
      await checkboxesLink.click();
      await page.waitForTimeout(3000);
    });

    test("Uncheck", async ({ page }) => {

         let checkbox2 = page.locator("//input[@id='box2']");
         await checkbox2.uncheck();
         await page.waitForTimeout(3000);
    });

    test("SelectOption", async ({ page }) => {

        let dropdownLink = await page.getByText("Dropdown");
        await dropdownLink.click();
        await page.waitForTimeout(3000);

        let simpledropdown = page.locator("//select[@id='dropdown']");
        await simpledropdown.selectOption("1");
        await page.waitForTimeout(3000);

   
    
        await simpledropdown.selectOption({label: "Option 2"});
        await page.waitForTimeout(3000);

        await simpledropdown.selectOption({ index: 1 });
        await page.waitForTimeout(3000);



    });

  
});