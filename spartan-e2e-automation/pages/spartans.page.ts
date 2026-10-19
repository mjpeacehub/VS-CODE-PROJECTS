import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page.js';
import { SpartanTableRow } from '../models/spartan.model.js';

/**
 * SpartansPage represents the Web Data table view listing all Spartans.
 * URL: /web/v2/spartans
 */
export class SpartansPage extends BasePage {
  readonly addSpartanButton: Locator;
  readonly backToHomeButton: Locator;
  readonly totalBadge: Locator;
  readonly filteredCountBadge: Locator;
  readonly nameFilterInput: Locator;
  readonly genderFilterDropdown: Locator;
  readonly searchButton: Locator;
  readonly clearButton: Locator;
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly tableHeader: Locator;
  readonly caption: Locator;

  constructor(page: Page) {
    super(page);
    // User-facing Playwright getBy* locators
    this.addSpartanButton = page.getByRole('link', { name: 'Add Spartan' });
    this.backToHomeButton = page.getByRole('link', { name: 'Back to Home' });
    this.totalBadge = page.getByText(/Total:/i);
    this.nameFilterInput = page.getByPlaceholder('Name Contains...');
    this.genderFilterDropdown = page.getByLabel('Gender:');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.clearButton = page.getByRole('button', { name: 'Clear' });
    this.table = page.getByRole('table');
    this.tableRows = this.table.locator('tbody tr');
    this.tableHeader = this.table.locator('thead tr');
    this.caption = page.locator('#caption');

    // CSS locator fallback for span without accessible label or role
    this.filteredCountBadge = page.locator('#total_up_count');
  }

  /**
   * Direct navigation to Spartans list
   */
  public async navigate(): Promise<void> {
    await this.page.goto('/web/v2/spartans');
    await this.waitForPageReady();
    await expect(this.table).toBeVisible();
  }

  /**
   * Retrieves the integer count from the 'Total: X' badge.
   */
  public async getTotalCount(): Promise<number> {
    const text = (await this.totalBadge.textContent()) || '';
    const match = text.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  /**
   * Retrieves the integer count from the 'Filtered Result Number' indicator.
   */
  public async getFilteredCount(): Promise<number> {
    const text = (await this.filteredCountBadge.textContent()) || '0';
    return parseInt(text.trim(), 10) || 0;
  }

  /**
   * Searches the table by name using the search bar.
   */
  public async searchByName(name: string): Promise<void> {
    await this.nameFilterInput.fill(name);
    await this.searchButton.click();
    await this.page.waitForTimeout(300); // Wait for client-side filter function
  }

  /**
   * Filters the table by gender ('Male' | 'Female').
   */
  public async filterByGender(gender: 'Male' | 'Female'): Promise<void> {
    await this.genderFilterDropdown.selectOption(gender);
    await this.searchButton.click();
    await this.page.waitForTimeout(300);
  }

  /**
   * Performs combined search by name and gender.
   */
  public async search(name: string, gender?: 'Male' | 'Female'): Promise<void> {
    await this.nameFilterInput.fill(name);
    if (gender) {
      await this.genderFilterDropdown.selectOption(gender);
    }
    await this.searchButton.click();
    await this.page.waitForTimeout(300);
  }

  /**
   * Resets table filters by clicking Clear.
   */
  public async clearFilters(): Promise<void> {
    await this.clearButton.click();
    await this.page.waitForTimeout(300);
  }

  /**
   * Clicks 'Add Spartan' button from header.
   */
  public async clickAddSpartan(): Promise<void> {
    await this.addSpartanButton.click();
    await this.waitForPageReady();
  }

  /**
   * Clicks 'Back to Home' button.
   */
  public async clickBackToHome(): Promise<void> {
    await this.backToHomeButton.click();
    await this.waitForPageReady();
  }

  /**
   * Returns a Locator for a specific row matching Spartan name using getByRole('cell').
   */
  public getRowByName(name: string): Locator {
    return this.tableRows.filter({
      has: this.page.getByRole('cell', { name, exact: false }),
    });
  }

  /**
   * Returns a Locator for a specific row matching Spartan ID using getByRole('cell').
   */
  public getRowById(id: string | number): Locator {
    return this.tableRows.filter({
      has: this.page.getByRole('cell', { name: String(id), exact: true }),
    });
  }

  /**
   * Checks whether a Spartan with the given name is visible in the table.
   */
  public async isSpartanPresent(name: string): Promise<boolean> {
    const row = this.getRowByName(name).first();
    return (await row.count()) > 0 && (await row.isVisible());
  }

  /**
   * Extracts data from a table row by Spartan ID using getByRole('cell').
   */
  public async getSpartanRowData(id: string | number): Promise<SpartanTableRow | null> {
    const row = this.getRowById(id);
    if ((await row.count()) === 0) return null;

    const cells = row.getByRole('cell');
    return {
      id: (await cells.nth(0).innerText()).trim(),
      name: (await cells.nth(1).innerText()).trim(),
      phone: (await cells.nth(2).innerText()).trim(),
      gender: (await cells.nth(3).innerText()).trim(),
    };
  }

  /**
   * Clicks the 'View' button for a Spartan by ID using getByRole with ID fallback.
   */
  public async clickViewSpartan(id: string | number): Promise<void> {
    const row = this.getRowById(id);
    if ((await row.count()) > 0 && (await row.getByRole('link').count()) >= 1) {
      await row.getByRole('link').nth(0).click();
    } else {
      // Fallback to CSS ID locator
      await this.page.locator(`#view_spartan_${id}`).click();
    }
    await this.waitForPageReady();
  }

  /**
   * Clicks the 'Edit' button for a Spartan by ID using getByRole with ID fallback.
   */
  public async clickEditSpartan(id: string | number): Promise<void> {
    const row = this.getRowById(id);
    if ((await row.count()) > 0 && (await row.getByRole('link').count()) >= 2) {
      await row.getByRole('link').nth(1).click();
    } else {
      // Fallback to CSS ID locator
      await this.page.locator(`#edit_spartan_${id}`).click();
    }
    await this.waitForPageReady();
  }

  /**
   * Clicks the 'Delete' button for a Spartan by ID using getByRole with ID fallback.
   */
  public async clickDeleteSpartan(id: string | number): Promise<void> {
    const row = this.getRowById(id);
    if ((await row.count()) > 0 && (await row.getByRole('link').count()) >= 3) {
      await row.getByRole('link').nth(2).click();
    } else {
      // Fallback to CSS ID locator
      await this.page.locator(`#delete_spartan_${id}`).click();
    }
    await this.waitForPageReady();
  }

  /**
   * Gets the total count of currently visible rows in the table.
   */
  public async getVisibleRowCount(): Promise<number> {
    return this.tableRows.locator('visible=true').count();
  }

  /**
   * Comprehensive validation of every individual UI element on the Spartans list page.
   */
  public async assertAllSpartansPageElements(): Promise<void> {
    // 1. Page Title & URL
    await expect(this.page).toHaveTitle('All Spartan');
    await expect(this.page).toHaveURL(/\/web\/v2\/spartans$/);

    // 2. Navigation Bar
    await expect(this.navbarBrand).toBeVisible();
    await expect(this.navbarBrand).toContainText('Spartan List');
    await expect(this.navbarBrand).toHaveAttribute('href', '/web/v2/home');
    await expect(this.navbarUnlockIcon).toBeVisible();

    // 3. Header Action Buttons and Count Badges
    await expect(this.addSpartanButton).toBeVisible();
    await expect(this.addSpartanButton).toBeEnabled();
    await expect(this.addSpartanButton).toHaveAttribute('href', '/web/v2/spartans/add');

    await expect(this.backToHomeButton).toBeVisible();
    await expect(this.backToHomeButton).toBeEnabled();
    await expect(this.backToHomeButton).toHaveAttribute('href', '/web/v2/home');

    await expect(this.totalBadge).toBeVisible();
    await expect(this.totalBadge).toContainText(/Total:\s*\d+/i);
    await expect(this.filteredCountBadge).toBeVisible();

    // 4. Search & Filter Bar Controls
    await expect(this.nameFilterInput).toBeVisible();
    await expect(this.nameFilterInput).toBeEditable();
    await expect(this.nameFilterInput).toHaveAttribute('placeholder', 'Name Contains...');

    await expect(this.genderFilterDropdown).toBeVisible();
    await expect(this.genderFilterDropdown).toBeEnabled();

    // Assert gender dropdown options
    const genderOptions = this.genderFilterDropdown.locator('option');
    await expect(genderOptions).toHaveCount(3);
    await expect(genderOptions.nth(0)).toHaveText('Select Gender');
    await expect(genderOptions.nth(1)).toHaveText('Male');
    await expect(genderOptions.nth(2)).toHaveText('Female');

    await expect(this.searchButton).toBeVisible();
    await expect(this.searchButton).toBeEnabled();

    await expect(this.clearButton).toBeVisible();
    await expect(this.clearButton).toBeEnabled();

    // 5. Data Table, Caption, and Columns
    await expect(this.table).toBeVisible();
    await expect(this.caption).toBeVisible();
    await expect(this.caption).toContainText(/Total returned\s*:\s*\d+/i);

    const columnHeaders = this.tableHeader.getByRole('columnheader');
    await expect(columnHeaders).toHaveCount(7);
    await expect(columnHeaders).toHaveText([
      'ID',
      'Name',
      'Phone',
      'Gender',
      'View',
      'Edit',
      'Delete',
    ]);

    // 6. Validate First Table Row Elements (if table has rows)
    if ((await this.tableRows.count()) > 0) {
      const firstRow = this.tableRows.first();
      const cells = firstRow.getByRole('cell');
      await expect(cells).toHaveCount(7);

      // Verify action buttons inside first row
      const actionLinks = firstRow.getByRole('link');
      await expect(actionLinks).toHaveCount(3); // View, Edit, Delete
    }

    // 7. Footer Validation
    await this.assertFooterPresent();
  }
}
