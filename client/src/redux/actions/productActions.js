import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,

  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,

  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,

  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,

  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,

  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,

  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,

} from "../types";
import axios from "axios";



export const listProducts = (keyword='' , pageNumber='',sort) => async (dispatch,getState) => {
  
    try {
          if(sort===''){
            dispatch({type: PRODUCT_LIST_REQUEST})
            const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
         
            dispatch({
              type: PRODUCT_LIST_SUCCESS,
              payload: data.products, //products per current page
             
            });
          }
          else if(sort==='asc'){
           const {productListReducer} = getState()
           const products = productListReducer
         
           // const { productListReducer } = getState();
            dispatch({ type:'SORT_ASC' , payload:  products});
          }
          else if(sort==='desc'){
            const {productListReducer} = getState()
            const products = productListReducer
          //  const { productListReducer } = getState();
            dispatch({ type:'SORT_DESC' , payload:  products});
          }
         
          
    
  } catch (error) {
      dispatch({
          type:PRODUCT_LIST_FAIL,
          payload: error.response && error.response.data.message ? error.response.data.message : error.message
      })
  }
};

export const listProductDetails = (id) => async(dispatch)=>{
    dispatch({type: PRODUCT_DETAILS_REQUEST})
    try {

        const { data } = await axios.get(`/api/products/${id}`);
      
        if(data.product){
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: data.product,
              });
            
        }else{
            dispatch({
                type:PRODUCT_DETAILS_FAIL,
                payload:`Error : ${data.message} statusCode ${data.statusCode}`
            })
        }
      } catch (error) {
          dispatch({
              type:PRODUCT_DETAILS_FAIL,
              payload: error.response && error.response.data.message ? error.response.data.message : error.message
          })
      }
}

export const deleteProduct = (id) => async (dispatch,getState) => {
    try {
      dispatch({
        type: PRODUCT_DELETE_REQUEST
      });
  
      const { userLogin:{userInfo} } = getState()
  
      const config = {
          headers: {
            Authorization:`Bearer ${userInfo.token}`
          },
        };
    
        await axios.delete(`/api/products/${id}`,config);
      
          dispatch({
            type: PRODUCT_DELETE_SUCCESS
          });
  
         
    } catch (error) {
      dispatch({
          type: PRODUCT_DELETE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
    }
  };


  export const createProduct = (product) => async (dispatch,getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REQUEST
      });
  
      const { userLogin:{userInfo} } = getState()
  
      const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${userInfo.token}`
          },
        };
  
        const { data } = await axios.post(
          `/api/products`,product,
          config
        );
        
          dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
          });
   
    } catch (error) {
      dispatch({
          type: PRODUCT_CREATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
    }
  };


export const editProduct = (product) => async (dispatch,getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST
    });

    const { userLogin:{userInfo} } = getState()

    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${userInfo.token}`
        },
      };
    console.log(product._id)
    const {data} = await axios.put(`/api/products/${product._id}`,product,config);
     console.log('data of updated product',data)
      if(data){
        dispatch({
          type: PRODUCT_UPDATE_SUCCESS,
        });
        dispatch({
          type: PRODUCT_DETAILS_SUCCESS,payload:data
        });
 
      }

  } catch (error) {
    dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
  }
};



export const createProductReview = (productId,review) => async (dispatch,getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST
    });

    const { userLogin:{userInfo} } = getState()

    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${userInfo.token}`
        },
      };

     await axios.post(
        `/api/products/${productId}/reviews`,review,
        config
      );
      
        dispatch({
          type: PRODUCT_CREATE_REVIEW_SUCCESS,
        });
 
  } catch (error) {
    dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
  }
};

export const listTopRatedProducts = () => async (dispatch) => {
  dispatch({type: PRODUCT_TOP_REQUEST})
  try {
  const { data } = await axios.get(`/api/products/top`);

  if(data){
      dispatch({
          type: PRODUCT_TOP_SUCCESS,
          payload: data,
        });
      
  }else{
      dispatch({
          type:PRODUCT_TOP_FAIL,
          payload:`Error : ${data.message} statusCode ${data.statusCode}`
      })
  }
} catch (error) {
    dispatch({
        type:PRODUCT_TOP_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
}
};


// export const sortProductsAsc = () => (dispatch, getState) => {

// 	const { productListReducer } = getState();
// 	dispatch({ type:'SORT_ASC' , payload:  productListReducer.products});
// };

// export const sortProductsDesc = () => (dispatch, getState) => {

// 	const {productListReducer } = getState();
//   dispatch({ type:'SORT_DESC', payload: productListReducer.products });
// };

  
