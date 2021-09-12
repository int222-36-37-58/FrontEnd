import { Container } from '@material-ui/core'
import React from 'react'

const ColorCard = (props) => {
    return (
        <Container>
            <div className="userCard">
           <div> {props.color.colorId}</div>
           <div>   {props.color.colorName}</div>
            <button className="delFromCart">DELETE</button>

        </div>
        </Container>
    )
}


export default ColorCard