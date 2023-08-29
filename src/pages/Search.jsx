import axios from "axios";
import { useState } from "react";
import Project from "../components/Project"
import Loading from "../components/Loading";


function Search() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    const search = async (e) => {
        const query = e.target.value.trim();
        if (query == "") return;
        setLoading(true);
        let res = await axios.get(`${import.meta.env.VITE_API_URL}/api/search/description/${query}`);
        setProjects(res.data);
        setLoading(false);
    }
    return (
        <>
            <div className='w-full  dark:bg-neutral-900/60 bg-neutral-100/60 p-3 flex justify-center'>
                <input type="text" onChange={search} placeholder='Search...' className=' rounded-md sm:w-[60%] w-full px-3 py-1 dark:bg-neutral-800 bg-neutral-200 outline-none  transition-all border-none focus:ring-2 focus:ring-neutral-700' />
            </div>
            {projects.length == 0 && <p className="text-3xl text-violet-600 text-center m-3">No Project Found</p>}
            {loading && <Loading />}
            {!loading && <div className="dark:bg-neutral-900 rounded border dark:border-neutral-800 lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-md max-sm:px-2 my-2 mx-auto">
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