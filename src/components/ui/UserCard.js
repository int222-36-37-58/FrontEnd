import { Container } from '@material-ui/core'
import React from 'react'

export default function userCard(props) {
    return (

        <Container>
        <div className="userCard">
           <div> {props.user.userId}</div>
           <div>   {props.user.userName}</div>
           <div>  { props.user.role !== 'admin' && <span>
               <button className="AddButton">Edit</button> <button className="delFromCart">DELETE</button>
               </span>}</div>

            
        </div>
        </Container>
    )
}


