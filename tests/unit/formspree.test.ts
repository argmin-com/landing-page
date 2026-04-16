import { describe, it, expect } from "vitest";
import {
  FORMSPREE_ENDPOINT_PATTERN,
  sanitizeFormspreeUrl,
} from "../../src/lib/formspree";

describe("FORMSPREE_ENDPOINT_PATTERN", () => {
  it("matches a valid Formspree endpoint", () => {
    expect(FORMSPREE_ENDPOINT_PATTERN.test("https://formspree.io/f/abc123")).toBe(true);
  });

  it("matches uppercase form IDs", () => {
    expect(FORMSPREE_ENDPOINT_PATTERN.test("https://formspree.io/f/ABC123")).toBe(true);
  });

  it("matches mixed-case form IDs", () => {
    expect(FORMSPREE_ENDPOINT_PATTERN.test("https://formspree.io/f/aBc123")).toBe(true);
  });

  it("rejects HTTP (non-HTTPS) URLs", () => {
    expect(FORMSPREE_ENDPOINT_PATTERN.test("http://formspree.io/f/abc123")).toBe(false);
  });

  it("rejects URLs with trailing slash", () => {
    expect(FORMSPREE_ENDPOINT_PATTERN.test("https://formspree.io/f/abc123/")).toBe(false);
  });

  it("rejects URLs with extra path segments", () => {
    expect(FORMSPREE_ENDPOINT_PATTERN.test("https://formspree.io/f/abc123/extra")).toBe(false);
  });

  it("rejects URLs with query parameters", () => {
    expect(FORMSPREE_ENDPOINT_PATTERN.test("https://formspree.io/f/abc123?key=val")).toBe(false);
  });

  it("rejects non-Formspree domains", () => {
    expect(FORMSPREE_ENDPOINT_PATTERN.test("https://evil.io/f/abc123")).toBe(false);
  });

  it("rejects subdomains of formspree.io", () => {
    expect(FORMSPREE_ENDPOINT_PATTERN.test("https://sub.formspree.io/f/abc123")).toBe(false);
  });

  it("rejects empty form IDs", () => {
    expect(FORMSPREE_ENDPOINT_PATTERN.test("https://formspree.io/f/")).toBe(false);
  });

  it("rejects form IDs with special characters", () => {
    expect(FORMSPREE_ENDPOINT_PATTERN.test("https://formspree.io/f/abc-123")).toBe(false);
    expect(FORMSPREE_ENDPOINT_PATTERN.test("https://formspree.io/f/abc_123")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(FORMSPREE_ENDPOINT_PATTERN.test("")).toBe(false);
  });

  it("rejects random text", () => {
    expect(FORMSPREE_ENDPOINT_PATTERN.test("not-a-url")).toBe(false);
  });
});

describe("sanitizeFormspreeUrl", () => {
  it("returns a valid Formspree URL unchanged", () => {
    expect(sanitizeFormspreeUrl("https://formspree.io/f/abc123")).toBe(
      "https://formspree.io/f/abc123",
    );
  });

  it("trims leading and trailing whitespace", () => {
    expect(sanitizeFormspreeUrl("  https://formspree.io/f/abc123  ")).toBe(
      "https://formspree.io/f/abc123",
    );
  });

  it("returns empty string for undefined", () => {
    expect(sanitizeFormspreeUrl(undefined)).toBe("");
  });

  it("returns empty string for null", () => {
    expect(sanitizeFormspreeUrl(null)).toBe("");
  });

  it("returns empty string for empty string", () => {
    expect(sanitizeFormspreeUrl("")).toBe("");
  });

  it("returns empty string for whitespace-only input", () => {
    expect(sanitizeFormspreeUrl("   ")).toBe("");
  });

  it("returns empty string for invalid URLs", () => {
    expect(sanitizeFormspreeUrl("http://formspree.io/f/abc123")).toBe("");
    expect(sanitizeFormspreeUrl("https://evil.io/f/abc123")).toBe("");
    expect(sanitizeFormspreeUrl("not-a-url")).toBe("");
  });

  it("returns empty string for Formspree URLs with trailing slash", () => {
    expect(sanitizeFormspreeUrl("https://formspree.io/f/abc123/")).toBe("");
  });
});
