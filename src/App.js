import React from 'react'
import { Route } from 'react-router';
import Home from './components/pages/Home'
import NavBar from './components/ui/NavBar'
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import CreateProductPage from "./components/pages/CreateProductPage"
const App = () => (
  <div>
<NavBar/>

<Route path="/" exact component={Home}/>
<Route path="/register" exact component={RegisterPage}/>
<Route path="/login" exact component={LoginPage}/>
<Route path="/createproduct" exact component={CreateProductPage}/>



</div>

)

export default App;
