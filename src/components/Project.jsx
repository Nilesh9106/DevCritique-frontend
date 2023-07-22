/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom';


function OpenGraphDetails({ description, link, author, _id, ogDetails }) {
    const navigate = useNavigate();


    return (
        // <button onClick={(e) => e.stopPropagation()} className='flex p-2 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-full items-center text-xl hover:text-emerald-300 gap-1 mx-3'><FiShare className='transition-all  ' /></button>
        <>
            <div onClick={() => navigate(`/post/${_id}`)} className='p-4 cursor-pointer rounded max-sm:px-2  border dark:border-neutral-800 border-neutral-300 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/20 flex gap-2 '>

                <img src={author.profilePicture || '/user.png'} alt={author.name} className='sm:w-10 rounded-full sm:h-10 w-8 h-8' />

                <div className='px-2 max-sm:px-0 flex flex-col  gap-1'>
                    <Link to={`/@${author?.username}`} onClick={(e) => e.stopPropagation()} className='text-lg max-sm:text-base max-w-fit font-semibold'>@{author?.username}</Link>

                    <p>{description}</p>

                    {ogDetails?.title ? (
                        <Link to={link} target='_blank' onClick={(e) => { e.stopPropagation() }} className='flex gap-3 max-sm:flex-wrap items-center border  dark:border-neutral-800 rounded my-2 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800/50' rel="noreferrer">
                            {ogDetails.image && (
                                <img src={ogDetails.image} alt={ogDetails.title} className="sm:h-32 max-sm:w-full rounded" />
                            )}
                            <div className='flex flex-col justify-center '>
                                <h2 className="text-xl max-sm:text-base font-semibold line-clamp-1">{ogDetails.title}</h2>
                                <p className="text-gray-700 dark:text-gray-300 max-sm:text-sm  line-clamp-3">{ogDetails.description}</p>
                            </div>
                        </Link>
                    ) :
                        <Link to={link} className='underline underline-offset-2 text-violet-500'>{link}</Link>
                    }
                </div>
            </div>
        </>
    );
}

export default OpenGraphDetails;
