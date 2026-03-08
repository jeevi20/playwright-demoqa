import { Page, Locator, expect } from '@playwright/test';

export class WebTablesPage {

  readonly page: Page;
  readonly searchBox: Locator;
  readonly addButton: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.locator('#searchBox');
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  async goto() {
    await this.page.goto('https://demoqa.com/webtables');
  }

  // 🔎 Search Function
  async searchUser(name: string) {
    await this.searchBox.fill(name);
  }

  async validateUser(name: string) {
    await expect(
      this.page.getByRole('cell', { name: name, exact: true })
    ).toBeVisible();
  }

  async clearSearch() {
    await this.searchBox.clear();
  }

  // ➕ Add User Function
  async addUser(firstName: string, lastName: string, email: string, age: string, salary: string, department: string) {

    await this.addButton.click();

    await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
    await this.page.getByRole('textbox', { name: 'name@example.com' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Age' }).fill(age);
    await this.page.getByRole('textbox', { name: 'Salary' }).fill(salary);
    await this.page.getByRole('textbox', { name: 'Department' }).fill(department);

    await this.submitButton.click();
  }

  // ✏️ Edit User Function
  async editUser(firstName: string, lastName: string, email: string, age: string, salary: string, department: string) {

    await this.page.locator('#edit-record-1').click();

    await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
    await this.page.getByRole('textbox', { name: 'name@example.com' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Age' }).fill(age);
    await this.page.getByRole('textbox', { name: 'Salary' }).fill(salary);
    await this.page.getByRole('textbox', { name: 'Department' }).fill(department);

    await this.submitButton.click();
  }

}
