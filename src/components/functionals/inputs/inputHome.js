import React, {useEffect} from 'react';
import './inputTrail.css';
import InputTrail from './inputTrail';
import { useSelector, useDispatch } from "react-redux";
import { fetchInputsByUser } from '../../../store/slices/inputs';

function App(props) {
  const { username: user_id } = useSelector(state => state.user);
  var route = window.location.pathname;
  const { inputs} = useSelector(state => state.indicator);
  const { missing_inputs} = useSelector(state => state.indicator);
  const { inputs: data } = useSelector(state => state.inputs);
  const dispatch = useDispatch();
  const [mod_data, setData] = React.useState()

  useEffect(() => {
    ![false, undefined].includes(user_id) && dispatch(fetchInputsByUser(user_id));
  }, [user_id])
  
  // var mod_data;
  useEffect(() => {
    missing_inputs ? setData(inputs.concat(missing_inputs)) : setData(inputs);
  }, [inputs, missing_inputs])
  
  return(
    <>
      {data && route === '/inputs' && <InputTrail inputs={data} />}
      {mod_data && route === '/modulo' && <InputTrail inputs={mod_data} />}
    </>
  )

}

export default App;
