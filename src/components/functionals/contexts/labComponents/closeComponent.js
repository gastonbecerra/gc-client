import React, {useState, useEffect} from 'react';

export default function CloseComponent({variable, ruler}) {
    const [options, setOptions] = useState(false);
    const [criteria, setCriteria] = useState(false);

    useEffect(()=>{
        variable.validation && setOptions(variable.validation.split(" | "));
    },[])

    const handleRadio = (e) =>{

        try{        
            setCriteria(
                {
                    op: '$eq',
                    value: e.target.value,
                    var: variable.var
                }
            )
            
        }catch(e){
            console.log(e);
        }
    }
    
    const handleCheck = (e) =>{
        try{
            var values = [];
            options.forEach(element => {
                if(document.getElementById(element).checked === true){
                    values.push(element)
                    setCriteria(
                        
                        {
                            op: '$in',
                            value: values,
                            var: variable.var
                        }

                    )
                }
        });
        
    }catch(e){
            console.log(e);
    }
    }

    React.useEffect(()=>{
        ruler(criteria)
    },[criteria])

    const handleSubmit = (e) => {
        e.preventDefault()
        ruler(criteria)
    }

  return (
    <div>
      <div>
          Value equals to: 
      <select onChange={(e) => handleRadio(e)}>
            {options &&
                options.map((o,i) => (
                    <option key={i}>
                        {o}
                    </option>
                ))    
            }
        </select>
        
        <div>
            Value has any of:
            {
                options && 

                <form onChange={(e)=> handleCheck(e)}>
                    {options.map((o,i)=>(
                        <span key={i}>
                            <input type="checkbox" id={o} name={o} value={o}/>
                            <label for={o}>{o}</label>
                        </span>
                    ))}
                    <br></br>
                    <input type={'submit'} value="submit rule" onClick={(e)=>handleSubmit(e)}/>
                </form>
                
            }
        </div>
            
            <pre>{JSON.stringify(criteria)}</pre>
            
      </div>
    </div>
);
}
