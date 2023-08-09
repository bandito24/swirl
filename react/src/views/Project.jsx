import {useEffect, useState} from "react";
import axiosClient from "../services/axios-client.js";
import {useParams} from "react-router-dom";
import Role from "../components/Role.jsx";
import ProjectView from "../components/ProjectView.jsx";



export default function Project() {
    const [projectData, setProjectData] = useState();
    const [roles, setRoles] = useState([]);
    const [creator, setCreator] = useState(null)
    const [contentLoaded, setContentLoaded] = useState(false)
    const { slug } = useParams();

    useEffect(() => {
        const fetchProject = async function(){
        try{
            const response = await axiosClient.get(`/project/${slug}`)
            console.log(response.data.project);
            const currentProject = response.data.project;
            setProjectData(currentProject)
            setRoles(currentProject.roles)
            setCreator(currentProject.creator)
            setContentLoaded(true)
        } catch(error){
            console.error(error)
        }
        }
        fetchProject()
    }, [slug])

    return(
        <>
            <main className="grid grid-cols-global_view">
                <aside>
                {creator && contentLoaded && <Role key={90000} roleUser={creator} role='Project Creator' />}
                {roles.length > 0 && roles.map(role => (
                    <Role key={role.id} roleUser={role.user} role={role.role}/>
                    ))
                }
                {contentLoaded &&
                <button className="text-xlg w-full global-btn-styling m-auto fade-in" >Propose New Role</button>
                }
                </aside>
                <section>
                    {projectData && <ProjectView projectData={projectData} />}
                </section>
            </main>
        </>
    )
}
