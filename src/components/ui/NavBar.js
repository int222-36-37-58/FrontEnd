import React from 'react'
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import '../../index.css'


const NavBar = () => (
<div>
    <AppBar position="static">
    <Toolbar>
        <Typography style={{flexGrow: 1}}><Link to="/" style={{ color:'white', textDecoration: 'none' }}><span className="underlineHover"> Home</span></Link></Typography>
        <Button variant="contained" color="default"  style={{marginRight : 20 + "px"}}><Link to="/register" style={{ textDecoration: 'none' }}> Register</Link></Button>
        <Button variant="contained" color="default" style={{marginRight : 20 + "px"}}><Link to="/login" style={{ textDecoration: 'none' }}>Log in</Link></Button>
        <Button variant="contained" color="default" style={{marginRight : 20 + "px"}}><Link to="/createproduct" style={{ textDecoration: 'none' }}>Add product</Link></Button>
    </Toolbar>

</AppBar>
</div>
);

export default NavBar;
