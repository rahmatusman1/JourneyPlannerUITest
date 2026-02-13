import { Page } from '@playwright/test';
import { ENV } from '../utils/env';

/**
 * Handles browser context
 * @template T - The type of locators used by the page object
 */
export class BaseClass<T> {
  protected page: Page;
  public locators: T;
  protected baseUrl;
  private pages: Map<number, Page> = new Map();

  constructor(page: Page, locators: T) {
    this.page = page;
    this.locators = locators;
    this.baseUrl = ENV.baseUrl;
    this.pages.set(0, page); // Store initial page as tab 0
  }

  /**
   * Navigate to a specific URL path
   * @param path - The URL path to navigate to (e.g., '/plan-a-journey')
   * @returns A promise that resolves when navigation is complete
   * @throws Error if navigation fails
   */
  async goToURL(path: string = ''): Promise<void> {
    try {
      const response = await this.page.goto(`${this.baseUrl}${path}`);
      if (!response) {
        throw new Error(`Navigation to ${this.baseUrl}${path} failed with no response`);
      }
      if (!response.ok()) {
        throw new Error(`Navigation to ${this.baseUrl}${path} failed with status ${response.status()}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Navigation error: ${error.message}`);
      } else {
        console.error('Navigation error: Unknown error');
      }
      throw error;
    }
  }

  /**
   * Close the current page
   * @returns A promise that resolves when the page is closed
   */
  async closePage(): Promise<void> {
    await this.page.close();
  }

  /**
   * Wait for navigation to complete
   */
  async waitForNavigation(): Promise<void> {
    await this.page.waitForLoadState('load');
  }

  /**
   * Execute an action with an Allure step
   * @param stepName - The name of the step to display in reports
   * @param action - The async function to execute as part of this step
   * @param allureOrTestInfo - Optional Allure or TestInfo object for reporting
   * @returns The result of the action
   * @throws Any error that occurs during the action execution
   */
  async withStep<R>(
    stepName: string,
    action: () => Promise<R>,
    allureOrTestInfo?: any
  ): Promise<R> {
    try {
      if (allureOrTestInfo && allureOrTestInfo.step && typeof allureOrTestInfo.step === 'function') {
        return await allureOrTestInfo.step(stepName, action);
      }
      // If no testInfo or it doesn't have a step method, just run the action
      return await action();
    } catch (error: unknown) {
      // Log the error with proper type checking
      if (error instanceof Error) {
        console.error(`Error in step '${stepName}': ${error.message}`);
      } else {
        console.error(`Error in step '${stepName}': Unknown error`);
      }

      // Take a screenshot if possible
      try {
        if (this.page) {
          const screenshotPath = `./screenshots/error-${Date.now()}.png`;
          await this.page.screenshot({ path: screenshotPath });
          console.error(`Error screenshot saved to ${screenshotPath}`);
        }
      } catch (screenshotError: unknown) {
        if (screenshotError instanceof Error) {
          console.error(`Failed to take error screenshot: ${screenshotError.message}`);
        } else {
          console.error('Failed to take error screenshot: Unknown error');
        }
      }
      // Re-throw the original error
      throw error;
    }
  }
}