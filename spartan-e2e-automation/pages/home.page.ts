import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page.js';

/**
 * HomePage represents the landing / dashboard view of the Spartan application.
 * URL: / or /web/v2/home
 */
export class HomePage extends BasePage {
  readonly webDataLink: Locator;
  readonly addSpartanLink: Locator;
  readonly apiDocLink: Locator;
  readonly heroTitle: Locator;
  readonly bannerImage: Locator;

  constructor(page: Page) {
    super(page);
    // User-facing getByRole locators
    this.webDataLink = page.getByRole('link', { name: 'Web Data' });
    this.addSpartanLink = page.getByRole('link', { name: 'Add Spartan' });
    this.apiDocLink = page.getByRole('link', { name: 'API Doc' });
    this.heroTitle = page.getByRole('heading', { name: /Home$/, level: 1 });
    this.bannerImage = page.getByRole('img', { name: 'logo' });
  }

  /**
   * Navigates directly to the Home page.
   */
  public async navigate(): Promise<void> {
    await this.page.goto('/');
    await this.waitForPageReady();
  }

  /**
   * Navigates to the Spartans Web Data list page.
   */
  public async clickWebData(): Promise<void> {
    await this.webDataLink.click();
    await this.waitForPageReady();
  }

  /**
   * Navigates to the Add Spartan page.
   */
  public async clickAddSpartan(): Promise<void> {
    await this.addSpartanLink.click();
    await this.waitForPageReady();
  }

  /**
   * Clicks the API Doc link.
   */
  public async clickApiDoc(): Promise<void> {
    await this.apiDocLink.click();
  }

  /**
   * Asserts home page main visual elements are visible.
   */
  public async assertHomePageLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle('Spartan Home');
    await expect(this.heroTitle).toBeVisible();
    await expect(this.webDataLink).toBeVisible();
    await expect(this.addSpartanLink).toBeVisible();
    await expect(this.apiDocLink).toBeVisible();
  }

  /**
   * Comprehensive validation of every individual UI element on the Home page.
   */
  public async assertAllHomeElements(): Promise<void> {
    // 1. Page Title & URL
    await expect(this.page).toHaveTitle('Spartan Home');
    await expect(this.page).toHaveURL(/\/(web\/v2\/home)?$/);

    // 2. Navigation Bar
    await expect(this.navbarBrand).toBeVisible();
    await expect(this.navbarBrand).toContainText('Spartan Home Page');
    await expect(this.navbarBrand).toHaveAttribute('href', '/web/v2/home');
    await expect(this.navbarUnlockIcon).toBeVisible();

    // 3. Hero / Card Section
    await expect(this.bannerImage).toBeVisible();
    await expect(this.bannerImage).toHaveAttribute('alt', 'logo');
    await expect(this.heroTitle).toBeVisible();
    await expect(this.heroTitle).toContainText('Home');

    // 4. Action Links and Targets
    await expect(this.webDataLink).toBeVisible();
    await expect(this.webDataLink).toBeEnabled();
    await expect(this.webDataLink).toHaveAttribute('href', '/web/v2/spartans');

    await expect(this.addSpartanLink).toBeVisible();
    await expect(this.addSpartanLink).toBeEnabled();
    await expect(this.addSpartanLink).toHaveAttribute('href', '/web/v2/spartans/add');

    await expect(this.apiDocLink).toBeVisible();
    await expect(this.apiDocLink).toBeEnabled();
    await expect(this.apiDocLink).toHaveAttribute('href', '/swagger-ui/index.html');
    await expect(this.apiDocLink).toHaveAttribute('target', '_blank');

    // 5. Footer Validation
    await this.assertFooterPresent();
  }
}
