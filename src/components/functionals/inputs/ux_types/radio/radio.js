import React, {useState, useEffect} from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { BsGenderTrans } from 'react-icons/bs';
import Studies from '../../assets/studies.png';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";
import { setInputRequest } from '../../../../../store/slices/inputs';
import { setMissingRequest } from '../../../../../store/slices/indicator';

export default function RadioUx ({input}) {
    const { username } = useSelector(state => state.user);
    const { queu, inputs } = useSelector(state => state.inputs);
    const dispatch = useDispatch();
    const [options, setOptions] = useState(false);
    const [value, setValue] = useState(input.value);
    const { missing_queu } = useSelector(state => state.indicator);
    var route = window.location.pathname;

    useEffect(()=>{
        input.validation && setOptions(input.validation.split(" | "));
        input.value && setValue(input.value);
    },[])

    const handleChange = (event) => {
        setValue(event.target.value);
        
        var body = {
                field: input.var,
                op: input.value ? 'PUT' : 'POST',
                id: input.value ? input._id : null,
                required: input.required === true ? true : false,
                data: {
                    var: input.var,
                    timestamp: Date.now(),
                    user: username ? username : input.user,
                    value: event.target.value
            }
        }
        
        if (route === '/modulo'){
            let data = missing_queu ? missing_queu.filter(q => q.field !== input.var) : data=[];
            data = [...data, body]
            dispatch(setMissingRequest(data))
        }
        
        if(route === '/inputs'){
            let data = queu.filter(q => q.field !== input.var)
            data = [...data, body]
            dispatch(setInputRequest(data))
        }
    
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
            value={input.value && value}
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
