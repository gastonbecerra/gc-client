import React from 'react';
import Earning from './types/earning';
import Age from './types/age';
import Expenses from './types/expenses';

export default function NumberUx({input}) {
  
  function renderElement(){
        switch (input.var) {
            case "ingresos":
              return <Earning input={input}/>
            break;
            
            case "edad":
              return <Age input={input}/>
            break;

            case "gastos":
              return <Expenses input={input}/>;
            break;
        
            default:
              return null;
        }
    }

    const NumberDefault = (
      <div>

      </div>
    )


  return (
    renderElement()
  );
}