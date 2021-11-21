import React, { useState } from 'react'
import {Form, Spinner, Button, Alert, Col, Row} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { fetchIndicatorByUser } from '../../../store/slices/indicator'
import Axios from 'axios';

export default function Inputer(props) {
    const [spinner, setSpinner] = useState(false); // => mientras se mandan datos al servidor, se muestra el spinner
    const dispatch = useDispatch()
    const { inputs_faltantes, inputs } = useSelector(state => state.indicator);
    const {auth, id: user_id} = useSelector(state => state.user);
    const { selectedContext: context_id } = useSelector(state => state.context);
    const {id : indicator_id, name: indicator_name } = useSelector(state => state.indicator.selectedIndicator);

    const submitInput = (e, input, i)=>{
        e.preventDefault();
        setSpinner(true)
        Axios({
          method: "POST",
          data: {
            variable: input,
            value: document.getElementById(i).value,
            user: user_id,
            timestamp: Date.now()
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

    return (
        <div className="px-2">        

            {inputs_faltantes !== false ? 
            <Form>
                <Alert className="mt-2 text-center" variant="warning" text="dark">
                Completa los siguientes campos para poder acceder a los contextos asociados a este indicador
                </Alert>{' '}

                <strong>Datos faltantes para indicador de {indicator_name}</strong>
                {inputs_faltantes.map((input, i)=>(
                        <Form.Group key={i} >
                        {spinner === false ?
                        <Form>
                            <Form.Label>{input}</Form.Label>
                            <div className="d-flex flex-row align-items-center">
                                <Col xs={{ span: 9, offset: 0 }}>
                                    <Form.Control 
                                        id={`${i}`} 
                                        className="px-2" 
                                        onChange={()=>console.log('')}
                                        style={{height: '84%'}}>
                                    </Form.Control>       
                                </Col>
                                <Col xs={{ span: 3, offset: 0 }} className="text-end">
                                    <Button className="" size="sm" type="submit" onClick={(e)=>{submitInput(e, input, i)}} >Submit</Button>    
                                </Col>
                            </div>
                        </Form>    

                            :

                        <h1>ooooo</h1>

                        }
                        
                    </Form.Group>
                ))}                
                
            </Form>

            :
                null
            }

            {inputs !== false ? 
                <Form>

                <strong className="my-1">Datos ya ingresados para indicador de {indicator_name}</strong>
                {inputs.map((input, i)=>(

                    <Form.Group key={i}>
                        <Form.Label>{input.variable}</Form.Label>
                        <div className="px-2">
                        <Row>
                            <Form.Control 
                                value={input.value}
                                id={`${i}`} 
                                className="px-2" 
                                onChange={()=>console.log('')}
                                style={{height: '84%'}}>
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
                        </div>
                    </Form.Group>
                ))}                
                
            </Form>

                :

                null
            }
            
        </div>
    )
}
