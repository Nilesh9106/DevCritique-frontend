/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

export default function PostCreate({ isAuthenticated, user }) {
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [project, setProject] = useState({
        link: "",
        author: "",
        description: "",
        technologies: []
    })
    const navigate = useNavigate();
    const handleSubmit = (element) => {
        element.preventDefault();

        setLoading(true);
        axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, project).then((res) => {
            console.log(res.data);
            toast.success("Project Posted Successfully");
            navigate(`/post/${res.data._id}`);
            setLoading(false);
        }).catch((err) => {
            toast.error(err.response.data.message);
            setLoading(false);
        });
    }

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            setProject({ ...project, author: user._id })
        }
    }, [])

    return (
        <>
            {loading && <Loading />}
            <div className='max-w-2xl max-md:mx-5 my-10 px-3 py-5 dark:bg-neutral-900 bg-neutral-100 mx-auto rounded-md border dark:border-neutral-800 border-neutral-200 shadow-lg'>
                <h1 className='text-3xl '>Post Project</h1>
                <form onSubmit={handleSubmit}>

                    <textarea name="description" onChange={(e) => {
                        setProject({ ...project, [e.target.name]: e.target.value })
                    }} placeholder='Description of your project' className='w-full resize-none px-3 py-1 my-3 rounded-md dark:bg-neutral-800 outline-none transition-all border dark:border-neutral-700 border-neutral-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-200' cols="30" rows="10">

                    </textarea>
                    <input required type="url" placeholder="Link of Your Project" onChange={(e) => {
                        setProject({ ...project, [e.target.name]: e.target.value })
                    }} name="link" className="w-full px-3 py-1 my-3 rounded-md dark:bg-neutral-800 outline-none transition-all border dark:border-neutral-700 border-neutral-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-200" />

                    <div className="flex gap-2 flex-wrap">{project.technologies.map((value, index) => {
                        return <span key={index} className="rounded-3xl  flex max-w-fit items-center  bg-violet-400 text-black py-0.5 px-3 gap-1  transition-all duration-300 shadow-lg ">
                            <span className="pb-0.5">{value}</span>
                            <button onClick={() => {
                                project.technologies.splice(index, 1);
                                setProject({ ...project, technologies: project.technologies });
                            }} className="p-1 rounded-full hover:bg-violet-500 transition-all">
                                <IoClose className="text-lg text-gray-900" />
                            </button>
                        </span>
                    })}</div>
                    <input type="text" placeholder="Add technologies separated by , (comma) " onKeyDown={(e) => {
                        if (e.key == 'Enter' || e.key == ',') {
                            e.preventDefault();
                            let val = input.trim()
                            if (val) {
                                setProject({ ...project, technologies: [...project.technologies, val] });
                            }
                            setInput('');
                        }
                    }} name="technologies" value={input} onChange={(e) => setInput(e.target.value)} className="w-full px-3 py-1 my-3 rounded-md dark:bg-neutral-800 outline-none transition-all border dark:border-neutral-700 border-neutral-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-200" />

                    <button type="submit" className="w-full px-3 py-1 my-3 text-neutral-200 rounded-md bg-violet-600 hover:bg-violet-500 transition-all duration-300" >Submit</button>
                </form>
            </div>
        </>
    )
}