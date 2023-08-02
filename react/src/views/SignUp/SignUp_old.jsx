import React, {useState, useRef, useEffect} from 'react';
import axiosClient from '../../services/axios-client.js'
import {useStateContext} from "../../../contexts/contextProvider.jsx";
import {Link} from "react-router-dom";
import ErrorList from "../../components/ErrorList.jsx";



const SignUp_old = ({greeting}) => {
    const [errors, setErrors] = useState([]);


    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confPasswordRef = useRef();

    const {setToken, setUser} = useStateContext();
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        try {
            const response = await axiosClient.get('/index');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: confPasswordRef.current.value
        }
        try{
            const response = await axiosClient.post('/signup', payload)
            if(response.status === 200){
                console.log(response.data)
                setToken(response.data.token)
                setUser(response.data.user)
                await fetchUsers();
            } else if(response.status === 422) {

                console.log('something went wrong')
            }
            else{
                console.log(response.status);
            }
        } catch(error){
            console.error(error)
            const errorBank = Object.values(error.response.data.errors);
            console.log(errorBank);
            setErrors(errorBank);

        }
    }
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>

            <h1>{greeting}</h1>
        <form onSubmit={onSubmit}>
            {/*{errors.map((err, index) => (*/}
            {/*    <p key={index} className='error'>{err}</p>*/}
            {/*))*/}
            {/*}*/}
            <ErrorList errors={errors}/>
            <label htmlFor='name' id=''></label>
            <input ref={nameRef} id='name' name='name' placeholder="name"/>
            <br/>
            <label htmlFor='email' id=''></label>
            <input ref={emailRef} id='email' placeholder="email" name='email'/>
            <br/>
            <label htmlFor='password' id=''></label>
            <input ref={passwordRef} placeholder="password" id='password' name='password'/>
            <br/>
            <label htmlFor='password_confirmation' id=''></label>
            <input ref={confPasswordRef} placeholder="confirm password" id='password_confirmation' name='password_confirmation'/>
            <br/>
            <input type="submit" value="submit" />
        </form>
        <br/>
        <Link to='/signIn'>Already a member?</Link>
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
        </>


     );
}

export default SignUp_old;
