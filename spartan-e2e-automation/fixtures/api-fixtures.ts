import { test as baseTest, expect, APIRequestContext } from '@playwright/test';
import { SpartanApiClient } from '../utilities/spartan-api-client.js';

type ApiTestFixtures = {
  apiClient: SpartanApiClient;
  createdSpartanIds: number[];
};

export const test = baseTest.extend<ApiTestFixtures>({
  apiClient: async ({ request }, use) => {
    const client = new SpartanApiClient(request);
    await use(client);
  },

  createdSpartanIds: async ({ apiClient }, use) => {
    const ids: number[] = [];
    await use(ids);

    // Auto-clean any Spartans created during the test
    for (const id of ids) {
      try {
        await apiClient.deleteSpartan(id);
      } catch (err) {
        // Ignored if already deleted
      }
    }
  },
});

export { expect };
