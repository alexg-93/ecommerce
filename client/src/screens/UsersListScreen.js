import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import {
  getUsersList,
  deleteUser,
  logOut
} from "../redux/actions/userActions";
import { LinkContainer } from "react-router-bootstrap";


const UsersListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.usersList);

  const { loading, error, users } = usersList;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);

  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUsersList());
      if(error==='Not authorized as an admin' || error ==='Not authrized , invalid token'){
        dispatch(logOut())
   
      }
    }
     else {
     
      history.push("/login");
    }
  }, [dispatch, history, successDelete,userInfo,error]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" text={error} />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>is Admin</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
           
            {users.map((user) => (
              user._id !== userInfo._id && (
                <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                
                <td>
                {!user.isAdmin&&(
                  <>
                 <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    
                    <Button className="btn-sm" variant="light">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button 
              
                    className="btn-sm"
                    variant="danger"
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                     deleteUserHandler(user._id)  
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                  </>
                )}
                
                </td>
              </tr>
              )
              
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UsersListScreen;
