import React, {useState, useEffect} from 'react';
import { Button, Badge} from 'react-bootstrap';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { IoEnterOutline } from "react-icons/io5";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import { setInputRequest } from '../../../../../store/slices/inputs';
import { setMissingRequest } from '../../../../../store/slices/indicator';


export default function OpenCat({input}) {
    const [initialValues, setInitialValues] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);
    const { username } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { missing_queu } = useSelector(state => state.indicator);
    const { queu } = useSelector(state => state.inputs);
    var route = window.location.pathname;

    useEffect(()=>{
        input.value && setSelectedValues([...input.value])
    },[])

    //add value
    function addValue(e) {
        if(e.keyCode == 13){
            var text = document.getElementById("word-selecter-form").value;
            document.getElementById("word-selecter-form").value = ''
            valueHandler(text)
        }
    }

    //handle value
    function valueHandler(text){
        var trail = selectedValues;
        var id = trail.length;
        trail.push({id: id, priority: 1, word:text});
        setSelectedValues([...trail]);
    }

    //delete selected values
    function deleteWord(word) {
        var filtered = selectedValues.filter(function(el) { return el.word != word; }); 
        setSelectedValues(filtered)
    }

    useEffect(()=>{
        if (selectedValues.length > 0 ){ 

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
                    value: [...selectedValues]
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
        }                
    },[ selectedValues])

    return(
            <div className={!input.value ? "input-control" : "input-control"}>
                <div className='worder-control'>
                    
                <TextField
                    style={{marginTop:'4vh'}}
                    id="word-selecter-form"
                    label="Preferencias"
                    type="text"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onKeyDown={(e) => addValue(e)}
                    disabled={selectedValues.length >= 5}                    
                />
                </div>
                {selectedValues ?
                <div className='word-list'>
                {selectedValues.map((word, y)=>(
                    <p className='word'>
                        <span>{word.word}</span>
                        <RiDeleteBin5Line id="del-icon" onClick={(e)=>deleteWord(word.word)} />    
                    </p> 
                    
                    
                ))}
                </div>                        
                :
                null
                }
                
            </div>
    )
    }

