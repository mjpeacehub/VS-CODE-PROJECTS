import { test, expect } from '@playwright/test';
import { CommonUI } from './CommonUI';

test.describe('SEP Application Payment Page Fields Tests', () => {

    test.beforeEach(async ({ page }) => {
        await CommonUI.login(page);

    })

    test('Verify Stepper 2 Stepper is Blue and Stepper 1 is Green', async ({ page }) => {

    });

    test('Next button is visible once the payment plan is selected', async ({ page }) => {

    });

    test('Verify Stepper 2 turns green after payment plan selection', async ({ page }) => {

    });
});
