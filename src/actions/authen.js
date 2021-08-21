import axios from "axios"

export const loggedIn = user => ({

type : "LOGGED_IN",
user

})

export const loggedOut= () => ({

    type : "LOGGED_OUT"

})

export const register = data =>
axios.post(`${process.env.REACT_APP_API_URL}/api/register`, data);


export const login = credentials => dispatch => 
axios.post(`${process.env.REACT_APP_API_URL}/api/login`,{ credentials }).then(
res => { dispatch(loggedIn(res.data.user))}
);

export const logout = () => dispatch => 
axios.post(`${process.env.REACT_APP_API_URL}/api/logout`)
.then(
dispatch(loggedOut()) ) ;
