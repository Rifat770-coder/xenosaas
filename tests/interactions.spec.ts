import { test, expect } from "@playwright/test";

test("client marquee pauses on hover, focus and manual control", async ({ page }) => {
  await page.goto("/");
  const row = page.getByRole("region", { name: "Demonstration client logos, row 1" });
  await row.scrollIntoViewIfNeeded();
  const track = row.locator('[class*="track"]');
  await page.mouse.move(0, 0);
  await expect(track).toHaveCSS("animation-play-state", "running");
  await row.hover();
  await expect(track).toHaveCSS("animation-play-state", "paused");
  await page.mouse.move(0, 0);
  await row.focus();
  await expect(track).toHaveCSS("animation-play-state", "paused");
  await page.getByRole("button", { name: "Pause logo animation" }).click();
  await expect(track).toHaveCSS("animation-play-state", "paused");
  await page.getByRole("button", { name: "Play logo animation" }).click();
  await expect(track).toHaveCSS("animation-play-state", "running");
});

test("reduced motion makes client rows manually scrollable", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const row = page.getByRole("region", { name: "Demonstration client logos, row 1" });
  await row.scrollIntoViewIfNeeded();
  await expect(row.locator('[class*="track"]')).toHaveCSS("animation-name", "none");
  await row.evaluate(el => el.scrollLeft = 150);
  expect(await row.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
});

test("mobile navigation closes with Escape and restores keyboard focus", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeFocused();
  await expect(page.locator("#main-navigation")).not.toBeVisible();
});

test("all service links and testimonial dots use their configured destinations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const link of await page.locator(".service-card").all()) await expect(link).toHaveAttribute("href", "#contact");
  for (const index of [2, 1]) {
    const dot = page.getByRole("button", { name: `Show testimonial ${index}` });
    await dot.click();
    await expect(dot).toHaveAttribute("aria-current", "true");
    await expect(page.locator("#testimonials strong")).toHaveText([index === 1 ? "Sample client" : "Sample partner"]);
  }
  await page.getByRole("link", { name: "BACK TO TOP" }).click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
});
