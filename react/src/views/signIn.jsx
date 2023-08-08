import React, {useRef, useState} from "react";
import axiosClient from "../services/axios-client.js";
import {useStateContext} from "../../contexts/contextProvider.jsx";
import {Link} from "react-router-dom";


export default function SignIn() {
    const emailRef = useRef();
    const passwordRef = useRef()
    const {setUser, setToken} = useStateContext();
    const [error, setError] = useState([]);
    const [isLoading, setIsLoading] = useState(null);


    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        if (!emailRef.current.value || !passwordRef.current.value) {
            setError('Both fields are required.');
            return;
        }

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        try {
            const response = await axiosClient.post('/signin', payload);


                console.log(response.status)
                const {data} = response;
                setUser(data.user);
                setToken(data.token);

        } catch (error) {
            if (error.response.status === 422) {
                console.log(error)
                const response = error.response
                setError(response.data.message)

            } else {
                setError('Something went wrong, please try again later')
            }


        } finally {
            setIsLoading(false);
        }
    }


    return (
        <>

            <h1>Please Sign In</h1>
            <form onSubmit={onSubmit}>
                {error && <p>{error}</p>}
                <input ref={emailRef} type='email' name='email' placeholder='email'/>
                <br/>
                <input ref={passwordRef} type='text' name='password' placeholder='password'/>
                <br/>
                <input type='submit' className='global-btn-styling' value='Sign In'/>
                    {isLoading && <p>Loading...</p>}
            </form>
            <Link className='global-btn-styling' to='/signup'>Don't have an account?</Link>
        </>
    )
}
