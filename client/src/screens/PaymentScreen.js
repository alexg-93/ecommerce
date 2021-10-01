import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../redux/actions/cartActions";
import FormContainer from "../components/FormContainer";
import { CheckoutSteps } from "../components/CheckoutSteps";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler} className='mb-3'>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
        <Col>
          <Form.Check 
            type="radio"
            label="PayPal"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked
            onChange={(e)=>{setPaymentMethod(e.target.value)} }
          ></Form.Check>
           <Form.Check
            type="radio"
            label="Stripe"
            id="Stripe"
            name="paymentMethod"
            value="Stripe"
            onChange={(e)=>{setPaymentMethod(e.target.value)} }
          ></Form.Check>
          <Form.Check
            type="radio"
            label="Credit Card"
            id="CreditCard"
            name="paymentMethod"
            value="CreditCard"
            onChange={(e)=>{setPaymentMethod(e.target.value)} }
          ></Form.Check>
        </Col>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Continue
        </Button>
       
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
