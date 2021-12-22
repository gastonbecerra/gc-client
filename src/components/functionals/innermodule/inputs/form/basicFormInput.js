import React from 'react'
import {Form, Button, Col} from 'react-bootstrap';

export default function BasicFormInput({input, i, submitInput }) {
    return (
        <Form onSubmit={(e)=>{submitInput(e, input, i)}} > 
        <Form.Label>{input.name}</Form.Label>
        <div className="d-flex flex-row align-items-center">
            <Col xs={{ span: 9, offset: 0 }}>
                <Form.Control 
                    id={`${i}`} 
                    style={{height: '84%'}}>
                </Form.Control>       
            </Col>
            <Col xs={{ span: 3, offset: 0 }} className="text-center">
                <Button className="" size="sm" type="submit">Submit</Button>    
            </Col>
        </div>
    </Form>   
    )
}
