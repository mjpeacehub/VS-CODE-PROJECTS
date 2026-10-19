import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page.js';
import { Spartan } from '../models/spartan.model.js';

/**
 * EditSpartanPage represents the form to edit an existing Spartan.
 * URL: /web/v2/spartans/edit/{id}
 */
export class EditSpartanPage extends BasePage {
  readonly heading: Locator;
  readonly nameInput: Locator;
  readonly genderSelect: Locator;
  readonly phoneInput: Locator;
  readonly updateButton: Locator;
  readonly cancelButton: Locator;
  readonly backToListLink: Locator;
  readonly backToHomeLink: Locator;

  constructor(page: Page) {
    super(page);
    // User-facing Playwright getBy* locators
    this.heading = page.getByRole('heading', { name: 'Edit Spartan', exact: true });
    this.nameInput = page.getByLabel('Name:');
    this.genderSelect = page.getByLabel('Gender:') ;
    this.phoneInput = page.getByLabel(/Phone/i);
    this.updateButton = page.getByRole('button', { name: 'Update' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.backToListLink = page.getByRole('link', { name: 'Back to the List' });
    this.backToHomeLink = page.getByRole('link', { name: 'Back to Home' });
  }

  /**
   * Navigates directly to the Edit page for a specific Spartan ID.
   */
  public async navigate(id: string | number): Promise<void> {
    await this.page.goto(`/web/v2/spartans/edit/${id}`);
    await this.waitForPageReady();
    await expect(this.heading).toBeVisible();
  }

  /**
   * Retrieves the current values populated in the form fields.
   */
  public async getCurrentFormData(): Promise<Spartan> {
    return {
      name: await this.nameInput.inputValue(),
      gender: (await this.genderSelect.inputValue()) as Spartan['gender'],
      phone: await this.phoneInput.inputValue(),
    };
  }

  /**
   * Updates Spartan fields and submits the form.
   */
  public async updateSpartan(newData: Partial<Spartan>): Promise<void> {
    if (newData.name !== undefined) {
      await this.nameInput.fill(newData.name);
    }
    if (newData.gender !== undefined) {
      await this.genderSelect.selectOption(newData.gender);
    }
    if (newData.phone !== undefined) {
      await this.phoneInput.fill(newData.phone);
    }
    await this.updateButton.click();
    await this.waitForPageReady();
  }

  /**
   * Clicks 'Cancel' to abandon edit.
   */
  public async clickCancel(): Promise<void> {
    await this.cancelButton.click();
    await this.waitForPageReady();
  }

  /**
   * Comprehensive validation of every individual UI element on the Edit Spartan page.
   */
  public async assertAllEditSpartanElements(expectedData: Spartan): Promise<void> {
    // 1. Page Title & URL
    await expect(this.page).toHaveTitle(`Edit - ${expectedData.name}`);
    await expect(this.page).toHaveURL(/\/web\/v2\/spartans\/edit\/\d+$/);

    // 2. Navigation Bar
    await expect(this.navbarBrand).toBeVisible();
    await expect(this.navbarBrand).toContainText('Edit Spartan Page');
    await expect(this.navbarBrand).toHaveAttribute('href', '/web/v2/home');
    await expect(this.navbarUnlockIcon).toBeVisible();

    // 3. Form Heading
    await expect(this.heading).toBeVisible();
    await expect(this.heading).toHaveText('Edit Spartan');

    // 4. Form Fields & Pre-populated Values
    await expect(this.nameInput).toBeVisible();
    await expect(this.nameInput).toBeEditable();
    await expect(this.nameInput).toHaveValue(expectedData.name);

    await expect(this.genderSelect).toBeVisible();
    await expect(this.genderSelect).toBeEnabled();
    await expect(this.genderSelect).toHaveValue(expectedData.gender);

    await expect(this.phoneInput).toBeVisible();
    await expect(this.phoneInput).toBeEditable();
    await expect(this.phoneInput).toHaveValue(expectedData.phone);

    // 5. Action Buttons
    await expect(this.updateButton).toBeVisible();
    await expect(this.updateButton).toBeEnabled();
    await expect(this.updateButton).toHaveText('Update');

    await expect(this.cancelButton).toBeVisible();
    await expect(this.cancelButton).toBeEnabled();
    await expect(this.cancelButton).toHaveText('Cancel');
    await expect(this.cancelButton).toHaveAttribute('href', '/web/v2/spartans');

    // 6. Navigation Footer Links
    await expect(this.backToListLink).toBeVisible();
    await expect(this.backToListLink).toHaveAttribute('href', '/web/v2/spartans');

    await expect(this.backToHomeLink).toBeVisible();
    await expect(this.backToHomeLink).toHaveAttribute('href', '/web/v2/home');

    // 7. CYDEO Footer
    await this.assertFooterPresent();
  }
}
