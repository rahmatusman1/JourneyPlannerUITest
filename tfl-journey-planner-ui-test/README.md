# TFL JOURNEY PLANNER Test Automation Framework

A Playwright-based test automation framework for the journey planner application.

## Project Setup
1.	Installed VS Code.
2.	Create a project folder and opened it in VS Code.
3.	Open the file at the project root level in terminal
3.	Installed Playwright and its dependencies
4.	Installed Node.js and configured the system environment variables to ensure    accessibility across all local projects
5. Installed Allure report 


## Tools Used--
- PlayWright BDD with Typescript, Allure report, Nodejs, Visual studio code.

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



## Installations

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
# Copy example env file
cp .env.example .env

# Update with your credentials and settings
```
3. Install Playwright
```bash
npx playwright install
```
4. Install Allure Report
```bash
npm install -g allure-commandline --save-dev
```
5. Download Nodejs at official website 
https://nodejs.org/  


## Running Tests

```bash
# Run all tests     #Note using `npm test` would delete all test reporting and 
  npm test          # screenshots due to scripts configured see package.json scripts

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


