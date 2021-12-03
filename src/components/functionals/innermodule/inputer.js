import React, { useState } from 'react'
import {Form, Button, Alert, Col, Row, Modal, Accordion, Spinner, Carousel} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { fetchIndicatorByUser } from '../../../store/slices/indicator'
import Axios from 'axios';

export default function Inputer(props) {
    const [spinner, setSpinner] = useState(false); // => mientras se mandan datos al servidor, se muestra el spinner
    const dispatch = useDispatch()
    const { inputs_faltantes, inputs} = useSelector(state => state.indicator);
    const { user_value } = useSelector(state => state.indicator); 
    const {auth, id: user_id} = useSelector(state => state.user);
    const { selectedContext: context_id } = useSelector(state => state.context);
    const {id : indicator_id, name: indicator_name } = useSelector(state => state.indicator.selectedIndicator);
    
    const submitInput = (e, name, i)=>{
        e.preventDefault();
        setSpinner(true)
        Axios({
          method: "POST",
          data: {
            name: name,
            value: document.getElementById(i).value,
            user: user_id,
          },
          withCredentials: true,
          url: "/inputs",
        })
        .then((res) => {
            if(res.data === true){
                dispatch(fetchIndicatorByUser(indicator_id, context_id, user_id))
            }
            
        }).then(setSpinner(false));
    }

    // UI functions
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="inputs-container">        

            {inputs_faltantes !== false ? 
          
            <Accordion style={{minWidth: "100%"}} id="inputs-faltantes">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Missing Inputs</Accordion.Header>
                    <Accordion.Body>

                    <Carousel interval={10000000} controls={true} variant="dark" activeIndex={index} onSelect={handleSelect}>
                    {inputs_faltantes.map((input, i)=>(
                        <Carousel.Item>
                        <Form>
                        <Form.Group key={i} >                 
                            <Form> 
                                <Form.Label>{input.name}</Form.Label>
                                <div className="d-flex flex-row align-items-center">
                                    <Col xs={{ span: 9, offset: 0 }}>
                                        <Form.Control 
                                            id={`${i}`} 
                                            style={{height: '84%'}}>
                                        </Form.Control>       
                                    </Col>
                                    <Col xs={{ span: 3, offset: 0 }} className="text-center">
                                        <Button className="" size="sm" type="submit" onClick={(e)=>{submitInput(e, input.name, i)}} >Submit</Button>    
                                    </Col>
                                </div>
                            </Form>   
                            </Form.Group>
                            </Form>
                            </Carousel.Item>
                            
                    ))}                
                    </Carousel>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            

            :
                null
            }

            {inputs !== false ? 
                <Form className="my-1 inputs-existentes">

                <strong>Datos ya ingresados para indicador de {indicator_name}</strong>
                {inputs.map((input, i)=>(
                    <Form.Group key={i}>
                        <Form.Label>{input.name}</Form.Label>
                        <Row className="px-2">
                            <Form.Control 
                                value={input.value}
                                id={`${i}`} 
                                >
                            </Form.Control>       
                        </Row>
                        <Row className="d-flex justify-content-around py-1">
                            <Button 
                                className="" 
                                size="sm" 
                                type="submit" 
                                style={{maxWidth: '40%'}}
                                onClick={(e)=>{submitInput(e, input, i)}} >
                                    Edit
                            </Button>
                            <Button variant="warning"
                                className="" 
                                size="sm" 
                                type="submit" 
                                style={{maxWidth: '40%'}}
                                onClick={(e)=>{submitInput(e, input, i)}} >
                                    Add new value
                            </Button>    
                        </Row>
                        
                    </Form.Group>
                ))}                
                
            </Form>

                :

                null
            }
            
        </div>
    )
}
