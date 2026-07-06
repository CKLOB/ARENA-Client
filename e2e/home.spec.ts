import { test, expect } from '@playwright/test';

test('renders the home page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/./);
  await expect(page.locator('main')).toBeVisible();
});
