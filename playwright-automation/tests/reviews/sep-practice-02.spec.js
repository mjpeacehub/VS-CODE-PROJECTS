import { test, expect } from '@playwright/test';
import { CommonUI } from './CommonUI';

test.describe('SEP Application Payment Page Fields Tests', () => {

    test.beforeEach(async ({ page }) => {
        await CommonUI.completeStartApplication(page);
    });

    test('Verify Stepper 2 Stepper is Blue and Stepper 1 is Green', async ({ page }) => {
        const steps = page.locator('#stepper1 .step');

        await expect(steps.nth(0)).toHaveClass(/\bdone\b/);
        await expect(steps.nth(1)).toHaveClass(/\bediting\b/);
    });

    test('Verify Next button is initially disabled', async ({ page }) => {
        const nextButton = page.getByRole('button', { name: 'Next', exact: true });
        await expect(nextButton).toBeVisible();
        await expect(nextButton).toBeDisabled();
    });

    test('Next button is visible once the payment plan is selected', async ({ page }) => {
        await page.getByRole('button', { name: /Upfront/ }).click();

        const nextButton = page.getByRole('button', { name: 'Next', exact: true });
        await expect(nextButton).toBeVisible();
        await expect(nextButton).toBeEnabled();
    });

    test('Verify Stepper 2 turns green after payment plan selection', async ({ page }) => {
        const secondStep = page.locator('#stepper1 .step').nth(1);
        const nextButton = page.getByRole('button', { name: 'Next', exact: true });

        await page.getByRole('button', { name: /Upfront/ }).click();
        await nextButton.click();

        await expect(secondStep).toHaveClass(/\bdone\b/);
    });

    test('Next button is enabled if 5 installment plan is selected', async ({ page }) => {

        /* Select the 5 installment plan and verify the Next button is enabled 
        
        /* Also verify that the stepper 2 turns green after selecting the 5 installment plan and click Next Button*/

        await page.getByRole('button', { name: /5 Installments/ }).click();
        const nextButton = page.getByRole('button', { name: 'Next', exact: true });
        await expect(nextButton).toBeVisible();
        await expect(nextButton).toBeEnabled();

        const secondStep = page.locator('#stepper1 .step').nth(1);
        await nextButton.click();
        await expect(secondStep).toHaveClass(/\bdone\b/);
        await page.waitForTimeout(3000);
    });

});
