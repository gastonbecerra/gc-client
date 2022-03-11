import React, {useState, useEffect} from 'react';

export default function PpenComponent({variable, ruler}) {
    const [input, setInput] = useState(false);
    const [list, setList] = useState([]);

    const handleInput=(e)=>{
        if(e.keyCode === 13){
            setInput(...[document.getElementById('worder').value])
            document.getElementById('worder').value = ''
        }
    }

    useEffect(()=>{        
        if(input !== '' && list.length < 5){
            if(input !== false){
                var trail = list;
                trail.push(input)
                setList(trail)
                console.log(list);
            }
        }
    },[input])

    useEffect(()=>{
        ruler({
            op: 'contains',
            value: list,
            var: variable.var
        })
    },[list, input])

  return(
    <div>
      <p>Introduce your options</p>
      <span>Press EENTER to input a word</span>
      <input type="string" id="worder" onKeyDown={(e)=> handleInput(e)}/>
    <p>{input.length > 0 && input.length}</p>

  </div>    
  )   
}
