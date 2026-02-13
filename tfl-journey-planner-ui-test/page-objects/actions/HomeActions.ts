import { expect, Page } from '@playwright/test';
import { BaseClass } from '../../base/BaseClass';
import { HomePageLocators } from '../locators/HomePageLocators';

export class HomeActions extends BaseClass<HomePageLocators> {
  constructor(page: Page) {
    const locators = new HomePageLocators(page);
    super(page, locators);
  }

async goto(): Promise<void> {
    await super.goToURL('/plan-a-journey');
  }

async acceptCookies(): Promise<void>{
   const cookieButton = this.locators.acceptCookies; 
   await cookieButton.isVisible();
    await cookieButton.click();
  }
  
async clickPlanAJourneyTab(): Promise<void> {
    await this.acceptCookies();
    await this.page.reload();
    await this.locators.plannerJourneyTab.click();
  }
async selectFromStationOption(stationName: string, stationOption: string):Promise<void>
{
    await this.fillInPlannerFromField(stationName);
    await (this.locators.selectFromDropDown(stationOption)).click();
}
async selectToStationOption(stationName: string, stationOption: string):Promise<void>
{
    await this.fillInPlannerToField(stationName);
    await (this.locators.selectFromDropDown(stationOption)).click();

}
async fillInPlannerToField(stationName:string):Promise<void>{
    await (this.locators.inputTo).fill(stationName);
}
async fillInPlannerFromField(stationName:string):Promise<void>{
    await (this.locators.inputFrom).fill(stationName);
}
async clicksOnPlanMyJourneyButton():Promise<void>
{
    await expect(this.locators.planJourneyBtn).toBeVisible();
    await (this.locators.planJourneyBtn).click();
}

/** Assert journey planner displayed 
 * Get journey planner search content */
async getJourneySearchContent():Promise<string>{
    await expect (this.locators.journeyResult).toBeVisible();
    return await this.locators.journeyResult.innerText();
}
/**
 * Assert content matches the expected text
 */
  async verifyJourneyResult(expectedMessage:string[]):Promise<void>{
    const actualText = await this.getJourneySearchContent();
    console.log('Full Text', actualText);
    for(const expected of expectedMessage)
    expect(actualText).toContain(expected);
  }
 async clickOnEditPreferencesButton(): Promise<void>{
    await expect (this.locators.editPreferencesBtn).toBeVisible();
   await this.locators.editPreferencesBtn.click();
 }

 async clickOnRouteCheckBox(routeName: string ): Promise<void>{
    await this.locators.showMeList.waitFor({state: 'visible'});
    const checkboxes = this.locators.routeCheckboxes(routeName);
    await checkboxes.click();
 }
 async clickOnUpdateJourneyButton():Promise<void>{
    await expect(this.locators.updateJourneyBtn).toBeVisible();
    await this.locators.updateJourneyBtn.click();
 }

async getJourneyTimes(): Promise<number[]> {
  // Wait for journey option results
 await this.page.waitForSelector('.always-visible.journey-option ', { state: 'visible' });
 const times = await (this.locators.journeyTimeLocator).allInnerTexts();
  return times.map(t => Number(t.replace(/\D/g, '')));
}

async clicksOnViewDetailsButton():Promise<void>{
    await this.page.waitForSelector('.always-visible.journey-option ', { state: 'visible' });
    await expect(this.locators.viewDetailsBtn).toBeVisible();
    await this.locators.viewDetailsBtn.click();
}

/** Assert Access Information Displayed
 * Get Access Information content */
async getAccessInfoContent():Promise<string>{
    await expect (this.locators.accessInformation).toBeVisible();
    return await this.locators.accessInformation.innerText();
}
/**
 * Assert content matches the expected text
 */
  async verifyDisplayedAccessInfoResult(expectedMessage:string[]):Promise<void>{
    const actualText = await this.getAccessInfoContent();
    for(const expected of expectedMessage)
    expect(actualText).toContain(expected);
  }
  async verifyInvalidStationError(expectedText: string): Promise<void>{
    const actualText = (await this.locators.fieldValidationError.innerText()).toLowerCase();
    expect(actualText).toBe(expectedText);
  }
  async verifyEmptyToFieldError(expectedText: string): Promise<void>{
    const actualText = (await this.locators.toFieldValidationError.innerText());
    expect(actualText).toBe(expectedText);
  }
async verifyEmptyFromFieldError(expectedText: string): Promise<void>{
    const actualText = (await this.locators.fromFieldValidationError.innerText());
    expect(actualText).toBe(expectedText);
  }
}