import React, {useState, useEffect} from 'react';
import {Row, Col, Form} from 'react-bootstrap';

export default function CloseComponent({variable, ruler}) {
    const [options, setOptions] = useState(false);
    const [criteria, setCriteria] = useState(false);

    useEffect(()=>{
        variable.validation && setOptions(variable.validation.split(" | "));
    },[])

    const handleRadio = (e) =>{

        try{        
            setCriteria(
                {
                    op: '$eq',
                    value: e.target.value,
                    var: variable.var
                }
            )
            
        }catch(e){
            console.log(e);
        }
    }
    
    const handleCheck = (e) =>{
        try{
            var values = [];
            options.forEach(element => {
                if(document.getElementById(element).checked === true){
                    values.push(element)
                    setCriteria(
                        
                        {
                            op: '$in',
                            value: values,
                            var: variable.var
                        }

                    )
                }
        });
        
    }catch(e){
            console.log(e);
    }
    }

    React.useEffect(()=>{
        ruler(criteria)
    },[criteria])

    const handleSubmit = (e) => {
        e.preventDefault()
        ruler(criteria)
    }

  return (
    <div>
      <div>
          
        <Form.Group as={Row}>
            <Col column sx={9}>
            <Form.Label>
                <strong>Equals to</strong>
            </Form.Label>
               
                <Form.Select 
                    onChange={(e) => handleRadio(e)} 
                    aria-label="Default select example"
                >
                    
                    {options &&
                    <>                        
                       { options.map((o,i) => (
                            <>
                                <option key={i}>
                                    {o}
                                </option>
                            </>
                        ))}
                    </>
                    }
                </Form.Select>
            </Col>
        </Form.Group>

        
        
        <div>
            <span style={{fontWeight:'700'}}>Value has any of:</span>
            {
                options && 

                <Form onChange={(e)=> handleCheck(e)}>
                    {options.map((o,i)=>(
                        <div 
                            key={i}
                            inline
                        >
                            <Form.Check
                                inline 
                                type="checkbox" 
                                id={o} 
                                name={o} 
                                value={o}/>
                            <label for={o}>{o}</label>
                        </div>
                    ))}                    
                </Form>
                
            }
        </div>
            
      </div>
    </div>
);
}
