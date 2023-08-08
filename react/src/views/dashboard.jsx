import {useStateContext} from "../../contexts/contextProvider.jsx";
import CreateProjectPane from "../components/createProjectPane.jsx";
import ShowProjects from "../components/ShowProjects.jsx";
import {useState} from "react";



export default function Dashboard() {
    const [addedProject, setAddedProject] = useState(0)



    return(
        <>
        <div className="dashboard-grid"  >
           <CreateProjectPane setAddedProject={setAddedProject}/>
            <ShowProjects addedProject={addedProject}/>
        </div>


        </>
    )

}
