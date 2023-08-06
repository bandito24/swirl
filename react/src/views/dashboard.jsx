
import axiosClient from "../services/axios-client.js";
import {useStateContext} from "../../contexts/contextProvider.jsx";
import CreateProjectPane from "../components/create_project_pane.jsx";



export default function Dashboard() {
    const {user, token} = useStateContext()



    return(
        <>
        <div className="dashboard-grid"  >
           <CreateProjectPane />
            <div className="border-2 border-white">
                <h1>hello there you son of a bitsdfch</h1>
            </div>
        </div>


        </>
    )

}
