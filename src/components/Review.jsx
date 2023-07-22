/* eslint-disable react/prop-types */
import { PiStarFourFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';


function Review({ text, rating, status, author, comments }) {
    // const navigate = useNavigate();
    console.log(comments);


    return (
        // <button onClick={(e) => e.stopPropagation()} className='flex p-2 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-full items-center text-xl hover:text-emerald-300 gap-1 mx-3'><FiShare className='transition-all  ' /></button>
        <>
            <div className='p-4 cursor-pointer w-full rounded max-sm:px-2  border dark:border-neutral-800 border-neutral-300 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/20 flex gap-2 '>

                <img src={author.profilePicture || '/user.png'} alt={author.name} className='sm:w-10  sm:h-10 rounded-full w-8 h-8' />

                <div className='px-2 max-sm:px-0 flex w-full flex-col  gap-1'>
                    <div className='flex justify-between gap-2 w-full'>
                        <Link to={`/@${author?.username}`} onClick={(e) => e.stopPropagation()} className='text-lg max-sm:text-base max-w-fit font-semibold'>@{author?.username}</Link>
                        <div className='flex gap-3'>
                            <span className={`rounded-3xl  flex max-w-fit items-center  bg-${status == "pending" ? "violet" : (status == "solved" ? "green" : "red")}-400 text-black  py-0.5 px-3 gap-1  transition-all duration-300 shadow-lg`}>
                                {status}
                            </span>
                            {rating &&
                                <span className={`rounded-3xl  flex max-w-fit items-center hover:bg-neutral-100 dark:hover:bg-neutral-800 text-black border border-gray-700 py-0.5 px-3 gap-1  transition-all duration-300 shadow-lg`}>
                                    {rating} <PiStarFourFill className='text-yellow-400 text-lg' />
                                </span>
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
