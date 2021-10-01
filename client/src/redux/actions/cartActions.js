import {
    CART_ADD_ITEM,
    CART_REMOVED_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    
    } from "../types";

import axios from 'axios'


export const addToCart = (id,qty) =>async(dispatch,getState)=>{
    const {data} = await axios.get(`/api/products/${id}`)
    const {_id,name,image,price,countInStock} = data.product;
    dispatch({
        type:CART_ADD_ITEM,
        payload: {
          product: _id,
          name:name,
          image:image,
          price:price,
          countInStock:countInStock,
          qty: qty
        }
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))

}

export const removeFromCart = (id) =>(dispatch,getState)=>{
    dispatch({
        type:CART_REMOVED_ITEM,
        payload:id
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))

}

export const saveShippingAddress = (data) =>(dispatch)=>{
    dispatch({
        type:CART_SAVE_SHIPPING_ADDRESS,
        payload:data
    })
    localStorage.setItem('shippingAddress',JSON.stringify(data))

}

export const savePaymentMethod = (method) =>(dispatch)=>{
    dispatch({
        type:CART_SAVE_PAYMENT_METHOD,
        payload:method
    })
    localStorage.setItem('paymentMethod',JSON.stringify(method))

}

