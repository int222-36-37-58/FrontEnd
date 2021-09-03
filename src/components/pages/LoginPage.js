import React from 'react'
import LoginForm from '../forms/LoginForm'
//import PropTypes from 'prop-types'
//import { connect } from "react-redux";
//import { login } from '../../actions/authen'




export default function LoginPage() {


const submit = (e) => {

    console.log(e);

}



    return (
        <div>
       
                <LoginForm submit={submit}/>
          
        </div>
    )
}

