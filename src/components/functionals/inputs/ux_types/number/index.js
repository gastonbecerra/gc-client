import React from 'react';
import Earning from './types/earning';
import Age from './types/age';
import Expenses from './types/expenses';

export default function NumberUx({input}) {
  
  function renderElement(){
        switch (input.var) {
            case "ingresos":
              return <Earning input={input}/>            
            
            case "edad":
              return <Age input={input}/>            

            case "gastos":
              return <Expenses input={input}/>;            
        
            default:
              return null;
        }
    }

  return (
    renderElement()
  );
}