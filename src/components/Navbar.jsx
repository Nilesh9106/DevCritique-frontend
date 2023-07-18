/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { CgProfile, CgSun } from 'react-icons/cg'
import { FiPlus } from 'react-icons/fi';
import { PiMoonStarsDuotone } from 'react-icons/pi'
import { Link } from 'react-router-dom';

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [dropDown, setDropDown] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark') {
            setIsDarkTheme(true);
        }
    }, [])

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkTheme) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkTheme]);

    return (
        <>
            <nav className="dark:bg-neutral-900/60 sticky top-0 h-16 bg-neutral-100/60 backdrop-blur-sm flex  justify-between items-center sm:px-10 px-4 py-3 ">
                <Link to={'/'} className="text-2xl">
                    DEV CRITIQUE
                </Link>
                <div className='flex items-center'>
                    <input type="text" placeholder='Search...' className='max-md:hidden rounded-md  mx-3 px-3 py-1 dark:bg-neutral-800 border dark:border-neutral-700 border-neutral-400  focus:ring-1 dark:focus:ring-neutral-800 focus:ring-neutral-500 outline-none w-64 focus:w-80 transition-all' />
                    <button onClick={() => { setIsDarkTheme(!isDarkTheme) }} className='p-2 rounded-full dark:hover:bg-neutral-800 hover:bg-white'>{isDarkTheme ? <CgSun className='text-2xl' /> : <PiMoonStarsDuotone className='text-2xl' />}</button>
                    <button className='p-2 rounded-full dark:hover:bg-neutral-800 hover:bg-white'><FiPlus className='text-2xl' /></button>
                    <button onClick={() => setDropDown(!dropDown)} className='p-2 rounded-full dark:hover:bg-neutral-800 hover:bg-white'><CgProfile className='text-2xl' /></button>
                </div>
            </nav>
            <div className={` ${dropDown ? 'scale-100 ' : 'scale-0'} transition-all fixed top-10 right-7 z-10 mt-10 w-80 origin-top-right rounded-md border border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 dark:text-gray-100 shadow-lg`} >

                {!isAuthenticated &&
                    <div className="p-2">
                        <div className='flex justify-center'>
                            <CgProfile className='text-7xl my-3' />
                        </div>
                        <p className="text-2xl  text-center font-bold">Sign Up in your DevCritique Account</p>
                        <div className="flex gap-3 my-4 justify-center ">
                            <Link to="/signup" onClick={() => setDropDown(false)} className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-emerald-500 rounded-3xl shadow-md hover:bg-emerald-400 hover:scale-95 transition-all">Sign up</Link>
                            <Link to="/login" onClick={() => setDropDown(false)} className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-emerald-500 rounded-3xl shadow-md hover:bg-emerald-400 hover:scale-95 transition-all">Log in</Link>
                        </div>
                    </div>}

                {isAuthenticated && <ul className="p-2 flex flex-col ">
                    <p className='text-lg px-3 py-2 '>Nilesh</p>
                    <hr />
                    <Link to={'/@nilesh'} onClick={() => setDropDown(false)} className='px-3 py-2 rounded-md dark:hover:bg-neutral-800 hover:bg-neutral-50 transition-all '>Profile</Link>
                    <Link to={'/'} onClick={() => { setIsAuthenticated(false); setDropDown(false) }} className='px-3 py-2 text-red-500 rounded-md dark:hover:bg-neutral-800 hover:bg-neutral-50 transition-all '>Logout</Link>
                </ul>
                }

            </div>
            <div className='md:hidden w-full dark:bg-neutral-900/60 bg-neutral-100/60 p-3'>
                <input type="text" placeholder='Search...' className=' rounded-md w-full px-3 py-1 dark:bg-neutral-800 outline-none transition-all border dark:border-neutral-700 border-neutral-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200' />
            </div>
        </>
    )
}
