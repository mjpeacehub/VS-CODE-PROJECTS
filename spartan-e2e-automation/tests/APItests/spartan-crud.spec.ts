import { test, expect } from '../../fixtures/api-fixtures.js';
import { SpartanDataGenerator } from '../../utilities/spartan-data-generator.js';
import { SpartanApiClient } from '../../utilities/spartan-api-client.js';
import { ResponseWrapper, SpartanDTO } from '../../models/spartan-api.model.js';

test.describe('Spartan REST API - Full CRUD Lifecycle Suite @api', { tag: '@api' }, () => {
  test('API-01: Complete CRUD lifecycle for Spartan entity (POST -> GET -> PUT -> PATCH -> DELETE)', async ({
    apiClient,
    createdSpartanIds,
  }) => {
    // ─── 1. POST: Create Spartan ──────────────────────────────────────────
    const newSpartan = SpartanDataGenerator.generateApiSpartanWithPrefix('ApiCRUD_');
    const postResponse = await apiClient.createSpartan(newSpartan);

    expect(postResponse.status()).toBe(201);
    expect(postResponse.headers()['content-type']).toContain('application/json');

    const postBody = await SpartanApiClient.parseJson<ResponseWrapper<SpartanDTO>>(postResponse);
    expect(postBody.message).toBe('Successfully created the Spartan.');
    expect(postBody.data).toBeDefined();
    expect(postBody.data?.id).toBeGreaterThan(0);
    expect(postBody.data?.name).toBe(newSpartan.name);
    expect(postBody.data?.gender).toBe(newSpartan.gender);
    expect(postBody.data?.phone).toBe(newSpartan.phone);

    const spartanId = postBody.data!.id!;
    createdSpartanIds.push(spartanId);

    // ─── 2. GET by ID: Retrieve and verify data integrity ─────────────────
    const getResponse = await apiClient.getSpartanById(spartanId);
    expect(getResponse.status()).toBe(200);

    const getBody = await SpartanApiClient.parseJson<ResponseWrapper<SpartanDTO>>(getResponse);
    expect(getBody.message).toBe('Successfully retrieved the Spartan.');
    expect(getBody.data?.id).toBe(spartanId);
    expect(getBody.data?.name).toBe(newSpartan.name);
    expect(getBody.data?.gender).toBe(newSpartan.gender);
    expect(getBody.data?.phone).toBe(newSpartan.phone);

    // ─── 3. PUT: Full Update ──────────────────────────────────────────────
    const putPayload: SpartanDTO = {
      name: `${newSpartan.name}_PutUpdated`,
      gender: newSpartan.gender === 'Male' ? 'Female' : 'Male',
      phone: '9988776655',
    };

    const putResponse = await apiClient.updateSpartan(spartanId, putPayload);
    expect(putResponse.status()).toBe(200);

    const putBody = await SpartanApiClient.parseJson<ResponseWrapper<SpartanDTO>>(putResponse);
    expect(putBody.message).toBe('Successfully updated the Spartan.');
    expect(putBody.data?.id).toBe(spartanId);
    expect(putBody.data?.name).toBe(putPayload.name);
    expect(putBody.data?.gender).toBe(putPayload.gender);
    expect(putBody.data?.phone).toBe(putPayload.phone);

    // ─── 4. PATCH: Partial Update (Name only) ─────────────────────────────
    const patchPayload = { name: `${newSpartan.name}_Patched` };
    const patchResponse = await apiClient.patchSpartan(spartanId, patchPayload);
    expect(patchResponse.status()).toBe(200);

    const patchBody = await SpartanApiClient.parseJson<ResponseWrapper<SpartanDTO>>(patchResponse);
    expect(patchBody.message).toBe('Successfully updated the Spartan.');
    expect(patchBody.data?.name).toBe(patchPayload.name);
    expect(patchBody.data?.phone).toBe(putPayload.phone); // Unchanged

    // ─── 5. DELETE: Remove the Spartan ────────────────────────────────────
    const deleteResponse = await apiClient.deleteSpartan(spartanId);
    expect(deleteResponse.status()).toBe(200);

    const deleteBody = await deleteResponse.json();
    expect(deleteBody.message).toBe('Successfully deleted the Spartan.');

    // ─── 6. GET by ID: Verify 404 after deletion ──────────────────────────
    const getAfterDelete = await apiClient.getSpartanById(spartanId);
    expect(getAfterDelete.status()).toBe(404);

    const notFoundBody = await getAfterDelete.json();
    expect(notFoundBody.httpStatus).toBe('NOT_FOUND');
  });

  test('API-02: GET /api/v2/spartans retrieves all Spartans with valid structure', async ({
    apiClient,
  }) => {
    const response = await apiClient.getAllSpartans();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.message).toBe('Successfully retrieved all the Spartans.');
    expect(body.totalElement).toBeGreaterThan(0);
    expect(body.data).toBeDefined();
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.data.length).toBeGreaterThan(0);

    // Assert structure of sample item
    const firstSpartan = body.data[0];
    expect(firstSpartan).toHaveProperty('id');
    expect(firstSpartan).toHaveProperty('name');
    expect(firstSpartan).toHaveProperty('gender');
    expect(firstSpartan).toHaveProperty('phone');
  });
});
