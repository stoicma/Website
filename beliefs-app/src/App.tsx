import { Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import BeliefDetailPage from './pages/BeliefDetailPage'
import BlogPage from './pages/BlogPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/:slug" element={<BeliefDetailPage />} />
    </Routes>
  )
}
