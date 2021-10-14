import React , {useState} from 'react'
import Rating from "../components/Rating";
import {
    Row,
    Accordion,
    Form,
  } from "react-bootstrap";

const AccordionFilter = () => {

  
    const [priceRangeValue, setPriceRangeValue] = useState(0);

    return (
        <>
 <Accordion flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Brand</Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        {["Apple", "Sony", "Cannon", "Logitech", "Amazon"].map(
                          (item, idx) => (
                            <Form.Check
                              label={item}
                              aria-label={`option` + idx}
                            />
                          )
                        )}
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Rating</Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        {[1, 2, 3, 4, 5].map((option) => (
                          <Rating value={option} />
                        ))}
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Price Range</Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        <Form.Label style={{ fontSize: 15 }}>
                          Price : 0 to ${priceRangeValue}
                        </Form.Label>

                        <Form.Range
                          min={0}
                          max={3000}
                          value={priceRangeValue}
                          onChange={(e) => setPriceRangeValue(e.target.value)}
                        />
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="3">
                    <Accordion.Header>Categories</Accordion.Header>
                    <Accordion.Body>
                   
                     {['Computers','Tablets','Cellphones'].map(
                          (item, idx) => (
                            <Form.Check
                              label={item}
                              aria-label={`option` + idx}
                            />
                          )
                        )}
                       
                    
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
        </>
    )
}

export default AccordionFilter
