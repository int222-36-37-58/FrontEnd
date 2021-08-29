import React, { Component } from 'react'
import RegisterForm from '../forms/RegisterForm'
import { register } from '../../actions/authen'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'



class RegisterPage extends Component {

    submit = data => {
        this.props.register(data);
        }

    render() {
        return (
            <div>
                <RegisterForm submit={this.submit}/>
            </div>
        )
    }
}



RegisterPage.propTypes = {

register : PropTypes.func.isRequired

}


export default connect(null, { register })(RegisterPage)