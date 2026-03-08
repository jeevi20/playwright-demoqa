import { test, expect } from '@playwright/test';

test('Edit existing record', async ({ page }) => {

  await page.goto('https://demoqa.com/webtables');

  await page.locator('#edit-record-1').click();

  await page.getByRole('textbox', { name: 'First Name' }).fill('Jeevi');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Ram');

  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByRole('cell', { name: 'Jeevi' })).toBeVisible();

});