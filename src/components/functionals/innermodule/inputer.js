import React, { useState } from 'react'
import {Form, Button, Alert, Col, Row, Modal, Accordion, Spinner, Carousel} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { fetchIndicatorByUser } from '../../../store/slices/indicator'
import Axios from 'axios';
import {AiFillEdit} from 'react-icons/ai';
import {RiAddCircleLine} from 'react-icons/ri';
import {MdDelete} from 'react-icons/md';
import * as Inputs from './inputs';

export default function Inputer(props) {
    const [spinner, setSpinner] = useState(false); // => mientras se mandan datos al servidor, se muestra el spinner
    const [idFlag, setIdFlag] = useState(false);
    const dispatch = useDispatch();
    const { inputs_faltantes, inputs} = useSelector(state => state.indicator);
    const {auth, id: user_id} = useSelector(state => state.user);
    const { selectedContext: context_id } = useSelector(state => state.context);
    const {id : indicator_id, name: indicator_name } = useSelector(state => state.indicator.selectedIndicator);
    
    //Inputs Functions
    const submitInput = (e, input, i)=>{
        e.preventDefault();
        setSpinner(true);
        setIdFlag(input._id);
        Axios({
          method: "POST",
          data: {
            name: input.name,
            value: document.getElementById(i).value,
            user: user_id,
            indicator: indicator_id
          },
          withCredentials: true,
          url: "/inputs",
        })
        .then((res) => {
            // if(res.data === true){
            //     dispatch(fetchIndicatorByUser(indicator_id, context_id, user_id))
            // }
            console.log(res)
            dispatch(fetchIndicatorByUser(indicator_id, context_id, user_id))
        })
        .then(()=>{
            setSpinner(false)
            setIdFlag(false)
        }
        );
    }

    const editInput = (e, input, i)=>{
        e.preventDefault();
        setSpinner(true);
        setIdFlag(input._id);
        Axios({
          method: "PUT",
          data: {
            name: input.name,
            value: document.getElementById(i).value,
            user: user_id,
          },
          withCredentials: true,
          url: `/inputs/${input._id}`,
        })
        .then((res) => {
            dispatch(fetchIndicatorByUser(indicator_id, context_id, user_id))
        })
        .then(()=>{
            setSpinner(false)
            setIdFlag(false)
        }
        );
    }

    const deleteInput = (e, input, i) => {
        e.preventDefault();
        setSpinner(true);
        setIdFlag(input._id);
        Axios({
          method: "DELETE",
          withCredentials: true,
          url: `/inputs/${input._id}`,
        })
        .then((res) => {
            dispatch(fetchIndicatorByUser(indicator_id, context_id, user_id))
        }).finally(()=>{
            setSpinner(false);
            setIdFlag(false);
        }
        );
    }

    const addNewInput = (e, i) => {
        e.preventDefault()
        setSpinner(true)
        setIdFlag(i)
        setTimeout(function(){
            setSpinner(false);
            setIdFlag(true);
        },5000)
    }
    
    // UI functions
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    function renderRequiredInput (input, i, submitInput){
        let type;
        switch (input.value_type) {
            case 'word-cloud':
                type = 'WordCloud'
                break;

                case 'number':
                type = 'BasicFormInput'
                break;
        
            default:
                type = 'BasicFormInput'
                break;
        }
        const Component = Inputs[type]
        return <Component input={input} i={i} submitInput={submitInput}/>
    }   

    return (
        <div className="inputs-container">        

            {inputs_faltantes !== false ? 
          
            <Accordion className="inputs-faltantes" defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Missing Inputs</Accordion.Header>
                    <Accordion.Body>
                    
                    {inputs_faltantes.length <= 1 ? 
                        inputs_faltantes.map((input, i)=>(                                                    
                            spinner && idFlag == input._id ? 
                                <Spinner animation="border" />
                                : renderRequiredInput(input, i, submitInput)                                                                                                                                                             
                        ))
                        :
                        <Carousel interval={10000000} controls={true} variant="dark" activeIndex={index} onSelect={handleSelect}>
                        {inputs_faltantes.map((input, i)=>(
                            <Carousel.Item>                            
                            {spinner && idFlag == input._id ? 
                                <Spinner animation="border" />
                                : renderRequiredInput(input, i, submitInput)
                            }                                                                         
                                </Carousel.Item>                                
                        ))}                
                        </Carousel>
                    }
                    
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            
            :
                null
            }

            {inputs !== false ? 
                <div className="my-1 inputs-existentes">
              
                <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                <Accordion.Header>Filled Inputs</Accordion.Header>
                <Accordion.Body>
                {inputs.map((input, i)=>(

                    <Form className="my-1">
                        <Form.Group key={i}>
                            {spinner && idFlag == input._id? 
                            
                            <div className="d-flex justify-content-center py-1">
                                <Spinner animation="border" />
                            </div>                    
                            :
                            <>
                            <Form.Label className="form-labels px-4"> {input.name} </Form.Label>

                            <Row className="d-flex justify-content-around py-1">
                                <Form.Control 
                                    style={{maxWidth:'90%'}}
                                    placeholder={input.value}
                                    id={`${i}`} 
                                    >
                                </Form.Control>       
                            </Row>

                            <Row className="d-flex justify-content-around py-1">
                                <Button 
                                    variant="light"
                                    className="form-buttons" 
                                    size="sm" 
                                    type="submit" 
                                    style={{}}
                                    onClick={(e)=>{editInput(e, input, i)}} >
                                        <span>Edit</span>
                                        <AiFillEdit/>
                                </Button>
                                <Button 
                                    variant="light"
                                    className="form-buttons" 
                                    size="sm"                     
                                    type="submit" 
                                    style={{}}                                    
                                    onClick={(e)=>{addNewInput(e, i)}} 
                                    >
                                    <span>Add value</span>
                                        <RiAddCircleLine/>
                                </Button>    

                                <Button 
                                    variant="light"
                                    className="form-buttons" 
                                    size="sm"                     
                                    type="submit" 
                                    style={{}}
                                    onClick={(e)=>{deleteInput(e, input, i, input._id)}}                               >
                                    <span>Delete value</span>
                                        <MdDelete/>
                                </Button>    
                            </Row>     
                                </>
                            }
                            
                       
                        </Form.Group>
                        </Form>
                ))}                
                </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                </div>

                :

                null
            }
            
        </div>
    )
}
