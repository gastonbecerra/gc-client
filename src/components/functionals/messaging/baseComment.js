import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import "./messaging.scss";
import TextField from "@mui/material/TextField";
import { Row } from "react-bootstrap";
import InputAdornment from "@mui/material/InputAdornment";
import { MdOutlineAccountCircle, MdInput } from "react-icons/md";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

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
    }catch(e){
      console.log(e);
    }
    setvalue("");
  };

  const handleShow = () => {
      setShow(!show);
  }


  return (
    <>
    {!show  ?

    <p onClick={() => handleShow()}>Add new comment</p>

    :

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
                    <MdInput onClick={() => handleValue()} />
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
    }
    </>
  );
}
