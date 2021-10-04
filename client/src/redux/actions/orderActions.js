import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,

  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,


  ORDER_MYORDERS_REQUEST,
  ORDER_MYORDERS_SUCCESS,
  ORDER_MYORDERS_FAIL,

  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,

  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  } from "../types";

  import axios from "axios";

  export const createOrder = (order) => async (dispatch,getState) => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST
      });
  
      const { userLogin:{userInfo} } = getState()
  
      const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${userInfo.token}`
          },
        };
  
        const { data } = await axios.post(
          `/api/orders`,order,
          config
        );

     
    
          dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
          });

        localStorage.removeItem('cartItems')
        localStorage.removeItem('shippingAddress')
  
         
    } catch (error) {
      dispatch({
          type: ORDER_CREATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
    }
  };


  export const getOrderDetails = (order_id) => async (dispatch,getState) => {
    
    try {

        dispatch({type: ORDER_DETAILS_REQUEST})

        const {
          userLogin:{userInfo}
        } = getState();

        const config = {
          headers: {
            Authorization:`Bearer ${userInfo.token}`
          }
          }

        const { data } = await axios.get(`/api/orders/${order_id}`,config);
        const {order} = data;
      

        
        dispatch({
                type: ORDER_DETAILS_SUCCESS,
                payload: order
              });
      
        
      } catch (error) {
          dispatch({
              type:ORDER_DETAILS_FAIL,
              payload: error.response && error.response.data.message ? error.response.data.message : error.message
          })
      }
  };

  export const payOrder = (orderId,paymentResult) => async (dispatch,getState) => {
    
    try {

        dispatch({type: ORDER_PAY_REQUEST})

        const {
          userLogin:{userInfo}
        } = getState();

        const config = {
          headers: {
            'Content-Type': "application/json",
            Authorization:`Bearer ${userInfo.token}`
          }
          }
         
        const { data } = await axios.put(`/api/orders/${orderId}/pay`,paymentResult,config);
        const {order} = data;
      
        dispatch({
                type: ORDER_PAY_SUCCESS,
                payload: order
              });
      
        
      } catch (error) {
          dispatch({
              type:ORDER_PAY_FAIL,
              payload: error.response && error.response.data.message ? error.response.data.message : error.message
          })
      }
  };

  export const getMyOrdersDetails = () => async (dispatch,getState) => {
    
    try {

        dispatch({type: ORDER_MYORDERS_REQUEST})

        const {
          userLogin:{userInfo}
        } = getState();

        const config = {
          headers: {
            Authorization:`Bearer ${userInfo.token}`
          }
          }

        const { data } = await axios.get(`/api/orders/myorders`,config);
        // const {order} = data;
    
        dispatch({
                type: ORDER_MYORDERS_SUCCESS,
                payload: data
              });
      
        
      } catch (error) {
          dispatch({
              type:ORDER_MYORDERS_FAIL,
              payload: error.response && error.response.data.message ? error.response.data.message : error.message
          })
      }
  };

  export const orderList = () => async (dispatch,getState) => {
  
    try {
      dispatch({type: ORDER_LIST_REQUEST})

      const {
        userLogin:{userInfo}
      } = getState();

      const config = {
        headers: {
          Authorization:`Bearer ${userInfo.token}`
        }
        }


    const { data } = await axios.get("/api/orders",config);
   
    if(data){
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data.orders,
          });
        
    }else{
        dispatch({
            type:ORDER_LIST_FAIL,
            payload:`Error : ${data.message} statusCode ${data.statusCode}`
        })
    }
  } catch (error) {
      dispatch({
          type:ORDER_LIST_FAIL,
          payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
  }
};

export const deliverOrder = (orderId) => async (dispatch,getState) => {
    
  try {

      dispatch({type: ORDER_DELIVER_REQUEST})

      const {
        userLogin:{userInfo}
      } = getState();
     
      const config = {
        headers: {
          'Content-Type': "application/json",
          Authorization:`Bearer ${userInfo.token}`
        }
        }
       
      const { data } = await axios.put(`/api/orders/${orderId}/deliver`,{},config);
      const {order} = data;
      dispatch({
              type: ORDER_DELIVER_SUCCESS,
              payload: order
            });
    
      
    } catch (error) {
        dispatch({
            type:ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
};