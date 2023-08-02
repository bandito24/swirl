import React, {useState} from 'react';

import SetLanguages from "../../components/SetLanguages.jsx";
import AccountInformation from "../../components/AccountInformation.jsx";
import Registration from "../../components/Registration.jsx";



export default function SignUp(){
    const [viewState, setViewState] = useState('setLanguages')
    const [userInformation, setUserInformation] = useState({})

    return (
        <>
            <form encType='multipart/form-data'>
                {viewState === 'setLanguages' && <SetLanguages
                    setViewState={setViewState}
                    setUserInformation = {setUserInformation}
                />}
                {viewState === 'accountInformation' && <AccountInformation
                    setViewState={setViewState}
                    setUserInformation = {setUserInformation}
                />}
                {viewState === 'registration' && <Registration
                    setViewState={setViewState}
                    setUserInformation = {setUserInformation}
                />}
            </form>

        </>


    );
}

