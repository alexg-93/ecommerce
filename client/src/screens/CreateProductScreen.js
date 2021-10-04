import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Form, Button, Row, Col,FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {createProduct} from "../redux/actions/productActions";


const CreateProductScreen = ({ location, history }) => {

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [countInStock, setCountInStock] = useState()
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category,setCategory] = useState ("")

  const [message,setMessage] = useState("")

  const [uploading,setUploading] = useState(false)



  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const productCreate = useSelector(state => state.productCreate);

  const {error,success,loading} = productCreate;

  
    useEffect(() =>{
        if(!userInfo && !userInfo.isAdmin){
            history.push('/')
        }
        if(success) {
          setMessage("Product Created successfully")
          setTimeout(()=>{
            dispatch({type:'PRODUCT_CREATE_RESET'})
            history.push('/admin/products')
          },1500)
          
      }
    },[dispatch,history,userInfo,success])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProduct({name,price,countInStock,description,brand,category,image})) 
   
};

const uploadFileHandler = async (e) => {
  const files = e.target.files[0]
  console.log(files)
  const formData = new FormData()
  formData.append('image',files)
  console.log(formData)
  setUploading(true)

  try {
    const config = {
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    }

    const {data} = await axios.post('/api/upload',formData,config)
    console.log(data)
    setImage(data)
    setUploading(false)
    console.log(image)
  
  } catch (err) {
    console.log(err)
    setUploading(false)
  }
}

  return (
    <FormContainer>
      <h1>Create new Product</h1>
      {loading && <Loader/>}
      {message && <Message variant={success ? 'success' : 'danger'} text={message}></Message>}
      {error && <Message variant="danger" text={error}></Message>}
  
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
           required
            type="number"
            placeholder="Product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="quantity" className="mt-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
          required
            type="number"
            placeholder="Product Quantity"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="brand" className="mt-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
          required
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          ></Form.Control>
        </Form.Group>


        <Form.Group controlId="category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
                          required
                          as="select"
                          value={category}
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
            value={description}
           
            style={{ height: '100px' }}
            onChange={(e) => setDescription(e.target.value)}
            />
            </FloatingLabel>
        </Form.Group>

        <Form.Group controlId="img" className="mt-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            
            type="text"
            placeholder="Product Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>

          <Form.Control className="mt-3" controlid='image-file' label='Choose File' type='file' custom='true' onChange={uploadFileHandler}></Form.Control>
          {uploading && <Loader/>}
        </Form.Group>

     

        <Button type="submit" variant="primary" className="mt-3">
          Create
        </Button>

      </Form>
    </FormContainer>
  );
};

export default CreateProductScreen;