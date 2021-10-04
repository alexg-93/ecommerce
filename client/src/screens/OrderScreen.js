
import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2/lib/index";
import axios from "axios";
import { getOrderDetails,payOrder , deliverOrder } from "../redux/actions/orderActions";
import {ORDER_PAY_RESET,CART_RESET,ORDER_DETAILS_RESET ,ORDER_DELIVER_RESET} from '../redux/types'


const OrderScreen = ({ match ,history }) => {

  const orderID = match.params.id;
  const dispatch = useDispatch();

  const userInfo = useSelector(state=>state.userLogin.userInfo)

  const [sdkReady, setSdkReady] = useState(false)

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order_details, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliverReducer);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  if (!loading && order_details) {
    const { orderItems } = order_details;
    order_details.itemsPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    order_details.itemsPrice = Number(order_details.itemsPrice.toFixed(2));
  }

  useEffect(() => {

    if(!userInfo){
      history.push('/login')
    }

    //Add dynamically paypal script
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript"
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      };
      document.body.appendChild(script)
    };

    if (!order_details || successPay || order_details._id !== orderID || successDeliver) {
      dispatch({type:ORDER_PAY_RESET})
      dispatch({type:ORDER_DELIVER_RESET})
      dispatch(getOrderDetails(orderID));
     
    } else if (!order_details.isPaid) {
      if (!window.paypal) {
        addPaypalScript()
      } else {
        setSdkReady(true)
      }
    }
    
    

  }, [dispatch, orderID, successPay,successDeliver, order_details]);


  const successPaymentHandler = (paymentResult) =>{
      dispatch(payOrder(orderID,paymentResult))
      dispatch({type:CART_RESET})  
  }

  const deliverHandler = () =>{
     dispatch(deliverOrder(orderID))
     
  }


  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" text={error} />
  ) : (
    <>
      <strong>Order :</strong>
      {order_details._id}
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address : </strong>
                {order_details.shippingAddress.address},
                {order_details.shippingAddress.city},{" "}
                {order_details.shippingAddress.postalCode},
                {order_details.shippingAddress.country}
              </p>
              {order_details.isDelivered ? (
                <Message
                  variant="success"
                  text={`Delivered on ${order_details.deliveredAt.substring(0,16).replace("T0"," Time ")}`}
                />
              ) : (
                <Message variant="danger" text="Not Delivered" />
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Customer details</h2>
              <p>
                <strong>Name : </strong>
                {order_details.user.name}
                <br />
                <strong>Email : </strong>
                <a href={`mailto: ${order_details.user.email}`}>
                  {order_details.user.email}
                </a>
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method : </strong>
                {order_details.paymentMethod}
              </p>
              {order_details.isPaid ? (
                <Message
                  variant="success"
                  text={`Paid on ${order_details.paidAt.substring(0,16).replace("T0"," Time ")}`}
                />
              ) : (
                <Message variant="danger" text="Not Paid" />
              )}
            </ListGroup.Item>
            <h2>Order Items</h2>
            {order_details.orderItems.length === 0 ? (
              <Message text="Order is empty" />
            ) : (
              order_details.orderItems.map((item, index) => (
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

                <Col>${order_details.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>

                <Col>${order_details.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>

                <Col>${order_details.taxPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total</Col>

                <Col>${order_details.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
           
          
            {!order_details.isPaid && (
              <ListGroup.Item>
              {loadingPay && <Loader />}
              {!sdkReady ? <Loader/> : (<PayPalButton amount={order_details.totalPrice} onSuccess={successPaymentHandler}/>)}
              
              </ListGroup.Item>
            )}
          
          {userInfo && userInfo.isAdmin && order_details.isPaid && !order_details.isDelivered &&
          (<ListGroup>
          
            {loadingDeliver && <Loader/>}

            <ListGroup.Item>
            <Button style={{width:'100%'}}
                type="button"
                variant='outline-success'
                 className='btn btn-block'
                onClick={deliverHandler}
              ><i className="fas fa-truck"></i> Delivered</Button>
            </ListGroup.Item>
            
          
            
          </ListGroup>)}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
