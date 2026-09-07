export const DIRECTUS_URL =
  import.meta.env.VITE_DIRECTUS_URL || "https://directus-production-6ce1.up.railway.app";

export function getDirectusAssetUrl(urlOrId?: string | null): string | null {
  if (!urlOrId) return null;
  if (urlOrId.startsWith("http://") || urlOrId.startsWith("https://")) {
    return urlOrId;
  }
  return `${DIRECTUS_URL}/assets/${urlOrId}`;
}
