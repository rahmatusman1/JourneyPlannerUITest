import { Page } from '@playwright/test';
import { HomeActions } from '../actions/HomeActions';
import testData from '../../config/testData.json';

export class PlanJourneyServices{
private homeActions: HomeActions;


constructor(page: Page){
    this.homeActions = new HomeActions(page);
}

async planJourney(): Promise<void>{
await this.homeActions.goToURL();
await this.homeActions.clickPlanAJourneyTab();
await this.homeActions.selectFromStationOption(testData.journeyRoute.fromInput,testData.journeyRoute.from);
await this.homeActions.selectToStationOption(testData.journeyRoute.toInput,testData.journeyRoute.to);
await this.homeActions.clicksOnPlanMyJourneyButton();
}

async editPlannedJourney(): Promise<void>{
await this.homeActions.clickOnEditPreferencesButton();
await this.homeActions.clickOnRouteCheckBox(testData.routes.routeWithLeastWalking);
await this.homeActions.clickOnUpdateJourneyButton();
}

} 
