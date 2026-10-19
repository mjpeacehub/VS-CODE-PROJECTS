import { test, expect } from '../../fixtures/api-fixtures.js';

test.describe('Spartan REST API - Healthcheck & Greeting Suite @api', { tag: '@api' }, () => {
  test('API-11: GET /api/v2/hello healthcheck returns 200 OK and greeting message', async ({
    apiClient,
  }) => {
    const response = await apiClient.getHello();

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/plain');

    const text = await response.text();
    expect(text.trim()).toBe('Hello World!');
  });
});
