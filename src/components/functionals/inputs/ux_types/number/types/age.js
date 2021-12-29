import React, { useState, useEffect } from 'react';
import old from '../../../assets/old.png'
import man from '../../../assets/man.png'
import boy from '../../../assets/boy.png'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


export default function Age({input}) {
    const [value, setValue] = useState(false);

    useEffect(() => {
        input.value && setValue(input.value)
    }, [])
    return (
        <Box width={300} className={!input.value ? "input-control" : "input-control border border-danger"} >      
        <img src={value < 18 ? boy : value > 55 ? old : man} className="input-image" /> 
            <Slider
                size="large"
                onChange={(e) => setValue(e.target.value)}
                aria-label="Small"
                valueLabelDisplay="auto"
                marks
                min={0}
                max={110}
                value={value}
            
            />
            <p><span className="input-value">{value}</span></p>
        </Box>
    )
}
