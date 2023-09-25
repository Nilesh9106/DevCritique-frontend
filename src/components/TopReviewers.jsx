/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";

export default function TopReviewers({ sidebar, setSidebar, desktop }) {
    const [loading, setLoading] = useState(false)
    const [topUsers, setTopUsers] = useState([])


    const getTopUsers = async () => {
        setLoading(true);
        try {
            let res = await axios.get(`${import.meta.env.VITE_API_URL}/api/topUsers`);
            if (res.status === 200) {
                // console.log(res.data);
                setTopUsers(res.data);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }



    useEffect(() => {
        getTopUsers();
    }, [])
    // console.log(sidebar, desktop);

    return (
        <>
            {desktop ?
                <div className="lg:flex lg:flex-col hidden w-[25rem] ">
                    <h1 className="text-3xl p-3 dark:bg-neutral-900 w-[25rem] bg-neutral-50 rounded-xl border dark:border-neutral-800 border-neutral-300">Top Reviewers</h1>
                    <div className="dark:bg-neutral-900 bg-neutral-50 rounded-xl border my-2 dark:border-neutral-800 border-neutral-300">
                        {loading ? <Loading width={60} height={60} /> :
                            <div className="flex flex-col gap-4 p-2">
                                {topUsers.length === 0 && <h1 className="text-lg">No Top Reviewers Yet!!</h1>}
                                {topUsers.map((user, index) => {
                                    return <Link to={`/@${user.username}`} key={index} className="flex gap-2 items-center">
                                        <img src={user.profilePicture} alt="profile" className="w-10 h-10 rounded-full object-cover" />
                                        <div className="flex flex-col">
                                            <h1 className="text-lg hover:underline underline-offset-auto">{user.name ?? user.username}</h1>
                                            <p className="text-sm text-gray-500">Dev Score: {user.points}</p>
                                        </div>
                                    </Link>
                                })}
                            </div>
                        }
                    </div>
                </div>
                :
                <motion.div initial={{ translateX: "-100%" }} transition={{ type: "just" }} exit={{ translateX: "-100%" }} animate={{ translateX: sidebar ? 0 : "-100%" }} className="absolute top-0 right-0 left-0 z-40 bg-white p-2 dark:bg-neutral-900  h-screen flex flex-col w-full" >
                    <MdClose className="text-3xl m-3" onClick={() => setSidebar(false)} />
                    <h1 className="text-3xl p-3 dark:bg-neutral-900 bg-neutral-50 rounded-xl border dark:border-neutral-800 border-neutral-300">Top Reviewers</h1>
                    <div className="dark:bg-neutral-900 bg-neutral-50 rounded-xl border my-2 dark:border-neutral-800 border-neutral-300">
                        {loading ? <Loading width={60} height={60} /> :
                            <div className="flex flex-col gap-4 p-2">
                                {topUsers.map((user, index) => {
                                    return <Link to={`/@${user.username}`} key={index} className="flex gap-2 items-center">
                                        <img src={user.profilePicture} alt="profile" className="w-10 h-10 rounded-full object-cover" />
                                        <div className="flex flex-col">
                                            <h1 className="text-lg hover:underline underline-offset-auto">{user.name ?? user.username}</h1>
                                            <p className="text-sm text-gray-500">Dev Score: {user.points}</p>
                                        </div>
                                    </Link>
                                })}

                            </div>
                        }
                    </div>
                </motion.div>

            }
        </>
    )
}
