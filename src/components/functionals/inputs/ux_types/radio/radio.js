import React, {useState} from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { BsGenderTrans } from 'react-icons/bs';
import Studies from '../../assets/studies.png';

export default function RadioUx ({input, i, submitInput}) {
    
    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    function renderImage(){
        switch (input.var) {
            case "gender":
                return <BsGenderTrans style={{fontSize: '200px'}} className="input-image"/>
            break;
            
            case "studies":
                return <img src={Studies} className="input-image"/>
            break;

            case "map":
            
            break;
        
            default:
                break;
        }
    }
    
    return (        
        <FormControl component="fieldset" className="input-control">
        
        {renderImage()}
        
        
        <RadioGroup
            aria-label={input.var}
            name="radio-buttons-group"
            value={value}
            onChange={handleChange}
        >
        {input.validation.map((opt, y)=>(
            <FormControlLabel value={opt} control={<Radio />} label={opt} />
        ))}
        </RadioGroup>
        </FormControl>
        
    )
}
