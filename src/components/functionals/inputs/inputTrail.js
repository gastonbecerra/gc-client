import React, { useState } from 'react';
import { SliderData } from './SliderData';
import { FcPrevious, FcNext } from "react-icons/fc";
import * as Inputs from './ux_types';

const InputTrail = ({ inputs }) => {
  const [current, setCurrent] = useState(0);
  const length = inputs.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

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

            case 'worder':
            type = 'OpenCat'
            break;
    
        default:
            type = 'BasicFormInput'
            break;
    }
    const Component = Inputs[type]
    return <Component input={slide} i={index}/>
 }

 function setPropperTitle(slide){
  if(slide && slide.var === "preferencias_financieras"){
    var [a, b] = slide.var.split("_");
    return <span className='title'>{a}</span>
  }else{
    return <h1 className='title'>{slide.var}</h1>
  }
 }

  return (
    <section className='slider'>
      
      {inputs.map((slide, index) => {
        return (
          <div className={index === current ? 'slide active' : 'slide'} key={index}>
            {index === current && (
              setPropperTitle(slide)
            )}          
            
            {renderRequiredInput(slide, index)}
              
          </div>
        );
      })}
      <FcPrevious className='left-arrow' onClick={prevSlide} />
      <FcNext className='right-arrow' onClick={nextSlide} />
    </section>
  );
};

export default InputTrail;
