import React  from 'react'
import {
    Offcanvas
  } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AccordionFilter from './AccordionFilter'
import {closeFilter} from '../redux/actions/filterActions'

const OffCanvas = () => {

    const dispatch = useDispatch();
    const filterReducer = useSelector((state) => state.filterReducer);
    const {show} = filterReducer;
  
    const handleClose = () => (
      dispatch(closeFilter())
    )


    return (
        <>
            <Offcanvas
              show={show}
              onHide={handleClose}
              style={{ width: "250px" }}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Filter by</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                
                <AccordionFilter/>
                
              </Offcanvas.Body>
            </Offcanvas>
          
        </>
    ) 
}

export default OffCanvas
