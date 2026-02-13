import { defineConfig, devices } from '@playwright/test';
import { ENV } from './utils/env';

export default defineConfig({
  testDir: './tests',
  snapshotPathTemplate: '{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}-{projectName}-{platform}.png',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry tests */
  retries: ENV.retries,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['allure-playwright', {
      detail: false,  // Reduce verbosity
      outputFolder: 'allure-results',
      suiteTitle: false  // Don't add extra titles
    }], ['html', { open: 'never' }]
  ],
  /*report slow test. */
   reportSlowTests: null,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout: 200000, // Global timeout
  expect: {
    timeout: 30000, // Timeout for expect assertions
  },
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // Note: We're using the base URL in our BasePage class instead
    baseURL: ENV.baseUrl,

    /* Disable trace collection to avoid creating test-results folder */
    trace: 'off',

    /* Disable screenshot capture to avoid creating test-results folder */
    screenshot: 'only-on-failure',

    /* Turn on video recording for every test  creating test-results folder */
    video: 'on',

    /* Automatically wait for elements to be visible before interacting with them */
    actionTimeout: 120000,
    navigationTimeout: 40000,
    contextOptions: {
      // Prevent immediate context closure
      reducedMotion: 'reduce',
      viewport: { width: 1920, height: 1080 },
    },
    launchOptions: {
      slowMo: 500, // Add small delays between actions
    },
    ignoreHTTPSErrors: true
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ]
});