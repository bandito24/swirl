import {useEffect, useState} from "react";
import axiosClient from "../services/axios-client.js";
import {extractLanguageNames} from "../functions/returnLanguages.js";
import {extractRoleNames} from "../functions/returnRoles.js";
import {useNavigate} from "react-router-dom";



export default function ShowProjects({addedProject}) {
    const [projects, setProjects] = useState([])
    const navigate = useNavigate();
    useEffect(()=> {
        const retrieveProjects = async () => {
            try{
                const response = await axiosClient.get('/show_all_projects')
                setProjects(response.data.projects)
                console.log(response.data)
            }catch(error){
                console.error(error)
            }
        }
        retrieveProjects();
    }, [addedProject])




    return(
    <>
        <div className="border-2 border-white">
            <h1 className="text-2xl" >My Created Projects: </h1>
            {projects && projects.map((project) => (
                <div key={project.id} className="rounded-md border w-3/4 inline-flex my-2 justify-center border-hover-blue flex-col"
                onClick={()=>navigate(`/project/${project.slug}`)}>
                <p className="border-b border-gray-400 w-3/4 m-auto" >Name: {project.project_name}</p>
                <p>Languages: {extractLanguageNames(project)}</p>
                <p>Roles: {extractRoleNames(project)}</p>
                </div>
            ))}
        </div>
    </>
    )
}
