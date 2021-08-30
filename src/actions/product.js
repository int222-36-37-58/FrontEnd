import axios from "axios";


export const getProducts = products => ({
    type: "GET_USER_PRODUCT",
    products
})


// export const createProduct = product => ({
// type: "CREATE_PRODUCT"
// ,product
// })


// export const removeProduct = product => ({
//     type: "REMOVE_PRODUCT"
//     ,product
//     })

// export const editProduct = product => ({
//     type: "EDIT_PRODUCT"
//     ,product
//     })    


export const getUserProducts = userId => dispatch =>
axios.get(`${process.env.REACT_APP_API_URL}/api/userProduct/${userId}`)
.then(
    res => {dispatch(getProducts(res.json().data.products))}
);

export const addProduct = data =>
axios.post(`${process.env.REACT_APP_API_URL}/api/createProduct`, data, { headers: { "Content-Type": "multipart/form-data" } });    


export const delProduct = data =>
axios.delete(`${process.env.REACT_APP_API_URL}/api/deleteProduct/${data.productId}`);

export const editProduct = data =>
axios.put(`${process.env.REACT_APP_API_URL}/api/editProduct/${data.productId}`,data);