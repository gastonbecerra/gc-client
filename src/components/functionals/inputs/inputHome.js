import React, {useEffect} from 'react';
import './inputTrail.css';
import InputTrail from './inputTrail';
import { useSelector, useDispatch } from "react-redux";
import { fetchInputsByUser } from '../../../store/slices/inputs';

function App(props) {
  const { username: user_id } = useSelector(state => state.user);

  useEffect(() => {
    ![false, undefined].includes(user_id) && dispatch(fetchInputsByUser(user_id));
  }, [user_id])

  var route = window.location.pathname;
  const { inputs} = useSelector(state => state.indicator);
  const { inputs: data } = useSelector(state => state.inputs);
  const dispatch = useDispatch();
  
  return(
    <>
      {data && route === '/inputs' && <InputTrail inputs={data} />}
      {inputs && route === '/modulo' && <InputTrail inputs={inputs} />}
    </>
  )

}

export default App;
