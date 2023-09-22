import {useRef, useState} from "react";
import axiosClient from "../services/axios-client.js";
import MatchHighlight from "./MatchHighlight.jsx";
import {useNavigate} from "react-router-dom";

export default function SearchBar({setFilterParameters, setPageNumber}) {
    const [search, setSearch] = useState('')
    const [resultProjects, setResultProjects] = useState({})
    const [loading, setLoading] = useState(false)
    const [showResults, setShowResults] = useState(true)
    const inputRef = useRef('')
    const navigate = useNavigate();

    const handleSearchInput = async function (e) {
        setShowResults(true)
        const searchVal = e.target.value;
        setSearch(e.target.value);
        if (searchVal.length <= 3) {
            setResultProjects([]);
            return
        }
            setLoading(true)
            try {
                const response = await axiosClient.post('/filter_by_title', {
                    search: searchVal
                })
                if (response.data.status === 'success' && response.data.count > 0) {
                    setResultProjects(response.data);

                } else {
                    setResultProjects([]);
                }


                setLoading(false)
                console.log(resultProjects)
            } catch (error) {
                console.error(error.response)
                setLoading(false)
            }



    }
    const handleInputBlur = () => {
        setTimeout(()=> {
            setShowResults(false);
        }, 100)
    }

    const handleShowAll = async () => {
        // await fetchProjects({search: search})
        setFilterParameters({search: search})
        setSearch('')
        setPageNumber(1);
        navigate(`/?page=1`)
    }


    return (
        <>
            <div className="inline-flex mb-10 align-center relative">
                <label htmlFor='search-title' className="mr-8 self-center">Search By Keyword</label>
                <input className="self-center" type='text'
                       onChange={handleSearchInput}
                       onBlur={handleInputBlur}
                       ref={inputRef}
                />
                {loading ? (
                    // <p>Loading...</p>
                    <p></p>
                ) : (
                    Object.keys(resultProjects).length > 0 && resultProjects.filteredProjects.length > 0 && showResults && (
                        <ul className='absolute top-16 bg-hover-blue rounded px-4 project-option'>
                            {resultProjects.filteredProjects.map((project) => (
                                <MatchHighlight
                                key={project.id}
                                project={project}
                                input={inputRef.current.value}
                                matchValue={project.project_name}
                                />
                            ))}
                        </ul>
                    )
                )}
                {search.length > 3 &&
                    (
                        resultProjects.count > 0 ? (
                            <button className="text-sm w-16"
                            onClick={async ()=> handleShowAll()}
                            >See All {resultProjects.count}</button>
                        ) : (
                            <p className="ml-6">No results found</p>
                        )
                    )
                }
            </div>
        </>
    )
}
