/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

export default function EditProfile({ user, updateUser }) {
    const [userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(null)
    const navigate = useNavigate();
    const socialMedia = ['twitter', 'instagram', 'facebook', 'linkedin', 'github', 'website'];

    useEffect(() => {
        if (localStorage.getItem("token") && localStorage.getItem("token") != 'undefined') {
            // console.log(user);
            setUserInfo({
                ...user, socialMediaLinks: {
                    twitter: user.socialMediaLinks?.twitter || '',
                    instagram: user.socialMediaLinks?.instagram || '',
                    facebook: user.socialMediaLinks?.facebook || '',
                    linkedin: user.socialMediaLinks?.linkedin || '',
                    github: user.socialMediaLinks?.github || '',
                    website: user.socialMediaLinks?.website || '',
                },
                profilePicture: (user.profilePicture != '' && user.profilePicture) || '/user.png'
            })
        } else {
            navigate('/');
        }
    }, [user])


    const handleSubmit = async () => {
        console.log(userInfo);

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            setLoading(true)
            axios.post(`${import.meta.env.VITE_API_URL}/api/file/upload?parent_id=${userInfo.username}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                const url = res.data.fileURL;
                // console.log(res.data, url);
                if (url) {
                    userInfo.profilePicture = url;
                    setUserInfo({ ...userInfo });
                }

            }).then(() => {

                axios.put(`${import.meta.env.VITE_API_URL}/api/users/${user.username}`, userInfo).then((res) => {
                    // console.log(res.data);
                    if (res.data.user) {
                        updateUser();
                        setLoading(false)
                        toast.success("Profile updated")
                    }
                }).catch((err) => {
                    console.log(err);
                    setLoading(false)
                })
            })
        } else {
            setLoading(true)
            axios.put(`${import.meta.env.VITE_API_URL}/api/users/${user.username}`, userInfo).then((res) => {
                // console.log(res.data);
                if (res.data.user) {
                    updateUser();
                    setLoading(false)
                    toast.success("Profile updated")
                }
            }).catch((err) => {
                console.log(err);
                setLoading(false)
            })
        }
    }




    return (
        <>
            {loading && <Loading />}
            <div className={`mx-auto lg:w-2/3 sm:w-3/4  w-[95%] flex flex-col justify-center  dark:bg-neutral-900/70 bg-neutral-100/70 rounded-md my-5 border dark:border-neutral-700  py-5 px-3  `}>
                <h1 className="text-center text-2xl">Edit Profile</h1>
                <div className="grid md:grid-cols-2 my-2 grid-cols-1 gap-2">
                    <div className="md:order-1 order-2 border dark:border-neutral-800 ">
                        {userInfo?.socialMediaLinks &&
                            <div className="flex flex-col px-2">
                                {socialMedia.map((social, index) => {
                                    return <input key={index} value={userInfo.socialMediaLinks[social]} onChange={(e) => {
                                        userInfo.socialMediaLinks[social] = e.target.value;
                                        setUserInfo({ ...userInfo })
                                    }} className="w-full px-3 py-1 my-3 rounded-md dark:bg-neutral-800 outline-none transition-all border dark:border-neutral-700 border-neutral-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-200" type="url" placeholder={`${social} Link`} />
                                })}

                            </div>
                        }
                    </div>
                    <div className="md:order-2 order-1 flex flex-col items-center border dark:border-neutral-800">
                        <img src={(file && URL.createObjectURL(file)) || userInfo.profilePicture || '/user.png'} alt="Profile" className="w-60 rounded-full aspect-square" />
                        <div className="p-3 flex gap-2 max-md:flex-wrap">
                            <input onChange={(e) => { setFile(e.target.files[0]); }} className="block w-full text-lg text-neutral-900 border border-neutral-300 rounded-lg cursor-pointer bg-neutral-50 dark:text-neutral-400 focus:outline-none dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400" id="file_input" type="file" />
                            <button onClick={() => { setFile(null); userInfo.profilePicture = '/user.png'; setUserInfo({ ...userInfo }) }} className="flex-shrink-0 px-2 py-1 text-base font-semibold text-white bg-violet-500 rounded-3xl shadow-md hover:bg-violet-400 hover:scale-95 transition-all">Remove</button>
                        </div>
                    </div>
                </div>
                <button onClick={handleSubmit} className="flex-shrink-0 px-2 py-2 text-base font-semibold text-white bg-violet-500 rounded shadow-md hover:bg-violet-400  transition-all">Save</button>
            </div>
        </>
    )
}
