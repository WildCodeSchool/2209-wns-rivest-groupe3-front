import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Articles from './routes/articles'
import Blogs from './routes/blogs'
import Discover from './routes/discover'
import Home from './routes/home'
import Login from './routes/login'
import NotFound from './routes/notFound'
import Profil from './routes/profile'
import Register from './routes/register'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Discover />} path="/discover" />
        <Route element={<Blogs />} path="/blogs" />
        <Route element={<Articles />} path="/articles" />
        <Route element={<Profil />} path="/profile" />
        <Route element={<Register />} path="/register" />
        <Route element={<Login />} path="/login" />
        <Route element={<NotFound />} path="*" />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
