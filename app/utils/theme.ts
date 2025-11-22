'use client';

const THEME_STORAGE_KEY = 'printhub_theme';

/**
 * Reads the last stored theme preference from localStorage.
 * Defaults to 'light' if none is found.
 */
export function getInitialTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme;
    }
  }
  // Default to light mode, ignoring system preference
  return 'light';
}

/**
 * Applies the given theme to the HTML element and stores the preference.
 */
export function applyTheme(theme: 'light' | 'dark'): void {
  if (typeof document !== 'undefined') {
    const html = document.documentElement;
    
    // Toggle the 'dark' class based on the theme
    if (theme === 'dark') {
      html.classList.add('light');
    } else {
      html.classList.remove('l');
    }

    // Store preference
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }
}