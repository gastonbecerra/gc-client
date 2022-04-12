import React,{useState} from 'react';
import {uid} from 'react-uid';
import { Form, Row, Col } from 'react-bootstrap';
import { FaGreaterThan, FaLessThan } from 'react-icons/fa';

export default function IntComponent({variable, ruler}) {
    const [object, setRule] = useState();
    const id = uid(Math.random())


    const handlingRule = (target, value, rule, id) => {
        console.log(id);
        var varis = variable.var;
        
        switch (rule) {
            case 'bigger':
                setRule(
                    {
                        op: '$gte',
                        value: parseInt(value),
                        var: varis
                    },
                    
                    );
                    document.getElementsByName('less').value = 0;
                break;
            
            case 'lesser':
                setRule({
                    op: '$lte',
                        value: parseInt(value),
                        var: varis
                })
                document.getElementsByClassName('bigger').value = 0;
                break;

            case 'btw':
                setRule({
                    op: 'btw',
                    value: value,
                    var: varis
                })
                break;
        
            default:
                break;
        }
    }
    
    React.useEffect(()=>{
        ruler(object)
    },[object])

    const submitRule = (e) =>{
        e.preventDefault()
        ruler(object)
    }

  return(
    <div>
        <Form className="form-content">
        
        <div className='form-group'>

        <Form.Group id="biggerLI" as={Row}>
            
            <Form.Label column xs={3} className="label"> 
                <FaGreaterThan/>
            </Form.Label>
            
            <Col column xs={9}>
                <Form.Control                     
                    type="number"   
                    className='bigger'
                    id={`${id}bigger`}   
                    onChange={(e)=> handlingRule(e.target, document.getElementById(`${id}bigger`).value, 'bigger', `${id}bigger` )}
                /> 
            </Col>
                
        </Form.Group>
        
        

        <Form.Group 
            as={Row} 
            id="minorLI"
        >
            
            <Form.Label column xs={3} className="label">
                <FaLessThan/>
            </Form.Label>
            
            <Col column xs={8}>
                <Form.Control 
                    type="number"  
                    id={`${id}lesser`} 
                    name={"less"}
                    onChange={(e)=> handlingRule(e.target, document.getElementById(`${id}lesser`).value, 'lesser' )}  
                />
            </Col>
        </Form.Group>
        
        </div>
        
        <Form.Group
            as={Row} 
            id="btwLI" 
            onChange={(e) => handlingRule(e.target, [parseInt(document.getElementById(`${id}btw1`).value), parseInt(document.getElementById(`${id}btw2`).value)], 'btw')} >
            
            <span style={{textAlign: 'center'}}><strong>Or btw</strong></span>
            
            <Row>
            <Col column xs={5}>
                <Form.Control 
                    type="number" 
                    id={`${id}btw1`} 
                />
            </Col>
            
            <Col style={{paddingTop:'5px'}}>and</Col>
            
            <Col column xs={5}>
                <Form.Control 
                    type="number" 
                    id={`${id}btw2`} 
                />         
            </Col>
            </Row>
        </Form.Group>
                
            
        {/* <input type="submit" value="submit rule" onClick={(e)=> submitRule(e)}/> */}
        </Form>
        {/* <pre>{JSON.stringify(object)}</pre> */}
    </div>
  );
}
