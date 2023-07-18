import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Post from "./pages/Post"
import Profile from "./pages/Profile"
import { useState } from "react"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import NotFound from "./pages/NotFound"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <>

      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        {!isAuthenticated && <>
          <Route path="/login" element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
        </>}

        <Route path="/post/:id" element={<Post />} />

        <Route path="/notfound" element={<NotFound />} />
        <Route path="/:username" element={<Profile />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
