import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

const baseURL = process.env.BASE_URL || 'https://spartan-app-new-nonsecure.onrender.com';

export default defineConfig({
  testDir: './tests',
  timeout: parseInt(process.env.DEFAULT_TIMEOUT || '45000', 10),
  expect: {
    timeout: parseInt(process.env.EXPECT_TIMEOUT || '10000', 10),
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['./utilities/comprehensive-reporter.ts'],
  ],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: 'api',
      testDir: './tests/APItests',
      testMatch: /.*\.spec\.ts/,
    },
    {
      name: 'chromium',
      testDir: './tests/tasks',
      testMatch: /.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testDir: './tests/tasks',
      testMatch: /.*\.spec\.ts/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testDir: './tests/tasks',
      testMatch: /.*\.spec\.ts/,
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
