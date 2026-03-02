import { test } from '@playwright/test';
import { CheckBoxPage } from '../pages/checkBox.page';

test('Checkbox hierarchy behavior (POM)', async ({ page }) => {

  const checkBoxPage = new CheckBoxPage(page);

  await checkBoxPage.goto();

  // Select children one by one
  await checkBoxPage.selectItem('Desktop');
  await checkBoxPage.verifyCheckboxState('Home', 'mixed');

  await checkBoxPage.selectItem('Documents');
  await checkBoxPage.selectItem('Downloads');

  await checkBoxPage.verifyCheckboxState('Home', 'true');

  // Validate result panel (exact order)
  await checkBoxPage.validateSelectedItems([
    'desktop',
    'documents',
    'downloads',
  ]);

  // Unselect one
  await checkBoxPage.unselectItem('Downloads');
  await checkBoxPage.verifyCheckboxState('Home', 'mixed');

});