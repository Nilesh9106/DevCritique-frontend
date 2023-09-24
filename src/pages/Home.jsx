/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import Project from "../components/Project"
import axios from "axios";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet";
import TopReviewers from "../components/TopReviewers";



export default function Home({ sidebar, setSidebar }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    let x = window.matchMedia("(min-width: 1024px)")
    const [desktop, setDesktop] = useState(x.matches)


    x.addEventListener("change", (e) => {
        if (e.matches) {
            setDesktop(true)
            setSidebar(false)
        } else {
            setDesktop(false)
        }
    });

    async function getProjects() {
        setLoading(true);
        setLoadingText("Getting projects...");
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`);
            setProjects(response.data);
            // console.log(response.data);
        } catch (error) {
            // Handle error if the request fails
            console.error('Error fetching projects:', error);
            setLoading(false);
            return null;
        }
        setLoading(false);
        setLoadingText("");
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
            <div className=" flex rounded lg:max-w-7xl md:max-w-2xl sm:max-w-xl max-w-md max-sm:px-0 my-2 mx-auto">
                {(desktop || !sidebar) ?
                    <div className="w-full flex flex-col items-center px-2">
                        <h1 className="text-3xl p-3 mx-2 w-full  dark:bg-neutral-900 bg-neutral-50 rounded-xl border dark:border-neutral-800 border-neutral-300">Home</h1>
                        {loading && <Loading text={loadingText} />}
                        {projects.map((project, index) => {
                            // console.log(project);
                            return <Project key={index} removeProject={() => {
                                projects.splice(index, 1)
                                setProjects(projects);
                            }} setLoading={setLoading} {...project} />
                        })}
                    </div>
                    : ""
                }
                <TopReviewers sidebar={sidebar} desktop={desktop} setSidebar={setSidebar} />
            </div>
        </>
    )
}
