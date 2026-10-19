import { test, expect } from '../../fixtures/test-fixtures.js';
import { SpartanDataGenerator } from '../../utilities/spartan-data-generator.js';

test.describe('Spartan Application - Delete Spartan Tests @ui', { tag: '@ui' }, () => {
  test('TC13: Successfully delete a Spartan and verify removal from table', async ({
    addSpartanPage,
    spartansPage,
  }) => {
    // Generate and create a unique Spartan
    const targetSpartan = SpartanDataGenerator.generateSpartanWithPrefix('ToDel_');

    await addSpartanPage.navigate();
    await addSpartanPage.createSpartan(targetSpartan);

    // Verify presence in table
    await spartansPage.searchByName(targetSpartan.name);
    const targetRow = spartansPage.getRowByName(targetSpartan.name);
    await expect(targetRow).toBeVisible();

    const id = (await targetRow.locator('td').first().innerText()).trim();

    // Delete the Spartan
    await spartansPage.clickDeleteSpartan(id);

    // Verify redirected back to table
    await expect(spartansPage.table).toBeVisible();

    // Re-search and verify Spartan is no longer in table
    await spartansPage.searchByName(targetSpartan.name);
    const countAfterDelete = await spartansPage.getFilteredCount();
    expect(countAfterDelete).toBe(0);

    const isStillPresent = await spartansPage.isSpartanPresent(targetSpartan.name);
    expect(isStillPresent).toBeFalsy();
  });
});
