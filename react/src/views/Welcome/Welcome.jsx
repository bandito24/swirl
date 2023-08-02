import React, {useState} from "react";
import './Welcome.css';
import Introduction from "../../components/Introduction.jsx";
import SetLanguages from "../../components/SetLanguages.jsx";
import AccountInformation from "../../components/AccountInformation.jsx";
import Registration from "../../components/Registration.jsx";


export default function Welcome() {
    return (
        <>
            <Introduction/>
        </>
    )
}
