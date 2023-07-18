/* eslint-disable react/prop-types */
import Project from './Project'


export default function Projects({ projects }) {


    return (
        <>
            <div className='border-b dark:border-neutral-800 border-neutral-200'>
                {projects.map((project, index) => {
                    // console.log(project);
                    return <Project key={index} {...project} />
                })}
            </div>
        </>
    )
}
