import { expect } from '@playwright/test';
import { test } from '../utils/allure-helper';
import testData from '../config/testData.json';
import { HomeActions } from '../page-objects/actions/HomeActions';
import { ExpectedText } from '../test-data/expectedText';
import { PlanJourneyServices } from '../page-objects/services/PlanJourneyService';
  

test.describe('Journey Planner Test', ()=>{
  let homeActions : HomeActions;
  let planJourneyServices : PlanJourneyServices

test.beforeEach(async ({ page })=>{
 homeActions = new HomeActions(page);
 planJourneyServices = new PlanJourneyServices(page);

  //Launch the application URL
  await homeActions.goToURL();
});

test('Verify that a valid journey can be planned successfully using the plan journey widget', async ({allure})=>{
  await allure.step('Given the user clicks on plan a journey tab', async ()=> {
    await homeActions.clickPlanAJourneyTab();
  });
  await allure.step('When the user fills in the plan journey fields and select station option', async () => {
   await homeActions.selectFromStationOption(testData.journeyRoute.fromInput,testData.journeyRoute.from);
   await homeActions.selectToStationOption(testData.journeyRoute.toInput,testData.journeyRoute.to);
  });
  await allure.step('And the user clicks on plan my journey button', async () => {
   await homeActions.clicksOnPlanMyJourneyButton();
  });
   await allure.step('Then the journey should be plan successfully displaying the plan journey results to the user', async () => {
  await homeActions.verifyJourneyResult(ExpectedText.searchJourneyResult);
  });
});

test('Verify user is able to edit preferences for planned journey', async ({allure})=>{
  await allure.step('Given user has a planned journey', async ()=> {
   await planJourneyServices.planJourney();
  });
  await allure.step('When the user clicks on edit preferences button', async () => {
   await homeActions.clickOnEditPreferencesButton();
  });
  await allure.step('And the user clicks on routes with the least walking', async () => {
   await homeActions.clickOnRouteCheckBox(testData.routes.routeWithLeastWalking);
  });
 await allure.step('And the user clicks on update journey button', async () => {
   await homeActions.clickOnUpdateJourneyButton();
  });
 await allure.step('Then the journey time is updated and increased', async () => {
  const times = await homeActions.getJourneyTimes();
  expect(times.length).toBeGreaterThan(0);
  for (const t of times) {
  expect(t).toBeGreaterThan(6);// fastest route mins 
  expect(t).toBeLessThan(12);}
});
});
test('Verify complete access information at Covent Garden Underground Station', async ({allure})=>{
  await allure.step('Given user has a planned journey', async ()=> {
   await planJourneyServices.planJourney();
  });
  await allure.step('When the user edited the planned journey', async () => {
   await planJourneyServices.editPlannedJourney();
  });
  await allure.step('And the users clicks on view details button', async () => {
   await homeActions.clicksOnViewDetailsButton();
  });
 await allure.step('Then the access information should be visible', async () => {
  await homeActions.verifyDisplayedAccessInfoResult(ExpectedText.accessInformationAtCoventGarden);
 });
});
test('Verify that the widget does not provide results when an invalid journey is planned', async ({allure})=>{
  await allure.step('Given the user clicks on plan a journey tab', async ()=> {
    await homeActions.clickPlanAJourneyTab();
  });
  await allure.step('And the user fills in invalid station in the plan journey fields', async () => {
   await homeActions.selectFromStationOption(testData.journeyRoute.fromInput,testData.journeyRoute.from);
   await homeActions.fillInPlannerToField(testData.journeyRoute.invalidTo);
  });
  await allure.step('And the user clicks on plan my journey button', async () => {
   await homeActions.clicksOnPlanMyJourneyButton();
  });
 await allure.step('Then an error message should be displayed', async () => {
  await homeActions.verifyInvalidStationError(testData.validationMessages.invalidToStationInput);
 });
});
test('Verify that the widget is unable to plan a journey if no locations are entered into the widget', async ({allure})=>{
  await allure.step('Given the user clicks on plan a journey tab', async ()=> {
    await homeActions.clickPlanAJourneyTab();
  });
  await allure.step('When the user clicks on plan my journey button', async () => {
   await homeActions.clicksOnPlanMyJourneyButton();
  });
 await allure.step('Then an error message should be displayed for the empty fields', async () => {
  await homeActions.verifyEmptyFromFieldError(testData.validationMessages.fromFieldError);
  await homeActions.verifyEmptyToFieldError(testData.validationMessages.toFieldError);
 });
});
});

//Additional Test Scenarios for plan journey features:
//Verify that a user is able to view their recents journey
//Verify that user is able to see their journey [My journey]
//Verify that a user can add planned journey to favourite 
//Verify that a user can remove a planned journey from favourite 
//Verify that a user can use their location to plan a journey 
//Verify user is able to use map view
//Verify a user can hide map view

//Suggested Improvements
//Implement read aloud functionality when planning a journey for special needs individual
//Allow dark mode background for accessibility testing
//Show confirmation message for a successful planned journey 
