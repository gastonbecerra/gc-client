import React,{ useState, useEffect } from 'react';
import * as Types from './index';
import { uid } from 'react-uid';
import { Form } from 'react-bootstrap';


export default function LabComponent({inputs, ruler, selecter, s1, s2}) {
    const [variable, setVariable] = useState(false);
    const id = uid(selecter);

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
            
        }

    }
    
  return (
    <>
    <div className='context-indicator-box'>
  
    {inputs ? 
    <div id="box-selection">
            <Form.Select 
                style={{color: 'dodgerblue', fontWeight: '700'}}
                id="variable" 
                onChange={(e) => handleVarSelection(e.target.value)}
            >
            {
                inputs.map((v,i)=>(
                <option key={i} style={{color: 'dodgerblue'}}>
                    {v.var} 
                </option>
            ))
            }
            </Form.Select>
            
    </div>
            :
            null
    }
        {renderLab()}
  </div>
  </>
  );
}
