import React from 'react';
import Earning from './types/earning';
import Age from './types/age';

export default function SliderUx({input}) {
  
  function renderElement(){
        switch (input.name) {
            case "ingresos":
                return <Earning input={input}/>
            break;
            
            case "edad":
                return <Age input={input}/>
            break;

            case "map":
            
            break;
        
            default:
                break;
        }
    }


  return (
    renderElement()
  );
}