import React, { Component } from 'react'
import LoginForm from '../forms/LoginForm'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { login } from '../../actions/authen'

class LoginPage extends Component {

submit = data => {

this.props.login(data)

}

    render() {
        return (
            <div>
                    <LoginForm submit={this.submit}/>
            </div>
        )
    }
}

LoginPage.propTypes = {

    login : PropTypes.func.isRequired

}

export default connect(null, { login })(LoginPage)
