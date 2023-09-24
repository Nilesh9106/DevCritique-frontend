import axios from "axios";
import { useState } from "react";
import Project from "../components/Project"
import Loading from "../components/Loading";
import { CgSearch } from "react-icons/cg";
import { Helmet } from "react-helmet";


function Search() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("")
    const search = async () => {
        if (query == "") return;
        setLoading(true);
        let res = await axios.get(`${import.meta.env.VITE_API_URL}/api/search/description/${query}`);
        setProjects(res.data);
        setLoading(false);
    }
    return (
        <>
            <Helmet>
                <title>Devcritique | Search</title>
            </Helmet>
            <div className='w-full  dark:bg-neutral-900/60 bg-neutral-100/60 p-3 flex justify-center items-center'>
                <input type="text" onKeyDown={(e) => {
                    // console.log(e.key);
                    if (e.key == "Enter") {
                        search();
                    }
                }} onChange={(e) => setQuery(e.target.value.trim())} value={query} placeholder='Search...' className=' rounded-md sm:w-[60%] w-full px-3 py-2 dark:bg-neutral-800 bg-neutral-200 outline-none  transition-all border-none focus:ring-2 focus:ring-neutral-700' />
                <button onClick={search} className="p-2 mx-2 flex justify-center items-center rounded-full dark:hover:bg-neutral-800 hover:bg-white"><CgSearch className="text-2xl" /></button>
            </div>
            {projects.length == 0 && <p className="text-3xl text-violet-600 text-center m-3">No Project Found</p>}
            {loading && <Loading text={`Searching for ${query}...`} />}
            {!loading && <div className=" mx-auto lg:w-[60%] px-2 sm:w-3/4 w-full flex flex-col justify-center items-center  pb-2">
                {projects.map((project, index) => {
                    // project.author = project.author[0];
                    return <Project key={index} removeProject={() => {
                        projects.slice(index, 1);
                        setProjects(projects);
                    }} setLoading={setLoading} _id={project._id} author={project.author[0]} link={project.link} description={project.description} ogDetails={project.ogDetails} technologies={project.technologies} />
                })}
            </div>}
        </>
    )
}

export default Search