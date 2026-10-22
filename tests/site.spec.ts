import { test, expect } from "@playwright/test";
for (const width of [320, 375, 430, 600, 768, 1024, 1280, 1440, 1920]) {
  test(`layout and content at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page
        .locator("main > section")
        .evaluateAll((els) => els.map((e) => e.id)),
    ).toEqual([
      "home",
      "work",
      "clients",
      "testimonials",
      "services",
      "pricing",
      "blogs",
      "case-studies",
    ]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
    await expect(page.locator(".service-card")).toHaveCount(6);
    await expect(page.locator(".blog-card")).toHaveCount(3);
    for (const image of await page
      .locator(".project-image img,.blog-image img")
      .all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty("complete", true);
      expect(
        await image.evaluate((el: HTMLImageElement) => el.naturalWidth),
      ).toBeGreaterThan(0);
    }
    expect(await page.locator("body").innerText()).not.toMatch(
      /\u00e2\u20ac|\u00c2\u00a9|\u00c2\u00b7/,
    );
    expect(errors).toEqual([]);
  });
}
test("dialogs, carousel, mobile menu and contact", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "View project" }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByRole("button", { name: "Read preview" }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close details" }).last().click();
  await page.getByRole("button", { name: "Next testimonial" }).click();
  await expect(page.locator("#testimonials strong")).toHaveText(
    ["Sample partner"],
  );
  await page.getByRole("region", { name: "Sample testimonials" }).focus();
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator("#testimonials strong")).toHaveText(
    ["Sample client"],
  );
  await expect(
    page.getByRole("link", { name: "Start a project" }),
  ).toHaveAttribute("href", "https://wa.me/8801329433091");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .locator("#main-navigation")
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
});
test("reduced motion and local anchors", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page
      .locator("[data-workspace-reveal]")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  const broken = await page
    .locator('a[href^="#"]')
    .evaluateAll((els) =>
      els
        .map((e) => e.getAttribute("href")!)
        .filter((h) => !document.getElementById(h.slice(1))),
    );
  expect(broken).toEqual([]);
});

