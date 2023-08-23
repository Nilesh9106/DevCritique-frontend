/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import { PiStarFourFill } from 'react-icons/pi';
import { SlClose, SlRefresh } from 'react-icons/sl';
import User from './User';
import { GoCommentDiscussion } from 'react-icons/go'
import Sheet from 'react-modal-sheet';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import Loading from "./Loading"
import { Link } from 'react-router-dom';


const snapPoints = [-120, 0.5, 0];
const initialSnap = 0;


function Review({ _id, text, rating, status, author, project, comments, updateUser }) {
    // const navigate = useNavigate();
    const [newStatus, setNewStatus] = useState(status);
    const [newRating, setNewRating] = useState(rating || '0');
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [commentList, setCommentList] = useState(comments);
    const [loadingComment, setLoadingComment] = useState(false);
    const [Comment, setComment] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef();


    // console.log(comments);
    const doComment = async () => {
        if (Comment == "") {
            return;
        }
        await updateUser();
        if (localStorage.getItem("token")) {
            const obj = {
                review: _id, comment: {
                    username: JSON.parse(localStorage.getItem("user")).username,
                    text: Comment,
                }
            }

            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/comments`, obj);
                setCommentList(response.data.comments);
                toast.success("comment added successfully!!");

            } catch (error) {
                console.log(error);
                toast.error("something went wrong!!");
            }

        } else {
            toast.warn("Please login to comment!!");
            return;
        }
    }
    const handleUpdate = async () => {
        try {
            if (status == newStatus && rating == newRating) {
                return;
            }
            setLoadingUpdate(true);
            await axios.put(`${import.meta.env.VITE_API_URL}/api/reviews/${_id}`, { status: newStatus, rating: newRating }, { headers: { 'Authorization': localStorage.getItem('token') } });
            await updateUser();
            setLoadingUpdate(false);
            // console.log(res.data);
        } catch (error) {
            console.log(error);
            setLoadingUpdate(false);
        }
    }

    return (
        <>
            <div className='p-4 cursor-pointer w-full my-2 rounded max-sm:px-2  border dark:border-neutral-800 border-neutral-300 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/20 flex gap-2 '>

                <div className='px-2 max-sm:px-0 flex w-full flex-col  gap-1'>
                    <div className='flex justify-between items-center gap-2 w-full'>
                        <User author={author} />
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
                                        {
                                            newStatus == 'solved' && (
                                                <select value={newRating} name="status" onChange={(e) => {
                                                    setNewRating(e.target.value);
                                                }} className={`rounded-3xl w-14 z-20 appearance-none dark:text-white text-black dark:bg-neutral-900 hover:bg-neutral-100   border border-gray-700 py-0.5 px-2 transition-all duration-300 shadow-lg`}  >
                                                    <option value={'0'}>0</option>
                                                    <option value={'1'}>1</option>
                                                    <option value={'2'}>2</option>
                                                    <option value={'3'}>3</option>
                                                    <option value={'4'}>4</option>
                                                    <option value={'5'}>5</option>
                                                </select>
                                            )
                                        }
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
                    <p className='max-sm:text-sm line-clamp-4'>{text}</p>
                    <div>
                        <button onClick={() => setIsOpen(!isOpen)} className='flex gap-3 mt-2 px-3 py-1 rounded-xl items-center dark:hover:bg-neutral-800 hover:bg-neutral-200'><GoCommentDiscussion className='text-xl' /> <span>Discuss</span></button>
                    </div>
                </div>
            </div>
            <Sheet ref={ref} snapPoints={snapPoints} initialSnap={initialSnap} isOpen={isOpen} onClose={() => setIsOpen(false)} >
                <Sheet.Container style={{ backgroundColor: localStorage.getItem("theme") == "dark" ? "#121212" : "white" }}>
                    <Sheet.Header >
                        {loadingComment && <Loading />}
                        <div className='flex flex-col relative py-2'>
                            <h1 className='text-2xl my-2 text-center'>Discuss</h1>
                            <div className='flex gap-3 sm:w-2/3 w-full max-sm:px-3 items-center mx-auto'>
                                <input value={Comment} onChange={(e) => setComment(e.target.value)} type="text" className='w-[80%] px-3 py-1 my-2 rounded-md dark:bg-neutral-900 outline-none transition-all border dark:border-neutral-800 border-neutral-400 focus:border-violet-500 focus:ring-1 focus:ring-neutral-700' />
                                <button onClick={async () => {
                                    setLoadingComment(true);
                                    await doComment();
                                    setLoadingComment(false);
                                }} className='w-[20%] px-2 py-1.5 my-2 text-neutral-200 rounded-md bg-violet-600 hover:bg-violet-500 transition-all duration-300 max-sm:text-sm'>
                                    Comment
                                </button>
                            </div>
                            <button onClick={() => setIsOpen(false)} className='absolute top-5 right-5 p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full'>
                                <SlClose className='text-2xl' />
                            </button>
                        </div>
                    </Sheet.Header>
                    <Sheet.Content style={{ paddingBottom: ref.current?.y }} >
                        <Sheet.Scroller>
                            <div className='sm:w-2/3 w-full max-sm:px-3 flex flex-col gap-4 mx-auto'>
                                {commentList.map((comment, index) => {
                                    return <div key={index}>
                                        {CommentBox(comment)}
                                    </div>;
                                })}
                            </div>
                        </Sheet.Scroller>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>

        </>
    );
}

const CommentBox = (comment) => {
    return <div className='flex flex-col dark:bg-neutral-800 bg-neutral-200/70 rounded-xl px-5 py-3 gap-2 '>
        <Link to={`/@${comment.username}`} className='hover:underline underline-offset-2'>@{comment.username}</Link>
        <p className='max-sm:text-sm line-clamp-4'>{comment.text}</p>
    </div>
}

export default Review;
