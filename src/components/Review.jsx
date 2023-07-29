/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import { PiStarFourFill } from 'react-icons/pi';
import { SlRefresh } from 'react-icons/sl';
import User from './User';


function Review({ _id, text, rating, status, author, comments, project }) {
    // const navigate = useNavigate();
    const [newStatus, setNewStatus] = useState(status);
    const [newRating, setNewRating] = useState(rating || 0);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    console.log(comments);
    // console.log(JSON.parse(localStorage.getItem('user'))._id, project.author);
    const handleUpdate = async () => {
        try {
            if (status == newStatus && rating == newRating) {
                return;
            }
            setLoadingUpdate(true);
            await axios.put(`${import.meta.env.VITE_API_URL}/api/reviews/${_id}`, { status: newStatus, rating: newRating });
            setLoadingUpdate(false);
            // console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        // <button onClick={(e) => e.stopPropagation()} className='flex p-2 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-full items-center text-xl hover:text-emerald-300 gap-1 mx-3'><FiShare className='transition-all  ' /></button>
        <>
            <div className='p-4 cursor-pointer w-full my-2 rounded max-sm:px-2  border dark:border-neutral-800 border-neutral-300 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/20 flex gap-2 '>

                {/* <img src={author.profilePicture || '/user.png'} alt={author.name} className='sm:w-10  sm:h-10 rounded-full w-8 h-8 aspect-square' /> */}

                <div className='px-2 max-sm:px-0 flex w-full flex-col  gap-1'>
                    <div className='flex justify-between items-center gap-2 w-full'>
                        <User author={author} />
                        {/* <Link to={`/@${author?.username}`} onClick={(e) => e.stopPropagation()} className='text-lg max-sm:text-base max-w-fit font-semibold'>@{author?.username}</Link> */}
                        <div className='flex h-fit items-center gap-2'>
                            {
                                project.author !== JSON.parse(localStorage.getItem('user'))?._id ?
                                    <>
                                        <span className={`rounded-3xl  flex max-w-fit items-center  ${status == "pending" ? "bg-violet-400" : (status == "solved" ? "bg-green-400" : "bg-red-400")} capitalize text-black  py-0.5 px-3 gap-1  transition-all duration-300 shadow-lg`}>
                                            {status}
                                        </span>
                                        {rating && rating != 0 &&
                                            <span className={`rounded-3xl  flex max-w-fit items-center hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-gray-700 py-0.5 px-3 gap-1  transition-all duration-300 shadow-lg`}>
                                                {rating} <PiStarFourFill className='text-yellow-400 text-lg' />
                                            </span>
                                        }
                                    </>
                                    :
                                    <>
                                        <select value={newStatus} name="status" onChange={(e) => {
                                            setNewStatus(e.target.value);
                                        }} className={`rounded-3xl flex items-center   ${newStatus == "pending" ? "bg-violet-400" : (newStatus == "solved" ? "bg-green-400" : "bg-red-400")} py-0.5 capitalize text-black   px-1   transition-all duration-300 shadow-lg`}  >
                                            <option value="pending">pending</option>
                                            <option value="solved">solved</option>
                                            <option value="rejected">rejected</option>
                                        </select>
                                        <select value={newRating} name="status" onChange={(e) => {
                                            setNewRating(e.target.value);
                                        }} className={`rounded-3xl dark:bg-neutral-700  hover:bg-neutral-100 dark:hover:bg-neutral-800  border border-gray-700 py-0.5 px-2 transition-all duration-300 shadow-lg`}  >
                                            <option value={0}>0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        {(newRating != rating || newStatus != status) &&
                                            <>
                                                <button onClick={handleUpdate} className={`rounded-full  capitalize hover:bg-neutral-200 dark:hover:bg-neutral-900  p-2 aspect-square transition-all duration-300 shadow-lg`}><SlRefresh className='text-xl font-bold' /></button>
                                                {loadingUpdate && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>}
                                            </>
                                        }
                                    </>
                            }
                        </div>
                    </div>
                    <p>{text}</p>
                </div>
            </div>
        </>
    );
}

export default Review;
