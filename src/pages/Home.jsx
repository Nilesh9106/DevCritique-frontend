/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import Project from "../components/Project"
import axios from "axios";
import Loading from "../components/Loading";



export default function Home() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getProjects() {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`);
            setProjects(response.data);
            // console.log(response.data);
        } catch (error) {
            // Handle error if the request fails
            console.error('Error fetching projects:', error.message);
            return null;
        }
        setLoading(false);
    }
    useEffect(() => {
        getProjects();
    }, [])


    return (
        <>

            {loading && <Loading />}
            <div className="dark:bg-neutral-900 rounded border dark:border-neutral-800 lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-md max-sm:px-2 my-2 mx-auto">
                <h1 className="text-3xl border-b dark:border-neutral-800 p-3">Home</h1>
                {projects.map((project, index) => {
                    // console.log(project);
                    return <Project key={index} {...project} />
                })}
            </div>
        </>
    )
}
