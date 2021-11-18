import React,{useEffect, useState, useContext} from 'react'
import { useParams } from "react-router";
import SelectContext from "./selectContext";
import { UserContext } from "../context/context";
import Axios from 'axios';
import {Form, Button, Spinner, Alert} from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import MinMax from '../charts/minMax';

export default function InnerModule(props) {
    const history = useHistory();
    let {id_indicator} = useParams();
    var selectedModule = props.location.state.modulo;
    var selectedIndicator = props.location.state.indicator;
    const {context, user} = useContext(UserContext);
    const [spinner, setSpinner] = useState(false); // => mientras se mandan datos al servidor, se muestra el spinner
    const [inputsFaltantes, setInputsFaltanets] = useState(false);
    const [data, setData] = useState(false);

    const  getIndicatorByUser=()=>{
        setSpinner(true);
        Axios.get(`/indicators/${id_indicator}/${context}/${user.id}`)
        .then((response)=>{
            if(response.data.inputs.inputs_faltantes.length >= 1){
                setInputsFaltanets(response.data.inputs.inputs_faltantes)
            }else{
                setInputsFaltanets(false)
                setData(response.data)
                console.log(response.data)
            }
        })
        setSpinner(false)
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
            {/* <button onClick={() => history.goBack()}>Go Back</button><br></br> */}
            <h4>{selectedIndicator}</h4>
            <SelectContext/>
            
            <div>                
            {spinner ? 
                <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>    
                    : 
                null}
            
            {/*---------------- PRIMERA VALIDACIÓN => LOGIN ---------------- */}
            
            {!user ? 
                
                <Alert color='primary'>You need to <Alert.Link href="/signin">login</Alert.Link> before access to indicator data</Alert>
                
                    : 

                    context === false ?

                        <Alert color='primary'>Necesita seleccionar un contexto de muestra</Alert>

                            :

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
                                        </Form>
                                    ))}
                            </div>

                                :

                            data !== false && data.indicator.type === "max-min" && data.context !== false && data.user.user !== false ?

                                <MinMax 
                                        sample={data.context} 
                                        userValue={data.user.user.valor}/>
                                    :

                                <Alert variant={'danger'}> No hay un valor de muestra para el contexto seleccionado</Alert>

            }     
                
            </div>
        </div>        
    )
}
