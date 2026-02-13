import { Page, Locator } from '@playwright/test';

export class HomePageLocators {
  readonly plannerJourneyTab: Locator;
  readonly inputFrom: Locator;
  readonly inputTo: Locator;
  readonly acceptCookies: Locator;
  readonly planJourneyBtn: Locator;

  readonly journeyResult: Locator;
  readonly editPreferencesBtn: Locator;
  readonly showMeList: Locator;
  readonly updateJourneyBtn: Locator;
  readonly journeyTimeLocator: Locator;
  readonly viewDetailsBtn: Locator;
  readonly accessInformation: Locator;
  readonly fieldValidationError: Locator;
  readonly fromFieldValidationError: Locator;
  readonly toFieldValidationError: Locator;
 
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
    this.plannerJourneyTab = page.getByLabel('Main menu',{exact:true}).getByRole('listitem').filter({ hasText: 'Plan a journey'});
    this.inputFrom = page.locator('input#InputFrom');
    this.inputTo = page.locator('input#InputTo');
    this.acceptCookies = page.locator('button#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
    this.planJourneyBtn = page.locator('input#plan-journey-button');
    this.journeyResult = page.locator('.journey-planner-results');
    this.editPreferencesBtn = page.locator('.edit-preferences.clearfix');
    this.showMeList = page.locator('.show-me-list');
    this.updateJourneyBtn = page.locator('[value="Update journey"]').nth(1);
    this.journeyTimeLocator = page.locator('.journey-time.no-map');
    this.viewDetailsBtn = page.locator('.secondary-button.show-detailed-results.view-hide-details:visible');
    this.accessInformation = page.locator('.access-information:visible').nth(1);
    this.fieldValidationError = page.locator('.field-validation-error:visible');
    this.fromFieldValidationError = page.locator('span#InputFrom-error');
    this.toFieldValidationError = page.locator('span#InputTo-error');
  }
  /**
   * Returns locator for option in the dropdown
   */
  selectFromDropDown(option:string):Locator{
    return this.page.getByText(option);
  }
  /** Select routes */
  routeCheckboxes(routeName: string): Locator {
  return this.page.locator('label.boxed-label-for-input', { hasText: routeName });
}
}