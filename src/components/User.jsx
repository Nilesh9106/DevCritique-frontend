/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";


export default function User({ author }) {
    return (
        <>
            <Link to={`/@${author?.username}`} onClick={(e) => e.stopPropagation()} className="flex gap-3 max-w-fit items-center ">
                <img src={author?.profilePicture || '/user.png'} alt={author?.name} className='w-11 h-11 max-sm:w-10 max-sm:h-10 rounded-full aspect-square' />
                <div className="flex max-sm:flex-col sm:gap-1  justify-center ">
                    <div className='text-lg max-sm:text-sm font-semibold'>{author?.name || author?.username}</div>
                    <div className='text-lg hover:underline  text-neutral-600  max-sm:text-sm'>@{author?.username}</div>
                </div>
            </Link>
        </>
    )
}
