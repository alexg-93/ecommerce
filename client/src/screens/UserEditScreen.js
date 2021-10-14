import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {getUserDetails,adminUpdateUser} from "../redux/actions/userActions";
import { USER_UPDATE_RESET} from "../redux/types";
import FormContainer from "../components/FormContainer";

const UserEditScreen = ({ match, history }) => {

  const userID = match.params.id
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);


  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const { loading, error, user} = userDetails;

  const updateUser = useSelector((state) => state.updateUser);

  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = updateUser;

  
    useEffect(() =>{
      if(!userInfo.isAdmin){
        history.push('/')
      }
        //checks if update user is success
        if(successUpdate){
            dispatch({type:USER_UPDATE_RESET})
            history.push('/admin/users')
        }else{
       
          
              if (!user ||!user.name || user._id !== userID) {
          
                dispatch(getUserDetails(userID)) 
              
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
           
            }
            
            
        }
        
       
     
    },[dispatch,userID,history,successUpdate,user,error])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminUpdateUser({_id:userID,name,email,isAdmin}))
    
};

  return (
    <>
    <Link to='/admin/users' className='btn btn-light my-3'>
      Go Back
    </Link>

    {}
  
    <FormContainer>
      <h1>Edit User</h1>
       
       {loadingUpdate && <Loader/>}
       {errorUpdate && <Message variant="danger" text={error}/>}

      {loading && <Loader />}
      {error && <Message variant="danger" text={error}/>}
    
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>

     
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {user && !user.isAdmin &&  <Form.Group controlId="isadmin" className="mt-3">
    
    <Form.Label>Admin</Form.Label>
      <Form.Check
        type="checkbox"
        placeholder="is Admin"
        checked={isAdmin}
        onChange={(e) => {setIsAdmin(e.target.checked)}}
      ></Form.Check>
    </Form.Group>}
       

        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>
      </Form>

    
    </FormContainer>
    </>
  );
};

export default UserEditScreen;
