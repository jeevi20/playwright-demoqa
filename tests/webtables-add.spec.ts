import { test, expect } from '@playwright/test';

test('Add new user record', async ({ page }) => {

  await page.goto('https://demoqa.com/webtables');

  await page.getByRole('button', { name: 'Add' }).click();

  await page.getByRole('textbox', { name: 'First Name' }).fill('John');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('David');
  await page.getByRole('textbox', { name: 'name@example.com' }).fill('john@test.com');
  await page.getByRole('textbox', { name: 'Age' }).fill('30');
  await page.getByRole('textbox', { name: 'Salary' }).fill('50000');
  await page.getByRole('textbox', { name: 'Department' }).fill('IT');

  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByRole('cell', { name: 'john@test.com' })).toBeVisible();

});