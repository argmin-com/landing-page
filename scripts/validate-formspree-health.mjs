/**
 * Validates that the Formspree endpoint is reachable and not returning
 * server errors. Skips if PUBLIC_FORMSPREE_URL is not set (same contract
 * as the other contact validators).
 */

const endpoint = process.env.PUBLIC_FORMSPREE_URL?.trim();

if (!endpoint) {
  console.log("Formspree health check skipped (PUBLIC_FORMSPREE_URL not set).");
  process.exit(0);
}

try {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  const response = await fetch(endpoint, {
    method: "HEAD",
    signal: controller.signal,
  });
  clearTimeout(timeout);

  if (response.status === 404 || response.status >= 500) {
    console.error(`Formspree health check failed: endpoint returned ${response.status} ${response.statusText}`);
    process.exit(1);
  }

  // 2xx, 3xx, 4xx all indicate the endpoint exists and is responsive.
  // Formspree returns 405 for HEAD on some plans, 200 for others — both are fine.
  console.log(`Formspree health check passed (status ${response.status}).`);
} catch (error) {
  if (error.name === "AbortError") {
    console.error("Formspree health check failed: request timed out after 10 seconds");
  } else {
    console.error(`Formspree health check failed: ${error.message}`);
  }
  process.exit(1);
}
