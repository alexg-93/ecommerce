import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { listProducts } from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import CarouselProducts from "../components/CarouselProducts";

const HomeScreen = ({ match }) => {
  const keywordSearch = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const productListReducer = useSelector((state) => state.productListReducer);
  const { loading, error, products, page, pages } = productListReducer;

  useEffect(() => {
    dispatch(listProducts(keywordSearch, pageNumber));
  }, [dispatch, keywordSearch, pageNumber]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" text={error} />
      ) : (
        <>
          {!keywordSearch && (
            <Row
              sm={12}
              md={2}
              lg={8}
              className="d-flex justify-content-center"
            >
              <CarouselProducts />
            </Row>
          )}

          <Row>
            <h1>Latest Products</h1>
            {products &&
              products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} className="mb-3">
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keywordSearch ? keywordSearch : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
