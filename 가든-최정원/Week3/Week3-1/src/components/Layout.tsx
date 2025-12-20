import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout(): JSX.Element {
  return (
    <div>
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
