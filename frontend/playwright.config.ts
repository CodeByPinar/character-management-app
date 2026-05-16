import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: {
    timeout: 8_000,
  },
  use: {
    baseURL: 'http://localhost:3100',
    trace: 'on-first-retry',
  },
  webServer: [
    {
      command: 'npm run start --prefix ../backend',
      url: 'http://localhost:3001/graphql',
      reuseExistingServer: true,
      timeout: 60_000,
    },
    {
      command: 'npm run dev -- -H localhost -p 3100',
      url: 'http://localhost:3100',
      reuseExistingServer: true,
      timeout: 60_000,
    },
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
