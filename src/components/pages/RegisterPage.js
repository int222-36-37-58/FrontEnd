import React, { Component } from 'react'
import RegisterForm from '../forms/RegisterForm'

import axios from 'axios'



class RegisterPage extends Component {

    submit = data => {
        const json = JSON.stringify(data);
        console.log(json);
     axios.post(`${process.env.REACT_APP_API_URL}/register`,json,{
        headers: {
            'Content-Type': 'application/json',
        }
    })
    }

    render() {
        return (
            <div>
                <RegisterForm submit={this.submit}/>
            </div>
        )
    }
}


export default RegisterPage