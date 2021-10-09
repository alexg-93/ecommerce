import React, { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopRatedProducts } from "../redux/actions/productActions";

const CarouselProducts = () => {
  const dispatch = useDispatch();

  const topRatedProducts = useSelector((state) => state.productTopRatedReducer);

  const { error, loading, products } = topRatedProducts;

  useEffect(() => {
      dispatch(listTopRatedProducts())
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" text={error} />
      ) : (
        products &&
        <Carousel fade variant="dark">
        
        {products.map((product) => (
          
            <Carousel.Item key={product._id} pause='hover' interval={2000} >
           
              <Link to={`/product/${product._id}`}>
             
              <Image className="d-block w-100" src={product.image} alt={product.name} fluid />
              </Link>
             
            
            </Carousel.Item>
          
        ))}
        </Carousel>
      )}
    </>
  );
};

export default CarouselProducts;
