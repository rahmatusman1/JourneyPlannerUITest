 /**
 * Script to run after tests to clean up unwanted folders and old screenshots
 */
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

// Folders to remove completely
const foldersToRemove = [
  'test-results',
  'playwright-report',
  'blob-report'
];

// Folders to clear (delete contents but keep folder)
const foldersToClear = [
  'allure-results',
  'screenshots',
  'allure-report'
];

console.log('Running cleanup...');

// Remove folders entirely
foldersToRemove.forEach(folder => {
  const folderPath = path.join(__dirname, '..', folder);

  if (fs.existsSync(folderPath)) {
    console.log(`Removing ${folder}...`);
    rimraf.sync(folderPath);
  }
});

// Clear contents but keep folders
foldersToClear.forEach(folder => {
  const folderPath = path.join(__dirname, '..', folder);

  if (fs.existsSync(folderPath)) {
    console.log(`Clearing contents of ${folder}...`);
    // Read all files and directories in the folder
    const files = fs.readdirSync(folderPath);

    // Delete each file/directory
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      rimraf.sync(filePath);
    }
    console.log(`Cleared ${files.length} items from ${folder}`);
  }

  // Ensure folder exists
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Created ${folder} directory`);
  }
});