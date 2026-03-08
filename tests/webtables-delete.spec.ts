import { test, expect } from '@playwright/test';

test('Delete user record', async ({ page }) => {

  await page.goto('https://demoqa.com/webtables');

  await page.locator('#delete-record-1').click();

  await expect(
    page.getByRole('cell', { name: 'Cierra' })
  ).not.toBeVisible();

});