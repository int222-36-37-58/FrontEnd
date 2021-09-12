import { Container } from '@material-ui/core'
import React from 'react'

const TypeCard = (props) => {
    return (
        <Container>
             <div className="userCard">
           <div> {props.type.typeId}</div>
           <div>   {props.type.name}</div>
            <button className="delFromCart">DELETE</button>

        </div>
        </Container>
    )
}

export default TypeCard
