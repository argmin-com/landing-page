const ARGMIN_HOST = "argmin.co";

function loadPlausible() {
  const { hostname } = window.location;
  if (!(hostname === ARGMIN_HOST || hostname.endsWith(`.${ARGMIN_HOST}`))) {
    return;
  }

  if (document.querySelector(`script[data-domain="${ARGMIN_HOST}"]`)) {
    return;
  }

  const script = document.createElement("script");
  script.defer = true;
  script.dataset.domain = ARGMIN_HOST;
  script.src = "https://plausible.io/js/script.js";
  document.head.appendChild(script);
}

function setupPlausibleEvents() {
  document.querySelectorAll("[data-plausible-event]").forEach((element) => {
    element.addEventListener("click", () => {
      const eventName = element.getAttribute("data-plausible-event");
      if (eventName) {
        window.plausible?.(eventName);
      }
    });
  });
}

function setupRevealAnimations() {
  const revealNodes = Array.from(document.querySelectorAll(".js-reveal"));
  if (revealNodes.length === 0) {
    return;
  }

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const delay = Number(entry.target.getAttribute("data-reveal-delay") || "0");
        window.setTimeout(() => {
          entry.target.classList.add("is-visible");
        }, delay);

        currentObserver.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.15,
    },
  );

  revealNodes.forEach((node) => observer.observe(node));
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

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    button.disabled = true;
    button.textContent = sendingLabel;
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
      window.plausible?.("form_submit");
    } catch {
      button.disabled = false;
      button.textContent = defaultLabel;
      error.hidden = false;
    }
  });
}

function initialize() {
  document.documentElement.classList.add("js-ready");
  loadPlausible();
  setupPlausibleEvents();
  setupRevealAnimations();
  setupContactForm();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize, { once: true });
} else {
  initialize();
}
