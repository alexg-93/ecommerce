import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button,FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {listProductDetails,editProduct} from "../redux/actions/productActions";
import {PRODUCT_UPDATE_RESET} from "../redux/types";
import FormContainer from "../components/FormContainer";

const ProductEditScreen = ({ match, history }) => {

  const productID = match.params.id

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0)
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category,setCategory] = useState ("")
  const [message,setMessage] = useState("")

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);


  const { loading, error , product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;


  const updateProduct = useSelector((state) => state.productUpdateReducer);

  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = updateProduct;

  
    useEffect(() =>{

        //check if the logged in user is Admin if not then redirect to homepage.
      if(!userInfo.isAdmin){
        history.push('/')
      }
     
      //checks if update product success
      if(successUpdate){
    
        setMessage("Product updated successfully")
        setTimeout(()=>{
          dispatch({type:PRODUCT_UPDATE_RESET})
          history.push('/admin/products')
        },1500)
    
        
    }else{
      if(!product || product._id!==productID){
        dispatch(listProductDetails(productID))
      }
      setName(product.name)
      setPrice(product.price)
      setCountInStock(product.countInStock)
      setImage(product.image)
      setBrand(product.brand)
      setDescription(product.description)
      setCategory(product.category)
    }
    
    },[dispatch,productID,history,successUpdate,error,errorUpdate])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editProduct({_id:productID,name,price,countInStock,description,brand,category,image}))
    
};

  return (
    <>
    <Link to='/admin/products' className='btn btn-light my-3'>
      Go Back
    </Link>

    {}
  
    <FormContainer>
      <h1>Edit Product</h1>
      {loadingUpdate && <Loader/>}
      {loading && <Loader/>}
      {error && <Message variant="danger" text={error}></Message>}
      {loadingUpdate && <Loader/>}
      {message && <Message variant={successUpdate ? 'success' : 'danger'} text={message}></Message>}
      {errorUpdate && <Message variant="danger" text={errorUpdate}></Message>}
  
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter name"
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
           required
            type="number"
            placeholder="Product price"
            value={price || 0}
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="quantity" className="mt-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
          required
            type="number"
            placeholder="Product Quantity"
            value={countInStock || 0}
            onChange={(e) => setCountInStock(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="brand" className="mt-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
          required
            type="text"
            placeholder="Brand"
            value={brand || ""}
            onChange={(e) => setBrand(e.target.value)}
          ></Form.Control>
        </Form.Group>


        <Form.Group controlId="category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
                          required
                          as="select"
                          value={category || ""}
                          onChange={(e) => setCategory(e.target.value)}
                        >  
                        <option disabled>Select Category</option>
                          {['tablets','computers','cellphones'].map((x,index) => (
                            <option key={index} value={x}>
                              {x}
                            </option>
                          ))}
                        </Form.Control>
                        
        </Form.Group>

        <Form.Group controlId="description" className="mt-3">
          <Form.Label>Description</Form.Label>
          <FloatingLabel controlId="description" label="description">
            <Form.Control
            required
            as="textarea"
            value={description || ""}
           
            style={{ height: '100px' }}
            onChange={(e) => setDescription(e.target.value)}
            />
            </FloatingLabel>
        </Form.Group>

        <Form.Group controlId="img" className="mt-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
          required
            type="text"
            placeholder="Product Image"
            value={image || ""}
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>
        </Form.Group>

     
        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>

      </Form>
    </FormContainer>
    </>
  );
};

export default ProductEditScreen;
