import { test, expect } from '@playwright/test';

test.describe('SEP Application Tests', () => {


    test('Start SEP Application page ', async ({ page }) => {
        // to read from dot env file the playwright.config.js should have dotenv configured.
        const credentials = Buffer.from(`${process.env.SEP_QA_USERNAME}:${process.env.SEP_QA_PASSWORD}`).toString('base64');
        await page.setExtraHTTPHeaders({
            'Authorization': `Basic ${credentials}`
        });

        await page.goto(process.env.SEP_QA_URL);

        await expect(page).toHaveURL(/taws/);
    });

    test('Verify that clicking Terms and Conditions opens it in a new tab', async ({ page }) => {
        const credentials = Buffer.from(`${process.env.SEP_QA_USERNAME}:${process.env.SEP_QA_PASSWORD}`).toString('base64');
        await page.setExtraHTTPHeaders({
            'Authorization': `Basic ${credentials}`
        });
        await page.goto(process.env.SEP_QA_URL);

        const popupEvent = page.waitForEvent('popup');
        const termsandconditionsLink = page.getByRole('link', { name: 'Terms and conditions' });
        await termsandconditionsLink.click();
        const newpage = await popupEvent;

        const termsandconditionsURL = newpage.getByRole('heading', { name: 'Terms and conditions' });
        await expect(termsandconditionsURL).toBeVisible();
        await expect(newpage).toHaveURL(/terms-conditions/);

    });

    test('Verify that Blue Stepper Circle turns green', async ({ page }) => {
        const firstStep = page.locator('#stepper1 .step').first();
        const firstNameInput = page.locator('//input[@formcontrolname="firstName"]');
        const lastNameInput = page.locator('//input[@formcontrolname="lastName"]');
        const emailInput = page.locator('//input[@formcontrolname="email"]');
        const phoneInput = page.locator('//input[@formcontrolname="phoneNumber"]');
        const howDidYouHearInput = page.locator('//mat-label[normalize-space()="How did you hear about us?"]');


        const credentials = Buffer.from(`${process.env.SEP_QA_USERNAME}:${process.env.SEP_QA_PASSWORD}`).toString('base64');
        await page.setExtraHTTPHeaders({
            'Authorization': `Basic ${credentials}`
        });
        await page.goto(process.env.SEP_QA_URL);
        await firstNameInput.fill('John');
        await lastNameInput.fill('Doe');
        await emailInput.fill('john.doe@example.com');
        await phoneInput.fill('1234567890');
        await howDidYouHearInput.click();
        await page.locator('//span[@class=\'mdc-list-item__primary-text\' and normalize-space()=\'Facebook\']').click();

        await page.click('//button[@type="submit" and normalize-space()="Next"]');
        await expect(firstStep).toHaveClass(/\bdone\b/);
    });

});


test('Verify that the input fields are visible and accepts user input', async ({ page }) => {
    /*
    Steps:
    
    2. Verify that the input fields for first name, last name, email, and phone number are visible.
    3. Fill in the input fields with valid data.
    4. Verify that the input fields accept the user input.
    */
});