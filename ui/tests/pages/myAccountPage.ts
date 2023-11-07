// myAccountPage.ts
import { Page } from 'playwright';

export class MyAccountPage {
  constructor(private page: Page) {}

  async waitForDialogContentToBeHidden() {
    await this.page.waitForSelector('//div[@class="rc-dialog-content"]', { state: 'hidden' });
  }

  async waitForGreetingMessageToAppear() {
    await this.page.waitForSelector('//div[@class="myAccount__title___3VN4o" and text()="Hello, Ivan"]');
  }

  async getGreetingText() {
    return await this.page.innerText('//div[@class="myAccount__title___3VN4o" and text()="Hi, Ivan"]');
  }

  async waitForHiIvanTextToAppear() {
    await this.page.waitForSelector('//*[@id="react-root"]/div/article/section/div/header/p');
  }

  async getHiIvanText() {
    return await this.page.innerText('//*[@id="react-root"]/div/article/section/div/header/p');
  }

  async clickUserAccountButton() {
    await this.page.locator('//*[@id="react-root"]/div/article/section/div/header/button').click();
  }

  async hoverOverHelloIvan() {
    await this.page.locator('//div[text()="Hello, Ivan"]/../..').hover();
  }

  async clickSignOutButton() {
    await this.page.locator('//button[text()="Sign out"]').click();
  }

  async getMyAccountText() {
  
    const myAccountLocator = this.page.locator('//div[text()="My Account"]/../..');
    await myAccountLocator.innerText();
    
  }
}

