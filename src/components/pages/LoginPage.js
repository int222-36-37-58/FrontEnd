import React, { Component } from 'react'
import LoginForm from '../forms/LoginForm'


export default class LoginPage extends Component {


submit = data => {

console.log(data)


}


    render() {
        return (
            <div>
                    <LoginForm submit={this.submit}/>

            </div>
        )
    }
}
