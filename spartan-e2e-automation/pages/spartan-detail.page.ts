import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page.js';
import { Spartan } from '../models/spartan.model.js';

/**
 * SpartanDetailPage represents the readonly details view of a Spartan record.
 * URL: /web/v2/spartans/{id}
 */
export class SpartanDetailPage extends BasePage {
  readonly heading: Locator;
  readonly nameField: Locator;
  readonly genderField: Locator;
  readonly phoneField: Locator;
  readonly backToListLink: Locator;
  readonly backToHomeLink: Locator;

  constructor(page: Page) {
    super(page);
    // User-facing Playwright getBy* locators
    this.heading = page.getByRole('heading', { name: 'Spartan Details' });
    this.nameField = page.getByLabel('Name:');
    this.genderField = page.getByLabel('Gender:');
    this.phoneField = page.getByLabel(/Phone/i);
    this.backToListLink = page.getByRole('link', { name: 'Back to the List' });
    this.backToHomeLink = page.getByRole('link', { name: 'Back to Home' });
  }

  /**
   * Navigates directly to the Spartan Details page.
   */
  public async navigate(id: string | number): Promise<void> {
    await this.page.goto(`/web/v2/spartans/${id}`);
    await this.waitForPageReady();
    await expect(this.heading).toBeVisible();
  }

  /**
   * Retrieves the Spartan detail values currently displayed.
   */
  public async getDetails(): Promise<Spartan> {
    return {
      name: await this.nameField.inputValue(),
      gender: (await this.genderField.inputValue()) as Spartan['gender'],
      phone: await this.phoneField.inputValue(),
    };
  }

  /**
   * Asserts the displayed details match the expected Spartan entity.
   */
  public async assertDetailsMatch(expected: Spartan): Promise<void> {
    await expect(this.nameField).toHaveValue(expected.name);
    await expect(this.genderField).toHaveValue(expected.gender);
    await expect(this.phoneField).toHaveValue(expected.phone);
  }

  /**
   * Returns to the Spartans table list.
   */
  public async clickBackToList(): Promise<void> {
    await this.backToListLink.click();
    await this.waitForPageReady();
  }

  /**
   * Comprehensive validation of every individual UI element on the Spartan Details page.
   */
  public async assertAllSpartanDetailElements(expected: Spartan): Promise<void> {
    // 1. Page Title & URL
    await expect(this.page).toHaveTitle(expected.name);
    await expect(this.page).toHaveURL(/\/web\/v2\/spartans\/\d+$/);

    // 2. Navigation Bar
    await expect(this.navbarBrand).toBeVisible();
    await expect(this.navbarBrand).toContainText('Spartan Details Page');
    await expect(this.navbarBrand).toHaveAttribute('href', '/web/v2/home');
    await expect(this.navbarUnlockIcon).toBeVisible();

    // 3. Page Heading
    await expect(this.heading).toBeVisible();
    await expect(this.heading).toHaveText('Spartan Details');

    // 4. Readonly Form Controls & Values
    await expect(this.nameField).toBeVisible();
    await expect(this.nameField).toHaveAttribute('readonly', '');
    await expect(this.nameField).toHaveValue(expected.name);

    await expect(this.genderField).toBeVisible();
    await expect(this.genderField).toHaveAttribute('readonly', '');
    await expect(this.genderField).toHaveValue(expected.gender);

    await expect(this.phoneField).toBeVisible();
    await expect(this.phoneField).toHaveAttribute('readonly', '');
    await expect(this.phoneField).toHaveValue(expected.phone);

    // 5. Navigation Footer Links
    await expect(this.backToListLink).toBeVisible();
    await expect(this.backToListLink).toHaveAttribute('href', '/web/v2/spartans');

    await expect(this.backToHomeLink).toBeVisible();
    await expect(this.backToHomeLink).toHaveAttribute('href', '/web/v2/home');

    // 6. CYDEO Footer
    await this.assertFooterPresent();
  }
}
