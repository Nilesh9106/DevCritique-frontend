/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md'
import User from './User';
import axios from 'axios';
import { toast } from 'react-toastify';
import UserContext from '../MyContext';
import { useContext } from 'react';


function OpenGraphDetails({ removeProject, setLoading, description, link, author, _id, ogDetails, technologies }) {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const deleteProject = async () => {
        if (confirm("Are You sure to delete this Project?")) {
            try {
                setLoading(true);
                let res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/projects/${_id}`, { headers: { Authorization: localStorage.getItem("token") } });
                toast.success(res.data.message);
                removeProject();
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    }

    return (
        <>
            <div onClick={() => navigate(`/post/${_id}`)} className='p-4 cursor-pointer rounded max-sm:px-2 w-full border dark:border-neutral-800 border-neutral-300 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/20 flex gap-2 '>

                <div className='px-2 max-sm:px-0 flex flex-col w-full  gap-2'>
                    <div className='flex justify-between'>
                        <User author={author} />
                        {user && author.username == user.username &&
                            <button onClick={(e) => {
                                e.stopPropagation();
                                deleteProject();
                            }} className='p-2 w-10 h-10 rounded-full hover:bg-neutral-200 transition-all dark:hover:bg-neutral-900'>
                                <MdDelete className='text-2xl ' />
                            </button>
                        }
                    </div>

                    <p className='max-sm:text-sm line-clamp-4'>{description}</p>
                    <div className='flex gap-2 flex-wrap'>
                        {technologies.map((data, index) => {
                            return <span onClick={(e) => {
                                e.stopPropagation();
                            }} key={index} className='rounded-3xl  flex max-w-fit items-center bg-violet-300 hover:scale-95 text-black py-0.5 my-1 px-3  gap-1  transition-all duration-300 shadow-lg'>
                                {data}
                            </span>
                        })}
                    </div>

                    {ogDetails?.title ? (
                        <Link to={link} target='_blank' onClick={(e) => { e.stopPropagation() }} className='flex gap-3 max-sm:flex-wrap items-center border w-full dark:border-neutral-800 rounded my-2 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800/50' rel="noreferrer">
                            {ogDetails.image && (
                                <img src={ogDetails.image} alt={ogDetails.title} className="sm:h-32  max-sm:w-full rounded" />
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
