import { test, expect } from '../../fixtures/test-fixtures.js';
import { SpartanDataGenerator } from '../../utilities/spartan-data-generator.js';

test.describe('Spartan Application - Add Spartan Tests @ui', { tag: '@ui' }, () => {
  test.beforeEach(async ({ addSpartanPage }) => {
    await addSpartanPage.navigate();
  });

  test('TC04: Successfully create a new Male Spartan with Faker mock data', async ({
    addSpartanPage,
    spartansPage,
    page,
  }) => {
    // Generate valid random male Spartan data with Faker
    const newSpartan = SpartanDataGenerator.generateSpartanWithPrefix('AutoM_', 'MALE');

    // Fill form and submit
    await addSpartanPage.createSpartan(newSpartan);

    // Verify redirected to /web/v2/spartans
    await expect(page).toHaveURL(/\/web\/v2\/spartans$/);

    // Filter table by the created unique Spartan name
    await spartansPage.searchByName(newSpartan.name);

    // Assert the Spartan appears in the table
    const row = spartansPage.getRowByName(newSpartan.name);
    await expect(row).toBeVisible();
    await expect(row.locator('td').nth(1)).toHaveText(newSpartan.name);
    await expect(row.locator('td').nth(2)).toHaveText(newSpartan.phone);
    await expect(row.locator('td').nth(3)).toContainText('MALE');
  });

  test('TC05: Successfully create a new Female Spartan with Faker mock data', async ({
    addSpartanPage,
    spartansPage,
    page,
  }) => {
    // Generate valid random female Spartan data with Faker
    const newSpartan = SpartanDataGenerator.generateSpartanWithPrefix('AutoF_', 'FEMALE');

    // Fill form and submit
    await addSpartanPage.createSpartan(newSpartan);

    // Verify redirected to /web/v2/spartans
    await expect(page).toHaveURL(/\/web\/v2\/spartans$/);

    // Filter table by the created unique Spartan name
    await spartansPage.searchByName(newSpartan.name);

    // Assert the Spartan appears in the table
    const row = spartansPage.getRowByName(newSpartan.name);
    await expect(row).toBeVisible();
    await expect(row.locator('td').nth(1)).toHaveText(newSpartan.name);
    await expect(row.locator('td').nth(2)).toHaveText(newSpartan.phone);
    await expect(row.locator('td').nth(3)).toContainText('FEMALE');
  });

  test('TC06: Cancel Spartan creation returns to Spartans table without creating', async ({
    addSpartanPage,
    page,
  }) => {
    const dummySpartan = SpartanDataGenerator.generateValidSpartan();

    // Fill in fields but cancel
    await addSpartanPage.fillForm(dummySpartan);
    await addSpartanPage.clickCancel();

    // Verify redirected back to table
    await expect(page).toHaveURL(/\/web\/v2\/spartans$/);
  });
});
