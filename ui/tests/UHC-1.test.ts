import type { Options } from '@Test';
import { test, expect } from '@Test';
import { chromium, Browser, Page } from 'playwright';

let browser: Browser;
let page: Page;

test.describe('UHC-2 (test ID)', () => {
  test('Create UHCGlasses.com Account and Sign Out', async ({ baseURL }: Options) => {
    browser = await chromium.launch();
    page = await browser.newPage();

    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });

   
    const pageTitle = await page.title();
    expect(pageTitle).toStrictEqual('UHC. United Healthcare.');

    await page.click('text=Create UHCGlasses.com Account');

    const createAccountButton = await page.locator('text=Create UHCGlasses.com Account');

    const firstNameInput = await page.locator('input[name="firstName"]');
    const lastNameInput = await page.locator('input[name="lastName"]');
    const emailInput = await page.locator('input[name="email"]');
    const passwordInput = await page.locator('input[name="password"]');

    await firstNameInput.type('Ivan');
    await lastNameInput.type('Ivanov');
    await emailInput.type('test@test.com');
    await passwordInput.type('Test1234');

    await createAccountButton.click();

    expect(await page.locator('text=Registration Successful').isVisible()).toBe(true);

    const closeWelcomePopupButton = await page.locator('text=Close');
    await closeWelcomePopupButton.click();

    const myAccountDropdown = await page.locator('text=My account');
    await myAccountDropdown.hover();
    await page.click('text=Sign out');
    
    expect(await page.locator('text=Logged Out').isVisible()).toBe(true);

    await page.close();
    await browser.close();
  });
});
