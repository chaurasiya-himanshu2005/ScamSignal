/**
 * Safe URL detection utility.
 * Extracts URLs and domains from text for display and warning purposes.
 * IMPORTANT: URLs are NEVER visited, loaded, or made clickable by this application.
 */

// Regular expression to match web URLs and common IP address links
const URL_REGEX = /(?:https?:\/\/|www\.)[^\s<>"'()]+|(?:\b[a-zA-Z0-9-]+\.(?:com|org|net|info|biz|ru|cn|xyz|top|site|online|live|vip|club|cc|me|app|link|click|work|rest|cam|lat|pro|win|bid|loan|download|accountant|racing|space)\b[^\s<>"']*)/gi;

/**
 * Extracts all unique URLs and web addresses from a given message text.
 */
export function extractUrls(text: string): string[] {
  if (!text) return [];
  const matches = text.match(URL_REGEX);
  if (!matches) return [];

  // Deduplicate and clean trailing punctuation
  const cleaned = matches.map((url) => {
    return url.replace(/[.,;:!?)]+$/, "");
  });

  return Array.from(new Set(cleaned));
}

/**
 * Defangs a URL so it cannot be inadvertently recognized as a clickable link
 * by messaging clients or markdown parsers (e.g. https://bad.com -> hxxps[://]bad[.]com)
 */
export function defangUrl(url: string): string {
  return url
    .replace(/^https?:\/\//i, (match) => match.toLowerCase().replace("http", "hxxp").replace("://", "[://]"))
    .replace(/\./g, "[.]");
}
