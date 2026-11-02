// Theme names must match the DaisyUI themes declared in tailwind.config.js
export const LIGHT_THEME = "usefull";
export const DARK_THEME = "usefull-dark";
export type Theme = typeof LIGHT_THEME | typeof DARK_THEME;

const STORAGE_KEY = "theme";

// Saved choice first, then the system preference (macOS / Windows dark mode)
export const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem(STORAGE_KEY);
  // Older versions saved "light" / "night": ignore anything we don't know
  if (saved === LIGHT_THEME || saved === DARK_THEME) {
    return saved;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? DARK_THEME
    : LIGHT_THEME;
};

export const applyTheme = (theme: Theme) => {
  // DaisyUI reads the data-theme attribute on <html>
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_KEY, theme);
};
