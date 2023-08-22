import {useEffect, useState} from "react";
import {useStateContext} from "../../contexts/contextProvider.jsx";
import axiosClient from "../services/axios-client.js";
import {extractLanguageNames} from "../functions/returnLanguages.js";
import ProjectPreview from "../components/ProjectPreview.jsx";
import NextBackButtons from "../components/NextBackButtons.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import SearchCategories from "../components/SearchCategories.jsx";


export default function Home() {
    const navigate = useNavigate();
    const {user} = useStateContext()
    const [projectList, setProjectList] = useState([])
    const [pageMeta, setPageMeta] = useState({});
    const [languages, setLanguages] = useState(()=> {
        if(user){
            const langs = user.languages.map(obj => obj.slug)
            return langs;
        }
    })

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');
    const [pageNumber, setPageNumber] = useState(page ? parseInt(page) : 1)





    useEffect(()=> {
        const fetchUserLanguageProjects = async() => {

            try{
            const response = await axiosClient.post(`/show_language_projects?page=${pageNumber}`, {
                languages: languages
            });
            // console.log(response.data.userLanguageProjects)
            setProjectList(response.data.userLanguageProjects.data)
console.log(user)
            if(Object.keys(pageMeta).length < 1){
                const pageInfo = response.data.userLanguageProjects
                setPageMeta({
                    last_page: pageInfo.last_page,
                    total: pageInfo.total,
                    per_page: pageInfo.per_page
                })
                console.log('total', response.data.userLanguageProjects.last_page)
                if(pageInfo.last_page < pageNumber){
                    navigate(location.pathname)
                    setPageNumber(1)
                }
            }
            }catch(error){
                console.error(error)
            }
        }

        fetchUserLanguageProjects();
    }, [pageNumber, languages])



    return(
    <>
        <SearchCategories
        languages={languages}
        setLanguages={setLanguages}
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
