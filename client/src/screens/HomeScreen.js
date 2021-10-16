import React, { useEffect, useState } from "react";
import { Row, Col, Button,Form } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { listProducts } from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import OffCanvas from "../components/OffCanvas";
import { Route } from "react-router-dom";
import SearchBox from "../components/SearchBox";

import { openFilter } from "../redux/actions/filterActions";
// import { sortProductsAsc, sortProductsDesc } from "../redux/actions/productActions";

const HomeScreen = ({ match, history }) => {

  const keywordSearch = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const productListReducer = useSelector((state) => state.productListReducer);
 const {
    loading,
    error,
    products:allProducts,
    pages,
    sort:sortType
  } = productListReducer;

  const filterReducer = useSelector((state) => state.filterReducer);
  const { show } = filterReducer;


  const [sort,setSort] = useState(sortType)

  useEffect(() => {
     
    dispatch(listProducts(keywordSearch, pageNumber ,sort));
  }, [dispatch,keywordSearch,pageNumber,sort]);

  const pageSize = 6;

  const indexOfLastProduct = pageNumber * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  let products = allProducts.slice(indexOfFirstProduct, indexOfLastProduct)


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
              <Row
                lg={3}
                md={2}
                xs={1}
                me="auto"
                className="d-flex justify-content-center"
              >
                <Route
                  render={({ history }) => <SearchBox history={history} />}
                />
              </Row>

              <Col className="d-grid gap-1 mt-3" lg={1} md={2} xs={4}>
            
              <Form.Select aria-label="Default"  onChange={(e) => {setSort(e.target.value)}}>
            
                  <option>sort</option>
              
                  <option value='asc'>Asc</option>
                  <option value='desc'>Desc</option>
                  
                </Form.Select>
               
                <Button
                  variant="outline-info"
                  onClick={() => dispatch(openFilter())}
                >
                  filter <i className="fas fa-filter"></i>
                </Button>
              </Col>
            </>
          )}

          {show && <OffCanvas />}

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
              page={pageNumber}
              keyword={keywordSearch ? keywordSearch : ""}
            
            />
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
