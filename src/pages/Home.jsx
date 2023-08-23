/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import Project from "../components/Project"
import axios from "axios";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet";



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
            <Helmet>
                <title>DevCritique - Share and Review Projects for Developers</title>
                <meta name="description"
                    content="DevCritique is a platform to share and review websites, apps, and software projects. Get valuable feedback from the community, assign status labels, rate reviews, and earn points for unlocking badges and achievements. Improve your projects with collaborative insights." />
                <meta name="keywords"
                    content="DevCritique, review platform, developers, websites, apps, software projects, feedback, collaborative insights, meta tags, badges, achievements" />
            </Helmet>
            <div className="dark:bg-neutral-900 rounded border dark:border-neutral-800 lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-md max-sm:px-2 my-2 mx-auto">
                <h1 className="text-3xl border-b dark:border-neutral-800 p-3">Home</h1>
                {loading && <Loading />}
                {projects.map((project, index) => {
                    // console.log(project);
                    return <Project key={index} removeProject={() => {
                        projects.splice(index, 1)
                        setProjects(projects);
                    }} setLoading={setLoading} {...project} />
                })}
            </div>
        </>
    )
}
