import React from "react";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/actions/userActions";
import { useHistory } from "react-router-dom";
import { CART_RESET } from "../redux/types";


const Header = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart.cartItems)
  let totalProductsInCart=0

  totalProductsInCart = cart.reduce((acc, item) => acc + item.qty, 0)



  const logoutHandler = () => {
    dispatch(logOut());
    dispatch({type:CART_RESET})
 
    history.push("/");
  };

  return (
    <header>

      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>eCommerce Shop</Navbar.Brand>
          
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
               <Badge pill bg="danger" style={{position:'relative',bottom:7,left:2}}>
                   {totalProductsInCart }
                  </Badge>
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item><i class="fas fa-user"></i> Profile</NavDropdown.Item>
                  </LinkContainer>

                  {userInfo && userInfo.isAdmin && (
                    <>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item><i class="fas fa-users"></i> Users</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item><i class="fas fa-box"></i> Orders</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item><i class="fas fa-store"></i> Products</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}

                  <NavDropdown.Item onClick={logoutHandler}>
                  <i class="fas fa-sign-out-alt"></i> LogOut
                  </NavDropdown.Item>
                  
                </NavDropdown>
              
                
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                  <i class="fas fa-sign-in-alt"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
