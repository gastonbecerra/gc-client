import React, {useEffect, useState} from 'react';
import { MdInput } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

export default function EventValueNumber({uservalue, submit}){
    const [disabled, setDisabled] = useState(true);
    const [value, setValue] = useState(uservalue.value);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!disabled){
            try{
                var data = JSON.parse(JSON.stringify(uservalue))
                var body = {
                    op : 'PUT',
                    data: [data]
                }
                body.data.value = value;
                submit(body, body.op)
            }catch(e){
                console.log(e);
            }
        }
    },[value])

    return(
            <>
                <div className="info">
                  <span>
                    <strong>Info</strong>
                  </span>
                  <div className="info-container">
                    <div className="px-2">
                      <AiOutlineCalendar />
                    </div>
                    <div>{uservalue.description}</div>
                  </div>

                  <div className="divider"></div>
                </div>
                <Form>
                  <Form.Group
                    as={Row}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "smaller",
                    }}
                  >
                    <Col>
                      <Form.Label column xs={2}>
                        Your value
                      </Form.Label>
                    </Col>

                    <Col column xs={6}>
                      <Form.Control
                        onChange={(e)=> { setValue(parseInt(e.target.value))}}
                        value={value}
                        size="sm"
                        disabled={disabled}
                      />
                    </Col>

                    <Col xs={3}>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => {setDisabled(!disabled)}}
                    >
                        {disabled ? 'Edit' : 'Submit'}
                      </Button>{" "}
                    </Col>
                  </Form.Group>
                </Form>
              </>
    )
}