import React from 'react';
import './inputTrail.css';
import InputTrail from './inputTrail';
import { useSelector } from "react-redux";

function App() {
  const { inputs } = useSelector(state => state.indicator)
  
  React.useEffect(()=>{
      console.log(inputs);
  },[inputs])

  return <InputTrail inputs={inputs} />;

}

export default App;
