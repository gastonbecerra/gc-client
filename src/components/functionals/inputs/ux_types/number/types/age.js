import React, { useState, useEffect } from 'react';
import old from '../../../assets/old.png'
import man from '../../../assets/man.png'
import boy from '../../../assets/boy.png'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useDispatch, useSelector } from "react-redux";
import { setInputRequest } from '../../../../../../store/slices/inputs';
import { setMissingRequest } from '../../../../../../store/slices/indicator';

export default function Age({input}) {
    const [value, setValue] = useState(false);
    const { username } = useSelector(state => state.user);
    const { queu } = useSelector(state => state.inputs);
    const dispatch = useDispatch();
    const { missing_queu } = useSelector(state => state.indicator);
    var route = window.location.pathname;

    useEffect(() => {
        input.value && setValue(input.value)
    }, [])

    const handleChange = (event) => {
        setValue(event.target.value);
        
        var body = {
            field: input.var,
            op: input.value ? 'PUT' : 'POST',
            id: input.value ? input._id : null,
            required: input.required === true ? true : false,
            type: input.type,
            validation: input.validation,
            ux_input: input.ux_input,
            description: input.description,
            measurement: input.measurement,
            data: {
                    var: input.var,
                    timestamp: Date.now(),
                    user: username ? username : input.user,
                    value: event.target.value
            }
        }
        
        if (route === '/modulo'){
            let data = missing_queu.filter(q => q.field !== input.var)
            data = [...data, body]
            dispatch(setMissingRequest(data))           
        }
        
        if(route === '/inputs'){
            let data = queu.filter(q => q.field !== input.var)
            data = [...data, body]
            dispatch(setInputRequest(data))
        }
    
    };

    return (
        <div  className={!input.value ? "input-control" : "input-control"} >      
        <img src={value < 18 ? boy : value > 55 ? old : man} className="input-image" /> 
            <Slider
                onChange={(e) => handleChange(e)}
                aria-label="Small"
                valueLabelDisplay="auto"
                id="value"
                marks
                min={0}
                max={110}
                value={input.value && value}            
            />
            <p><span className="input-value">{value}</span></p>
        </div>
    )
}
