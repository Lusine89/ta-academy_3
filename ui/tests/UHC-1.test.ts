// // import { HomePage } from '@Pages/homePage';
// import type { Options } from '@Test';
// import { test, expect } from '@Test';
// import { chromium, Browser, Page } from 'playwright';

// let browser: Browser;
// let page: Page;

// test.describe('UHC-1', () => {
//     test('Check search results on category page (test title)', async ({
//         page,
//         baseURL,
//     }: Options) => {

//       browser = await chromium.launch();
//       page = await browser.newPage();
//         await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
//         const locator = page.locator('.my-element');
//          await expect(locator).toBeHidden(); 
//         const pageTitle = await page.title();

//         expect(pageTitle).toStrictEqual('UHC. United Healthcare.');
//       // Hover over the "My Account" element
//       await page.locator('//div[text()="My Account"]/../..').hover();

//       // Click the "Log in" button without waiting explicitly
//       await page.locator('//button[text()="Log in"]').click();

//       // Click the "Create UHCGlasses.com Account" button
//       await page.locator('//span[text()="Create UHCGlasses.com Account"]').click();

//       // Fill in account details
//       await page.getByPlaceholder("First Name").click();
//       await page.getByPlaceholder("First Name").fill('Ivan')
//       await page.getByPlaceholder("Last Name").fill('Ivanov')
//       await page.getByPlaceholder("Email").fill(`test@test${Date.now()}.com`);
//       await page.getByPlaceholder("Password").fill('Cs123456');
      
//       await page.getByLabel('Create new account').click();
//       await page.locator('//button[@aria-label="Close"]').click();

//       // Assert that the dialog content is not visible
//       await expect(page.locator('//div[@class="rc-dialog-content"]')) .toBeHidden();

// // Wait for the "Hello, Ivan" greeting message to appear
// await page.waitForSelector('//div[@class="myAccount__title___3VN4o" and text()="Hello, Ivan"]');

// // Assert the greeting message
// const greetingText = await page.innerText('//div[@class="myAccount__title___3VN4o" and text()="Hello, Ivan"]');
// await expect(greetingText).toBe('Hello, Ivan');

// // Wait for the "Hi Ivan" text to appear
// await page.waitForSelector('//*[@id="react-root"]/div/article/section/div/header/p');

// // Assert the "Hi Ivan" text
// const hiIvanText = await page.innerText('//*[@id="react-root"]/div/article/section/div/header/p');
// await expect(hiIvanText).toBe('Hi Ivan');



//       // Click the user account button
//     await page.locator('//*[@id="react-root"]/div/article/section/div/header/button').click();

//       // Hover over the "My Account" element again
//       await page.locator('//div[text()="Hello, Ivan"]/../..').hover();

//       // Click the "Sign Out" button
      
//       await page.locator('//button[text()="Sign out"]').click();
    
//     const myAccountLocator = page.locator('//div[text()="My Account"]/../..');
//     const myAccountText = await myAccountLocator.innerText();
//     await expect(myAccountText).toBe('My Account');
   
//     await page.close();
//     await browser.close();
//   });
// });

import type { Options } from '@Test';
import { HomePage } from './pages/homePage';
import { RegistrationPage } from './pages/registrationPage';
import { MyAccountPage } from './pages/myAccountPage';
import { test, expect} from '@Test';
import { chromium, Browser, Page } from 'playwright';


test.describe('UHC-1', () => {
  let browser: Browser;
  let page: Page;
  let homePage: HomePage;
  let registrationPage: RegistrationPage;
  let myAccountPage: MyAccountPage;

  test('Check search results on category page ', async ({ baseURL }: Options) => {
    browser = await chromium.launch();
    page = await browser.newPage();
    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);
    myAccountPage = new MyAccountPage(page);

      await homePage.navigateToBaseURL(baseURL);

      const pageTitle = await homePage.getTitle();
      expect(pageTitle).toStrictEqual('UHC. United Healthcare.');

      homePage.hoverOverMyAccount();
      homePage.clickLogInButton();
      await page.locator('//span[text()="Create UHCGlasses.com Account"]').click();
      
      registrationPage.createAccount('Ivan', 'Ivanov', `test@test${Date.now()}.com`, 'Cs123456');

      const dialogContent= await myAccountPage.waitForDialogContentToBeHidden();
      myAccountPage.waitForGreetingMessageToAppear();

      const hiIvanText =await myAccountPage.getHiIvanText();
      expect(hiIvanText).toBe('Hi Ivan')
      
      myAccountPage.clickUserAccountButton() 
      myAccountPage.hoverOverHelloIvan()

      myAccountPage.clickSignOutButton()
      const myAccount=await myAccountPage.getMyAccountText()

      await page.close();
       await browser.close();
  });
});
