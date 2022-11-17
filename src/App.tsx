import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Blogs from './routes/blogs'
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
        <Route element={<Blogs />} path="/blogs" />
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
