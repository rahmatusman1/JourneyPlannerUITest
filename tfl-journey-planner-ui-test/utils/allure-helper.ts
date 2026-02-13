import { test as baseTest, Metadata, Page, TestInfo } from '@playwright/test';

/**
 * Interface for the Allure object that will be passed to tests
 */
export interface AllureHelper {
  addMetadata(options: {
    feature?: string;
    story?: string;
    severity?: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial';
  }): void;
  step<T>(name: string, callback: () => Promise<T>): Promise<T>;
  screenshot(name: string, page: Page): Promise<void>;
}

/**
 * Wrapper for Allure annotations
 */
export const allureHelper = {
  /**
   * Add essential test metadata in one call
   */
  addMetadata(testInfo: TestInfo, options: {
    feature?: string;
    story?: string;
    severity?: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial';
  }) {
    if (options.feature) {
      testInfo.annotations.push({ type: 'feature', description: options.feature });
    }
    if (options.story) {
      testInfo.annotations.push({ type: 'story', description: options.story });
    }
    if (options.severity) {
      testInfo.annotations.push({ type: 'severity', description: options.severity });
    }
  },

  async step<T>(testInfo: TestInfo, name: string, callback: () => Promise<T>): Promise<T> {
    // Simple implementation that just runs the callback
    console.log(`STEP: ${name}`);
    return await callback();
  },

  async screenshot(testInfo: TestInfo, name: string, page: Page) {
    // Save the screenshot to disk
    const path = `./screenshots/${name.replace(/\s+/g, '-')}-${Date.now()}.png`;
    await page.screenshot({ path });

    // Attach the screenshot to the test report with a simple string type
    await testInfo.attach(name, { path, contentType: 'image/png' });
  }
};

export const test = baseTest.extend<{ allure: AllureHelper }>({
  allure: async ({ }, use, testInfo) => {
    const allureObj = {
      addMetadata: (options: Metadata) => allureHelper.addMetadata(testInfo, options),
      step: async <T>(name: string, callback: () => Promise<T>): Promise<T> =>
        await allureHelper.step(testInfo, name, callback),
      screenshot: async (name: string, page: Page) =>
        await allureHelper.screenshot(testInfo, name, page)
    };

    await use(allureObj);
  }
});