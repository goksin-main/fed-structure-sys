import { useEffect, useMemo, useState, type ReactNode } from "react"

import {
  applyTheme,
  readStoredTheme,
  ThemeContext,
  themeStorageKey,
  type Theme,
  type ThemeContextValue,
} from "@/app/providers/theme-context"

/** ThemeProvider 组件入参 */
type ThemeProviderProps = {
  /** 需要共享主题状态的子树 */
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // 惰性初始化：仅首次渲染时从 localStorage 读取，避免每次 render 都读存储
  const [theme, setTheme] = useState<Theme>(() => readStoredTheme())
  useEffect(() => {
    applyTheme(theme)
    window.localStorage.setItem(themeStorageKey, theme)
  }, [theme])

  // 缓存 Context value，避免 theme 未变时触发无关消费者重渲染
  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
