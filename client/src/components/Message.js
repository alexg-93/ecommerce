import React from 'react'
import {Alert} from 'react-bootstrap'
import {Link} from 'react-router-dom'
const Message = ({variant,text}) => {
    // const {variant,text} = props;
    //console.log(variant,text)
    return (
     text==='Your cart is empty' ? ( <Alert variant={variant}>
          
        {text} <Link to='/'>Go Back</Link>
          
      </Alert>) :
       (<Alert variant={variant}>
          
       {text} 
         
     </Alert>)
       
    )
}

Message.defaultProps = {
    variant: 'info'
}

export default Message
