import { createContext } from "react"

/** 应用支持的主题枚举 */
export type Theme = "light" | "dark" | "brand"

/** ThemeContext 对外暴露的值 */
export type ThemeContextValue = {
  /** 当前主题 */
  theme: Theme
  /** 切换主题 */
  setTheme: (theme: Theme) => void
}

/** 主题在 localStorage 中的存储键 */
export const themeStorageKey = "frontend-engineering-system2:theme"

/** 主题 React Context，未包裹 Provider 时值为 null */
export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark" || value === "brand"
}

export function readStoredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light"
  }

  const storedTheme = window.localStorage.getItem(themeStorageKey)

  return isTheme(storedTheme) ? storedTheme : "light"
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
}
