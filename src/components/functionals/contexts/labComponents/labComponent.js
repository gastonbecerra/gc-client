import React,{useState} from 'react';
import * as Types from './index';
import {uid} from 'react-uid';

export default function LabComponent({inputs, ruler, selecter, s1, s2}) {
    const [variable, setVariable] = useState(false);
    const id = uid(selecter)

    const handleVarSelection = value => {
        selecter(value)
        var index = inputs.findIndex((i) => i.var === value)
        setVariable(inputs[index])
    }

    function renderLab(){
        let type;
        if(s1 !== s2){
            if(variable !== false){
                switch (variable.type) {
                    case 'int':
                        type = 'Int'
                        break;
    
                    case 'cat_closed':
                        type = 'Close'
                        break;
    
                    case 'cat_open':
                        type = 'Open'
                        break;                    
                
                    default:
                        return <p>default</p>                    
                }
                const Component = Types[type]
                return (
                    <>  
                        <Component variable={variable} ruler={ruler}/>
                    </>
                )
            }
        }else{
            // if(s1 == s2) alert('CHOOSE NONE REPITED VARIABLE')
            // setVariable(false)
        }

    }
    
  return (
  <div style={{width: '40vw', border: 'solid 1px black', fontSize:'10px'}}>
  <p>1) Selecciona una variab le y un valor de filtro</p>
    {inputs ? 
            <select id="variable" onChange={(e) => handleVarSelection(e.target.value)}>
                {
                inputs.map((v,i)=>(
                <option key={i}>
                    {v.var} 
                </option>
            ))
                }
            </select>
            :
            null
    }
        {renderLab()}
        
  </div>
  );
}
