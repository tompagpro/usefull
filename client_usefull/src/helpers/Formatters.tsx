// Display helpers: they only format data for the UI, no side effects

// "https://www.react.dev/learn" -> "react.dev"
export const getDomain = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    // Not a valid absolute URL: show it as is rather than crash the list
    return url;
  }
};

// "2026-10-28T10:00:00Z" -> "28 oct. 26"
export const formatShortDate = (date: Date | string) =>
  new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "2-digit"
  });
