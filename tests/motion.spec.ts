import { test, expect } from "@playwright/test";

test("workspace resets and reveals on each scroll cycle", async ({ page }) => {
  await page.goto("/");
  const panel = page.locator("[data-workspace-reveal]");
  for (let cycle = 0; cycle < 2; cycle++) {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(panel).toHaveCSS("visibility", "hidden");
    await page.evaluate(() => window.scrollTo({ top: 90, behavior: "instant" }));
    await expect(panel).toHaveCSS("visibility", "visible");
    await expect(panel).toHaveCSS("opacity", "1");
  }
});

test("reduced motion keeps section content readable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const heading of await page.locator("main h2:not(dialog h2)").all()) {
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  }
});

test("section content reveals again after leaving and revisiting the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  for (const selector of ["#work article", "#clients .scroll-reveal", ".services-grid>.scroll-reveal", ".pricing-grid>.scroll-reveal", "#testimonials .scroll-reveal", "#case-studies .scroll-reveal", "#contact .scroll-reveal"]) {
    const content = page.locator(selector).first();
    for (let cycle = 0; cycle < 2; cycle++) {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await expect(content).toHaveCSS("opacity", "0");
      await content.evaluate(element => {
        const rect = element.getBoundingClientRect();
        window.scrollTo({ top: window.scrollY + rect.top - 150, behavior: "instant" });
      });
      await expect.poll(async () => Number(await content.evaluate(element => getComputedStyle(element).opacity))).toBeGreaterThan(0);
      await expect(content).toHaveCSS("opacity", "1");
    }
  }
});

test("cards reveal progressively with their existing stagger", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const samples = await page.evaluate(async () => {
    const grid = document.querySelector(".services-grid")!;
    const cards = Array.from(grid.children).slice(0, 3);
    window.scrollTo({
      top: grid.getBoundingClientRect().top + window.scrollY - 260,
      behavior: "instant",
    });
    const values: number[][] = [];
    const start = performance.now();
    while (performance.now() - start < 1600) {
      await new Promise(requestAnimationFrame);
      values.push(cards.map((c) => Number(getComputedStyle(c).opacity)));
    }
    return values;
  });
  expect(samples.some(([a, b]) => a > b + 0.1)).toBeTruthy();
  expect(samples.some(([, b, c]) => b > c + 0.1)).toBeTruthy();
  for (const value of samples.at(-1)!) expect(value).toBeCloseTo(1, 4);
});

test("keyboard focus reveals content without waiting for its stagger", async ({
  page,
}) => {
  await page.goto("/");
  const service = page.locator(".service-card").last();
  await service.focus();
  await expect(service.locator("..")).toHaveCSS("opacity", "1");
  await expect(service).toBeFocused();
});

test("pricing has Basic, featured Pro and Enterprise with working configured CTAs", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#pricing .pricing-card")).toHaveCount(3);
  await expect(page.locator("#pricing h3")).toHaveText(["Basic", "Pro", "Enterprise"]);
  await expect(page.locator("#pricing .pricing-badge")).toHaveText("Recommended");
  await expect(page.locator("#pricing .pricing-card strong")).toHaveText(["$10", "$50", "Contract"]);
  await expect(page.locator("#pricing .pricing-card").first()).toContainText("/month");
  for (const name of ["Basic", "Pro", "Enterprise"]) {
    const label = name === "Enterprise" ? "Contact sales for Enterprise" : `Get started with ${name}`;
    const link = page.getByRole("link", { name: label });
    const href = await link.getAttribute("href");
    const target = new URL(href!);
    expect(target.origin + target.pathname).toBe("https://wa.me/8801329433091");
    expect(target.searchParams.get("text")).toBe(`I'd like to discuss the ${name} support plan.`);
  }
  await expect(page.locator("#pricing")).not.toContainText("USD pricing pending approval");
  await expect(page.locator("#pricing")).toContainText("Proposed ongoing support packages");
});


test("blog image-reveal cards enter once and preserve preview dialogs", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const cards = page.locator("#blogs .blog-grid > div");
  await expect(cards).toHaveCount(3);
  await expect(cards.first()).toHaveCSS("opacity", "0");
  await cards.first().scrollIntoViewIfNeeded();
  await expect(cards.first()).toHaveCSS("opacity", "1");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(200);
  await expect(cards.first()).toHaveCSS("opacity", "1");
  await cards.first().getByRole("button", { name: "Read preview" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
