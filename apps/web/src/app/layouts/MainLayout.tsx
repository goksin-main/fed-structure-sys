import { NavLink, Outlet } from "react-router"

export function MainLayout() {
  return (
    <div>
      <header>
        <strong>frontend-engineering-system2</strong>
        <nav aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </nav>
      </header>
      <Outlet />
    </div>
  )
}
