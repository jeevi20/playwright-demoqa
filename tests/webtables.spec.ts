import { test } from '@playwright/test';
import { WebTablesPage } from '../pages/webTables.page';

test('Web Tables - Search Add Edit', async ({ page }) => {

  const webtables = new WebTablesPage(page);

  await webtables.goto();

  // Search
  await webtables.searchUser('Cierra');
  await webtables.validateUser('Cierra');
  await webtables.clearSearch();

  // Add
  await webtables.addUser(
    'Jeevi',
    'Ram',
    'jeevi@test.com',
    '25',
    '50000',
    'QA'
  );

  await webtables.validateUser('jeevi@test.com');

  // Edit
  await webtables.editUser(
    'Jeevi',
    'Kumar',
    'jeevi@test.com',
    '26',
    '55000',
    'QA'
  );

});