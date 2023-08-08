import {useEffect, useState} from "react";
import axiosClient from "../services/axios-client.js";
import {extractLanguageNames} from "../functions/returnLanguages.js";
import {extractRoleNames} from "../functions/returnRoles.js";
import {useParams} from "react-router-dom";



export default function Project() {
    const [projectData, setProjectData] = useState();
    const { slug } = useParams();

    useEffect(() => {
        const fetchProject = async function(){
        try{
            const response = await axiosClient.get(`/project/${slug}`)
            console.log(response.data.project);
            setProjectData(response.data.project)
        } catch(error){
            console.error(error)
        }
        }
        fetchProject()
    }, [slug])

    // const roles = projectData.roles
    // console.log(roles);


    return(
        <>
            <p>hi</p>
            {/*<div className="border-2 border-white">*/}
            {/*    <h1 className="text-2xl" >My Created Projects: </h1>*/}
            {/*    {projects && projects.map((project) => (*/}
            {/*        <div key={project.id} className="rounded-md border w-3/4 inline-flex my-2 justify-center border-hover-blue flex-col" >*/}
            {/*            <p className="border-b border-gray-400 w-3/4 m-auto" >Name: {project.project_name}</p>*/}
            {/*            <p>Languages: {extractLanguageNames(project)}</p>*/}
            {/*            <p>Roles: {extractRoleNames(project)}</p>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </>
    )
}
