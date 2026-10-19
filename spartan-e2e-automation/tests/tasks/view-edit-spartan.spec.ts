import { test, expect } from '../../fixtures/test-fixtures.js';
import { SpartanDataGenerator } from '../../utilities/spartan-data-generator.js';

test.describe('Spartan Application - View & Edit Spartan Tests @ui', { tag: '@ui' }, () => {
  test('TC11: View Spartan details and assert data matches creation', async ({
    addSpartanPage,
    spartansPage,
    spartanDetailPage,
  }) => {
    // Generate valid Spartan data with Faker
    const spartan = SpartanDataGenerator.generateSpartanWithPrefix('View_');

    // Create Spartan
    await addSpartanPage.navigate();
    await addSpartanPage.createSpartan(spartan);

    // Search and locate created Spartan
    await spartansPage.searchByName(spartan.name);
    const row = spartansPage.getRowByName(spartan.name);
    await expect(row).toBeVisible();

    const id = (await row.locator('td').first().innerText()).trim();

    // Click View button
    await spartansPage.clickViewSpartan(id);

    // Verify Spartan Details Page values
    await spartanDetailPage.assertDetailsMatch(spartan);

    // Navigate back to the list
    await spartanDetailPage.clickBackToList();
    await expect(spartansPage.table).toBeVisible();

    // Clean up
    await spartansPage.searchByName(spartan.name);
    await spartansPage.clickDeleteSpartan(id);
  });

  test('TC12: Edit existing Spartan and verify updated values in table', async ({
    addSpartanPage,
    spartansPage,
    editSpartanPage,
  }) => {
    // Generate initial Spartan
    const initialSpartan = SpartanDataGenerator.generateSpartanWithPrefix('EditInit_');

    await addSpartanPage.navigate();
    await addSpartanPage.createSpartan(initialSpartan);

    // Find in table
    await spartansPage.searchByName(initialSpartan.name);
    const row = spartansPage.getRowByName(initialSpartan.name);
    await expect(row).toBeVisible();
    const id = (await row.locator('td').first().innerText()).trim();

    // Click Edit button
    await spartansPage.clickEditSpartan(id);

    // Generate updated values with Faker
    const updatedSpartan = SpartanDataGenerator.generateSpartanWithPrefix('EditDone_');

    // Submit update
    await editSpartanPage.updateSpartan({
      name: updatedSpartan.name,
      gender: updatedSpartan.gender,
      phone: updatedSpartan.phone,
    });

    // Verify redirected back to table
    await expect(spartansPage.table).toBeVisible();

    // Search by new name
    await spartansPage.searchByName(updatedSpartan.name);
    const updatedRow = spartansPage.getRowByName(updatedSpartan.name);
    await expect(updatedRow).toBeVisible();
    await expect(updatedRow.locator('td').nth(1)).toHaveText(updatedSpartan.name);
    await expect(updatedRow.locator('td').nth(2)).toHaveText(updatedSpartan.phone);
    await expect(updatedRow.locator('td').nth(3)).toContainText(updatedSpartan.gender);

    // Clean up
    await spartansPage.clickDeleteSpartan(id);
  });
});
