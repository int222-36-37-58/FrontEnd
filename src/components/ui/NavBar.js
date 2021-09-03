
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import '../../index.css'
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';


import React from 'react'

export default function NavBar() {
const onChange = (e) => {


console.log(e.target.value);
}


    return (
        <AppBar position="static" style={{ top : 0}}>
        <Toolbar>
           
           <Link to="/" style={{ color:'white', textDecoration: 'none' }} className="underlineHover"> Home</Link>
           <div class="searchWrap">
    
            <div className="searchBox" >  
               <InputBase className="searchInput" placeholder="Search…" variant="outlined"  type="text" id="searchText" name="searchText" onChange={onChange} />  
             <div className="searchIcon">
                <SearchIcon />
            </div>
         
            
    
            </div>
    
           
      
            </div>
            <Button variant="contained" color="default"  style={{marginRight : 20 + "px"}}><Link to="/register" style={{ textDecoration: 'none' }}> Register</Link></Button>
            <Button variant="contained" color="default" style={{marginRight : 20 + "px"}}><Link to="/login" style={{ textDecoration: 'none' }}>Log in</Link></Button>
            <Button variant="contained" color="default" style={{marginRight : 20 + "px"}}><Link to="/createproduct" style={{ textDecoration: 'none' }}>Add product</Link></Button>
            <Button variant="contained" color="default" style={{marginRight : 20 + "px"}}><Link to="/profile" style={{ textDecoration: 'none' }}>Profile</Link></Button>
        </Toolbar>
    
    </AppBar>
    )
}
