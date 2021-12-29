import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Pic from '../../../assets/expenses.png';

export default function Expenses({input}) {
    const [value, setValue] = useState(false);

    useEffect(() => {
        input.value && setValue(input.value);
    }, [])

    return (
            <Box width={300} className={!input.value ? "input-control" : "input-control border border-danger"}>
                <img src={Pic} alt="expenses" className="input-image text-center"/>
                <TextField
                    id="gastos"
                    label="gastos"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    max={999999}
                    min={0}
                    style={{maxWidth: 'initial', maxWidth: '300px'}}
                    onChange={(e)=>setValue(e.target.value)}
                    value={value}
                />
                <p className="input-value">{value}<span>ARS</span></p>
            </Box>
    )
}
