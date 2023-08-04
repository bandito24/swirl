import React, {useState} from 'react';

import SetLanguages from "../components/SetLanguages.jsx";
import AccountInformation from "../components/AccountInformation.jsx";
import Registration from "../components/Registration.jsx";



export default function SignUp(){
    const [viewState, setViewState] = useState('setLanguages')
    const [userInformation, setUserInformation] = useState({})

    return (
        <>
            <form encType='multipart/form-data' className="relative" >
                {viewState === 'setLanguages' && <SetLanguages
                    setViewState={setViewState}
                    setUserInformation = {setUserInformation}
                    userInformation = {userInformation}
                />}
                {viewState === 'accountInformation' && <AccountInformation
                    setViewState={setViewState}
                    setUserInformation = {setUserInformation}
                    userInformation = {userInformation}
                />}
                {viewState === 'registration' && <Registration
                    setViewState={setViewState}
                    setUserInformation = {setUserInformation}
                    userInformation = {userInformation}
                />}
            </form>

        </>


    );
}

