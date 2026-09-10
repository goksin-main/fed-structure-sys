# @fed-structure-sys/utils

Shared utility functions for frontend-engineering-system.

## Installation

```bash
pnpm add @fed-structure-sys/utils
```

## Usage

### `readBoolean`

将字符串字面量 `"true"` 或 `"false"` 转换为对应的布尔值。

```ts
import { readBoolean } from "@fed-structure-sys/utils"

const enabled = readBoolean("true")
const disabled = readBoolean("false")

console.log(enabled) // true
console.log(disabled) // false
```

### `sleep`

返回一个在指定毫秒数后完成的 `Promise<void>`，适合在异步流程中添加延迟。

```ts
import { sleep } from "@fed-structure-sys/utils"

async function run() {
  console.log("开始")
  await sleep(1000)
  console.log("约 1 秒后执行")
}

await run()
```
