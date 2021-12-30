import React from 'react';
import './inputTrail.css';
import InputTrail from './inputTrail';
import { SliderData } from './SliderData';
import { useDispatch, useSelector } from "react-redux";

function App() {
  const { inputs } = useSelector(state => state.indicator)
  
  React.useEffect(()=>{
      console.log(inputs);
  },[inputs])

  return <InputTrail inputs={inputs} />;

}

export default App;
