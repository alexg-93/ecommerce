import React, {useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutSteps } from "../components/CheckoutSteps";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import {createOrder} from '../redux/actions/orderActions'
import {ORDER_CREATE_RESET,USER_DETAILS_RESET,ORDER_DETAILS_RESET} from '../redux/types'

const PlaceOrderScreen = ({history}) => {

  const cart = useSelector((state) => state.cart);
  const { cartItems , shippingAddress , paymentMethod , itemsPrice , shippingPrice,taxPrice,totalPrice } = cart;

  const dispatch = useDispatch();

  //calculate prices

 cart.itemsPrice = cartItems.reduce((acc,item)=>acc+item.price*item.qty,0)
 cart.itemsPrice = Number(cart.itemsPrice.toFixed(2))
 cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 20
 cart.taxPrice = Number((0.17*cart.itemsPrice).toFixed(2))
 cart.totalPrice = Number((cart.itemsPrice+cart.shippingPrice+cart.taxPrice).toFixed(2))

    const orderCreate = useSelector(state=>state.orderCreate)
    const {order,success,error} = orderCreate
   
    useEffect(()=>{
        if(success) {
       
            history.push(`/order/${order.order._id}`)
            dispatch({ type: USER_DETAILS_RESET })
            dispatch({ type: ORDER_CREATE_RESET })


        }
        // eslint-disable-next-line
    },[history,success])

    const placeOrderHandler=()=>{
       dispatch(createOrder({
           orderItems: cartItems,
           shippingAddress: shippingAddress,
           paymentMethod: paymentMethod,
           itemsPrice : itemsPrice,
           shippingPrice : shippingPrice,
          taxPrice : taxPrice,
          totalPrice:totalPrice

       }))
    }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address : </strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method : </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <h2>Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message text="Your cart is empty" />
            ) : (
              cartItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            )}

            <ListGroup.Item></ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>

                <Col>${cart.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>

                <Col>${cart.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>

                <Col>${cart.taxPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total</Col>

                <Col>${cart.totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
                {error && <Message variant='danger' text={error}/>}
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
