import {useStateContext} from "../../contexts/contextProvider.jsx";
// import {useEffect} from "react";
import axiosClient from "../services/axios-client.js";
import {Navigate, useNavigate} from "react-router-dom";

export default function Logout() {
    const {user, token, setUser, setToken} = useStateContext();
    const navigate = useNavigate();



    const onLogout = async function(e){
        e.preventDefault();
        try{
            const response = await axiosClient.post('/logout')
            if(response.status === 200) {
                console.log('hi')
                setUser({})
                localStorage.removeItem('ACCESS_TOKEN')
                setToken(null)
                navigate('../signup')
            } else {
                console.log(response.status)
            }
    } catch(error){
        console.error(error)
        }
    }



    return(
    <>
    <form onSubmit={onLogout}>
        <h1>click here to log out</h1>
        <input type='submit' value='logout' className="global-btn-styling mt-8 w-20 h-10" />
    </form>
    </>
    )
}
