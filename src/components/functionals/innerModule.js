import React,{useEffect, useState, useContext} from 'react'
import { useParams } from "react-router";
import SelectContext from "./selectContext";
import { UserContext } from "../context/context";
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {Form, Button, Spinner} from 'react-bootstrap';
import {useHistory} from "react-router-dom";

export default function InnerModule(props) {
    const history = useHistory();
    let {id_indicator} = useParams();
    var selectedIndicator = props.location.state.selectedIndicator;
    const {context, user} = useContext(UserContext);
    const [spinner, setSpinner] = useState(false); // => mientras se mandan datos al servidor, se muestra el spinner
    const [inputsFaltantes, setInputsFaltanets] = useState(false);
    const [data, setData] = useState(false);

    const  getIndicatorByUser=()=>{
        Axios.get(`/indicators/${id_indicator}/${context}/${user.id}`)
        .then((response)=>{
            if(response.data.inputs.inputs_faltantes.length >= 1){
                setInputsFaltanets(response.data.inputs.inputs_faltantes)
            }else{
                setInputsFaltanets(false)
                setData(response.data)
            }
        })
    }

    useEffect(()=>{
        getIndicatorByUser();
    },[context])

    const submitInput = (e, input, y) => {
        e.preventDefault();
        setSpinner(true);
        Axios({
          method: "POST",
          data: {
            variable: input,
            value: document.getElementById(y).value,
            user: user.id,
            timestamp: Date.now()
          },
          withCredentials: true,
          url: "/inputs",
        })
        .then((res) => {
            if(res.data === true){
                getIndicatorByUser()
            }
        });
        setSpinner(false)
      };
    
    useEffect(()=>{
        getIndicatorByUser();
    },[])

    return (
        <div className="inner-modulo">
            <button onClick={() => history.goBack()}>Go Back</button><br></br>
            <h4>{selectedIndicator}</h4>
            <SelectContext/>
            <br></br>
            Indicador: {id_indicator}
            <br></br>
            Context: {context ? context : "select context"}
            <br></br>
            User: {user ? user.id : 'login'}
            <br></br>           

            <div>                
           
            {
                user ? 

                    inputsFaltantes !== false ?                             
                    <div>
                        <h6>Para poder visualizar este indicador necesitamos que llenes el sigueinte dato</h6>
                            {inputsFaltantes.map((input,y)=>(
                                <Form onSubmit={(e)=>submitInput(e, input, y)} key={y}>
                                        <Form.Group>
                                            <Form.Label For={`${y}`}>{input}</Form.Label>
                                                <Form.Control id={`${y}`} type="text" placeholder={`Ingrese ${input}`} required></Form.Control>                                                        
                                        </Form.Group>
                                    <Button type="submit">Submit</Button>
                                    {spinner ? <Spinner/> : null}
                                </Form>
                            ))}
                    </div>

                :
                    <div>
                        <h6>Tienes todos los datos para ver este indicador</h6>
                        <pre>{JSON.stringify(data, null, 2) }</pre>
                    </div>
                : 
                
                <h6>You need to <Link to="/signin">login</Link> before access to indicator data</h6>
            }            
            </div>
        </div>        
    )
}
