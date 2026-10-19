import { test, expect } from '../../fixtures/test-fixtures.js';
import { SpartanDataGenerator } from '../../utilities/spartan-data-generator.js';

test.describe('Spartan Application - Spartans Table & Filtering Tests @ui', { tag: '@ui' }, () => {
  test.beforeEach(async ({ spartansPage }) => {
    await spartansPage.navigate();
  });

  test('TC07: Verify Spartans table columns, headers, and total count badge', async ({ spartansPage }) => {
    // Assert table headers using getByRole('columnheader')
    const headerCols = spartansPage.tableHeader.getByRole('columnheader');
    await expect(headerCols).toHaveText([
      'ID',
      'Name',
      'Phone',
      'Gender',
      'View',
      'Edit',
      'Delete',
    ]);

    // Assert total count badge has positive count
    const totalCount = await spartansPage.getTotalCount();
    expect(totalCount).toBeGreaterThan(0);

    // Assert filtered count equals total on initial load
    const filteredCount = await spartansPage.getFilteredCount();
    expect(filteredCount).toBe(totalCount);
  });

  test('TC08: Verify search functionality filters rows matching name substring', async ({
    addSpartanPage,
    spartansPage,
  }) => {
    // Seed a known unique Spartan to guarantee a match
    const uniquePrefix = `Srch_${Date.now().toString().slice(-4)}_`;
    const seededSpartan = SpartanDataGenerator.generateSpartanWithPrefix(uniquePrefix);

    await addSpartanPage.navigate();
    await addSpartanPage.createSpartan(seededSpartan);

    // Search by prefix
    await spartansPage.searchByName(uniquePrefix);

    // Filtered count should be at least 1
    const filteredCount = await spartansPage.getFilteredCount();
    expect(filteredCount).toBeGreaterThanOrEqual(1);

    // Target row must be visible
    const row = spartansPage.getRowByName(seededSpartan.name);
    await expect(row).toBeVisible();

    // Clean up
    const id = (await row.locator('td').first().innerText()).trim();
    await spartansPage.clickDeleteSpartan(id);
  });

  test('TC09: Verify gender filter correctly displays only selected gender rows', async ({
    spartansPage,
  }) => {
    // Filter by 'Female'
    await spartansPage.filterByGender('Female');

    const filteredCount = await spartansPage.getFilteredCount();
    expect(filteredCount).toBeGreaterThan(0);

    // Inspect visible rows to assert gender cell matches 'FEMALE'
    const visibleRows = spartansPage.tableRows.locator('visible=true');
    const rowCount = await visibleRows.count();
    const sampleSize = Math.min(rowCount, 10); // check first 10 for performance

    for (let i = 0; i < sampleSize; i++) {
      const genderText = await visibleRows.nth(i).locator('td').nth(3).innerText();
      expect(genderText.trim().toUpperCase()).toBe('FEMALE');
    }
  });

  test('TC10: Verify Clear button resets all search and gender filters', async ({
    spartansPage,
  }) => {
    const initialTotal = await spartansPage.getTotalCount();

    // Apply restrictive filter
    await spartansPage.search('NonExistentNameXYZ123', 'Male');
    const filteredCount = await spartansPage.getFilteredCount();
    expect(filteredCount).toBe(0);

    // Reset filters
    await spartansPage.clearFilters();

    // Verify counts are restored
    const restoredFilteredCount = await spartansPage.getFilteredCount();
    expect(restoredFilteredCount).toBe(initialTotal);
    await expect(spartansPage.nameFilterInput).toHaveValue('');
  });
});
