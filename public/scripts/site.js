function trackEvent(name) {
  if (typeof window.plausible === "function") {
    window.plausible(name);
  }
}

function setupCtaTracking() {
  document.querySelectorAll("[data-cta-button]").forEach((cta) => {
    cta.addEventListener("click", () => {
      trackEvent("cta_click");
    });
  });
}

function toTrimmedObject(formData) {
  return Object.fromEntries(
    Array.from(formData.entries(), ([key, value]) => [
      key,
      typeof value === "string" ? value.trim() : value,
    ]),
  );
}

function setupContactForm() {
  const form = document.querySelector("[data-contact-form]");

  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  const endpoint = form.dataset.endpoint?.trim();
  const container = document.querySelector("[data-form-container]");
  const button = form.querySelector("[data-submit-button]");
  const error = form.querySelector("[data-form-error]");

  if (
    !endpoint ||
    !(container instanceof HTMLElement) ||
    !(button instanceof HTMLButtonElement) ||
    !(error instanceof HTMLElement)
  ) {
    return;
  }

  const defaultLabel = form.dataset.defaultLabel || button.textContent || "Get in Touch";
  const sendingLabel = form.dataset.sendingLabel || "Sending...";
  const successMessage = form.dataset.successMessage || "Thank you. We will be in touch shortly.";
  let isSubmitting = false;

  async function submitForm() {
    if (isSubmitting || !form.reportValidity()) {
      return;
    }

    isSubmitting = true;
    button.disabled = true;
    button.textContent = sendingLabel;
    button.setAttribute("aria-busy", "true");
    error.hidden = true;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toTrimmedObject(new FormData(form))),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      const success = document.createElement("p");
      success.className = "form-status-success";
      success.setAttribute("role", "status");
      success.textContent = successMessage;
      container.replaceChildren(success);
      trackEvent("form_submit");
    } catch {
      isSubmitting = false;
      button.disabled = false;
      button.textContent = defaultLabel;
      button.removeAttribute("aria-busy");
      error.hidden = false;
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    void submitForm();
  });

  button.addEventListener("click", (event) => {
    event.preventDefault();
    void submitForm();
  });

  form.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.shiftKey || event.isComposing) {
      return;
    }

    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }

    event.preventDefault();
    void submitForm();
  });
}

function initialize() {
  setupCtaTracking();
  setupContactForm();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize, { once: true });
} else {
  initialize();
}
