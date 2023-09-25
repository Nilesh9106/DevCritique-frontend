/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import Project from "../components/Project";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import Review from "../components/Review";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import UserContext from "../MyContext";


export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(UserContext);
  const [review, setReview] = useState({});
  const [project, setProject] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");


  async function getProject() {
    setLoading(true)
    setLoadingText("Getting project details...");
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects/${id}`);
      setProject(response.data.project);
      setReviews(response.data.reviews);
      setReview({
        text: "",
        project: response.data.project._id,
        author: localStorage.getItem('token') && user._id
      })
      setLoading(false)
    } catch (error) {
      // Handle error if the request fails
      console.error('Error fetching projects:', error);
      setLoading(false)
      navigate('/notfound')
      return null;
    }
    setLoadingText("");
  }

  const handleReview = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to review the project!!")
      return;
    }
    if (user._id == project.author._id) {
      toast.error("You can't review your own project!!")
      return;
    }

    try {
      const res = await toast.promise(axios.post(`${import.meta.env.VITE_API_URL}/api/reviews/`, review, { headers: { 'Authorization': localStorage.getItem('token') } }), {
        pending: 'Uploading review...',
        success: "Thanks for reviewing project :)",
        error: 'Error uploading review!!',
      });
      console.log(res.status);
      getProject();
    } catch (error) {
      console.error('Error uploading review:', error);
    }
    setReview({
      ...review,
      text: "",
    })

  }

  useEffect(() => {
    getProject();
  }, [])

  return (
    <>
      {loading && <div>
        <Loading text={loadingText} />
      </div>}
      {!loading &&
        <>
          <Helmet>
            <title>{project.ogDetails?.title}</title>
            <meta name="description" content={project.description} />
            <meta name="keywords" content={project.tags} />
            <meta name="author" content={project.author?.username} />

            <meta property="og:title" content={project.ogDetails?.title || "Dev Critique"} />
            <meta property="og:description" content={project.description} />
            {project.ogDetails?.image && <meta property="og:image" content={project.ogDetails.image} />}
            <meta property="og:url" content={window.location.href} />

            <meta name="twitter:title" content={project.ogDetails?.title || "Dev Critique"} />
            <meta name="twitter:description" content={project.description} />
            {project.ogDetails?.image && <meta name="twitter:image" content={project.ogDetails.image} />}
            <meta name="twitter:card" content="summary_large_image" />

          </Helmet>

          <div className={`mx-auto lg:w-[60%]  sm:w-3/4  w-full flex justify-center items-center  py-3  `}>
            {!loading && project.link && <Project removeProject={() => {
              navigate('/');
            }} setLoading={setLoading} {...project} detail={true} />}
          </div>
          <div className={`mx-auto lg:w-[60%] px-2 sm:w-3/4 w-full flex flex-col justify-center items-center  pb-2  `}>
            <div className=" w-full">
              <textarea name="review" value={review.text} onChange={(e) => {
                setReview({ ...review, text: e.target.value })
              }} placeholder='Description of your Review' className='w-full resize-none px-3 py-1 my-1 rounded-md dark:bg-neutral-900 outline-none transition-all border dark:border-neutral-800 border-neutral-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-200' cols="30" rows="3">
              </textarea>
              <button type="submit" onClick={handleReview} className="w-full px-3 py-1 mb-3 text-neutral-200 rounded-md bg-violet-600 hover:bg-violet-500 transition-all duration-300" >Submit</button>
            </div>
            {reviews.length == 0 ?
              <p className="text-center text-violet-600 text-2xl block "> No review yet!!</p>
              :
              reviews.map((value, index) => {
                return <Review key={index} {...value} onDelete={() => {
                  reviews.splice(index, 1);
                  setReviews([...reviews]);
                }} />
              })
            }
          </div>
        </>
      }
    </>
  )
}
