/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Projects from "../components/Projects";
import Reviews from "../components/Reviews";
import { SiGithub, SiInstagram, SiLinkedin, SiTwitter } from 'react-icons/si'
import { BiWorld } from "react-icons/bi"
import axios from "axios";

export default function Profile() {
    const { username } = useParams();
    const navigate = useNavigate();
    const [tabName, setTabName] = useState("Project");
    const [projects, setProjects] = useState([]);
    const [userName, setUserName] = useState("");

    async function getProjects() {

        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`);
            setProjects(response.data);
            // console.log(response.data);
        } catch (error) {
            // Handle error if the request fails
            console.error('Error fetching projects:', error.message);
            return null;
        }
    }

    useEffect(() => {
        if (username[0] !== "@") {
            navigate('/notfound');
        } else {
            let a = username.slice(1);
            setUserName(a);
        }
        getProjects();
    }, [])

    const user = {
        username: userName,
        email: 'nileshdarji@gmail.com',
        points: 30,
        socialMediaLinks: {
            github: "https://github.com/nilesh9106/",
            twitter: 'https://twitter.com/thenileshdarji/',
            linkedin: "https://www.linkedin.com/in/thenileshdarji/",
            instagram: 'https://www.instagram.com/thenileshdarji/'
        }
    }

    return (
        <>
            <div className="">
                <div className={`mx-auto lg:w-2/3 sm:w-3/4  w-[95%] flex justify-center  dark:bg-neutral-900/70 bg-neutral-100/70 rounded-md my-5 border dark:border-gray-700  py-5 px-3  `}>
                    <div className="flex gap-5 flex-wrap justify-center items-center ">
                        <div className="img">
                            <img src="https://nileshdarji.netlify.app/main.png" alt="" className="rounded-full sm:w-40 w-24" />
                        </div>
                        <div className="flex flex-col sm:mx-10 justify-center">
                            <div className="flex sm:gap-5 gap-3 items-center my-2">
                                <h1 className="sm:text-2xl text-xl font-semibold ">@{user.username}</h1>
                                <button className="sm:px-3 px-2 sm:py-1 dark:bg-neutral-100 dark:text-black text-white rounded bg-neutral-900 ">Edit Profile</button>
                            </div>
                            <div className="flex sm:gap-5 gap-3 items-center my-2">
                                {
                                    Object.keys(user.socialMediaLinks).map((key) => {
                                        switch (key) {
                                            case "github":
                                                return <Link to={user.socialMediaLinks[key]}><SiGithub className="text-xl " /></Link>
                                            case "twitter":
                                                return <Link to={user.socialMediaLinks[key]}><SiTwitter className="text-xl " /></Link>
                                            case "linkedin":
                                                return <Link to={user.socialMediaLinks[key]}><SiLinkedin className="text-xl " /></Link>
                                            case "instagram":
                                                return <Link to={user.socialMediaLinks[key]}><SiInstagram className="text-xl " /></Link>
                                            default:
                                                return <Link to={user.socialMediaLinks[key]}><BiWorld className="text-xl " /></Link>
                                        }
                                    })
                                }
                            </div>
                            <div className="flex sm:gap-5 gap-3 my-2 items-center">
                                <span>Dev Score: {user.points}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className='mx-auto z-40 flex dark:bg-neutral-900/70 bg-neutral-100/70 backdrop-blur-sm  lg:w-2/3 sm:w-3/4  w-[95%]  rounded-b-md sticky top-16 my-5 border  dark:border-gray-700 py-4 px-3 justify-evenly items-center'>
                    <li className={`cursor-pointer ${tabName === "Project" ? "text-emerald-400" : ""}`} onClick={() => {
                        setTabName("Project")
                    }}>Projects</li>
                    <li className={`cursor-pointer ${tabName === "Review" ? "text-emerald-400" : ""}`} onClick={() => {
                        setTabName("Review")
                    }}>Reviews</li>
                </ul>
                <div className='mx-auto max-sm:pb-20 lg:w-2/3 sm:w-3/4 w-[95%] flex dark:bg-neutral-900 bg-neutral-100/70 rounded-md my-5 border dark:border-gray-700   p-3  items-center'>
                    {tabName === 'Project' && <Projects projects={projects} />}
                    {tabName === 'Review' && <Reviews />}
                </div>
            </div>
        </>
    )
}
