import { test } from '@playwright/test';
import { DemoQAFormPage } from '../pages/demoqaForm.page';

test('DemoQA Form Submission (POM)', async ({ page }) => {

  const form = new DemoQAFormPage(page);

  await form.goto();

  await form.fillPersonalDetails(
    'Jeevana',
    'Hariram',
    'hajee@gmail.com',
    '1234567890'
  );

  await form.selectGender('Female');

  await form.setDOB('20 Jan 2001');

  await form.selectSubject('Computer Science');

  await form.selectHobbies(['Music', 'Reading']);

  await form.uploadPicture('tests/sample.png');

  await form.fillAddress('Jaffna');

  await form.selectStateCity('NCR', 'Delhi');

  await form.submit();

  // Validation
  await form.validateRow('Student Name', 'Jeevana Hariram');
  await form.validateRow('Student Email', 'hajee@gmail.com');
  await form.validateRow('Gender', 'Female');
  await form.validateRow('Mobile', '1234567890');
  await form.validateRow('Subjects', 'Computer Science');
  await form.validateRow('Hobbies', 'Music, Reading');
  await form.validateRow('State and City', 'NCR Delhi');

  await form.closeModal();
});