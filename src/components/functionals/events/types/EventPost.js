import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import '../../contexts/context.scss';
import '../../events/events.scss';
import Chip from '@mui/material/Chip';
import { VscActivateBreakpoints } from "react-icons/vsc";

export default function EventPost({event}) {
  return (    
        <>
        <img 
            src={event.base_reference.source} 
            style={{              
              marginTop: '10px',
              width: '96vw',
              minHeight: '200px',
            }}
        />           
        </>        
        
  )
}
