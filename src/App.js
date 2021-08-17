import React from 'react'
import { Route } from 'react-router';
import Home from './pages/Home'
import NavBar from './components/NavBar'
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateProductPage from "./pages/CreateProductPage"
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
