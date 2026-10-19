import { test, expect } from '../../fixtures/api-fixtures.js';
import { SpartanDataGenerator } from '../../utilities/spartan-data-generator.js';
import { SpartanApiClient } from '../../utilities/spartan-api-client.js';
import { SpartanDTO } from '../../models/spartan-api.model.js';

test.describe('Spartan REST API - Query Parameter Search Suite @api', { tag: '@api' }, () => {
  test('API-03: Search Spartans by nameContains parameter', async ({
    apiClient,
    createdSpartanIds,
  }) => {
    // 1. Seed a unique Spartan
    const uniquePrefix = `SrchApi_${Date.now().toString().slice(-4)}_`;
    const targetSpartan = SpartanDataGenerator.generateApiSpartanWithPrefix(uniquePrefix);
    const createRes = await apiClient.createSpartan(targetSpartan);
    expect(createRes.status()).toBe(201);
    const createdData = (await createRes.json()).data as SpartanDTO;
    createdSpartanIds.push(createdData.id!);

    // 2. Search using prefix
    const searchRes = await apiClient.searchSpartans({ nameContains: uniquePrefix });
    expect(searchRes.status()).toBe(200);

    const searchBody = await searchRes.json();
    expect(searchBody.message).toBe('Successfully queried all the Spartans.');
    expect(searchBody.totalElement).toBeGreaterThanOrEqual(1);
    expect(Array.isArray(searchBody.data)).toBeTruthy();

    // Verify all returned Spartans contain the search query substring
    const found = (searchBody.data as SpartanDTO[]).find((s) => s.id === createdData.id);
    expect(found).toBeDefined();
    expect(found?.name).toBe(targetSpartan.name);
  });

  test('API-04: Search Spartans by gender parameter (Male / Female)', async ({
    apiClient,
  }) => {
    // Search for Male Spartans
    const maleRes = await apiClient.searchSpartans({ gender: 'Male' });
    expect(maleRes.status()).toBe(200);

    const maleBody = await maleRes.json();
    expect(maleBody.totalElement).toBeGreaterThan(0);
    const sampleMales: SpartanDTO[] = maleBody.data.slice(0, 10);
    for (const m of sampleMales) {
      expect(m.gender).toBe('Male');
    }

    // Search for Female Spartans
    const femaleRes = await apiClient.searchSpartans({ gender: 'Female' });
    expect(femaleRes.status()).toBe(200);

    const femaleBody = await femaleRes.json();
    expect(femaleBody.totalElement).toBeGreaterThan(0);
    const sampleFemales: SpartanDTO[] = femaleBody.data.slice(0, 10);
    for (const f of sampleFemales) {
      expect(f.gender).toBe('Female');
    }
  });

  test('API-05: Combined search with nameContains and gender', async ({
    apiClient,
    createdSpartanIds,
  }) => {
    const uniquePrefix = `Comb_${Date.now().toString().slice(-4)}_`;
    const targetSpartan = SpartanDataGenerator.generateApiSpartanWithPrefix(uniquePrefix, 'Female');
    const createRes = await apiClient.createSpartan(targetSpartan);
    expect(createRes.status()).toBe(201);
    const createdData = (await createRes.json()).data as SpartanDTO;
    createdSpartanIds.push(createdData.id!);

    // Combined search matching both
    const searchRes = await apiClient.searchSpartans({
      nameContains: uniquePrefix,
      gender: 'Female',
    });
    expect(searchRes.status()).toBe(200);

    const body = await searchRes.json();
    expect(body.totalElement).toBeGreaterThanOrEqual(1);
    const item = (body.data as SpartanDTO[]).find((s) => s.id === createdData.id);
    expect(item).toBeDefined();
    expect(item?.gender).toBe('Female');
  });

  test('API-06: Search with nonexistent name returns empty result set', async ({
    apiClient,
  }) => {
    const searchRes = await apiClient.searchSpartans({
      nameContains: 'NonExistent_Unique_Query_987654321',
    });
    expect(searchRes.status()).toBe(200);

    const body = await searchRes.json();
    expect(body.totalElement).toBe(0);
    expect(body.data).toEqual([]);
  });
});
