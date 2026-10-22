import { test, expect } from "@playwright/test";
import { caseStudies } from "../src/data/case-studies";

for (const study of caseStudies) {
  test(`${study.slug} detail page preserves project data and navigation`, async ({ page }) => {
    const response = await page.goto(`/case-studies/${study.slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText(study.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", study.description);
    await expect(page.locator("#overview")).toContainText(study.overview);
    await expect(page.locator("#technologies")).toContainText(study.technologies.join(""));
    await expect(page.locator("main")).toContainText("DEMO CONCEPT");
    await expect(page.locator("#main-navigation").getByRole("link", { name: "Services", exact: true })).toHaveAttribute("href", "/#services");
    await page.locator("#main-navigation").getByRole("link", { name: "Services", exact: true }).click();
    await expect(page).toHaveURL(/\/#services$/);
  });
}

test("case study cover reveals on hover and focus and opens its detail page", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const card = page.locator("#case-studies a").first();
  await expect(page.locator("#case-studies a")).toHaveCount(caseStudies.length);
  await card.scrollIntoViewIfNeeded();
  await expect(card.locator("img")).toHaveCSS("opacity", "1");
  await card.hover();
  await expect(card.locator("img")).toHaveCSS("opacity", "0");
  await page.mouse.move(0, 0);
  await expect(card.locator("img")).toHaveCSS("opacity", "1");
  await card.focus();
  await expect(card.locator("img")).toHaveCSS("opacity", "0");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/case-studies\/orbit$/);
  const next = page.getByRole("link", { name: /NEXT PROJECT/ });
  await expect(next).toHaveAttribute("href", "/case-studies/flow");
  await next.click();
  await expect(page).toHaveURL(/\/case-studies\/flow$/);
});

test("mobile cards navigate with one tap and detail routes do not overflow", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  const card = page.locator("#case-studies a").first();
  await card.scrollIntoViewIfNeeded();
  await expect(card.locator("img")).toHaveCSS("opacity", "1");
  await card.tap();
  await expect(page).toHaveURL(/\/case-studies\/orbit$/);
  for (const study of caseStudies) {
    await page.goto(`/case-studies/${study.slug}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    await expect(page.locator("h1")).toBeVisible();
  }
  await context.close();
});

test("unknown case study slugs return 404", async ({ page }) => {
  const response = await page.goto("/case-studies/not-a-real-project");
  expect(response?.status()).toBe(404);
});
