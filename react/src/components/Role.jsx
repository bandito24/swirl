import {useState} from "react";

export default function Role({roleUser, role}) {
    // const user = role.user ?? null
    const [user, setUser] = useState(roleUser ?? null)


    return (

        <>
            <div className={`fade-in mb-10 ${role !== 'Project Creator' ? 'border-gray-100' : 'border-yellow-400'} border-2 relative justify-center items-center rounded-md hover:cursor-pointer hover:bg-hover-white transition-bg duration-200 ease-in inline-flex
        flex-col flex-no-wrap w-full`}>
                {user ? (
                    <>
                        <h2>{role}</h2>
                        {role === 'Project Creator' &&
                            <img className="w-7 h-auto absolute top-2 right-2" src='/creator-star.png'/>}
                        <img className="rounded-full w-4/6" src={user.profile_picture}/>
                        <p>{user.user_name}</p>

                    </>
                ) : (
                    <>
                        <p>Available Role: {role} </p>
                        <button className="text-lg w-4/6 global-btn-styling">Request to Fill Role</button>
                    </>
                )
                }

            </div>
        </>

    )
}
