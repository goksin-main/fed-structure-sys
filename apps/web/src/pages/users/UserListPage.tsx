import { useQuery } from "@tanstack/react-query"
import { Link, useSearchParams } from "react-router"

import type { UserListScenario } from "@/entities/user"
import { getUsers } from "@/entities/user"
import { PageTitle } from "@/shared/ui"

function readScenario(value: string | null): UserListScenario {
  if (value === "empty" || value === "error") {
    return value
  }

  return "success"
}

export function UserListPage() {
  // 读取当前 URL 的查询参数，例如 /users?scenario=empty → { scenario: "empty" }
  const [searchParams] = useSearchParams()
  // 将 scenario 查询参数归一化为合法枚举值，详见 readScenario
  const scenario = readScenario(searchParams.get("scenario"))
  const usersQuery = useQuery({
    queryKey: ["users", scenario],
    queryFn: () => getUsers(scenario),
    retry: false,
  })

  return (
    <main>
      <PageTitle title="用户" subtitle="Users are loaded through the shared request layer." />

      <nav aria-label="User list scenarios">
        <Link to="/users">成功</Link> <Link to="/users?scenario=empty">数据为空</Link>{" "}
        <Link to="/users?scenario=error">错误</Link>
      </nav>

      {usersQuery.isPending ? <p>加载用户列表中...</p> : null}

      {usersQuery.isError ? (
        <section>
          <p>加载用户列表失败</p>
          <button type="button" onClick={() => usersQuery.refetch()}>
            重试
          </button>
        </section>
      ) : null}

      {usersQuery.isSuccess && usersQuery.data.length === 0 ? <p>未找到相关用户</p> : null}

      {usersQuery.isSuccess && usersQuery.data.length > 0 ? (
        <ul>
          {usersQuery.data.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> - {user.email} - {user.role} - {user.status}
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  )
}
