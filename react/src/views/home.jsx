import {useEffect, useRef, useState} from "react";
import axiosClient from "../services/axios-client.js";


export default function Home() {
    const [userInfo, setUserInfo] = useState({})

    const photoRef = useRef();
    const aboutMeRef = useRef();
    const fetchData = async () => {
        const response = await axiosClient.get('/user')
        setUserInfo(response.data)
    }

    useEffect(() => {
        fetchData();

    }, [])

    const onSubmit = async function (e) {
        e.preventDefault();

        const formData = new FormData();
        if (photoRef.current.files[0]) {
            formData.append('profile_picture', photoRef.current.files[0]);
        }
        if (aboutMeRef.current.value) {
            formData.append('about_me', aboutMeRef.current.value)
        }

        formData.append('_method', 'PATCH');
        try {
            const response = await axiosClient.post('/patch', formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
            fetchData();
            photoRef.current.reset;
            aboutMeRef.current.value = ''
            photoRef.current.value = null
        } catch (error) {
            console.error(error)
        }

    }


    return (
        <div>

            <h1>Welcome home you son of a bitch</h1>
            <form onSubmit={onSubmit}>
                <input type="hidden" name="_method" value="PATCH"/>
                <label htmlFor='profile_photo' className=''>Profile Photo</label>
                <input ref={photoRef} id='profile_photo' name='profile_photo' type="file"/>
                <br/>
                <label htmlFor='about_me' className=''>Short Info About yourself</label>
                <input ref={aboutMeRef} id='about_me' name='about_me' type="text"/>

                <br/>
                <input type='submit' value='submit'/>
            </form>

            <p>{userInfo.email}</p>
            {
                userInfo.profile_picture ? (
                    <img src={userInfo.profile_picture} className='profile_photo'/>
                ) : (
                    <img src='/no_photo.png' className='profile_photo'/>
                )
            }
            {
                userInfo.about_me ? (
                    <p>{userInfo.about_me}</p>
                ) : (
                    <p>No 'About me' inputted</p>
                )
            }
        </div>
    )
}
