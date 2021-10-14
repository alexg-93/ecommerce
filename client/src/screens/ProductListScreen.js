import React, { useEffect, useState } from "react";
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
import { listProducts, deleteProduct } from "../redux/actions/productActions";
import { LinkContainer } from "react-router-bootstrap";
import Paginate from "../components/Paginate";

const ProductListScreen = ({ history , match }) => {

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const productListReducer = useSelector((state) => state.productListReducer);

  const { loading, error, products: productList , page , pages } = productListReducer;

  const [products, setProducts] = useState([]);

  const productDelete = useSelector((state) => state.productDelete);

  const { success: successDelete, error: errorDelete } = productDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts('',pageNumber));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete,pageNumber]);

  useEffect(() => {
    setProducts(productList);
  }, [productList]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const filterProductsHandler = (name) => {
    if (name !== "") {
      let filteredProducts = products.filter((prod) =>
        prod.name.toLowerCase().includes(name.toLowerCase())
      );

      setProducts(filteredProducts);
    } else {
      setProducts(productList);
    }
  };

  return (
    <>
      <h1>Products</h1>
      <Row className="d-flex justify-content-center mb-4" md='auto'>
        
        <Col>
          <InputGroup >
            <FormControl
              placeholder="Search product"
              onChange={(e) => filterProductsHandler(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col className="text-right" >
          <LinkContainer to={`/admin/product/newproduct`}>
            <Button >
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </LinkContainer>
        </Col>
       
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" text={error} />
      ) : errorDelete ? (
        <Message variant="danger" text={errorDelete} />
      ) : (
        <>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>In Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>
                    <Image
                      src={product.image}
                      style={{ width: "200px", height: "150px" }}
                      thumbnail
                      alt="product-img"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <Col style={{ display: "flex" }}>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button className="btn-sm" variant="light">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        className="btn-sm"
                        variant="danger"
                        style={{ marginLeft: "10px" }}
                        onClick={() => deleteProductHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Row className="d-grid justify-content-center" md="auto">   
         <Paginate pages={pages} page={page} isAdmin={true} />
        </Row>  
        </>
      )}
    </>
  );
};

export default ProductListScreen;
