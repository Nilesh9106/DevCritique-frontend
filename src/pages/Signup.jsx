import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet";

export default function Signup() {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const signupUser = (e) => {
        e.preventDefault();
        setLoading(true)
        axios.post(`${import.meta.env.VITE_API_URL}/api/sign-up`, userInfo).then((res) => {
            console.log(res.data);
            if (res.data.status) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
            setLoading(false);
        }).catch((err) => {
            toast.error(err.response.data.message);
            setLoading(false);
        });
    }
    return (
        <>
            <Helmet>
                <title>Devcritique | Sign up</title>
            </Helmet>
            {loading && <Loading className={'dark:bg-neutral-900/30 bg-neutral-100/30 h-[100vh] fixed top-0 backdrop-blur-[1px]'} />}
            <div className='max-w-2xl max-md:mx-10 my-10 px-3 py-5 dark:bg-neutral-900 bg-neutral-100 mx-auto rounded-md border dark:border-neutral-800 border-neutral-200 shadow-lg'>
                <h1 className="text-center text-4xl my-2">Signup</h1>
                <form className="flex flex-col justify-center" autoComplete="off" onSubmit={(e) => signupUser(e)}>

                    <input required type="text" onChange={(e) => {
                        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
                    }} placeholder="username" name="username" className="w-full px-3 py-1 my-3 rounded-md dark:bg-neutral-800 outline-none transition-all border dark:border-neutral-700 border-neutral-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-200" />
                    <input required type="email" onChange={(e) => {
                        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
                    }} placeholder="Email" name="email" className="w-full px-3 py-1 my-3 rounded-md dark:bg-neutral-800 outline-none transition-all border dark:border-neutral-700 border-neutral-400 focus:border-violet-500 invalid:focus:border-red-500 focus:ring-1 focus:ring-violet-200 invalid:focus:ring-red-200" />
                    <input required type="password" placeholder="Password" onChange={(e) => {
                        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
                    }} name="password" className="w-full px-3 py-1 my-3 rounded-md dark:bg-neutral-800 outline-none transition-all border dark:border-neutral-700 border-neutral-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-200" />

                    <button type="submit" className="w-full px-3 py-1 my-3 text-neutral-200 rounded-md bg-violet-600 hover:bg-violet-500 transition-all duration-300">Submit</button>
                    <p className="text-sm">Already have an account? <Link to={'/login'} className="underline text-violet-400">Login</Link></p>
                </form>
            </div>
        </>
    )
}
