import {useNavigate} from "react-router-dom";

export default function ProjectPreview({projectList, languages}) {
    const navigate = useNavigate();
    return (
        <>
            <div className="inline-flex flex-col align-items-center justify-center w-1/2">
                {projectList.map(project => (

                    <div
                        className="mb-10 rounded-md border-blue-300 hover:cursor-pointer hover:bg-hover-white transition-bg duration-200 ease-in"
                        key={project.id}
                        onClick={() => navigate(`/project/${project.slug}`)}
                    >
                        <p>Project: {project.project_name}</p>
                        <p>Languages:</p>
                        {project.languages.map((language, index) => (
                            <span key={index}
                                  className={languages.includes(language.name) ? 'text-blue-300' : ''}
                            >{language.name}{index === project.languages.length - 1 ? '' : ', '}</span>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}
