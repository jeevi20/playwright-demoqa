import { test, expect } from '@playwright/test';

test('Search user in Web Tables', async ({ page }) => {

  await page.goto('https://demoqa.com/webtables');

  const searchBox = page.locator('#searchBox');

  await searchBox.fill('Cierra');

  await expect(
    page.getByRole('cell', { name: 'Cierra', exact: true })
  ).toBeVisible();

});