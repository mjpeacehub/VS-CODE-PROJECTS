import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage encapsulates common UI elements and actions across the Spartan app.
 * All specific page classes inherit from BasePage.
 */
export abstract class BasePage {
  readonly page: Page;
  readonly navbarBrand: Locator;
  readonly footerCopyright: Locator;
  readonly footerMotto: Locator;
  readonly navbarUnlockIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    // Using Playwright getByRole and getByText methods
    this.navbarBrand = page.getByRole('navigation').getByRole('link').first();
    this.navbarUnlockIcon = page.locator('nav.navbar i.fa-unlock');
    this.footerMotto = page.getByText('A Spartan will never give up!');
    this.footerCopyright = page.getByText(/CYDEO/i);
  }

  /**
   * Waits for the page DOM and network to reach idle state.
   */
  public async waitForPageReady(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Returns the current page title.
   */
  public async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Returns current URL.
   */
  public getUrl(): string {
    return this.page.url();
  }

  /**
   * Clicks the brand link in the top navbar to navigate back home.
   */
  public async clickNavbarBrand(): Promise<void> {
    await this.navbarBrand.click();
    await this.waitForPageReady();
  }

  /**
   * Asserts common page title.
   */
  public async assertTitle(expectedTitle: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  /**
   * Asserts footer copyright visibility and text.
   */
  public async assertFooterPresent(): Promise<void> {
    await expect(this.footerMotto).toContainText('A Spartan will never give up!');
    await expect(this.footerCopyright).toContainText('CYDEO');
  }
}
