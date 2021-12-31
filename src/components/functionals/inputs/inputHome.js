import React, {useEffect} from 'react';
import './inputTrail.css';
import InputTrail from './inputTrail';
import { useSelector } from "react-redux";

function App(props) {

  useEffect(()=>{
    console.log(window.location.pathname);
  },[])
  
  const { inputs } = useSelector(state => state.indicator)

  return <InputTrail inputs={inputs} />;

}

export default App;
