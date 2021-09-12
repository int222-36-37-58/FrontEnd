import { Container, Grid } from '@material-ui/core';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ColorCard from '../ui/ColorCard';
import TypeCard from '../ui/TypeCard';

const ListBaseDataPage = () => {

    const [color , setColor] = useState([]);
    const [type , setType] = useState([]);

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_API_URL}/colors`).then(res => setColor(res.data))
        axios.get(`${process.env.REACT_APP_API_URL}/brands`).then(res => setType(res.data))
        },[])


    return (
        <Container maxWidth='lg' style={{ marginTop: 10+'px'}}>
             <div style={{ backgroundColor : 'white', padding: 15+'px', borderRadius : 10+'px'}}> 
             <div style={{ fontWeight: 600 , fontSize: 24+'px', marginBottom : 50+'px'}}>All Colors and Types</div>
             <Grid container>
                <Grid item xs={12} md={6}>
                <div style={{fontWeight: 600 , fontSize:20+'px'}}> Colors </div>
                { color.map( col => {

                    return <ColorCard key={col.colorId} color={col}/>
                })}</Grid>

                <Grid item xs={12} md={6}>
                <div style={{fontWeight: 600, fontSize:20+'px'}}> Types </div>
                { type.map( type => {
                return <TypeCard key={type.typeId} type={type} />
                    })}</Grid>
               </Grid> 
             </div>
           
        </Container>
    )
}


export default ListBaseDataPage;
