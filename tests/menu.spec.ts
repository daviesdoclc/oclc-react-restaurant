import { test, expect } from "@playwright/test";

test("should display food, add food, and delete food", async ({ page }) => {
  // Verify menu is displayed
  await page.goto("http://localhost:3000");
  await expect(page.getByRole("heading", { name: "Menu" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Burger" })).toBeVisible();

  // Navigate to admin
  await page.getByRole("link", { name: "Admin" }).click();
  await expect(page.getByRole("heading", { name: "Admin" })).toBeVisible();

  // Add new food
  const submitButton = page.getByRole("button", { name: "Add Menu Item" });
  await page.getByLabel("Name").fill("Falafel");
  await page.getByLabel("Description").fill("Yummy yummy pizza");
  await page.getByLabel("Price").fill("14.95");
  await submitButton.click();

  // Assure new food is displayed
  await expect(
    page.getByRole("heading", { name: "WorldCat Menu" })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Falafel" })).toBeVisible();

  // Delete food
  await page.getByRole("button", { name: "Delete Falafel" }).click();
  await expect(
    page.getByRole("heading", { name: "Falafel" })
  ).not.toBeVisible();

  // Verify search
  await page.getByLabel("Search").fill("burger");
  await expect(page.getByRole("heading", { name: "Burger" })).toHaveCount(1);
});
