/* eslint-disable react/prop-types */
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setIsAuthenticated }) {
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();

    const loginUser = (e) => {
        e.preventDefault();
        console.log(userInfo);
        setIsAuthenticated(true);
        navigate('/');
    }
    return (
        <>
            <div className='max-w-2xl max-md:mx-10 my-10 px-3 py-5 dark:bg-neutral-900 bg-neutral-100 mx-auto rounded-md border dark:border-neutral-800 border-neutral-200 shadow-lg'>
                <h1 className="text-center text-4xl my-2">Login</h1>
                <form className="flex flex-col  justify-center" onSubmit={(e) => loginUser(e)}>

                    <input required type="text" onChange={(e) => {
                        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
                    }} placeholder="username" name="username" className="w-full px-3 py-1 my-3 rounded-md dark:bg-neutral-800 outline-none transition-all border dark:border-neutral-700 border-neutral-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200" />
                    <input required type="password" placeholder="Password" onChange={(e) => {
                        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
                    }} name="password" className="w-full px-3 py-1 my-3 rounded-md dark:bg-neutral-800 outline-none transition-all border dark:border-neutral-700 border-neutral-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200" />

                    <button type="submit" className="w-full px-3 py-1 my-3 text-neutral-200 rounded-md bg-emerald-600 hover:bg-emerald-500 transition-all duration-300" >Submit</button>
                    <p className="text-sm">Do not have an account? <Link to={'/signup'} className="underline text-emerald-400">SignUp</Link></p>
                </form>
            </div>

        </>
    )
}
