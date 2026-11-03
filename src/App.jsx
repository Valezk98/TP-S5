import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './components/views/Home/Home'
import About from './components/views/About'
import Err404 from './components/views/Err404'


export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Err404 />} />
      </Route>
    </Routes>
  )
}
