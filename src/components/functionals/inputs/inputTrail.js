import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { submitInput } from '../../../store/slices/inputs';
import { FcPrevious, FcNext } from "react-icons/fc";
import indicator, { submitMissingInput } from '../../../store/slices/indicator';
import * as Inputs from './ux_types';
import ColumnNav from '../../layout/columnNav';
import Axios from 'axios'; 

const InputTrail = ({ inputs }) => {
  const [current, setCurrent] = useState(0);
  const length = inputs.length;
  const { username } = useSelector(state => state.user);
  const { selectedIndicator } = useSelector(state => state.indicator);
  const { user_value } = useSelector(state => state.indicator); 
  const { queu } = useSelector(state => state.inputs);
  const { missing_queu } = useSelector(state => state.indicator);
  const { missing_inputs } = useSelector(state => state.indicator);
  const { inputs : inputs_mod } = useSelector(state => state.indicator);
  const dispatch = useDispatch();
  var route = window.location.pathname;
  
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  React.useEffect(() => {
    if(route === '/inputs' && queu.length > 0 ){
      dispatch(submitInput(queu));      
    } 
    if(route === '/modulo' && missing_queu.length > 0){
      dispatch(submitMissingInput(missing_queu, missing_inputs, inputs_mod, username, selectedIndicator ));    
    } 
  }, [current])
  
  // React.useEffect(()=>{
  //   try{
  //     if(inputs_mod.length > 1 && (missing_inputs.length === 0 || missing_inputs === false)){
  //       Axios({
  //         method: 'POST',
  //         withCredentials: true,
  //         url: '/values/user_value',
  //         data: {user: username, indicator: selectedIndicator.indicator}
  //       })
  //       .then(()=>{
  //         alert(true)
  //       })
  //     }
  //   }catch(e){
  //     console.log(e);
  //   }
  // },[inputs_mod, missing_inputs])

  if (!Array.isArray(inputs) || inputs.length <= 0) {
    return null;
  }



 function renderRequiredInput (slide, index){
    let type;
    switch (slide.ux_input) {
      case 'numberUx':
        type = 'NumberUx'
        break;

      case 'radioUx':
        type = 'RadioUx'
        break;

      case 'open_cat':
        type = 'OpenCat'
        break;

      case 'cat_open':
        type = 'OpenCat'
        break;

    default:
      return null;
    }
    const Component = Inputs[type]
    return <Component input={slide} i={index}/>
 }

 function handleKeys(e){
    console.log(e.key);
    e.key === 'ArrowRight' && nextSlide()
    e.key === 'Enter' && nextSlide()
    e.key === 'ArrowLeft' && prevSlide()
 }

 function setPropperTitle(slide){
    return (
      <>
        <h5 className='title' style={{textAlign:'center', wordBreak: 'normal'}}>{slide.var}</h5>
        <div className='text-center'>
          <span style={{}}>{slide.timestamp && slide.timestamp }</span>
          {slide.required === true ? <p style={{display: 'inline', color: 'tomato', fontWeight: '700'}}>Input required for this Indicator</p> : null }
        </div>
      </>
    )
 }

  return (
    <div className='main' onKeyDown={(e)=>{handleKeys(e)}}>
      <ColumnNav/>
      <div className="wrap-content" onKeyDown={(e)=>{handleKeys(e)}}>
      <div className='content' onKeyDown={(e)=>{handleKeys(e)}}>
      
      <div className='slider' onKeyDown={(e)=>{handleKeys(e)}}>  
        {inputs?.map((slide, index) => (
            <div className={index === current ? 'slide active' : 'slide'} key={index}>
              {index === current && (
                setPropperTitle(slide)
              )}          
              {renderRequiredInput(slide, index)}
              <div className="input-control"></div>
            </div>
        ))}
        <FcPrevious className='left-arrow' onClick={prevSlide}/>
        <FcNext className='right-arrow' onClick={nextSlide} />
      </div>
      </div>
      </div>
    </div>
  );
};

export default InputTrail;
