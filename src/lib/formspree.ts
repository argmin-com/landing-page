export const FORMSPREE_ENDPOINT_PATTERN = /^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i;

export function sanitizeFormspreeUrl(value: string | undefined | null) {
  const trimmed = value?.trim() ?? "";
  return FORMSPREE_ENDPOINT_PATTERN.test(trimmed) ? trimmed : "";
}
