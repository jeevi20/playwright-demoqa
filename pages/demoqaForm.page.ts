import { Page, expect } from '@playwright/test';

export class DemoQAFormPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Open page
  async goto() {
    await this.page.goto('https://demoqa.com/automation-practice-form');
  }

  // Fill basic info
  async fillPersonalDetails(firstName, lastName, email, phone) {
    await this.page.fill('#firstName', firstName);
    await this.page.fill('#lastName', lastName);
    await this.page.fill('#userEmail', email);
    await this.page.fill('#userNumber', phone);
  }

  // Select gender
  async selectGender(gender: 'Male' | 'Female' | 'Other') {
    await this.page.getByLabel(gender).check();
  }

  // Select DOB
  async setDOB(date) {
    await this.page.fill('#dateOfBirthInput', date);
  }

  // Select subject
  async selectSubject(subject) {
    await this.page.locator('#subjectsInput').fill(subject);

    const option = this.page.locator(
      '.subjects-auto-complete__option',
      { hasText: subject }
    );

    await option.waitFor();
    await option.click();

    await this.page.click('body');
  }

  // Select hobbies
  async selectHobbies(hobbies: string[]) {
    for (const hobby of hobbies) {
      await this.page.getByLabel(hobby).check();
    }
  }

  // Upload picture
  async uploadPicture(filePath) {
    await this.page.setInputFiles('#uploadPicture', filePath);
  }

  // Fill address
  async fillAddress(address) {
    await this.page.fill('#currentAddress', address);
  }

  // Select state and city
  async selectStateCity(state, city) {
    await this.page.locator('#state').click();
    await this.page.getByText(state, { exact: true }).click();

    await this.page.locator('#city').click();
    await this.page.getByText(city, { exact: true }).click();
  }

  // Submit form
  async submit() {
    const btn = this.page.getByRole('button', { name: 'Submit' });

    await btn.scrollIntoViewIfNeeded();
    await btn.click();
  }

  // Get modal
  getModal() {
    return this.page.getByRole('dialog');
  }

  // Validate modal row
  async validateRow(label, value) {
    const row = this.getModal()
      .getByText(label, { exact: true })
      .locator('..');

    await expect(row).toContainText(value);
  }

  // Close modal
  async closeModal() {
    const closeBtn = this.getModal().getByRole('button', { name: 'Close' });

    await closeBtn.waitFor({ state: 'visible' });
    await closeBtn.click();

    
  }
}