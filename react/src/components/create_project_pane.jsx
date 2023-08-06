import returnLanguages from "../functions/returnLanguages.js";
import {useState} from "react";
import Roles from "./Roles.jsx";

export default function CreateProjectPane() {
    const [roles, setRoles] = useState([]);
    const [roleValue, setRoleValue] = useState('')
    const [projectLanguages, setProjectLanguages] = useState([])
    const [projectAttributes, setProjectAttributes] = useState({})

    const addRole = (e) => {
        e.preventDefault()
        if(roleValue){
            setRoles(prev => ([
                ...prev, roleValue
            ]))
            setRoleValue('')
        }
    }

    const handleCreateProject = (e) => {
        e.preventDefault();
    }

    const handleLanguageSelect = (e) => {
        if(!projectLanguages.includes(e.target.value)){
            setProjectLanguages(prev => ([
                ...prev, e.target.value
            ]))
        } else {
            const newArray = projectLanguages.filter(arr => {
                return arr !== e.target.value
            })
            setProjectLanguages(newArray)
        }
    }

    const languages = returnLanguages();
    return(

        <div className="border-2 border-white relative" >
            <h1 className="text-white mb-6 text-2xl" >Create a new project</h1>
            <form className="flex flex-col" >
                <div className="mb-8" >
                    <label htmlFor='project_name' className='mb-5'>Please provide a name for your project</label>
                    <br/>
                    <input id='project_name' name='project_name' type="text"  />
                </div>
                <div>
                    <label htmlFor='project_description' className='mb-5'>Please provide a description of what this project will do</label>
                    <br/>
                    <textarea name="project_description" id="project_description" cols="30" rows="10"></textarea>
                </div>
                <div>
                    <h1 className='mt-10 mb-5'>Please select all languages you anticipate on using</h1>
                    <div className="grid grid-flow-col grid-cols-3 grid-rows-3 gap-4" >
                        {languages.map((language, index) => (
                            <div key={index}>
                                <label htmlFor={language}>{language}</label>
                                <input type='checkbox' className='language-option-boxes' value={language} name={language}
                                onClick={(e)=>handleLanguageSelect(e)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-start" >
                    <button className="w-24 h-10 text-sm translate-x-0" onClick={(e)=>addRole(e)}>Create a roll</button>
                    <input type='text' className="self-center"
                           value={roleValue}
                           onChange={(e)=>setRoleValue(e.target.value)}/>
                    </div>

                    {roles && <Roles roles={roles} />}

                </div>
                <input className="global-btn-styling mt-24 mb-10" type='submit' value="Add Project"
                onClick={(e)=>handleCreateProject(e)}
                />
            </form>
        </div>
    )
}
