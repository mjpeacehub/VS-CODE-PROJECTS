import { test, expect } from '../../fixtures/test-fixtures.js';

test.describe('Spartan Application - Home Dashboard Tests @ui', { tag: '@ui' }, () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
  });

  test('TC01: Verify Home Page loads with title, hero header, and CYDEO footer', async ({ homePage }) => {
    // Assert title
    await homePage.assertTitle('Spartan Home');

    // Assert main elements are loaded
    await homePage.assertHomePageLoaded();

    // Assert CYDEO footer and motto
    await homePage.assertFooterPresent();
  });

  test('TC02: Verify navigation from Home Page to Spartans Web Data', async ({ homePage, page }) => {
    await homePage.clickWebData();

    // Assert URL has transitioned to /web/v2/spartans
    await expect(page).toHaveURL(/\/web\/v2\/spartans$/);
    await expect(page).toHaveTitle('All Spartan');
  });

  test('TC03: Verify navigation from Home Page to Add Spartan Form', async ({ homePage, page }) => {
    await homePage.clickAddSpartan();

    // Assert URL has transitioned to /web/v2/spartans/add
    await expect(page).toHaveURL(/\/web\/v2\/spartans\/add$/);
    await expect(page).toHaveTitle('Add New Spartan');
  });
});
