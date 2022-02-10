import React,{useState} from 'react';
import {uid} from 'react-uid';

export default function IntComponent({variable, ruler}) {
    const [object, setRule] = useState();
    const id = uid(Math.random())


    const handlingRule = (target, value, rule) => {
        var varis = variable.var;
        
        switch (rule) {
            case 'bigger':
                setRule(
                    {
                        op: '$gte',
                        value: parseInt(value),
                        var: varis
                    },
                    
                    );
                break;
            
            case 'lesser':
                setRule({
                    op: '$lte',
                        value: parseInt(value),
                        var: varis
                })
                break;

            case 'btw':
                setRule({
                    op: 'btw',
                    value: value,
                    var: varis
                })
                break;
        
            default:
                break;
        }
    }
    
    React.useEffect(()=>{
        ruler(object)
    },[object])

    const submitRule = (e) =>{
        e.preventDefault()
        ruler(object)
    }

  return(
    <div>
        <form>
        
        <li style={{listStyle:'none'}} id="biggerLI">
                Mayor a: <input type="number"   id={`${id}bigger`}   onChange={(e)=> handlingRule(e.target, document.getElementById(`${id}bigger`).value, 'bigger' )}/> 
                {/* &nbsp; <input type="checkbox" id="biggerC"/> */}
        </li>
        
        <li style={{listStyle:'none'}} id="minorLI">
                Menor a: <input type="number"  defaultValue={0} id={`${id}lesser`} onChange={(e)=> handlingRule(e.target, document.getElementById(`${id}lesser`).value, 'lesser' )}  />
                {/* &nbsp; <input type="checkbox" id="minorC"/> */}

        </li>
        <li style={{listStyle:'none'}} id="btwLI" 
            onChange={(e) => handlingRule(e.target, [parseInt(document.getElementById(`${id}btw1`).value), parseInt(document.getElementById(`${id}btw2`).value)], 'btw')} >
            
            Greater than: 
                <input type="number" defaultValue={0} id={`${id}btw1`} />,
            Lesser than: 
                <input type="number" defaultValue={0} id={`${id}btw2`} />         
                {/* &nbsp; <input type="checkbox" id="btwC"/> */}
            
        </li>
        <input type="submit" value="submit rule" onClick={(e)=> submitRule(e)}/>
        </form>
        <pre>{JSON.stringify(object)}</pre>
    </div>
  );
}
