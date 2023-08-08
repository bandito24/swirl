import {createBrowserRouter} from "react-router-dom";
import SignUp from "./views/SignUp.jsx";
import Dashboard from "./views/dashboard.jsx";
import UserLayout from "./components/UserLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import NotFound from "./views/NotFound.jsx";
import Logout from "./views/Logout.jsx";
import SignIn from "./views/signIn.jsx";
import Welcome from "./views/Welcome.jsx";
import Project from "./views/Project.jsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <UserLayout/>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/project/:slug',
                element: <Project/>
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

