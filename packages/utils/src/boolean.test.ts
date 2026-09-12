import { describe, expect, it } from "vitest"

import { readBoolean } from "./boolean.js"

// 把同一个函数的测试组织在一起
describe("readBoolean", () => {
  // 描述一个具体行为
  it('returns true for "true"', () => {
    // 断言实际结果是否符合预期
    expect(readBoolean("true")).toBe(true)
  })

  it('returns false for "false"', () => {
    expect(readBoolean("false")).toBe(false)
  })
})
