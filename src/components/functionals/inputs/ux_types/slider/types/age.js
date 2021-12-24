import React, { useState, useEffect } from 'react';
import old from '../../../assets/old.png'
import man from '../../../assets/man.png'
import boy from '../../../assets/boy.png'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


export default function Age({input}) {
    const [age, setAge] = useState(18);
    return (
        <Box width={300} className="input-control">      
        <img src={age < 18 ? boy : age > 55 ? old : man} className="input-image" /> 
            <Slider
            size="large"
            onChange={(e) => setAge(e.target.value)}
            aria-label="Small"
            valueLabelDisplay="auto"
            marks
            min={0}
            max={110}
            
            />
            <p><span className="input-value">{age}</span></p>
        </Box>
    )
}
