/* eslint-disable react/prop-types */
import Project from './Project'


export default function Projects({ projects }) {


    return (
        <>
            <div className=' w-full flex flex-col gap-2'>
                {projects.length == 0 ?
                    <p className="text-center text-violet-600 text-2xl"> No projects yet!!</p>
                    :
                    projects.map((project, index) => {
                        // console.log(project);
                        return <Project key={index} {...project} />
                    })}
            </div>
        </>
    )
}
