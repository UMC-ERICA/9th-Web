import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import MoviePage from "./pages/MoviePage"
import MovieDetailPage from "./pages/MovieDetailPage"
import LoginPage from "./pages/LoginPage"   

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/popular" element={<MoviePage type="popular" />} />
        <Route path="/upcoming" element={<MoviePage type="upcoming" />} />
        <Route path="/top-rated" element={<MoviePage type="top_rated" />} />
        <Route path="/now-playing" element={<MoviePage type="now_playing" />} />
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
        <Route path="/login" element={<LoginPage />} /> 
      </Route>
    </Routes>
  )
}
