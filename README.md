# TFL JOURNEY PLANNER Test Automation Framework

A Playwright-based test automation framework for the journey planner application.

## Tools Used--
- PlayWright with Typescript, Allure report, Nodejs, Visual studio code.

## Project Structure & Breakdown
1.Tests Folder
Contains test scenarios written in BDD (Gherkin syntax).
Defines user actions and expected outcomes in a structured, readable format.
Implements test logic by mapping Gherkin steps with allure steps using playwright.


2.Page Object Folder (POM - Action, Locators and Services)
Locators stores pages locators and define element selectors for each page
Actions implement user behaviors using locators with Playwright commands (e.g., click(), fill()) to simulate user interactions.
Services ensures reusable and modular automation components for better maintainability.

3.Support Folder
Contains utility files for managing configurations, browser lifecycle, and test execution:
config.ts:- Stores test data variables .
Base.ts:- Defines global hooks for:
Before test run (e.g., browser setup).
After test run (e.g., cleanup, closing the browser).
After step execution (e.g., capturing screenshots for debugging).
Initializes page objects and handles browser setup & teardown.
Test-data.ts:- used to stored expected text to compare actual with expeted

4.Test Execution & Reporting
A dedicated test runner file to execute tests and allure reporting for test report failures.
Displays a summary of passed/failed tests with detailed error logs.



## Project Setup & Installations
1.	Installed VS Code or Open existing if already installed.
2.	Create a folder on your local 
3.  Clone the code from the repository into your created local folder 
4.  Open VS Code-> Click on File -> Click on Open Folder-> Select the local folder.
5.	Open the file directory in terminal e.g C:\desiredlocation\JourneyPlannerUITest\tfl-journey-planner-ui-test
6.  Install dependencies: 
```bash
npm install
```

## Running Tests

```bash
# Run tests #Note using `npm test` delete all test reports
npm test          

# Run specific test file
npx playwright test tests/journey-planner-test.spec.ts

# Run tests with specific browser
npx playwright test --project=chromium

# Run tests in headed mode
npx playwright test --headed

# Run tests without deleting all test report and screenshots
npx playwright test

## Generating Reports

```bash
# Generate and open Allure report
npm run report

# Generate report only
npm run report:generate

# Open existing report
npm run report:open

# Generate playwright report with allure steps
 npx playwright show-report 
```

## Clean Up

```bash
# Clean up test artifacts
npm run clean
```