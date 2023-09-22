import { Route, Routes, useNavigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Post from "./pages/Post"
import Profile from "./pages/Profile"
import { useEffect, useState } from "react"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import NotFound from "./pages/NotFound"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import PostCreate from "./pages/PostCreate"
import EditProfile from "./pages/EditProfile"
import axios from "axios"
import Footer from "./components/Footer"
import UserContext from "./MyContext"
import Search from "./pages/Search"
import Technologies from "./pages/technologies"
import Loading from "./components/Loading"
import ResetPassword from "./pages/ResetPassword"


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState({})
  const navigate = useNavigate();

  const updateUser = () => {
    const token = (localStorage.getItem('token'));
    if (!token) {
      setUser({});
      setIsAuthenticated(false);
      return;
    }
    axios.post(`${import.meta.env.VITE_API_URL}/api/checkToken`, { token: token }).then((res) => {
      if (res.data.status) {
        setUser(res.data.user)
        setIsAuthenticated(true);
      } else {
        localStorage.clear()
        setIsAuthenticated(false)
        setUser({})
        toast.error("something went wrong!!")
        navigate("/")
      }
    }).catch((err) => {
      localStorage.clear()
      setIsAuthenticated(false)
      setUser({})
      console.log(err);
      toast.error("something went wrong!!")
      navigate('/');
    })
  }

  useEffect(() => {
    updateUser();
    // console.log("getting info");
  }, [isAuthenticated])


  return (

    <UserContext.Provider value={{ user: user, updateUser: updateUser, isAuthenticated: isAuthenticated }}>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
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
        {isAuthenticated === null ?
          <Route path="*" element={<Loading className={'dark:bg-neutral-900 bg-neutral-100 h-[100vh] fixed top-0'} text={"initial Loading..."} />} />
          :
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<Signup isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/search" element={<Search />} />
            <Route path="/post/create" element={<PostCreate />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/notfound" element={<NotFound />} />
            <Route path="/technologies/:technology" element={<Technologies />} />
            <Route path="/:username" element={<Profile />} />
			<Route path="/reset-password/:UniqueString" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </>
        }
      </Routes>

      <Footer />
    </UserContext.Provider>
  )
}

export default App
