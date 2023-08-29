import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Project from "../components/Project";

function Technologies() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const { technology } = useParams();

  async function getProjects() {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/search/technology/${technology}`
      );
      setProjects(response.data);
      console.log(response.data);
      console.log("Hello");
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setLoading(false);
      return null;
    }
  }

  useEffect(() => {
    getProjects();
  }, []);
  return (
    <>
      <div className="w-full dark:bg-neutral-900/60 bg-neutral-100/60 p-3 flex justify-center text-4xl">
        for tag {technology}
      </div>
      {projects.length == 0 && (
        <p className="text-3xl text-violet-600 text-center m-3">
          No Project Found
        </p>
      )}
      {loading && <Loading />}
      {!loading && (
        <div className="dark:bg-neutral-900 rounded border dark:border-neutral-800 lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-md max-sm:px-2 my-2 mx-auto">
          {projects.map((project, index) => {
            // project.author = project.author[0];
            return (
              <Project
                key={index}
                removeProject={() => {
                  projects.slice(index, 1);
                  setProjects(projects);
                }}
                setLoading={setLoading}
                _id={project._id}
                author={project.author}
                link={project.link}
                description={project.description}
                ogDetails={project.ogDetails}
                technologies={project.technologies}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default Technologies;
