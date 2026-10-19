import { test, expect } from '../../fixtures/test-fixtures.js';
import { SpartanDataGenerator } from '../../utilities/spartan-data-generator.js';

test.describe('Spartan Application - Complete UI Element Validation Suite @ui', { tag: '@ui' }, () => {
  test('TC-ELEM-01: Comprehensive UI element validation on Spartan Home Page', async ({
    homePage,
  }) => {
    await homePage.navigate();

    // Validates every individual component: Navbar, Hero, Banner, Links, Footer
    await homePage.assertAllHomeElements();
  });

  test('TC-ELEM-02: Comprehensive UI element validation on Spartans Table Page', async ({
    spartansPage,
  }) => {
    await spartansPage.navigate();

    // Validates Navbar, Header buttons, Badges, Filter inputs & options, Table caption, 7 Headers, Row actions, Footer
    await spartansPage.assertAllSpartansPageElements();
  });

  test('TC-ELEM-03: Comprehensive UI element validation on Add Spartan Page', async ({
    addSpartanPage,
  }) => {
    await addSpartanPage.navigate();

    // Validates Navbar, Card, Heading, Form inputs, Dropdown options, Save/Cancel buttons, Back links, Footer
    await addSpartanPage.assertAllAddSpartanElements();
  });

  test('TC-ELEM-04: Comprehensive UI element validation on Edit Spartan Page', async ({
    addSpartanPage,
    spartansPage,
    editSpartanPage,
  }) => {
    // 1. Seed a unique Spartan with Faker
    const testSpartan = SpartanDataGenerator.generateSpartanWithPrefix('ElemEdit_');
    await addSpartanPage.navigate();
    await addSpartanPage.createSpartan(testSpartan);

    // 2. Locate created Spartan and get ID
    await spartansPage.searchByName(testSpartan.name);
    const row = spartansPage.getRowByName(testSpartan.name);
    await expect(row).toBeVisible();
    const id = (await row.getByRole('cell').first().innerText()).trim();

    // 3. Navigate to Edit Page and validate every UI element & pre-populated values
    await editSpartanPage.navigate(id);
    await editSpartanPage.assertAllEditSpartanElements(testSpartan);

    // 4. Clean up test record
    await spartansPage.navigate();
    await spartansPage.searchByName(testSpartan.name);
    await spartansPage.clickDeleteSpartan(id);
  });

  test('TC-ELEM-05: Comprehensive UI element validation on Spartan Details Page', async ({
    addSpartanPage,
    spartansPage,
    spartanDetailPage,
  }) => {
    // 1. Seed a unique Spartan with Faker
    const testSpartan = SpartanDataGenerator.generateSpartanWithPrefix('ElemView_');
    await addSpartanPage.navigate();
    await addSpartanPage.createSpartan(testSpartan);

    // 2. Locate created Spartan and get ID
    await spartansPage.searchByName(testSpartan.name);
    const row = spartansPage.getRowByName(testSpartan.name);
    await expect(row).toBeVisible();
    const id = (await row.getByRole('cell').first().innerText()).trim();

    // 3. Navigate to Details View and validate all elements (labels, readonly inputs, back links, footer)
    await spartanDetailPage.navigate(id);
    await spartanDetailPage.assertAllSpartanDetailElements(testSpartan);

    // 4. Clean up test record
    await spartansPage.navigate();
    await spartansPage.searchByName(testSpartan.name);
    await spartansPage.clickDeleteSpartan(id);
  });
});
