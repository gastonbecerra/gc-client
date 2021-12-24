import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MdOutlineAttachMoney } from 'react-icons/md';

export default function Earning({input}) {
    const [earning, setEarning] = useState(false);

    useEffect(()=>{
        console.log(earning);
    },[earning])

    return (
            <Box width={300} className="input-control">
                <MdOutlineAttachMoney style={{fontSize: '200px'}} className="input-image"/>
                <TextField
                    id="ingresos"
                    label="Ingresos"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    max={9999999}
                    min={0}
                    style={{maxWidth: 'initial', maxWidth: '300px'}}
                    onChange={(e)=>setEarning(e.target.value)}
                />
                <p className="input-value">{earning}<span>ARS</span></p>
            </Box>
    )
}
