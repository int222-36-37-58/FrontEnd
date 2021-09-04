
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { Link } from 'react-router-dom';

import '../../index.css'
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React from 'react'


export default function NavBar() {
const onChange = (e) => {

}


    return (
        <AppBar position="static" style={{ top : 0}}>
        <Toolbar>
           <div className="navbarContent">
            <div className="navLeftItem">
           <Link to="/" style={{ color:'white', textDecoration: 'none' ,marginRight : 30+'px' }}><HomeIcon/></Link>
           <div class="searchWrap">
            <div className="searchBox" >  
               <InputBase className="searchInput" placeholder="Search…" variant="outlined"  type="text" id="searchText" name="searchText" onChange={onChange} />  
             <div className="searchIcon">
                <SearchIcon />
            </div>
            </div>
            </div>
            </div>

            <div className="navRightItem">
           <div>
          <Link to="/login" style={{ textDecoration: 'none' }} className="navbarIcon">  <PersonOutlineIcon style={{ color: 'white'}}/></Link>
           </div>

           <div>
          <ShoppingCartIcon className="navbarIcon"/>
           </div>
            </div>

            </div>
    
    </Toolbar>
    
    </AppBar>
    )
}
