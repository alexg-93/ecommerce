import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
} from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { listProducts } from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import CarouselProducts from "../components/CarouselProducts";
import { Helmet } from "react-helmet";
import OffCanvas  from "../components/OffCanvas";
import {Route} from 'react-router-dom'
import SearchBox from '../components/SearchBox'

import {openFilter} from '../redux/actions/filterActions'

const HomeScreen = ({ match ,history}) => {

  const keywordSearch = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const productListReducer = useSelector((state) => state.productListReducer);
  const { loading, error, products, page, pages } = productListReducer;

  const filterReducer = useSelector((state) => state.filterReducer);
  const {show} = filterReducer;

 
  const [sortStatus, setSortStatus] = useState(false);



  useEffect(() => {
    dispatch(listProducts(keywordSearch, pageNumber));
  }, [dispatch, keywordSearch, pageNumber]);


 

  const SortProductsByPriceHandler = () => {
    setSortStatus(!sortStatus);

    if (sortStatus) {
      const sorted = products.sort((a, b) => (a.price > b.price ? 1 : -1));
    } else {
      const sorted = products.sort((a, b) => (a.price < b.price ? 1 : -1));
    }
  };

  return (
    <>
      <Helmet>
        <title>Welcome to eCommerce Shop | Home</title>
      </Helmet>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" text={error} />
      ) : (
        <>
    

          {!keywordSearch && (
            <>
           
            <Row lg={3} md={2} xs={1}  me='auto'  className="d-flex justify-content-center">
             <Route render={({history})=><SearchBox history={history}/>}/>
            </Row>

            <Col className="d-grid gap-1 mt-3" lg={1} md={2} xs={3}>
              <Button
                variant="outline-success"
                onClick={SortProductsByPriceHandler}
              >
                sort <i className="fas fa-sort"></i>
              
              </Button>
             
              <Button variant="outline-info" onClick={()=>dispatch(openFilter())}>
                filter <i className="fas fa-filter"></i>
              </Button>
            </Col>
          
           
            </>
          )}

          {show && <OffCanvas/>}

          <Row className="mt-3">
            {products && products.length > 0 ? (
              products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} className="mb-3">
                  <Product product={product} />
                </Col>
              ))
            ) : (
              <Row className="d-grid justify-content-center" md="auto">
                <Message
                  variant="danger"
                  text={`no results for ${keywordSearch}`}
                />
              </Row>
            )}
          </Row>
          <Row className="d-grid justify-content-center" md="auto">
            <Paginate
              pages={pages}
              page={page}
              keyword={keywordSearch ? keywordSearch : ""}
            />
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
