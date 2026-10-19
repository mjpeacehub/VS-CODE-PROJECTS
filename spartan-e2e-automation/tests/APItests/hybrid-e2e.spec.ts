import { test, expect } from '../../fixtures/test-fixtures.js';
import { SpartanDataGenerator } from '../../utilities/spartan-data-generator.js';
import { SpartanDTO } from '../../models/spartan-api.model.js';

test.describe('Spartan End-to-End Hybrid Suite (API + UI Integration) @api @hybrid', { tag: ['@api', '@hybrid'] }, () => {
  test('HYBRID-01: Seed Spartan via REST API -> Verify in Web UI -> Update via UI -> Assert via REST API', async ({
    apiClient,
    spartansPage,
    editSpartanPage,
  }) => {
    // ─── Step 1: Fast test data seeding via REST API ───────────────────────
    const seededSpartan = SpartanDataGenerator.generateApiSpartanWithPrefix('Hyb_');
    const apiCreateRes = await apiClient.createSpartan(seededSpartan);
    expect(apiCreateRes.status()).toBe(201);

    const createBody = await apiCreateRes.json();
    const spartanId: number = createBody.data.id;
    expect(spartanId).toBeGreaterThan(0);

    try {
      // ─── Step 2: Navigate to Web UI table and locate created Spartan ───────
      await spartansPage.navigate();
      await spartansPage.searchByName(seededSpartan.name);

      const row = spartansPage.getRowByName(seededSpartan.name);
      await expect(row).toBeVisible();

      // Assert row data matches the seeded entity
      const rowData = await spartansPage.getSpartanRowData(spartanId);
      expect(rowData).not.toBeNull();
      expect(rowData?.name).toBe(seededSpartan.name);
      expect(rowData?.phone).toBe(seededSpartan.phone);

      // ─── Step 3: Edit Spartan via Web UI form ──────────────────────────────
      await spartansPage.clickEditSpartan(spartanId);

      const updatedName = `${seededSpartan.name}_UIUpd`;
      const updatedPhone = '9998887777';

      await editSpartanPage.updateSpartan({
        name: updatedName,
        phone: updatedPhone,
      });

      // ─── Step 4: Verify database update directly via REST API ──────────────
      const apiGetRes = await apiClient.getSpartanById(spartanId);
      expect(apiGetRes.status()).toBe(200);

      const apiGetBody = await apiGetRes.json();
      const updatedApiData = apiGetBody.data as SpartanDTO;
      expect(updatedApiData.name).toBe(updatedName);
      expect(updatedApiData.phone).toBe(updatedPhone);
    } finally {
      // ─── Step 5: Clean up record via REST API ──────────────────────────────
      await apiClient.deleteSpartan(spartanId);

      // Verify deletion
      const checkDeleted = await apiClient.getSpartanById(spartanId);
      expect(checkDeleted.status()).toBe(404);
    }
  });
});
