import React, { Component } from 'react'
import CreateProductForm from '../components/CreateProductForm'




export default class CreateProductPage extends Component {

submit = (e) => {

console.log(e)

}






    render() {
        return (
            <div>
                <CreateProductForm submit={this.submit}/>
            </div>
        )
    }
}
