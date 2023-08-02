import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../../contexts/contextProvider.jsx";
import Navigation from "./Navigation.jsx";

export default function GuestLayout() {
    const {token} = useStateContext();

    if(token){
        return <Navigate to='/' />
    }
    return(
        <>
            <Outlet />
        </>
    )
}
