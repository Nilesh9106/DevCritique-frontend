import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Post from "./pages/Post"
import Profile from "./pages/Profile"
import { useEffect, useState } from "react"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import NotFound from "./pages/NotFound"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import PostCreate from "./pages/PostCreate"
import EditProfile from "./pages/EditProfile"
import axios from "axios"
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({})

  const updateUser = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/users/${user.username}`).then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setUser(res.data.user)
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    if (!localStorage.getItem("token") || localStorage.getItem("token") == 'undefined') {
      localStorage.clear()
      setIsAuthenticated(false)
      setUser({})
    } else {
      setUser(JSON.parse(localStorage.getItem("user")))
      setIsAuthenticated(true)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (user.username) {
      updateUser();
    }
  }, [])



  return (
    <>

      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} user={user} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        {!isAuthenticated && <>
          <Route path="/login" element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
        </>}

        <Route path="/post/create" element={<PostCreate isAuthenticated={isAuthenticated} user={user} />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/editprofile" element={<EditProfile user={user} isAuthenticated={isAuthenticated} updateUser={updateUser} />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/:username" element={<Profile user={user} isAuthenticated={isAuthenticated} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
