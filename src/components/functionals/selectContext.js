import { useState, useEffect } from "react";

export default function SelectContext(props){
    // 1) capturamos el id del usuario

    const [contexts, setContexts] = useState(false);

    // 2) traemos de api contextos correspondientes
    useEffect(()=>{
        //pegamos a la api
        setContexts([
            "Tus mejores amigos",
            "Cordobeses",
            "Los que votan como vos"
        ])
    },[])

    return(
        <select>
            {contexts ? 
            contexts.map((c,i)=>(
                <option key={i}>
                    {c}
                </option>
            ))
            :
            ""
        }
        </select>
    )
}