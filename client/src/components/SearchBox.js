import React, {useState} from 'react'
import {Form,Button,FormControl} from 'react-bootstrap'

const SearchBox = ({history}) => {

    const [keyword,setKeyword] = useState('')
    

    const submitHandler = (e) =>{
        
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
        // dispatch(search(e))
      
    }

    return (
       <Form className=" d-flex mr-sm-2 ml-sm-2 mt-3" onSubmit={submitHandler}>
          <FormControl
            type="search"
            placeholder="Search products"
            className="me-2"
            aria-label="Search"
            onChange={ (e)=>setKeyword(e.target.value)}
           
          />
          <Button variant="outline-success" type='submit' className='p-2'>Search </Button>
        </Form>
    )
}

export default SearchBox
