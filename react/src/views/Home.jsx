import {useEffect, useState} from "react";
import {useStateContext} from "../../contexts/contextProvider.jsx";
import axiosClient from "../services/axios-client.js";
import ProjectPreview from "../components/ProjectPreview.jsx";
import NextBackButtons from "../components/NextBackButtons.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import SearchCategories from "../components/SearchCategories.jsx";
import SearchBar from "../components/SearchBar.jsx";


export default function Home() {
    const navigate = useNavigate();
    const {user} = useStateContext()
    const [projectList, setProjectList] = useState([])
    const [pageMeta, setPageMeta] = useState({});
    const defaultLanguages = user ? user.languages.map(obj => obj.slug) : []

    const [languages, setLanguages] = useState(defaultLanguages)

    const [filterParameters, setFilterParamters] = useState( {languages : defaultLanguages})


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');
    const [pageNumber, setPageNumber] = useState(page ? parseInt(page) : 1)


    const fetchProjects = async(searchObject) => {
    // navigate(`/?page=${pageNumber}`)
        try{
            const response = await axiosClient.post(`/projects_by_parameter?page=${pageNumber}`, searchObject);
            console.log(response.data.projects)
            setProjectList(response.data.projects.data)


            if(Object.keys(pageMeta).length < 1){
                const pageInfo = response.data.projects
                setPageMeta({
                    last_page: pageInfo.last_page,
                    total: pageInfo.total,
                    per_page: pageInfo.per_page
                })
                if(pageInfo.last_page < pageNumber){
                    navigate(location.pathname)
                    setPageNumber(1)
                }
            }
        }catch(error){
            console.error(error)
        }
    }


    useEffect(()=> {
        fetchProjects(filterParameters);
    }, [pageNumber, filterParameters])



    return(
    <>
        <SearchBar
        setFilterParameters={setFilterParamters}
        setPageNumber={setPageNumber}
        />
        <SearchCategories
        languages={languages}
        setLanguages={setLanguages}
        setFilterParameters={setFilterParamters}
        />
        <NextBackButtons
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
            lastPage={pageMeta.last_page}
            navigate={navigate}
        />
        <h1 className="text-2xl" >Suggested For You</h1>
        <p className="mb-20" > (Projects using {languages.join(', ')})</p>

        {projectList.length > 0 && <ProjectPreview languages={languages} projectList={projectList}/>}
    </>
    )
}
