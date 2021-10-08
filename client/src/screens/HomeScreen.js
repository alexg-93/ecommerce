import React , {useEffect} from 'react'
import {Row,Col} from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listProducts} from '../redux/actions/productActions'
import {useDispatch,useSelector} from 'react-redux'

const HomeScreen = ({match}) => {

    const keywordSearch = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    
    const dispatch = useDispatch()
    const productListReducer = useSelector(state=>state.productListReducer)
    const {loading,error,products} = productListReducer;

    useEffect(() => {
        dispatch(listProducts(keywordSearch,pageNumber))
    },[dispatch,keywordSearch,pageNumber])

    return (
        <>
           
           { loading ? <Loader/> : error ? <Message variant='danger' text={error}/>:

           
            <Row>
            <h1>Latest Products</h1>
                { products && products.map(product=>(
                    <Col key={product._id} sm={12} md={6} lg={4} className="mb-3">
                        <Product product={product}/>
                    </Col>
                )

                )}
            </Row>
           }
           
            

           
           
        </>
    )
}

export default HomeScreen
