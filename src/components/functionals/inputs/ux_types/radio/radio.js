import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { BsGenderTrans } from 'react-icons/bs';

export default function RadioUx ({input, i, submitInput}) {
    return (
        
        <FormControl component="fieldset" className="input-control">
        <BsGenderTrans style={{fontSize: '200px'}} className="input-image"/>
        <RadioGroup
            aria-label={input.name}
            name="radio-buttons-group"
        >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
        </FormControl>
        
    )
}
