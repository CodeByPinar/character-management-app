import { expect, test } from '@playwright/test';

test('filters, sorting, favorites, and detail navigation work together', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Character Management' })).toBeVisible();
  await expect(page.getByText('Showing')).toBeVisible();

  await page.getByPlaceholder('Search by name or description').fill('Rick');
  await expect(page).toHaveURL(/search=Rick/);
  await expect(page.getByRole('heading', { name: 'Antenna Rick' })).toBeVisible();

  await page.getByLabel('Filter by status').selectOption('DEAD');
  await expect(page).toHaveURL(/status=DEAD/);

  await page.getByLabel('Sort characters').selectOption('NAME_DESC');
  await expect(page).toHaveURL(/sort=NAME_DESC/);
  await expect(page.getByRole('heading', { name: 'Antenna Rick' })).toBeVisible();

  const rickCard = page.locator('.character-card').filter({ hasText: 'Antenna Rick' });
  const rickFavoriteButton = rickCard.locator('.favorite-button');
  await rickFavoriteButton.click();
  await expect(rickFavoriteButton).toHaveClass(/is-active/);
  await expect(page.getByRole('button', { name: /Favorites 1/ })).toBeVisible();

  await page.getByRole('button', { name: /Favorites/ }).click();
  await expect(page).toHaveURL(/view=favorites/);
  await expect(page.getByText('Showing')).toBeVisible();

  await page.getByRole('link', { name: /Rick/i }).first().click();
  await expect(page).toHaveURL(/\/characters\/\d+/);
  await expect(page.getByRole('link', { name: 'Back to characters' })).toBeVisible();
});
