
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
import { connect } from 'react-redux';
import { removeFromCart } from '../../actions/cart';


const NavBar = ({cart,removeFromCart}) => {
const [ isShowCart , setIsShowCart] = useState(false);

const onChange = (e) => {

}

const handleCart = (open) => event => {
    setIsShowCart(open)
}

const handleCheckOut = () => {

    
}


    return (
    <div>

        <Drawer open={isShowCart} anchor={'right'} onClose={handleCart(false)} >
        <List style={{ width: 375+'px'}}>
       
        {cart.cart.length === 0 ? <ListItem style={{ fontWeight : 600}}>No product in cart</ListItem> :  <ListItem style={{ fontWeight : 600}}>Cart : </ListItem>}
        {cart.cart.map( item => {
            return <ListItem><ProductInCartBox product={item} remove={removeFromCart}/></ListItem>
        })}

        {cart.cart.length > 0 &&
        <ListItem><button className="AddButton" onClick={handleCheckOut}>CheckOut</button></ListItem> 
        }
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

const mapStateToProps = (state) => {

return {

    cart : state.cart
}

}


const mapDispatchToProps = dispatch =>{
    return {
        removeFromCart : product => dispatch(removeFromCart(product))

    }

}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);