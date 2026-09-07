import { env } from "@/shared/config"
import { PageTitle } from "@/shared/ui"

export function HomePage() {
  return (
    <main>
      <PageTitle title="frontend-engineering-system" subtitle="工程管理实战" />
      <p>Path alias is working.</p>
      <dl>
        <dt>Environment: </dt>
        <dd>{env.appEnv}</dd>
        <dt>API Base URL: </dt>
        <dd>{env.apiBaseUrl}</dd>
        <dt>Mock Enabled: </dt>
        <dd>{env.enableMock ? "yes" : "no"}</dd>
      </dl>
    </main>
  )
}
