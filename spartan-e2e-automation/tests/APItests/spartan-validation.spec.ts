import { test, expect } from '../../fixtures/api-fixtures.js';
import { SpartanApiClient } from '../../utilities/spartan-api-client.js';
import { ExceptionWrapper } from '../../models/spartan-api.model.js';

test.describe('Spartan REST API - Negative & Validation Testing Suite @api', { tag: '@api' }, () => {
  test('API-07: POST /api/v2/spartans rejects phone with fewer than 10 digits (400 Bad Request)', async ({
    apiClient,
  }) => {
    const invalidPayload = {
      name: 'ValidName',
      gender: 'Male',
      phone: '12345', // only 5 digits
    };

    const response = await apiClient.createSpartan(invalidPayload);
    expect(response.status()).toBe(400);

    const body = await SpartanApiClient.parseJson<ExceptionWrapper>(response);
    expect(body.httpStatus).toBe('BAD_REQUEST');
    expect(body.errorCount).toBeGreaterThanOrEqual(1);
    expect(body.validationExceptions).toBeDefined();

    const phoneError = body.validationExceptions?.find((e) => e.errorField === 'phone');
    expect(phoneError).toBeDefined();
    expect(phoneError?.reason).toContain('10 to 13 characters');
  });

  test('API-08: POST /api/v2/spartans rejects empty name (400 Bad Request)', async ({
    apiClient,
  }) => {
    const invalidPayload = {
      name: '',
      gender: 'Female',
      phone: '1234567890',
    };

    const response = await apiClient.createSpartan(invalidPayload);
    expect(response.status()).toBe(400);

    const body = await SpartanApiClient.parseJson<ExceptionWrapper>(response);
    expect(body.httpStatus).toBe('BAD_REQUEST');

    const nameError = body.validationExceptions?.find((e) => e.errorField === 'name');
    expect(nameError).toBeDefined();
    expect(nameError?.reason).toContain('name is required');
  });

  test('API-09: GET /api/v2/spartans/{id} returns 404 for non-existent ID', async ({
    apiClient,
  }) => {
    const nonExistentId = 99999999;
    const response = await apiClient.getSpartanById(nonExistentId);
    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body.httpStatus).toBe('NOT_FOUND');
    expect(body.message).toContain('could not be found');
  });

  test('API-10: DELETE /api/v2/spartans/{id} returns 404 for non-existent ID', async ({
    apiClient,
  }) => {
    const nonExistentId = 99999999;
    const response = await apiClient.deleteSpartan(nonExistentId);
    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body.httpStatus).toBe('NOT_FOUND');
  });
});
