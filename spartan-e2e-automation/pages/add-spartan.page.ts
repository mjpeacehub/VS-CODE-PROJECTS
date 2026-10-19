import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page.js';
import { Spartan } from '../models/spartan.model.js';

/**
 * AddSpartanPage represents the form to create a new Spartan entity.
 * URL: /web/v2/spartans/add
 */
export class AddSpartanPage extends BasePage {
  readonly heading: Locator;
  readonly nameInput: Locator;
  readonly genderSelect: Locator;
  readonly phoneInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly backToListLink: Locator;
  readonly backToHomeLink: Locator;

  constructor(page: Page) {
    super(page);
    // User-facing Playwright getBy* locators
    this.heading = page.getByRole('heading', { name: 'Add Spartan', exact: true });
    this.nameInput = page.getByLabel('Name:');
    this.genderSelect = page.getByLabel('Gender:');
    this.phoneInput = page.getByLabel('Phone');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.backToListLink = page.getByRole('link', { name: 'Back to the List' });
    this.backToHomeLink = page.getByRole('link', { name: 'Back to Home' });
  }

  /**
   * Navigates directly to the Add Spartan page.
   */
  public async navigate(): Promise<void> {
    await this.page.goto('/web/v2/spartans/add');
    await this.waitForPageReady();
    await expect(this.heading).toBeVisible();
  }

  /**
   * Fills in all fields of the Add Spartan form.
   */
  public async fillForm(spartan: Spartan): Promise<void> {
    await this.nameInput.fill(spartan.name);
    await this.genderSelect.selectOption(spartan.gender);
    await this.phoneInput.fill(spartan.phone);
  }

  /**
   * Clicks the 'Save' button to submit the form.
   */
  public async clickSave(): Promise<void> {
    await this.saveButton.click();
    await this.waitForPageReady();
  }

  /**
   * Convenience method to fill the form and submit in one call.
   */
  public async createSpartan(spartan: Spartan): Promise<void> {
    await this.fillForm(spartan);
    await this.clickSave();
  }

  /**
   * Clicks 'Cancel' to abandon creation.
   */
  public async clickCancel(): Promise<void> {
    await this.cancelButton.click();
    await this.waitForPageReady();
  }

  /**
   * Clicks 'Back to the List' link.
   */
  public async clickBackToList(): Promise<void> {
    await this.backToListLink.click();
    await this.waitForPageReady();
  }

  /**
   * Asserts the form inputs are currently empty.
   */
  public async assertFormEmpty(): Promise<void> {
    await expect(this.nameInput).toHaveValue('');
    await expect(this.phoneInput).toHaveValue('');
  }

  /**
   * Comprehensive validation of every individual UI element on the Add Spartan page.
   */
  public async assertAllAddSpartanElements(): Promise<void> {
    // 1. Page Title & URL
    await expect(this.page).toHaveTitle('Add New Spartan');
    await expect(this.page).toHaveURL(/\/web\/v2\/spartans\/add$/);

    // 2. Navigation Bar
    await expect(this.navbarBrand).toBeVisible();
    await expect(this.navbarBrand).toContainText('Add Spartan Page');
    await expect(this.navbarBrand).toHaveAttribute('href', '/web/v2/home');
    await expect(this.navbarUnlockIcon).toBeVisible();

    // 3. Form Heading
    await expect(this.heading).toBeVisible();
    await expect(this.heading).toHaveText('Add Spartan');

    // 4. Form Fields & Controls
    await expect(this.nameInput).toBeVisible();
    await expect(this.nameInput).toBeEditable();
    await expect(this.nameInput).toHaveAttribute('placeholder', 'Mike');

    await expect(this.genderSelect).toBeVisible();
    await expect(this.genderSelect).toBeEnabled();

    // Verify Gender dropdown option elements
    const options = this.genderSelect.locator('option');
    await expect(options).toHaveCount(3);
    await expect(options.nth(0)).toHaveText('Select');
    await expect(options.nth(0)).toBeDisabled();
    await expect(options.nth(1)).toHaveText('MALE');
    await expect(options.nth(2)).toHaveText('FEMALE');

    await expect(this.phoneInput).toBeVisible();
    await expect(this.phoneInput).toBeEditable();
    await expect(this.phoneInput).toHaveAttribute('placeholder', '1234567890');

    // 5. Action Buttons
    await expect(this.saveButton).toBeVisible();
    await expect(this.saveButton).toBeEnabled();
    await expect(this.saveButton).toHaveText('Save');

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
