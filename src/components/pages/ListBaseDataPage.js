import { Container, Grid } from '@material-ui/core';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ListBaseDataPage = () => {

    const [color , setColor] = useState([]);
    const [type , setType] = useState([]);

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_API_URL}/colors`).then(res => setColor(res.data))
        axios.get(`${process.env.REACT_APP_API_URL}/brands`).then(res => setType(res.data))
        })


    return (
        <Container maxWidth='lg' style={{ marginTop: 10+'px'}}>
             <div style={{ backgroundColor : 'white', padding: 15+'px', borderRadius : 10+'px'}}> 
             <div style={{ fontWeight: 600 , fontSize: 24+'px', marginBottom : 50+'px'}}>All Colors and Types</div>
             <Grid container>
                <Grid item xs={12} md={6}>
                { color.map( col => {

                    return <div>{col.colorName}</div>
                })}</Grid>

                <Grid item xs={12} md={6}></Grid>
                { type.map( type => {
                return <div> {type.name}</div>
                    })}</Grid>
             
             </div>
        </Container>
    )
}


export default ListBaseDataPage;
