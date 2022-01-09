import React, {useState, useEffect} from 'react';
import { Button, Badge} from 'react-bootstrap';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { IoEnterOutline } from "react-icons/io5";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import { setInputRequest } from '../../../../../store/slices/inputs';

export default function OpenCat({input}) {
    const [initialValues, setInitialValues] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);
    const { username } = useSelector(state => state.user);
    const { queu } = useSelector(state => state.inputs);
    const dispatch = useDispatch();

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
                state: 'pending',
                data: {
                    var: input.var,
                    timestamp: Date.now(),
                    user: username ? username : input.user,
                    value: [...selectedValues]
                }
            }
            
            var data = queu.filter(q => q.field !== input.var)
            
            data = [...data, body]
            
            dispatch(setInputRequest(data))
        }                
    },[ selectedValues])

    return(
            <Box width={300} className={!input.value ? "input-control" : "input-control border border-danger"}>
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
                
            </Box>
    )
    }

