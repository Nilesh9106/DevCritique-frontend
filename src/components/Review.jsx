/* eslint-disable react/prop-types */
import axios from 'axios';
import { useContext, useState } from 'react';
import { PiStarFourFill } from 'react-icons/pi';
import { SlClose, SlRefresh } from 'react-icons/sl';
import User from './User';
import { GoCommentDiscussion } from 'react-icons/go'
import Sheet from 'react-modal-sheet';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import UserContext from '../MyContext';
import { MdDelete } from 'react-icons/md';
import { BiSolidUpvote } from 'react-icons/bi';


const snapPoints = [-120, 0.5, 0];
const initialSnap = 0;


function Review({ _id, text, rating, status, author, project, comments, onDelete, createdAt, upVote, upVoteCount }) {
    // const navigate = useNavigate();
    const { user, isAuthenticated } = useContext(UserContext);
    const [newStatus, setNewStatus] = useState(status);
    const [newRating, setNewRating] = useState(rating || 'null');
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [commentList, setCommentList] = useState(comments);
    const [loadingUpVote, setLoadingUpVote] = useState(false);
    const [upVoteState, setUpVoteState] = useState({
        upVote: upVote ?? [],
        upVoteCount: upVoteCount ?? 0,
    })
    const [Comment, setComment] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef();


    // console.log(comments);
    // console.log(newRating, newStatus, rating, status);
    const doComment = async () => {
        if (Comment == "") {
            return;
        }
        if (isAuthenticated) {
            const obj = {
                review: _id, comment: {
                    username: user.username,
                    text: Comment,
                }
            }
            try {
                const response = await toast.promise(axios.post(`${import.meta.env.VITE_API_URL}/api/comments`, obj), {
                    pending: 'Uploading comment...',
                    success: "Comment added successfully!!",
                    error: 'Error uploading comment!!',
                });
                setCommentList(response.data.comments);
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
            if ((newStatus == 'rejected' || newStatus == "pending") && newRating != 'null') {
                setNewRating('null');
            }

            setLoadingUpdate(true);
            await axios.put(`${import.meta.env.VITE_API_URL}/api/reviews/${_id}`, { status: newStatus, rating: newRating == 'null' ? null : newRating }, { headers: { 'Authorization': localStorage.getItem('token') } });

            setLoadingUpdate(false);
            // console.log(res.data);
        } catch (error) {
            console.log(error);
            setLoadingUpdate(false);
        }
    }

    const deleteReview = () => {
        if (confirm("Are you sure to delete this review?")) {
            try {
                axios.delete(`${import.meta.env.VITE_API_URL}/api/reviews/${_id}`, { headers: { 'Authorization': localStorage.getItem('token') } });
                toast.success("Review deleted successfully!!");
                onDelete();
            } catch (error) {
                console.log(error);
                toast.error("something went wrong!!");
            }
        }
    }

    const handleUpVote = async () => {
        if (loadingUpVote) {
            return;
        }
        if (isAuthenticated == false) {
            toast.warn("Please login to upvote!!");
            return;
        }
        setLoadingUpVote(true);
        if (upVoteState.upVote.includes(user._id)) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/reviews/downvote/${_id}`, { userId: user._id }, { headers: { 'Authorization': localStorage.getItem('token') } });
                setUpVoteState({
                    upVote: response.data.upVote,
                    upVoteCount: response.data.upVoteCount,
                });
                // console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/reviews/upvote/${_id}`, { userId: user._id }, { headers: { 'Authorization': localStorage.getItem('token') } });
                setUpVoteState({
                    upVote: response.data.upVote,
                    upVoteCount: response.data.upVoteCount,
                });
                // console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        setLoadingUpVote(false);
    }
    return (
        <>
            <div className='px-4 pt-4 pb-2 transition-colors dark:bg-neutral-900 bg-neutral-50 w-full m-2 rounded-xl max-sm:px-2  border dark:border-neutral-800 border-neutral-300 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40 flex gap-2 '>

                <div className='px-2 max-sm:px-0 flex w-full flex-col  gap-1'>
                    <div className='flex justify-between flex-wrap items-center gap-2 w-full'>
                        <User author={author} createdAt={createdAt} />
                        <div className='flex h-fit items-center gap-2'>
                            {
                                project.author !== user?._id ?
                                    <>
                                        <span className={`rounded-3xl  flex max-w-fit items-center  ${status == "pending" ? "bg-violet-400" : (status == "solved" ? "bg-green-400" : "bg-red-400")} capitalize text-black  py-0.5 px-3 gap-1  transition-all duration-300 shadow-lg max-sm:text-sm`}>
                                            {status}
                                        </span>
                                        {rating && rating != 0 &&
                                            <span className={`rounded-3xl  flex max-w-fit items-center hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-gray-700 py-0.5 px-3 gap-1  transition-all duration-300 shadow-lg max-sm:text-sm`}>
                                                {rating} <PiStarFourFill className='text-yellow-400 text-lg' />
                                            </span>
                                        }
                                    </>
                                    :
                                    <>
                                        <select value={newStatus} name="status" onChange={(e) => {
                                            setNewStatus(e.target.value);
                                        }} className={`rounded-3xl flex items-center   ${newStatus == "pending" ? "bg-violet-400" : (newStatus == "solved" ? "bg-green-400" : "bg-red-400")} py-0.5 capitalize text-black   px-1   transition-all max-sm:text-sm duration-300 shadow-lg`}  >
                                            <option value="pending">pending</option>
                                            <option value="solved">solved</option>
                                            <option value="rejected">rejected</option>
                                        </select>
                                        {
                                            newStatus == 'solved' && (
                                                <select value={newRating} name="status" onChange={(e) => {
                                                    setNewRating(e.target.value);
                                                }} className={`rounded-3xl w-14 z-20 appearance-none dark:text-white text-black dark:bg-neutral-900 hover:bg-neutral-100   border border-gray-700 py-0.5 px-2 transition-all duration-300 shadow-lg max-sm:text-sm`}  >
                                                    <option value={'null'}>0</option>
                                                    <option value={'1'}>1</option>
                                                    <option value={'2'}>2</option>
                                                    <option value={'3'}>3</option>
                                                    <option value={'4'}>4</option>
                                                    <option value={'5'}>5</option>
                                                </select>
                                            )
                                        }
                                        {(newRating != `${rating}` || newStatus != status) &&
                                            <>
                                                <button onClick={handleUpdate} className={`rounded-full  capitalize hover:bg-neutral-200 dark:hover:bg-neutral-900  p-2 aspect-square transition-all duration-300 shadow-lg`}><SlRefresh className='text-xl max-sm:text-base font-bold' /></button>
                                                {loadingUpdate && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>}
                                            </>
                                        }
                                    </>
                            }
                            {user?._id == author._id &&
                                <button onClick={deleteReview} className={`rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-900  p-2 aspect-square transition-all duration-300 shadow-lg `}><MdDelete className='text-xl max-sm:text-base font-bold' /></button>
                            }
                        </div>
                    </div>
                    <p className='max-sm:text-sm px-2 py-3'>{text}</p>

                    <div className='flex mt-2 pt-2 justify-around border-t dark:border-neutral-800'>
                        <button onClick={handleUpVote} className='flex gap-1 px-3 py-2 rounded-xl items-center dark:hover:bg-neutral-800/30 hover:bg-neutral-200'>
                            <BiSolidUpvote className={`text-xl  ${upVoteState.upVote.includes(user._id) ? 'text-green-500' : ""}`} />
                            <span className='w-5 h-5 text-sm flex justify-center items-center '>{upVoteState.upVoteCount}</span>
                            {loadingUpVote && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-violet-700"></div>}
                        </button>
                        <button onClick={() => setIsOpen(!isOpen)} className='flex gap-1  px-3 py-2 rounded-xl items-center dark:hover:bg-neutral-800/30 hover:bg-neutral-200'>
                            <GoCommentDiscussion className='text-xl' />
                            <span className='w-5 h-5 text-sm flex justify-center items-center '>{commentList.length}</span>
                        </button>
                    </div>

                </div>
            </div>
            <Sheet ref={ref} snapPoints={snapPoints} initialSnap={initialSnap} isOpen={isOpen} onClose={() => setIsOpen(false)} >
                <Sheet.Container style={{ backgroundColor: localStorage.getItem("theme") == "dark" ? "#141414" : "white" }}>
                    <Sheet.Header >
                        <div className='flex flex-col relative py-2'>
                            <h1 className='text-2xl my-2 text-center'>Discuss</h1>
                            <div className='flex gap-3 sm:w-2/3 w-full max-sm:px-3 items-center mx-auto'>
                                <input value={Comment} onChange={(e) => setComment(e.target.value)} type="text" className='w-[80%] px-3 py-1 my-2 rounded-md dark:bg-neutral-900 outline-none transition-all border dark:border-neutral-800 border-neutral-400 focus:border-violet-500 focus:ring-1 focus:ring-neutral-700' />
                                <button onClick={doComment} className='w-[20%] px-2 py-1.5 my-2 text-neutral-200 rounded-md bg-violet-600 hover:bg-violet-500 transition-all duration-300 max-sm:text-sm'>
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
                                {
                                    commentList.length == 0 ?
                                        <p className="text-center text-violet-600 text-2xl block "> No comment yet!!</p>
                                        :
                                        commentList.map((value, index) => {
                                            return <CommentBox key={index} {...value} />
                                        })
                                }
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
