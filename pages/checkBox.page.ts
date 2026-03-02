import { Page, expect } from '@playwright/test';

export class CheckBoxPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://demoqa.com/checkbox');
  }

  // Expand Home node if collapsed
  async expandHomeIfCollapsed() {
    const homeTreeItem = this.page.locator('[role="treeitem"]', {
      hasText: 'Home',
    });

    const switcher = homeTreeItem.locator('.rc-tree-switcher');

    const expanded = await homeTreeItem.getAttribute('aria-expanded');

    if (expanded === 'false') {
      await switcher.click();
    }
  }

  private getCheckbox(name: string) {
    return this.page.getByRole('checkbox', {
      name: `Select ${name}`,
    });
  }

  async selectItem(name: string) {
    await this.expandHomeIfCollapsed();

    const checkbox = this.getCheckbox(name);

    const state = await checkbox.getAttribute('aria-checked');

    if (state !== 'true') {
      await checkbox.click();
    }
  }

  async unselectItem(name: string) {
    const checkbox = this.getCheckbox(name);

    const state = await checkbox.getAttribute('aria-checked');

    if (state === 'true') {
      await checkbox.click();
    }
  }

  async verifyCheckboxState(
    name: string,
    expected: 'true' | 'false' | 'mixed'
  ) {
    const checkbox = this.getCheckbox(name);

    await expect(checkbox).toHaveAttribute('aria-checked', expected);
  }

  async validateSelectedItems(expectedItems: string[]) {
  const actualItems = await this.page
    .locator('#result .text-success')
    .allTextContents();

  for (const item of expectedItems) {
    expect(actualItems).toContain(item);
  }
}

  async validateContainsItems(expectedItems: string[]) {
    const actualItems = await this.page
      .locator('#result .text-success')
      .allTextContents();

    for (const item of expectedItems) {
      expect(actualItems).toContain(item);
    }
  }
}