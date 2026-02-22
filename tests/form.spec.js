import { test, expect } from '@playwright/test';

// Helper for validation
async function validateRow(modal, label, expectedValue) {
  const row = modal
    .getByText(label, { exact: true })
    .locator('..');

  await expect(row).toContainText(expectedValue);
}

test('DemoQA Form Submission', async ({ page }) => {

  page.setDefaultNavigationTimeout(60000);

  // Go directly to form (more stable)
  await page.goto('https://demoqa.com/automation-practice-form');

  // First name
  await page.fill('#firstName', 'Jeevana');

  // Last name
  await page.fill('#lastName', 'Hariram');

  // Email
  await page.fill('#userEmail', 'hajee@gmail.com');

  // Gender
  await page.getByLabel('Female').check();

  // Phone
  await page.fill('#userNumber', '1234567890');

  // DOB
  await page.fill('#dateOfBirthInput', '20 Jan 2001');

  // Subjects
  await page.locator('#subjectsInput').fill('Computer Science');

  const option = page.locator('.subjects-auto-complete__option', {
    hasText: 'Computer Science',
  });

  await option.waitFor();
  await option.click();
  await page.click('body');

  // Hobbies
  await page.getByLabel('Music').check();
  await page.getByLabel('Reading').check();

  // Upload
  await page.setInputFiles('#uploadPicture', 'tests/sample.png');

  // Address
  await page.fill('#currentAddress', 'Jaffna');

  // State
  await page.locator('#state').click();
  await page.getByText('NCR', { exact: true }).click();

  // City
  await page.locator('#city').click();
  await page.getByText('Delhi', { exact: true }).click();

  // Submit
  const submitBtn = page.getByRole('button', { name: 'Submit' });

  await submitBtn.scrollIntoViewIfNeeded();
  await submitBtn.click();

  // Modal
  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible();

  // Validation
  await validateRow(modal, 'Student Name', 'Jeevana Hariram');
  await validateRow(modal, 'Student Email', 'hajee@gmail.com');
  await validateRow(modal, 'Gender', 'Female');
  await validateRow(modal, 'Mobile', '1234567890');
  await validateRow(modal, 'Subjects', 'Computer Science');
  await validateRow(modal, 'Hobbies', 'Music, Reading');
  await validateRow(modal, 'State and City', 'NCR Delhi');

  // Close
  const closeBtn = modal.getByRole('button', { name: 'Close' });

  await closeBtn.waitFor({ state: 'visible' });
  await closeBtn.click();

  
});