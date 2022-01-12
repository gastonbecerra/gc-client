import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Pic from '../../../assets/expenses.png';
import { useDispatch, useSelector } from "react-redux";
import { setInputRequest } from '../../../../../../store/slices/inputs';
import { setMissingRequest } from '../../../../../../store/slices/indicator';

export default function Expenses(props) {
    const {input} = props;
    const { handleRequest } = props;

    useEffect(() => {        
        input.value && setValue(input.value);
    }, [])
    
    const { username } = useSelector(state => state.user);
    const { queu } = useSelector(state => state.inputs);
    const { missing_queu } = useSelector(state => state.indicator);
    const dispatch = useDispatch();
    const [value, setValue] = useState(false);
    var route = window.location.pathname;

    
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
                    onChange={(e) => handleChange(e)}
                    value={value}
                />
                <p className="input-value">{value}<span>ARS</span></p>
            </Box>
    )
}
