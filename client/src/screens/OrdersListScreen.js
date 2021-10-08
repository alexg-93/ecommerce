import React, { useEffect , useState } from "react";
import {
  Table,
  Button,
  Row,
  Col,
  Image,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {orderList,getOrderDetails} from "../redux/actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";

const OrdersListScreen = ({ history }) => {

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const orderListReducer = useSelector((state) => state.orderListReducer);

  const { loading, error, orders:allOrders} = orderListReducer;

  const [orders,setOrders] = useState([])



  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(orderList());
      
    } else {
      history.push("/login");
    }
 
  }, [dispatch, history, userInfo]);

  
   useEffect(() => {
    setOrders(allOrders)
   },[allOrders])
  
  

  const getOrderDetails = (id) => {
    dispatch(getOrderDetails(id))
  };

  const searchByUserNameHandler = (name) => {
      
      if(name!==''){
        let filteredOrders = allOrders.filter(order=>(
          order.user !== null && order.user.name.toLowerCase().includes(name.toLowerCase())
        ))
       setOrders(filteredOrders)
      }else{
        setOrders(allOrders)
      }
 
  }

  const searchOrderById = (id) =>{
   
  
      if(id!==''){
        let foundOrder = allOrders.filter(order=>order._id.includes(id.toLowerCase()))

        if(foundOrder.length >0){
          setOrders(foundOrder)
        }
      }else{
        setOrders(allOrders)
      }
    
    
  
  }

  return (
    <>
      <Row className="align-items-center">
        <Col md={2}>
          <h1>Orders</h1>
        </Col>
       
       
      </Row>
      <Col className="col-md-3 mx-auto">
          <InputGroup>
            <FormControl placeholder="Find orders by username" onChange={e=>searchByUserNameHandler(e.target.value)}/>
          </InputGroup>
          <InputGroup className='mt-2'>
            <FormControl placeholder="Find orders by id" onChange={e=>searchOrderById(e.target.value)}/>
          </InputGroup>
        </Col>
      {loading ? (
        <Loader/>
      ) : error ? (<Message variant="danger" text={error} />) 
       :
      (
        <Table striped bordered hover responsive className='table-sm mt-3'>
            <thead>
              <tr>
                <th>
                  ID
                </th>
                <th>
                  USER
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
               orders && orders.map(order=>(
              
                <tr key={order._id}>
                 
                  <td>{order._id}</td>
                  <td>{order.user!==null && order.user.name}</td>
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
    </>
  );
};

export default OrdersListScreen;
