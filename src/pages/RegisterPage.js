import React, { Component } from 'react'
import RegisterForm from '../components/RegisterForm'


export default class RegisterPage extends Component {

    submit = data => {

        console.log(data)
        
        }

    render() {
        return (
            <div>
                <RegisterForm submit={this.submit}/>
            </div>
        )
    }
}
