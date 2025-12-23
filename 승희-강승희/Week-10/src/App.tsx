import './App.css'
import Homepage from './pages/Homepage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MovieDetailPage from './pages/MovieDetailPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: "/:id",
    element: <MovieDetailPage />,
  },
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
