import { createBrowserRouter } from "react-router"

import { MainLayout } from "@/app/layouts/MainLayout"
import { RequireAuth } from "@/app/router/RequireAuth"
import { HomePage } from "@/pages/home"
import { NotFoundPage } from "@/pages/not-found"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true, // index: true 表示它是父路由 / 的默认页面。
        Component: HomePage,
      },
      {
        // 表示这一组子路由先经过 RequireAuth
        Component: RequireAuth,
        children: [
          {
            path: "settings",
            lazy: async () => {
              const { SettingsPage } = await import("@/pages/settings")
              return { Component: SettingsPage }
            },
          },
        ],
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
])
