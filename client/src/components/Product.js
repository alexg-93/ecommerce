import React from 'react'
import {Card} from 'react-bootstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'



const Product = ({product}) => {
    return (
       <Card className="my-y p-3 rounded">
         <Link to={`/product/${product._id}`}>
             <Card.Img src={product.image} style={{width: '100%', height: '250px'}} variant="top"/>
         </Link>

        <Card.Body style={{display:'grid',justifyContent:'center'}}>
   
        <Link to={`/product/${product._id}`}>
             <Card.Title as="div">
                <strong>{product.name}</strong>
             </Card.Title>
         </Link>

         <Card.Text as='div'>
             <Rating value={product.rating} text={`${product.numReviews} reviews`} color="gold"/>
         </Card.Text>


         <Card.Text as='h3'>
             ${product.price}
         </Card.Text>



        </Card.Body>


       </Card>

    )
}

export default Product
