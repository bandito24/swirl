import {extractLanguageNames} from "../functions/returnLanguages.js";

export default function ProjectView({projectData}) {
    return(
    <>
        <h1 className="text-3xl mb-6" >{projectData.project_name}</h1>
        {projectData.project_description &&
        <p>Project Description: {projectData.project_description}</p>
        }
        <div className="p-2 bg-yellow-500 block absolute right-3 top-6 rounded-md text-xl my-4" >{projectData.completed === 0 ? 'In Progress...' : 'Completed'}</div>
        <div className="bg-hover-white w-1/2 m-auto my-4 rounded-lg" >
            <h2>Associated language and Frameworks: </h2>
            <p>{extractLanguageNames(projectData)}</p>
        </div>
        <aside>Created: <time>{projectData.created_at}</time> </aside>

    </>
    )
}
