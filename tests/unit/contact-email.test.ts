import { describe, it, expect } from "vitest";
import { CONTACT_EMAIL } from "../../src/lib/contact";
import { CONTACT_EMAIL as VALIDATOR_CONTACT_EMAIL } from "../../scripts/contact-validation.mjs";

describe("CONTACT_EMAIL", () => {
  it("is a valid email address", () => {
    expect(CONTACT_EMAIL).toMatch(/.+@.+\..+/);
  });

  it("is the expected argmin email", () => {
    expect(CONTACT_EMAIL).toBe("contact@argmin.co");
  });

  it("matches the email used by the contact validator", () => {
    expect(CONTACT_EMAIL).toBe(VALIDATOR_CONTACT_EMAIL);
  });
});
