import { useParams } from "react-router-dom";
import Project from "../components/Project";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Review from "../components/Review";


export default function Post() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getProject() {
    setLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects/${id}`);
      setProject(response.data.project);
      setReviews(response.data.reviews);
      // console.log(response.data, id);
      // console.log(response.data);
      setLoading(false)
    } catch (error) {
      // Handle error if the request fails
      console.error('Error fetching projects:', error.response.data.message);
      setLoading(false)
      return null;
    }
  }

  useEffect(() => {
    getProject();
  }, [])

  return (
    <>
      <div className={`mx-auto lg:w-[60%] px-2 sm:w-3/4  w-[95%] flex justify-center  py-3  `}>
        {loading ? <Loading /> : project.link && <Project {...project} />}
      </div>
      <div className={`mx-auto lg:w-[60%] px-2 sm:w-3/4  w-[95%] flex justify-center  py-3  `}>
        {reviews.length == 0 ?
          <p className="text-center text-violet-600 text-2xl"> No review yet!!</p>
          :
          reviews.map((value, index) => {
            return <Review key={index} {...value} />
          })
        }
      </div>
    </>
  )
}
