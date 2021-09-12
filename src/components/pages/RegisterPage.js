import React from 'react'
import RegisterForm from '../forms/RegisterForm'
import axios from 'axios'
import { useHistory } from 'react-router';




const RegisterPage = () => {
const history = useHistory();
const submit = data => {   
     const json = JSON.stringify(data);
     axios.post(`${process.env.REACT_APP_API_URL}/register`,json,{
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        if(res.status === 200){
            alert('register Success')
            history.push('/')
        }else {
            alert('something wrong please try again')
        }
    })
    }


    return (
        <div>
            <RegisterForm submit={submit}/>
        </div>
    )
}
export default RegisterPage
