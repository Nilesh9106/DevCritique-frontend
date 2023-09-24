/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import RelativeTime from 'react-relative-time';

export default function User({ author, createdAt }) {
    return (
        <>
            <Link to={`/@${author?.username}`} onClick={(e) => e.stopPropagation()} className="flex gap-3 max-w-fit items-center ">
                <img src={author?.profilePicture || '/user.png'} alt={author?.name} className='w-11 h-11 max-sm:w-10 max-sm:h-10 rounded-full aspect-square object-cover' />
                <div className="flex flex-col  justify-center ">
                    <div className="flex max-sm:flex-col gap-2">
                        <div className='text-lg max-sm:text-sm font-semibold'>{author?.name || author?.username}</div>
                        <div className='text-lg hover:underline flex text-neutral-600  max-sm:hidden'>@{author?.username}</div>
                    </div>
                    <div className='text-sm max-md:text-xs text-neutral-500'><RelativeTime value={createdAt} titleformat="iso8601" /></div>
                </div>
            </Link>
        </>
    )
}
