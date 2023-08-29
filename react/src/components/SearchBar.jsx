import {useState} from "react";
import axiosClient from "../services/axios-client.js";
import {useNavigate} from "react-router-dom";

export default function SearchBar() {
    const [search, setSearch] = useState('')
    const [resultProjects, setResultProjects] = useState({})
    const [loading, setLoading] = useState(false)
    const [showResults, setShowResults] = useState(true)
    const navigate = useNavigate();

    const handleSearchInput = async function (e) {
        setShowResults(true)
        const searchVal = e.target.value;
        if (searchVal.length < 2) {
            setResultProjects([]);
            return
        }
        setLoading(true)
        setSearch(e.target.value);
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
        }, 75)
    }


    return (
        <>
            <div className="inline-flex mb-10 align-center relative">
                <label htmlFor='search-title' className="mr-8 self-center">Search By Keyword</label>
                <input className="self-center" type='text'
                       onChange={handleSearchInput}
                       onBlur={handleInputBlur}
                />
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    Object.keys(resultProjects).length > 0 && resultProjects.filteredProjects.length > 0 && showResults && (
                        <ul className='absolute top-16 bg-hover-blue rounded px-4 project-option'>
                            {resultProjects.filteredProjects.map((project) => (
                                <li className="cursor-pointer hover:text-blue-950 project-option"
                                    key={project.id}
                                    onClick={() => navigate(`/project/${project.slug}`)}
                                >{project.project_name}

                                </li>
                            ))}
                        </ul>
                    )
                )}
                {search.length > 2 &&
                    (
                        resultProjects.count > 0 ? (
                            <button className="text-sm w-16">See All {resultProjects.count}</button>
                        ) : (
                            <p className="ml-6">No results found</p>
                        )
                    )
                }
            </div>
        </>
    )
}
