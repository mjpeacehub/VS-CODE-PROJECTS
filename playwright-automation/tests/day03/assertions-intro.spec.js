import { test,expect } from "@playwright/test";


test.describe("Test Group", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet-5chk.onrender.com/");
  });


  test("Verify Check Box", async ({ page }) => {
      await page.getByText("Checkboxes").click();


      let checkbox1 = page.locator("//input[@id='box1']");
      let checkbox2 = page.locator("//input[@id='box2']");
      await checkbox1.check();
      await checkbox1.check();

      await expect(checkbox1).toBeChecked();    //validates if the checkbox is checked
    await expect(checkbox2).toBeChecked();  //validates if check box is checked
  







  });

  test("Verify Unchecked Box", async ({ page }) => {});

  test("Verify visible Text", async ({ page }) => {});
});