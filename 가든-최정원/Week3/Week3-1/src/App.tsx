import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import MoviesPage from './pages/moviespage'

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MoviesPage />} /> {/* 기본 홈 */}
        <Route path="popular" element={<MoviesPage />} />
        <Route path="upcoming" element={<MoviesPage />} />
        <Route path="top-rated" element={<MoviesPage />} />
        <Route path="now-playing" element={<MoviesPage />} />
      </Route>
    </Routes>
  )
}