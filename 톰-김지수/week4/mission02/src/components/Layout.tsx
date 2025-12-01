import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

export default function Layout() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-zinc-900 dark:text-zinc-100">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
