import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
