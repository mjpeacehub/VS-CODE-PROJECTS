import { expect, test } from "@playwright/test";
import path from "path";
import fs from "fs";

test("Download into downloads folder", async ({ page }) => {
	
    let downLoadPromise = page.waitForEvent("download");

    await page.goto("https://the-internet-5chk.onrender.com/");
    await page.click("text = File Download");
    await page.click("text = some-file.txt");


    let download = await downLoadPromise;
    let downloadPath =path.join(__dirname, "downloads", download.suggestedFilename()); // download destination folder name and file name as args

    await download.saveAs(downloadPath); // save the downloaded file to the specified path
    
    expect(fs.existsSync(downloadPath)).toBeTruthy(); // check if the downloaded file exists
});

test("File Upload", async({ page }) => {

    await page.goto("https://the-internet-5chk.onrender.com/");
    await page.click("text = File Upload");
    await page.waitForTimeout(2000);

    let filePath = path.join(__dirname, "uploads", "techfile.txt"); // upload source folder name and file name as args
    await page.setInputFiles("//*[@id='file-upload']", filePath);
    await page.waitForTimeout(2000);

    await page.click("//*[@id='file-submit']");
    await page.waitForTimeout(2000);

    expect(await page.getByText("File Uploaded")).toBeVisible();
    await page.waitForTimeout(2000);

});