import {useRef, useState} from "react";
import axiosClient from "../services/axios-client.js";
import ErrorList from "./ErrorList.jsx";

export default function AccountInformation({setUserInformation, setViewState, userInformation}) {
    const [errors, setErrors] = useState([]);

    const handleUserNameChange = async(e, input) => {
        e.preventDefault();
        const inputValue = input
        const payload = {
            value: inputValue,
            parameter: 'user_name'
        }
        try{

            const response = await axiosClient.post('/check_variable', payload);
            if(response.data === 'unavailable'){
                setErrors(['This User Name is already chosen, please choose another']);
                setUserInformation((prev)=> {
                    const newState = {...prev}
                    delete newState.user_name
                    return newState
                })
            } else {
                // setUserInformation(prev => ({...prev, user_name: userNameRef.current.value}));
                console.log('user name available')
            }

        } catch(error){
            console.error(error)
        }
    }

    const handleUserNameInput = () => {
        setErrors([]);
        setUserInformation((prev) => ({
            ...prev, user_name: userNameRef.current.value
        }))
    }

    //FORGOT TO USE THIS, CAN PROBABLY REMOVE
    const profileImgRef = useRef();
    const userNameRef = useRef();
    const aboutMeRef = useRef();
    const gitHubRef = useRef();
    const instagramRef = useRef();
    const linkedinRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUserInformation(prev => ({...prev, profile_picture: file, profile_img_temp: imageUrl}))
        }
    }

    const handleURLChange = (e, value) => {
        const inputElement = e.target;
        if(inputElement.value === ''){
            return
        }

        const regexPattern = `${value}.com`;
        const regex = new RegExp(regexPattern);
        const url = e.target.value.toLowerCase();

        if (!regex.test(url)) {
            inputElement.value = ''
            inputElement.classList.add('error-placeholder-color')
            inputElement.placeholder = `Not a valid ${value} page`;

            if(userInformation[value]){
                setUserInformation((prev)=> {
                    const newState = {...prev}
                    delete newState[value]
                    return newState
                })
            }

            setTimeout(()=> {
            inputElement.classList.remove('error-placeholder-color')
            inputElement.placeholder = `Enter ${value} url to share`;
            }, 3000)
        } else {
            setUserInformation(prev => ({...prev, [value]: inputElement.value}));

        }
    };

    const handleProceed = (e) => {
        e.preventDefault()
        if(userNameRef.current.value){
            setTimeout(setViewState('registration'), 200)

        }
    }



    return (
        <>
            <h2 className="text-2xl mb-20">Please Enter Some Personal Information</h2>
            <section className="grid grid-cols-2 gap-y-12 justify-self-auto grid-rows-registration_user_rows">
                <div className='add-image-container flex flex-col'>
                    {
                        userInformation.profile_img_temp ? (
                            <img src={userInformation.profile_img_temp} className="self-center max-w-sm h-auto rounded-full"/>
                        ) : (
                            <img src='/no_photo.png' className="self-center max-w-sm h-auto rounded-full"/>
                        )
                    }
                    <br/>
                    <label htmlFor='profile_photo' className='left_text'>Add a profile picture</label>
                    <br/>

                    <input id='profile_photo' name='profile_photo' type="file" accept="image/*" ref={profileImgRef}
                           onChange={handleImageChange}/>
                </div>

                <div className='about_me_text flex flex-col text-left'>
                    <label htmlFor='user_name' className=''>Please enter a user name for your profile (required)</label>
                    <input id='user_name' name='user_name' type="text" className="text-zinc-950 self-start"
                           value={userInformation.user_name ?? ''}
                           ref={userNameRef}
                           onChange={handleUserNameInput}
                           onBlur={(e)=>handleUserNameChange(e, e.target.value)}
                    />
                    <br/>
                    <ErrorList errors={errors}/>

                    <label htmlFor='about_me' className='text-left'>About Me</label>
                    <textarea rows='3' cols='30' className="text-zinc-950" ref={aboutMeRef}
                              value={userInformation.about_me ?? ''}
                              onChange={() => {
                                  setUserInformation(prev => ({...prev, about_me: aboutMeRef.current.value}));
                              }}
                    ></textarea>
                    <div className="mt-5 auto-center-flex">
                        <img id="github-input" src='/github_logo.svg' className="w-14 h-auto"/>
                        <input type='url' data-url="github" className="text-black-500"
                               placeholder='Enter github url to share' ref={gitHubRef}
                               value={userInformation.github ?? ''}
                               onChange={(e)=>setUserInformation(prev => ({...prev, github: e.target.value}))}
                               onBlur={(e) => handleURLChange(e, e.target.getAttribute('data-url'))}
                        />
                    </div>


                    <div className="mt-5 auto-center-flex">
                        <img src='/linkedin_logo.svg' className="w-14 h-auto"/>
                        <input id="linkedIn-input" data-url="linkedin" type='url' className="text-black-500"
                               placeholder='Enter github url to share' ref={linkedinRef}
                               value={userInformation.linkedin ?? ''}
                               onChange={(e)=>setUserInformation(prev => ({...prev, linkedin: e.target.value}))}
                               onBlur={(e) => handleURLChange(e, e.target.getAttribute('data-url'))}
                        />
                    </div>


                    <div className="mt-5 auto-center-flex">
                        <img id="instagram-input" src='/instagram_logo.svg' className="w-14 h-auto"/>
                        <input type='url' data-url="instagram" className="text-black-500"
                               value={userInformation.instagram ?? ''}
                               placeholder='Enter github url to share' ref={instagramRef}
                               onChange={(e)=>setUserInformation(prev => ({...prev, instagram: e.target.value}))}
                               onBlur={(e) => handleURLChange(e, e.target.getAttribute('data-url'))}
                        />
                    </div>
                </div>
                <div className="flex col-span-2 m-auto items-center justify-center" >
                    <button className="cursor-pointer transition-all duration-100 hover:bg-hover-blue rounded-lg border-white border-2 w-54 h-22"
                        onClick={()=>setViewState('setLanguages')}>Go Back</button>
                    <button
                        className="cursor-pointer transition-all duration-100 hover:bg-hover-blue rounded-lg border-white border-2 w-54 h-22"
                        onClick={(e) => handleProceed(e)}
                        >
                        Continue
                    </button>
                </div>
            </section>
        </>
    )
}
