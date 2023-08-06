import {useRef, useState} from "react";
import axiosClient from "../services/axios-client.js";
import ErrorList from "./ErrorList.jsx";
import {useStateContext} from "../../contexts/contextProvider.jsx";

export default function Registration({setViewState, setUserInformation, userInformation}) {
    const [errors, setErrors] = useState([]);
    const emailRef = useRef();
    const passwordRef = useRef();
    const confPasswordRef = useRef();
    const {setUser, setToken} = useStateContext()

    const handleEmailInput = (e) => {
        setUserInformation(prev => ({
            ...prev, email: e.target.value
        }))
        setErrors(prev => {
            const newState = {...prev}
            delete newState.email
            return newState
        })

    }
    const handleEmailChange = async (e) => {
        e.preventDefault()
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!pattern.test(emailRef.current.value)) {
            setErrors(prev => ({
                ...prev, email: 'Must be a valid email'
            }))
            setUserInformation((prev) => {
                const newState = {...prev}
                delete newState.email
                return newState
            })
            return;
        }

        try {
            const payload = {
                value: emailRef.current.value,
                parameter: 'email'
            }
            const response = await axiosClient.post('/check_variable', payload);

            if (response.data === 'available') {
                console.log('available')
            } else {
                setErrors(prev => ({...prev, email: 'This email is already taken'}))
                setUserInformation((prev) => {
                    const newState = {...prev}
                    delete newState.email
                    return newState
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    const returnAllErrors = () => {
        return Object.values(errors);
    }
    const handlePasswordConfirm = () => {
        if (passwordRef.current.value !== confPasswordRef.current.value && (passwordRef.current.value && confPasswordRef.current.value)) {
            setErrors(prev => ({
                    ...prev, password: 'Your confirmation password does not match'
                }
            ))
            return;
        }
        if(passwordRef.current.value === confPasswordRef.current.value){
            setUserInformation(prev => ({
                ...prev, password: passwordRef.current.value, password_confirmation: confPasswordRef.current.value
            }))
        }
    }

    const handlePasswordInput = () => {
        if (errors.password) {
            setErrors(prev => {
                const newState = {...prev}
                delete newState.password
                return newState
            })
        }
        if (userInformation.password && userInformation.password_confirmation) {
            setErrors(prev => {
                const newState = {...prev}
                delete newState.password
                delete newState.password_confirmation
                return newState
            })
        }

    }

    const handleCreateUser = async(e) => {
        e.preventDefault()
        if (passwordRef.current.value !== confPasswordRef.current.value || !passwordRef.current.value || !confPasswordRef.current.value) {
            setErrors(prev => ({
                    ...prev, password: 'Your confirmation password does not match'
                }
            ))
            return
        }

        try{
            const response = await axiosClient.post('/signup', userInformation,
                {
                    headers: {'Content-Type': 'multipart/form-data'}
                })
            setUser(response.data.user)
            setToken(response.data.token)
        }catch(error){
            console.error(error)
        }

    }


    return (
        <>
            <div>
                <h2>Once last thing...</h2>
                <p className='mb-6'>Please enter your email and password to save your profile</p>
                <div className="grid grid-cols-2 grid-rows-3 items-center gap-y-3 mb-24">
                    <label htmlFor='email' className=''>Enter your email</label>
                    <input id='email' className="" name='email' type="email" ref={emailRef}
                           value={userInformation.email ?? ''}
                           placeholder='Enter your email'
                           onChange={(e)=> handleEmailInput(e)}
                           onBlur={(e) => handleEmailChange(e)}
                    />

                    <label htmlFor="password" className="">Enter your Password</label>
                    <input id='password' ref={passwordRef} name='password' type='password'
                           onChange={handlePasswordInput}
                           onBlur={handlePasswordConfirm}
                    />

                    <label htmlFor="password_confirmation" className="">Confirm Password</label>
                    <input id='password_confirmation' ref={confPasswordRef} name='password_confirmation' type='password'
                           onChange={handlePasswordInput}
                           onBlur={handlePasswordConfirm}
                    />
                </div>
                <div className="flex justify-center items-center relative">
                    <button
                        className="cursor-pointer transition-all duration-100 hover:bg-hover-blue rounded-lg border-white border-2 w-32 px-5 py-2 text-xl"
                        onClick={() => setViewState('accountInformation')}>Go Back
                    </button>

                    <input type='submit' className="global-btn-styling w-46 px-5 py-2 text-xl"
                           value='Become a Swirl User'
                            onClick={(e)=> handleCreateUser(e)}
                    />
                </div>
                {errors && <div className=" absolute left-1/2 transform -translate-x-1/2 w-48"><ErrorList
                    errors={returnAllErrors()}/></div>}
            </div>


        </>
    )
}
