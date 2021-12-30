import React,{ useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';
import InputHome from '../../components/functionals/inputs/inputHome';
import { MdInput } from 'react-icons/md';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

export default function Inputer() {
    const values = [true];
    const [fullscreen, setFullscreen] = useState('xxl-down');
    const [show, setShow] = useState(false);
  
    function handleShow(breakpoint) {
      setFullscreen(breakpoint);
      setShow(true);
    }
  
    return (
        <>
        
        <Divider textAlign="left" className="my-2">
            <Chip label="Inputs"/>            
          </Divider>
        
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '5px'}}>
          {values.map((v, idx) => (
            <Button key={idx} variant="outlined" color="primary" onClick={() => handleShow(v)} startIcon={<MdInput/>} style={{ width: '210px'}}>
              Inputs!
              {typeof v === 'string' && `below ${v.split('-')[0]}`}
            </Button>
          ))}
          <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Inputs</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputHome/>
            </Modal.Body>
          </Modal>
          </div>
        </>
      );
    }
  
  