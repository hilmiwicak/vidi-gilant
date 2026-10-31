import { defineConfig, devices } from '@playwright/test'

const port = 5183

export default defineConfig({
  testDir: 'e2e',
  use: { baseURL: `http://localhost:${port}` },
  projects: [{ name: 'mobile-webkit', use: { ...devices['iPhone 15'] } }],
  webServer: {
    command: 'npm run dev',
    url: `http://localhost:${port}`,
    reuseExistingServer: true,
    env: { NODE_ENV: 'development' },
  },
})
