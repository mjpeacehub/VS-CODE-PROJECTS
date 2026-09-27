import { test, expect } from "@playwright/test";

test.describe("WebTable Practice", () => {
    test.beforeAll(async () => { });
    test.afterAll(async () => { });
    test.beforeEach(async () => { });
    test.afterEach(async () => { });

    test("Test 1", async ({ page }) => {

        await page.goto("https://the-internet-5chk.onrender.com/");
        await page.waitForTimeout(3000);
        await page.click("text = Web Tables");
        await page.waitForTimeout(3000);
        let table = await page.locator("//table[@id='ctl00_MainContent_orderGrid']");
        let rows = await table.locator("//tr").all();
        expect(rows.length).toBe(9)
        console.log(rows.length);
        let columns = await table.locator("//th").all();
        console.log(columns.length);

        let cells = await table.locator("//td").all();
        console.log(cells.length);
        expect(cells.length).toBe(104);

        for (let cell of cells) {
            console.log(await cell.textContent());
        }

    });

    test("Test 2", async ({ page }) => {
        await page.goto("https://the-internet-5chk.onrender.com/");
        //await page.waitForTimeout(3000);
        await page.click("text = Web Tables");
        await page.waitForTimeout(3000);
        let table = await page.locator("//table[@id='ctl00_MainContent_orderGrid']");
        //create a loop that can print each cell's text content of all rows excluding the first and last cell of each row
        let rows = await table.locator("//tr").all();
        for (let row of rows) {
            let cells = await row.locator("//td").all();
            for (let i = 1; i < cells.length - 1; i++) {
                console.log(await cells[i].textContent());

            }
            console.log("-----");
        }
    });

    test("Check All Checkboxes ", async ({ page }) => {
        await page.goto("https://the-internet-5chk.onrender.com/");
        //await page.waitForTimeout(3000);
        await page.click("text = Web Tables");
        await page.waitForTimeout(3000);
        let table = await page.locator("//table[@id='ctl00_MainContent_orderGrid']");
        let checkboxes = await table.locator("//input[@type='checkbox']").all();
        for (let checkbox of checkboxes) {
            await checkbox.check();
        }
        console.log("All checkboxes have been checked.");
        await page.waitForTimeout(3000);

        for (let checkbox of checkboxes) {
            console.log(await checkbox.isChecked());
        }
    });
});

