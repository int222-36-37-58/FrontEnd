
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { Link } from 'react-router-dom';

import '../../index.css'
import { Drawer, InputBase, List, ListItem } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React, { useState } from 'react';
import ProductInCartBox from './ProductInCartBox';

export default function NavBar() {
const [ isShowCart , setIsShowCart] = useState(false);

const onChange = (e) => {

}

const handleCart = (open) => event => {
    setIsShowCart(open)
}

    return (
    <div>

        <Drawer open={isShowCart} anchor={'right'} onClose={handleCart(false)} >
        <List style={{ width: 375+'px'}}>
        <ListItem style={{ fontWeight : 600}}>Cart : </ListItem>
        <ListItem><ProductInCartBox/></ListItem>
        <ListItem><ProductInCartBox/></ListItem>
        <ListItem><ProductInCartBox/></ListItem>
        <ListItem><ProductInCartBox/></ListItem>
        <ListItem><ProductInCartBox/></ListItem>
        <ListItem><ProductInCartBox/></ListItem>
        <ListItem><ProductInCartBox/></ListItem>
        <ListItem><ProductInCartBox/></ListItem>
        <ListItem><ProductInCartBox/></ListItem>
        <ListItem><ProductInCartBox/></ListItem>
        </List>

        </Drawer>
       
        <AppBar position="static" style={{ top : 0}}>
        <Toolbar>
           <div className="navbarContent">
            <div className="navLeftItem">
           <Link to="/" className="navbarIcon" style={{ marginRight : 30+'px' }}><HomeIcon style={{ fontSize : 30+'px' }}/></Link>
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
          <Link to="/login" style={{ textDecoration: 'none' }} > <PersonIcon className="personIcon" style={{ fontSize : 30+'px' }}/></Link>
           </div>

           <div>
          <ShoppingCartIcon className="navbarIcon" onClick={handleCart(true)} style={{ fontSize : 30+'px' }}/>
           </div>
            </div>

            </div>
    
    </Toolbar>
    
    </AppBar>
    </div>
    )
}
