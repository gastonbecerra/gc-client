import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import old from './old.png';
import man from './man.png';
import boy from './boy.png';

export default function SliderUx() {
  const [age, setAge] = useState(18);
  const [root, setRoot] = useState("old");
  
  return (
    <Box width={300} className="input-control">
      
      <img src={age < 18 ? boy : age > 55 ? old : man} className="input-image" /> 

      <Slider
        size="small"
        onChange={(e) => setAge(e.target.value)}
        aria-label="Small"
        valueLabelDisplay="auto"
        marks
        min={0}
        max={110}
      />
      <p className="input-value">{age}</p>
    </Box>
  );
}