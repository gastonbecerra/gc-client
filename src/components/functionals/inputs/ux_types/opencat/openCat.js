import React, {useState, useEffect} from 'react';
import { Button, Badge} from 'react-bootstrap';
// import './wordCloud.scss';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { IoEnterOutline } from "react-icons/io5";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MdOutlineAttachMoney } from 'react-icons/md';

export default function OpenCat({input}) {
    const [initialValues, setInitialValues] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);

    useEffect(()=>{
        input.initial_values && setInitialValues(input.validation)
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
        console.log(selectedValues)
    },[selectedValues])

    return(
            <Box width={300} className="worder-control">
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

