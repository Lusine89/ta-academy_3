// homePage.ts
import { Page } from 'playwright';

export class HomePage {
  constructor(private page: Page) {}

  async navigateToBaseURL(baseURL: string) {
    await this.page.goto(baseURL, { waitUntil: 'domcontentloaded' });
  }

  async getTitle() {
    return await this.page.title();
  }

  async hoverOverMyAccount() {
    await this.page.locator('//div[text()="My Account"]/../..').hover();
  }

  async clickLogInButton() {
    await this.page.locator('//button[text()="Log in"]').click();
  }
}

