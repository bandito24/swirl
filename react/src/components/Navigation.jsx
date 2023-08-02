import {useStateContext} from "../../contexts/contextProvider.jsx";
import {NavLink} from "react-router-dom";


export default function Navigation() {
    const {token} = useStateContext()

    return (
        <>
            <nav>
                {token ? (
                    <button>
                        <NavLink to="/Logout">Logout</NavLink>
                    </button>
                )
                : (
                        <button>
                            <NavLink to="/SignIn">Sign In</NavLink>
                        </button>
                    )
                }
            </nav>
        </>
    );
}
