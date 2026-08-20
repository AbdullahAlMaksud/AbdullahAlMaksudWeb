/**
 * Utility to resolve image keys from the database or API to full Vercel Blob URLs or local static asset paths.
 */

const BLOB_BASE_URL =
  process.env.NEXT_PUBLIC_BLOB_BASE_URL ||
  (process.env.AAM_STORE_ID
    ? `https://${process.env.AAM_STORE_ID.replace(/^store_/, "").toLowerCase()}.public.blob.vercel-storage.com`
    : "https://3nkxplqsj14xq0dc.public.blob.vercel-storage.com");

export function getImageUrl(
  pathOrKey?: string | null,
  fallback: string = "/images/portrait.png"
): string {
  if (!pathOrKey || typeof pathOrKey !== "string" || pathOrKey.trim() === "") {
    return fallback;
  }

  const trimmed = pathOrKey.trim();

  // If already an absolute URL (http, https, data URI, blob URI)
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:")
  ) {
    return trimmed;
  }

  // Local assets that are known to exist in /public/images/
  if (
    trimmed === "/images/portrait.png" ||
    trimmed === "/images/portrait-full.png" ||
    trimmed === "images/portrait.png" ||
    trimmed === "images/portrait-full.png"
  ) {
    return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  }

  // Strip leading slash for cloud key resolution
  const cleanKey = trimmed.startsWith("/") ? trimmed.slice(1) : trimmed;

  if (BLOB_BASE_URL) {
    const cleanBase = BLOB_BASE_URL.endsWith("/") ? BLOB_BASE_URL.slice(0, -1) : BLOB_BASE_URL;
    return `${cleanBase}/${cleanKey}`;
  }

  return `/${cleanKey}`;
}
