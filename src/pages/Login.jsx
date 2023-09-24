/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

export default function Login({ isAuthenticated, setIsAuthenticated }) {
    const [userInfo, setUserInfo] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();

        try {
            let res = await toast.promise(axios.post(`${import.meta.env.VITE_API_URL}/api/sign-in`, userInfo), {
                pending: 'Signing you in...',
                success: "Logged in Successfully!!",
            });
            if (res.data.status) {
                localStorage.clear();
                localStorage.setItem('token', res.data.token);
                setIsAuthenticated(true);
                navigate('/');
            }

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    useEffect(() => {
        if (isAuthenticated === true) {
            toast.success('You are already logged in');
            navigate('/')
        }
    }, [])

    return (
        <>
            <Helmet>
                <title>Devcritique | Login</title>
            </Helmet>

            <div className='max-w-2xl max-md:mx-10 my-10 px-3 py-5 dark:bg-neutral-900 bg-neutral-100 mx-auto rounded-md border dark:border-neutral-800 border-neutral-200 shadow-lg'>
                <h1 className="text-center text-4xl my-2">Login</h1>
                <form className="flex flex-col  justify-center" onSubmit={(e) => loginUser(e)}>

                    <input required type="text" onChange={(e) => {
                        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
                    }} placeholder="Username or Email" name="email" className="w-full px-3 py-1 my-3 rounded-md dark:bg-neutral-800 outline-none transition-all border dark:border-neutral-700 border-neutral-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-200" />
                    <input required type="password" placeholder="Password" onChange={(e) => {
                        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
                    }} name="password" className="w-full px-3 py-1 my-3 rounded-md dark:bg-neutral-800 outline-none transition-all border dark:border-neutral-700 border-neutral-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-200" />

                    <button type="submit" className="w-full px-3 py-1 my-3 text-neutral-200 rounded-md bg-violet-600 hover:bg-violet-500 transition-all duration-300" >Submit</button>
                    <p className="text-sm">Do not have an account? <Link to={'/signup'} className="underline text-violet-400">SignUp</Link></p>
                    <p className="text-sm">Forgot your password? <Link to={'/forgot-password'} className="underline text-violet-400">Reset Password</Link></p>
                </form>
            </div>


        </>
    )
}
