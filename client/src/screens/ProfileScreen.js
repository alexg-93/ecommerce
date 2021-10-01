import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col,Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getUserDetails,
  updateUserProfile,
} from "../redux/actions/userActions";

import {getMyOrdersDetails,getOrderDetails} from '../redux/actions/orderActions'
import FormContainer from "../components/FormContainer";
import {LinkContainer} from 'react-router-bootstrap'
import {USER_UPDATE_PROFILE_RESET,USER_DETAILS_RESET } from '../redux/types'

const ProfileScreen = ({ history}) => {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);

  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const myOrders = useSelector((state) => state.myOrders);
  const {loading:loadingOrders,error:errorOrders, orders } = myOrders;

  
 

  useEffect(() => {
   
    dispatch(getMyOrdersDetails())
    if (!userInfo) {
      history.push("/login");
    } else {
      setName(userInfo.name)
      setEmail(userInfo.email)
      
      if (success) {
     
         dispatch({type:USER_UPDATE_PROFILE_RESET})
        dispatch(getUserDetails("profile"))
        dispatch(getMyOrdersDetails())
  
        
      } 
    }
  
 
  }, [dispatch, history,user, userInfo,success]);

  const submitHandler = (e) => {
    e.preventDefault();

    //Dispatch update user details
    dispatch(updateUserProfile({ id: userInfo._id, name, email, password }));
    
  };

  

  

  return (
  <Row>
   <Col md={3}>
 
      <h1>User Profile</h1>

      {error && <Message variant="danger" text={error}></Message>}
      {success && <Message variant="success" text="Update success"></Message>}

      {loading && <Loader />}
     
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="New name.."
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="New email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Update Profile
        </Button>
      </Form>
     
   </Col>

    <Col md={9}>
        <h1>My Orders</h1>
         {loadingOrders ? <Loader/> : errorOrders ? <Message variant='danger' text={errorOrders}/> : (
           <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>
                  ID
                </th>
                <th>
                  DATE
                </th>
                <th>
                  TOTAL
                </th>
                <th>
                  PAID
                </th>
                <th>
                  DELIVERED
                </th>
                <th>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {
                orders.map(order=>(
              
                <tr key={order._id}>
                 
                  <td>{order._id}</td>
                  <td>{String(order.createdAt).substring(0,16).replace("T"," ")}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0,10) : (<i className='fas fa-times' style={{color:'red'}}></i> )}</td>
                  <td>
                     {order.isDelivered ? order.deliveredAt.substring(0,10) : (<i className='fas fa-times' style={{color:'red'}}></i> )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='success' onClick={()=>{ dispatch(getOrderDetails(order._id))}}>Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))
              }
            </tbody>
           </Table>
         )}
    </Col>

  </Row>
 
  );
};

export default ProfileScreen;
