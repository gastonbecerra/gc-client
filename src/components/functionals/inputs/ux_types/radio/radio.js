import React, {useState, useEffect} from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { BsGenderTrans } from 'react-icons/bs';
import Studies from '../../assets/studies.png';
import Box from '@mui/material/Box';

export default function RadioUx ({input}) {
    const [options, setOptions] = useState(false);
    const [value, setValue] = useState(input.value);

    useEffect(()=>{
        input.validation && setOptions(input.validation.split(" | "));
        input.value && setValue(input.value);
    },[])


    const handleChange = (event) => {
        setValue(event.target.value);
    };

    function renderImage(){
        switch (input.var) {
            case "gender":
                return <BsGenderTrans style={{fontSize: '200px'}} className="input-image"/>
            break;
            
            case "nivel_estudio":
                return <img src={Studies} className="input-image"/>
            break;

            case "map":
            
            break;
        
            default:
                break;
        }
    }
    
    return (        
        <Box width={300} className={!input.value ? "input-control" : "input-control border border-danger"}>
        <FormControl component="fieldset">
        
        {renderImage()}
        
        
        <RadioGroup
            id="value"
            aria-label={input.var}
            name="radio-buttons-group"
            value={value}
            onChange={(e) => handleChange(e)}
            defaultChecked={value}
        >
        {options && options.map((opt, y)=>(
            <FormControlLabel key={y} value={opt} control={<Radio />} label={opt} />
        ))}
        </RadioGroup>
        </FormControl>
        </Box>
        
    )
}
