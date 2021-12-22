import React, {useState, useEffect} from 'react';
import { Button, Badge} from 'react-bootstrap';
import './wordCloud.scss';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { IoEnterOutline } from "react-icons/io5";
import DragAndDrop from '../dragAndDrop/dragAndDrop';

export default function WordCloud({input}) {
    const [initialValues, setInitialValues] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);

    useEffect(()=>{
        input.initial_values && setInitialValues(input.initial_values)
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
    
    return (
        <div id="word-cloud-container">
            <div id="word-container">
                <span>Opciones más elegidas</span><br></br>
                
                {initialValues !== false
                ? initialValues.map((w,i)=>(
                    <Button variant="light" className="border"  
                        key={i} 
                        id="word" 
                        style={{fontSize: w.priority < 3 ? 'smaller' 
                        : w.priority > 3 ? 'small' 
                        : w.priority > 4 ? 'large'
                        : w.priority > 5 ? 'larger' : null }}
                        >
                            {w.word} <Badge bg="info">{w.priority}</Badge>
                        </Button>
                ))
                : null
            }
                
            </div>
            <div id="word-selecter">
                <input
                    id="word-selecter-form" 
                    type="text"                    
                    onKeyDown={(e) => addValue(e)}
                    disabled={selectedValues.length >= 5}
                >
                </input>
                <IoEnterOutline id="input-icon"/>
            </div>
            
            
            {selectedValues.length > 0 ? 
            
            <DragAndDrop items={selectedValues}/>
            
                :
                null
            }
            </div>
            
        
    )
}

{/* <span  key={i} id="word-selected">
        {w.word}      
        <RiDeleteBin5Line 
            id="del-icon"                                
            onClick={()=>deleteWord(w.word)}
        />
    </span> */}
