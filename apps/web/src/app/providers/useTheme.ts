import { ThemeContext } from "@/app/providers/theme-context"
import { useContext } from "react"

export function useTheme() {
  const value = useContext(ThemeContext)

  // Context 默认值为 null，说明外层缺少 ThemeProvider
  if (!value) {
    throw new Error("useTheme must be used within ThemeProvider")
  }

  return value
}
