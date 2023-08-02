import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../../contexts/contextProvider.jsx";
import Navigation from "./Navigation.jsx";

export default function UserLayout() {
    const {token, user} = useStateContext();
    console.log('token is', token);
    console.log('user is', user);
    if(!token){
        return <Navigate to='/welcome' />
    }
    return(
    <>
        <Navigation />
        <Outlet />
    </>
    )
}
