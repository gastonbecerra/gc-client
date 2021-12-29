import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MdOutlineAttachMoney } from 'react-icons/md';

export default function Earning({input}) {
    const [earning, setEarning] = useState(false);

    useEffect(()=>{
        input.value && setEarning(input.value);
    },[])

    return (
            <Box width={300} className={!input.value ? "input-control" : "input-control border border-danger"}>
                <MdOutlineAttachMoney style={{fontSize: '200px'}} className="input-image"/>
                <TextField
                    id="ingresos"
                    label="Ingresos"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    max={999999}
                    min={0}
                    style={{maxWidth: 'initial', maxWidth: '300px'}}
                    value={earning}
                    onChange={(e)=>setEarning(e.target.value)}
                />
                <p className="input-value">{earning}<span>ARS</span></p>
            </Box>
    )
}
