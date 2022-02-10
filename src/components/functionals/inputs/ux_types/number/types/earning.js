import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import { setInputRequest } from '../../../../../../store/slices/inputs';
import { setMissingRequest } from '../../../../../../store/slices/indicator';

export default function Earning({input}) {
    const [value, setValue] = useState(false);
    const { username } = useSelector(state => state.user);
    const { queu } = useSelector(state => state.inputs);
    const dispatch = useDispatch();
    const { missing_queu } = useSelector(state => state.indicator);
    var route = window.location.pathname;

    useEffect(()=>{
        input.value && setValue(input.value);
    },[])

    const handleChange = (e) => {
        setValue(e.target.value);
        
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
                    value: parseInt(e.target.value)
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
        <>
            <div className={!input.value ? "input-control" : "input-control"}>
            <MdOutlineAttachMoney style={{fontSize: '200px', margin: 'auto'}} className="input-image"/>
                <TextField
                    id="value"
                    label="Ingresos"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    max={999999}
                    min={0}
                    style={{maxWidth: 'initial', maxWidth: '300px'}}
                    value={value}
                    onChange={(e) => handleChange(e)}
                />
                <p className="input-value">{value}<span>ARS</span></p>
            </div>
            </>
    )
}
