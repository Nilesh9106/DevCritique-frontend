import { Route, Routes, useNavigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Post from "./pages/Post"
import Profile from "./pages/Profile"
import { useEffect, useState } from "react"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import NotFound from "./pages/NotFound"
import { ToastContainer, toast, Slide } from "react-toastify"
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
import ForgotPassword from "./pages/ForgotPassword"


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState({})
  const [sidebar, setSidebar] = useState(false);
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
      if (err.code == "ERR_NETWORK") {
        console.log(err, err.code);
        toast.error("No internet connection!!")
        navigate('/');
        return;
      } else {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
        setUser({})
        console.log(err);
        toast.error("something went wrong!!")
        navigate('/');
      }
    })
  }

  useEffect(() => {
    updateUser();
    // console.log("getting info");
  }, [isAuthenticated])


  return (

    <UserContext.Provider value={{ user: user, updateUser: updateUser, isAuthenticated: isAuthenticated }}>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} sidebar={sidebar} setSidebar={setSidebar} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Slide}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      <Routes>
        {isAuthenticated === null ?
          <Route path="*" element={<Loading className={'dark:bg-neutral-900 bg-neutral-100 h-[100vh] fixed top-0'} text={"initial Loading..."} />} />
          :
          <>
            <Route path="/" element={<Home sidebar={sidebar} setSidebar={setSidebar} />} />
            <Route path="/login" element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<Signup isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/search" element={<Search />} />
            <Route path="/post/create" element={<PostCreate />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/notfound" element={<NotFound />} />
            <Route path="/technologies/:technology" element={<Technologies />} />
            <Route path="/:username" element={<Profile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:uniqueString" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </>
        }
      </Routes>

      <Footer />
    </UserContext.Provider>
  )
}

export default App
