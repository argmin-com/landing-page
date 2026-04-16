import { describe, it, expect } from "vitest";
import { navGroups, footerLinks, siteSummary } from "../../src/content/site";

describe("navGroups", () => {
  it("is a non-empty array", () => {
    expect(navGroups.length).toBeGreaterThan(0);
  });

  it("each group has a label and non-empty items", () => {
    for (const group of navGroups) {
      expect(group.label).toBeTruthy();
      expect(group.items.length).toBeGreaterThan(0);
    }
  });

  it("every nav item has a label and href starting with /", () => {
    for (const group of navGroups) {
      for (const item of group.items) {
        expect(item.label).toBeTruthy();
        expect(item.href).toMatch(/^\//);
      }
    }
  });

  it("has no duplicate hrefs across all groups", () => {
    const allHrefs = navGroups.flatMap((g) => g.items.map((i) => i.href));
    expect(new Set(allHrefs).size).toBe(allHrefs.length);
  });

  it("contains expected product routes", () => {
    const allHrefs = navGroups.flatMap((g) => g.items.map((i) => i.href));
    expect(allHrefs).toContain("/platform");
    expect(allHrefs).toContain("/use-cases");
  });

  it("contains expected company routes", () => {
    const allHrefs = navGroups.flatMap((g) => g.items.map((i) => i.href));
    expect(allHrefs).toContain("/about");
    expect(allHrefs).toContain("/contact");
  });

  it("no nav item references /demo (should be /contact)", () => {
    const allHrefs = navGroups.flatMap((g) => g.items.map((i) => i.href));
    expect(allHrefs).not.toContain("/demo");
  });
});

describe("footerLinks", () => {
  it("is a non-empty array", () => {
    expect(footerLinks.length).toBeGreaterThan(0);
  });

  it("every link has a label and href starting with /", () => {
    for (const link of footerLinks) {
      expect(link.label).toBeTruthy();
      expect(link.href).toMatch(/^\//);
    }
  });

  it("has no duplicate hrefs", () => {
    const hrefs = footerLinks.map((l) => l.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("includes privacy link", () => {
    const hrefs = footerLinks.map((l) => l.href);
    expect(hrefs).toContain("/privacy");
  });

  it("no footer link references /demo", () => {
    const hrefs = footerLinks.map((l) => l.href);
    expect(hrefs).not.toContain("/demo");
  });
});

describe("siteSummary", () => {
  it("has a non-empty brand name", () => {
    expect(siteSummary.brand).toBeTruthy();
    expect(siteSummary.brand).toBe("Argmin");
  });

  it("has a non-empty description", () => {
    expect(siteSummary.description).toBeTruthy();
    expect(siteSummary.description.length).toBeGreaterThan(20);
  });
});
