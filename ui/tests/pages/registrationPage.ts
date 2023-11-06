// registrationPage.ts
import { Page } from 'playwright';

export class RegistrationPage {
  constructor(private page: Page) {}

  async createAccount(firstName: string, lastName: string, email: string, password: string) {
    await this.page.getByPlaceholder("First Name").click();
    await this.page.getByPlaceholder("First Name").fill(firstName);
    await this.page.getByPlaceholder("Last Name").fill(lastName);
    await this.page.getByPlaceholder("Email").fill(email);
    await this.page.getByPlaceholder("Password").fill(password);
    await this.page.getByLabel('Create new account').click();
    await this.page.locator('//button[@aria-label="Close"]').click();
  }
}

