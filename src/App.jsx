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
import { Helmet } from "react-helmet"
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({})
  const navigate = useNavigate();

  const updateUser = () => {
    const token = (localStorage.getItem('token'));
    if (!token) {
      return;
    }
    axios.post(`${import.meta.env.VITE_API_URL}/api/checkToken`, { token: token }).then((res) => {
      if (res.data.status) {
        localStorage.setItem('user', JSON.stringify(res.data.user))
        setUser(res.data.user)
        // console.log(res.data.user);
      } else {
        localStorage.clear()
        setIsAuthenticated(false)
        setUser({})
        toast.error("something went wrong!!")
      }
    }).catch((err) => {
      localStorage.clear()
      setIsAuthenticated(false)
      setUser({})
      console.log(err);
      if (!err.data.response.status) {
        toast.error("something went wrong!!")
        navigate('/');
      }
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
    updateUser();
  }, [isAuthenticated])




  return (

    <>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/icons/site.webmanifest" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <meta name="apple-mobile-web-app-title" content="DevCritique" />
        <meta name="application-name" content="DevCritique" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
        <title>DevCritique - Share and Review Projects for Developers</title>
        <meta name="description"
          content="DevCritique is a platform to share and review websites, apps, and software projects. Get valuable feedback from the community, assign status labels, rate reviews, and earn points for unlocking badges and achievements. Improve your projects with collaborative insights." />
        <meta name="keywords"
          content="DevCritique, review platform, developers, websites, apps, software projects, feedback, collaborative insights, meta tags, badges, achievements" />
        <meta property="og:title" content="DevCritique - Share and Review Projects for Developers" />
        <meta property="og:description"
          content="DevCritique is a platform to share and review websites, apps, and software projects. Get valuable feedback from the community, assign status labels, rate reviews, and earn points for unlocking badges and achievements. Improve your projects with collaborative insights." />
        <meta property="og:image" content="https://devcritique.vercel.app/preview.png" />
        <meta property="og:url" content="https://devcritique.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DevCritique - Share and Review Projects for Developers" />
        <meta name="twitter:description"
          content="DevCritique is a platform to share and review websites, apps, and software projects. Get valuable feedback from the community, assign status labels, rate reviews, and earn points for unlocking badges and achievements. Improve your projects with collaborative insights." />
        <meta name="twitter:image" content="https://devcritique.vercel.app/preview.png" />
        <meta name="twitter:creator" content="@thenileshdarji" />
      </Helmet>

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
        <Route path="/post/:id" element={<Post updateUser={updateUser} />} />
        <Route path="/editprofile" element={<EditProfile user={user} isAuthenticated={isAuthenticated} updateUser={updateUser} />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/:username" element={<Profile user={user} isAuthenticated={isAuthenticated} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
