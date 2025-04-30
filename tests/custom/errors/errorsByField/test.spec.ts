import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:8080/custom/errors/errorsByField/index.html');

  await expect(page.locator('.kr-embedded[kr-form-ready]')).toBeVisible()
  await expect(page.locator('#krtoolbar')).toBeVisible()

  // Check that field errors have no content and are not visible
  await expect(page.locator('.field-error.pan')).not.toContainText('Missing card number')
  await expect(page.locator('.field-error.pan')).not.toBeVisible()
  await expect(page.locator('.field-error.expiryDate')).not.toContainText('Missing expiry date')
  await expect(page.locator('.field-error.expiryDate')).not.toBeVisible()
  await expect(page.locator('.field-error.securityCode')).not.toContainText('Missing security code')
  await expect(page.locator('.field-error.securityCode')).not.toBeVisible()
  
  await page.locator('button.kr-payment-button').click();
  
  // Check that field errors have no content and are not visible
  await expect(page.locator('.field-error.pan')).toContainText('Missing card number')
  await expect(page.locator('.field-error.pan')).toBeVisible()
  await expect(page.locator('.field-error.expiryDate')).toContainText('Missing expiry date')
  await expect(page.locator('.field-error.expiryDate')).toBeVisible()
  await expect(page.locator('.field-error.securityCode')).toContainText('Missing security code')
  await expect(page.locator('.field-error.securityCode')).toBeVisible()
  
  await page.locator('#krtoolbar #krcardsMenu.kr-section-cards span.not-mobile').hover()
  await page.locator('#krtoolbar .kr-card-tab-switcher .kr-card-tab-switcher-item.visa').click()
  await page.locator('#krtoolbar #krcards.kr-panel #testCardList .visa.accepted.card-accepted').click()

  // After content update
  await expect(page.locator('.field-error.pan')).not.toContainText('Missing card number')
  await expect(page.locator('.field-error.pan')).not.toBeVisible()
  await expect(page.locator('.field-error.expiryDate')).not.toContainText('Missing expiry date')
  await expect(page.locator('.field-error.expiryDate')).not.toBeVisible()
  await expect(page.locator('.field-error.securityCode')).not.toContainText('Missing security code')
  await expect(page.locator('.field-error.securityCode')).not.toBeVisible()
});
