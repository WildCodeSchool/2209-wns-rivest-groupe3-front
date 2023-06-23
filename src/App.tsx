import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Articles from './routes/articles'
import Blogs from './routes/blogs/blogs'
import CreateBlog from './routes/createblog'
import Discover from './routes/discover'
import Home from './routes/home/home'
import Login from './routes/login'
import NotFound from './routes/notFound'
import Profile from './routes/profile'
import UserSettings from './routes/userSettings'
import Register from './routes/register'
import Toaster from './components/Toaster'
import { NotificationContext } from './contexts/NotificationContext'
import { useContext } from 'react'
import Modal from './components/Modal'
import ScrollToTop from './utils/ScrollToTop'
import PublicProfile from './routes/publicProfile'
import ErrorComponent from './components/ErrorComponent'
import { ErrorContext } from './contexts/ErrorContext'

function App() {
  const { message } = useContext(NotificationContext)
  const { error } = useContext(ErrorContext)

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Modal />

      <Navbar />
      <main className="min-h-screen">
        {message && <Toaster />}
        {error ? (
          <ErrorComponent error={error} />
        ) : (
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Discover />} path="/discover" />
            <Route element={<Blogs />} path="/blogs/*" />
            <Route element={<Articles />} path="/articles" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<PublicProfile />} path="/profile/:profileId" />
            <Route element={<UserSettings />} path="/settings" />
            <Route element={<Register />} path="/register" />
            <Route element={<Login />} path="/login" />
            <Route element={<CreateBlog />} path="/createblog" />
            <Route element={<NotFound />} path="*" />
          </Routes>
        )}
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
