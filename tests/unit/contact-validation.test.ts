import { describe, it, expect } from "vitest";
import { collectFailures, CONTACT_EMAIL } from "../../scripts/contact-validation.mjs";

describe("CONTACT_EMAIL", () => {
  it("is a valid email address", () => {
    expect(CONTACT_EMAIL).toMatch(/.+@.+\..+/);
  });

  it("is the expected argmin email", () => {
    expect(CONTACT_EMAIL).toBe("contact@argmin.co");
  });
});

describe("collectFailures", () => {
  it("returns empty array when all checks pass", () => {
    const checks = [
      { pass: true, description: "check 1" },
      { pass: true, description: "check 2" },
    ];
    expect(collectFailures(checks)).toEqual([]);
  });

  it("returns descriptions of failed checks", () => {
    const checks = [
      { pass: true, description: "passes" },
      { pass: false, description: "fails A" },
      { pass: true, description: "also passes" },
      { pass: false, description: "fails B" },
    ];
    expect(collectFailures(checks)).toEqual(["fails A", "fails B"]);
  });

  it("returns all descriptions when all checks fail", () => {
    const checks = [
      { pass: false, description: "fail 1" },
      { pass: false, description: "fail 2" },
    ];
    expect(collectFailures(checks)).toEqual(["fail 1", "fail 2"]);
  });

  it("returns empty array for empty input", () => {
    expect(collectFailures([])).toEqual([]);
  });
});
