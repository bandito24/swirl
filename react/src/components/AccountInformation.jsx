import {useRef, useState} from "react";

export default function AccountInformation({setUserInformation, setViewState}) {
    const [profilePhoto, setProfilePhoto] = useState(null)
    // const [githubPlaceholder, setGitHub]
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
            setProfilePhoto(imageUrl)
            setUserInformation(prev => ({...prev, profile_image: file}))
        }
    }

    const handleURLChange = (e, value) => {
        const inputElement = e.target;
        if(inputElement.value === ''){
            return
        }
        const regexPattern = `${value}\.com`;
        const regex = new RegExp(regexPattern);
        const url = e.target.value;

        if (!regex.test(url)) {
            console.log(`The string does not contain ${value}.com`);
            inputElement.value = ''
            inputElement.classList.add('error-placeholder-color')
            inputElement.placeholder = `Not a valid ${value} page`;

            setTimeout(()=> {
            inputElement.classList.remove('error-placeholder-color')
            inputElement.placeholder = `Enter ${value} url to share`;
            }, 3000)
        } else {
            setUserInformation(prev => ({...prev, instagram: inputElement.value}));

        }
    };


    return (
        <>
            <h2 className="text-2xl mb-20">Please Enter Some Personal Information</h2>
            <section className="grid grid-cols-2 gap-y-12 justify-self-auto grid-rows-registration_user_rows">
                <div className='add-image-container flex flex-col'>
                    {
                        profilePhoto ? (
                            <img src={profilePhoto} className="self-center max-w-sm h-auto rounded-full"/>
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
                           ref={userNameRef}
                           onChange={() => {
                               setUserInformation(prev => ({...prev, user_name: userNameRef.current.value}));
                           }}/>
                    <br/>

                    <label htmlFor='about_me' className='text-left'>About Me</label>
                    <textarea rows='3' cols='30' className="text-zinc-950" ref={aboutMeRef}
                              onChange={() => {
                                  setUserInformation(prev => ({...prev, about_me: aboutMeRef.current.value}));
                              }}
                    ></textarea>
                    <div className="mt-5 auto-center-flex">
                        <img id="github-input" src='/github_logo.svg' className="w-14 h-auto"/>
                        <input type='url' data-url="github" className="text-black-500"
                               placeholder='Enter github url to share' ref={gitHubRef}
                               onBlur={(e) => handleURLChange(e, e.target.getAttribute('data-url'))}
                        />
                    </div>


                    <div className="mt-5 auto-center-flex">
                        <img src='/linkedin_logo.svg' className="w-14 h-auto"/>
                        <input id="linkedIn-input" data-url="linkedin" type='url' className="text-black-500"
                               placeholder='Enter github url to share' ref={linkedinRef}
                               onBlur={(e) => handleURLChange(e, e.target.getAttribute('data-url'))}
                        />
                    </div>


                    <div className="mt-5 auto-center-flex">
                        <img id="instagram-input" src='/instagram_logo.svg' className="w-14 h-auto"/>
                        <input type='url' data-url="instagram" className="text-black-500"
                               placeholder='Enter github url to share' ref={instagramRef}
                               onBlur={(e) => handleURLChange(e, e.target.getAttribute('data-url'))}
                        />
                    </div>
                </div>

                <button
                    className="cursor-pointer transition-all duration-100 hover:bg-hover-blue col-span-2 rounded-lg border-white border-2 m-auto w-54 h-22 flex items-center justify-center"
                    onClick={()=>setViewState('registration')}
                    >
                    Continue
                </button>

            </section>
        </>
    )
}
