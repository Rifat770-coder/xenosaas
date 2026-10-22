import { test, expect } from "@playwright/test";

for (const width of [320, 360, 700, 701, 740, 767, 768]) {
  test(`navigation remains usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 390 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const cta = page.locator(".nav-cta");
    expect(await cta.evaluate(el => {
      const range = document.createRange();
      range.selectNodeContents(el.firstChild!);
      return range.getClientRects().length;
    })).toBe(1);
    const menu = page.getByRole("button", { name: "Open navigation" });
    if (width < 768) {
      await menu.click();
      await expect(page.locator("#main-navigation")).toBeVisible();
      expect(await page.locator("#main-navigation").evaluate(el => el.getBoundingClientRect().bottom <= innerHeight)).toBeTruthy();
      await page.locator("#main-navigation").getByRole("link", { name: "Blogs", exact: true }).click();
      await expect(page).toHaveURL(/#blogs$/);
      await expect(menu).toHaveAttribute("aria-expanded", "false");
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  });
}

for (const viewport of [{ width: 375, height: 844 }, { width: 844, height: 390 }, { width: 1440, height: 900 }]) {
  test(`dialog stays centered and scrollable at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const trigger = page.locator("#blogs").getByRole("button", { name: "Read preview" }).first();
    await trigger.click();
    const dialog = page.locator("dialog[open]");
    const box = (await dialog.boundingBox())!;
    expect(Math.abs(box.x + box.width / 2 - viewport.width / 2)).toBeLessThan(2);
    expect(box.y).toBeGreaterThanOrEqual(15);
    expect(box.y + box.height).toBeLessThanOrEqual(viewport.height - 15);
    await page.mouse.click(box.x + 8, box.y + 8);
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await trigger.click();
    await page.mouse.click(2, 2);
    await expect(dialog).toHaveCount(0);
  });
}

test("404 offers a readable working return link", async ({ page }) => {
  await page.goto("/not-a-real-page");
  await expect(page.locator("h1")).toContainText("Let's get you");
  await page.getByRole("link", { name: /Return to XenoSaas/ }).click();
  await expect(page).toHaveURL("/");
});
