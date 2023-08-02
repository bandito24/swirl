import React from "react";
import {useNavigate} from "react-router-dom";

export default function Introduction({setViewState}) {
    const navigate = useNavigate()
    return(
    <>
        <h2 className='text-4xl'>Welcome to Swirl</h2>
        <h6>An online platform for new coders to collaborate in building new platforms</h6>
        <p>Please select one of the options</p>
        <div id='select-options'>
            <button id='guest' value='Explore as Guest'>Explore as Guest</button>
            <button id='sign-up' value='Sign Up' onClick={() => navigate('/SignUp')}>Sign Up</button>
            <button id='sign-in' value='Sign In'>Sign iIn</button>
        </div>
    </>
    )
}
