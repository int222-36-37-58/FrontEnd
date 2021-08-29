import axios from "axios"
import { getUserProducts } from "./product";

export const loggedIn = user => ({

type : "LOGGED_IN",
user

})

export const loggedOut= () => ({

    type : "LOGGED_OUT"

})

export const register = data =>
axios.post(`${process.env.REACT_APP_API_URL}/api/register`, data).then(res => {login(res)});


export const login = credentials => dispatch => 
axios.post(`${process.env.REACT_APP_API_URL}/api/login`,{ credentials })
.then(
res => { dispatch(loggedIn(res.json().data.user))}
)
.then(
    res => { getUserProducts(res.json().data.user.userId)}
);

export const logout = () => dispatch => 
axios.post(`${process.env.REACT_APP_API_URL}/api/logout`)
.then(
dispatch(loggedOut()) ) ;
