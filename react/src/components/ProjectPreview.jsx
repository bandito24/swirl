import {extractLanguageNames} from "../functions/returnLanguages.js";
import {useNavigate} from "react-router-dom";

export default function ProjectPreview({projectList}) {
    const navigate = useNavigate();
    return(
    <>
        <div className="inline-flex flex-col align-items-center justify-center w-1/2" >
        {projectList.map(project => (

            <div className="mb-10 rounded-md border-blue-300 hover:cursor-pointer hover:bg-hover-white transition-bg duration-200 ease-in" key={project.id}
            onClick={()=>navigate(`/project/${project.slug}`)}
            >
            <p>Project: {project.project_name}</p>
            <p>Languages: {extractLanguageNames(project)}</p>
            </div>
        ))}
        </div>
    </>
    )
}
