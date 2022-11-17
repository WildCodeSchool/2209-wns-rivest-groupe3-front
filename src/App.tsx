import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Blogs from './routes/blogs'
import Home from './routes/home'
import NotFound from './routes/notFound'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Blogs />} path="/blogs" />
        <Route element={<NotFound />} path="*" />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
