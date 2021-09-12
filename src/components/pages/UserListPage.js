import { Container } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import UserCard from '../ui/UserCard';



const UserListPage = () => {
const [user , setUser] = useState([]);

useEffect(() => {

axios.get(`${process.env.REACT_APP_API_URL}/setest`).then(res => setUser(res.data))

},[])
    return (
        <Container maxWidth='lg' style={{ marginTop: 10+'px'}}>
        <div style={{ backgroundColor : 'white', padding: 15+'px', borderRadius : 10+'px'}}> 
        <div style={{ fontWeight: 600 , fontSize: 24+'px', marginBottom : 50+'px'}}>All Users (id, username)</div>
        {   
        user.map( user => {
            return <UserCard key={user.userId} user={user}/>

        })

        }
        </div>
    </Container>
    )
}

export default UserListPage
