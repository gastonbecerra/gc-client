import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import "./messaging.scss";
import TextField from "@mui/material/TextField";
import { Row } from "react-bootstrap";
import InputAdornment from "@mui/material/InputAdornment";
import { MdOutlineAccountCircle, MdInput } from "react-icons/md";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import { IconButton, Typography } from "@mui/material";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function BaseInput({ setMessage  }) {
  const [show, setShow] = useState(false);
  const [value, setvalue] = useState("");
  const { username } = useSelector((state) => state.user);

  const handleChange = (e) => {
    try{
      if (value.length < 160) {
        setvalue(e.target.value);
      }
    }catch(e){
      console.log(e);
    }
  };

  const handleValue = (e) => {
    e.preventDefault();
    if(value.length !== (false && undefined && '')){
      try{
        setMessage({
          user: username,
          client_id: uuidv4(),
          message: value,
          timestamp: Date.now(),
          level: 0,
          comments: [
  
          ]
        });
        setvalue("");
      }catch(e){
        console.log(e);
      }
    }
  };

  const handleShow = () => {
      setShow(!show);
  }


  return (
    <>
    {!show  ?

      <div style={{display:'flex', justifyContent: 'center'}}>
        <Chip label="+ Add a new comment" variant="outlined" onClick={(e)=>handleShow()} />
      </div>

      

    :
      <>
      <div>
        <Row className="message-input">
          <Box
            sx={{
              width: 700,
              maxWidth: "100%",
              display: "flex",
              alignitems: "center",
            }}
          >
            <TextField
              type="text"
              label={value ? `(${160 - value.length})/160` : "160"}
              id="outlined-start-adornment"
              margin="dense"
              className="message-input"
              value={value}
              fullWidth
              multiline
              rows={3}
    
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdOutlineAccountCircle />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                  <Button 
                      color="primary" 
                      startIcon={<MdInput style={{ maxWidth: '15px'}}/>} 
                      style={{ maxWidth: '17px'}}
                      size="small"
                      type="submit" 
                      value="Submit" 
                      onClick={(e) => handleValue(e)} 
                      disabled={value == '' ? true : false} 
                    >

                    </Button>
                    {/* <MdInput onClick={(e) => handleValue(e)} /> */}
                  </InputAdornment>
                ),
              }}
              onChange={(e) => handleChange(e)}
            />
          </Box>
        </Row>
        <Row className="message-content"></Row>
        <Row className="content"></Row>
      </div>
      
      <div style={{display: 'flex', alignItems: 'center'}}>
      
        <Chip label="Hide" variant="outlined" onClick={(e)=>handleShow()} />
      
      </div>
        </>
    }
    </>
  );
}
