import {createBrowserRouter} from "react-router-dom";
import SignUp from "./views/SignUp/SignUp.jsx";
import Home from "./views/home.jsx";
import UserLayout from "./components/UserLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import NotFound from "./views/NotFound.jsx";
import Logout from "./views/Logout.jsx";
import SignIn from "./views/signIn.jsx";
import Welcome from "./views/Welcome/Welcome.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <UserLayout/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/logout',
                element: <Logout/>,
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/welcome',
                element: <Welcome/>
            },
            {
                path: '/signup',
                element: <SignUp/>,
            },
            {
                path: '/signIn',
                element: <SignIn/>
            },
        ]
    },

    {
        path: '*',
        element: <NotFound/>,
    }
])

export default router;

