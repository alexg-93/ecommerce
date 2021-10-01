import React from "react";
import {Navbar,Nav,Container, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap"
import {useDispatch,useSelector} from 'react-redux'
import {logOut} from '../redux/actions/userActions'
import { useHistory } from "react-router-dom";

const Header = () => {


const history = useHistory()

const dispatch = useDispatch()
const userLogin = useSelector(state=>state.userLogin)
const {userInfo} = userLogin 

const logoutHandler = ()=>{

  dispatch(logOut())
  history.push('/')

}



  return (
  <header>
    <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
  <Container>
    <LinkContainer to='/'>
        <Navbar.Brand>eCommerce Shop</Navbar.Brand>
  </LinkContainer>
    
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
      <LinkContainer to="/cart">
      <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
      </LinkContainer>

      {userInfo ? (<NavDropdown title={userInfo.name} id='username'>
        <LinkContainer to='/profile'>
          <NavDropdown.Item>
            Profile
          </NavDropdown.Item>
        </LinkContainer>
        
        {userInfo && userInfo.isAdmin && 
        (<>
          <LinkContainer to='/admin/users'>
          <NavDropdown.Item>
            Users dashboard
          </NavDropdown.Item>
        </LinkContainer>
            
        <LinkContainer to='/admin/orders'>
          <NavDropdown.Item>
            Orders
          </NavDropdown.Item>
        </LinkContainer>
        
        <LinkContainer to='/admin/products'>
          <NavDropdown.Item>
            Products
          </NavDropdown.Item>
        </LinkContainer>
        
          </>
        )}
       

        <NavDropdown.Item onClick={logoutHandler}>  
          LogOut
        </NavDropdown.Item>

      </NavDropdown>) : (
        <LinkContainer to="/login">
           <Nav.Link><i className="fas fa-user"></i>Sign In</Nav.Link>
        </LinkContainer>
        
      )}
        

      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  </header>);
};

export default Header;
