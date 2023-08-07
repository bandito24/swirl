import returnLanguages from "../functions/returnLanguages.js";
import {useRef, useState} from "react";
import Roles from "./Roles.jsx";
import ErrorList from "./ErrorList.jsx";
import {addToStateArray, removeFromStateArray} from "../functions/useStateFuntions.js";
import {useStateContext} from "../../contexts/contextProvider.jsx";
import axiosClient from "../services/axios-client.js";

export default function CreateProjectPane() {
    const [roles, setRoles] = useState([]);
    const [roleValue, setRoleValue] = useState('')
    const [projectLanguages, setProjectLanguages] = useState([])
    const [errors, setErrors] = useState([]);
    const [projectAttributes, setProjectAttributes] = useState({})
    const projectNameRef = useRef();
    const projectDescriptionRef = useRef();
    const {user} = useStateContext()
    const nameError = 'Please create a name for your project';
    const descriptionError = 'Please create a description for your project'
    const languagesError = 'Please select at least one relevant language'
    const roleError = 'Please create one role needed for your project';

    const languages = returnLanguages();

    const handleAddRole = (e) => {
        e.preventDefault()
        if (errors.includes(roleError)) {
            removeFromStateArray(setErrors, roleError)
        }
        if (roleValue) {
            addToStateArray(setRoles, roleValue)
            setRoleValue('')
        }
    }

    const removeInputErrors = (error) => {
        if (errors.includes(error)) {
            removeFromStateArray(setErrors, error)
        }
    }

    const handleLanguageSelect = (e) => {
        if (errors.includes(languagesError)) {
            removeFromStateArray(setErrors, languagesError)
        }
        if (!projectLanguages.includes(e.target.value)) {
            addToStateArray(setProjectLanguages, e.target.value)
        } else {
            removeFromStateArray(setProjectLanguages, e.target.value)
        }
    }

    const handleCreateProject = async (e) => {
        e.preventDefault();

        if (projectNameRef.current.value === '') {
            if (!errors.includes(nameError)) {
                addToStateArray(setErrors, nameError)
            }
        }
        if (projectDescriptionRef.current.value === '') {
            if (!errors.includes(descriptionError)) {
                addToStateArray(setErrors, descriptionError)
            }
        }
        if (projectLanguages.length < 1) {
            if (!errors.includes(languagesError)) {
                addToStateArray(setErrors, languagesError)
            }
        }
        if (roles.length < 1) {
            if (!errors.includes(roleError)) {
                addToStateArray(setErrors, roleError)
            }
        }
        if (errors.length < 1) {
           try{
               const payload = {
                   creator_id: user.id,
                   project_name: projectNameRef.current.value,
                   project_description: projectDescriptionRef.current.value,
                   project_languages: languages,
                   project_roles: roles
               }
               const response = await axiosClient.post('/create_project', payload)
               console.log(response)

           }catch(error){
               console.error(error.response.data)
           }
        } else {
            console.log('yo')
        }

    }

    return (

        <div className="border-2 border-white relative">
            <h1 className="text-white mb-6 text-2xl">Create a new project</h1>
            <form className="flex flex-col" onSubmit={(e) => handleCreateProject(e)}>
                {/*onClick={(e) => handleCreateProject(e)}*/}
                <div className="mb-8">
                    <label htmlFor='project_name' className='mb-5'>Please provide a name for your project</label>
                    <br/>
                    <input id='project_name' name='project_name' type="text"
                           ref={projectNameRef}
                           onChange={() => removeInputErrors(nameError)}
                    />
                </div>
                <div>
                    <label htmlFor='project_description' className='mb-5'>Please provide a description of what this
                        project will do</label>
                    <br/>
                    <textarea name="project_description" id="project_description" cols="30" rows="10"
                              ref={projectDescriptionRef}
                              onChange={() => removeInputErrors(descriptionError)}
                    ></textarea>
                </div>
                <div>
                    <h1 className='mt-10 mb-5'>Please select all languages you anticipate on using</h1>
                    <div className="grid grid-flow-col grid-cols-3 grid-rows-3 gap-4">
                        {languages.map((language, index) => (
                            <div key={index}>
                                <label htmlFor={language}>{language}</label>
                                <input type='checkbox' className='language-option-boxes' value={language}
                                       name={language}
                                       onClick={(e) => handleLanguageSelect(e)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-start">
                        <button className="w-24 h-10 text-sm translate-x-0" onClick={(e) => handleAddRole(e)}>Create a roll
                        </button>
                        <input type='text' className="self-center"
                               value={roleValue}
                               onChange={(e) => setRoleValue(e.target.value)}/>
                    </div>

                    {roles && <Roles roles={roles}/>}
                    <div className="justify-self-start">
                        {errors && <ErrorList errors={errors}/>}
                    </div>
                </div>

                <input className="global-btn-styling mt-24 mb-10" type='submit' value="Add Project" />
            </form>
        </div>
    )
}
