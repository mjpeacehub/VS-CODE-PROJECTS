import { test as baseTest, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page.js';
import { SpartansPage } from '../pages/spartans.page.js';
import { AddSpartanPage } from '../pages/add-spartan.page.js';
import { EditSpartanPage } from '../pages/edit-spartan.page.js';
import { SpartanDetailPage } from '../pages/spartan-detail.page.js';
import { SpartanApiClient } from '../utilities/spartan-api-client.js';

/**
 * Custom test fixture providing pre-instantiated Page Object and API client instances.
 * Enables clean, TDD-focused test authoring without manual instantiations.
 */
type SpartanFixtures = {
  homePage: HomePage;
  spartansPage: SpartansPage;
  addSpartanPage: AddSpartanPage;
  editSpartanPage: EditSpartanPage;
  spartanDetailPage: SpartanDetailPage;
  apiClient: SpartanApiClient;
};

export const test = baseTest.extend<SpartanFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  spartansPage: async ({ page }, use) => {
    await use(new SpartansPage(page));
  },
  addSpartanPage: async ({ page }, use) => {
    await use(new AddSpartanPage(page));
  },
  editSpartanPage: async ({ page }, use) => {
    await use(new EditSpartanPage(page));
  },
  spartanDetailPage: async ({ page }, use) => {
    await use(new SpartanDetailPage(page));
  },
  apiClient: async ({ request }, use) => {
    await use(new SpartanApiClient(request));
  },
});

export { expect };
