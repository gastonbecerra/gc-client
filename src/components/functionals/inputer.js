import React,{ useState } from "react";
import { Container, Modal } from 'react-bootstrap';
import Button from '@mui/material/Button';
import InputHome from '../../components/functionals/inputs/inputHome';
import { MdInput } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import { submitInput } from "../../store/slices/inputs";
import { fetchIndicatorByUser, submitMissingInput } from "../../store/slices/indicator";

export default function Inputer() {
    const values = [true];
    const [fullscreen, setFullscreen] = useState('xxl-down');
    const [show, setShow] = useState(false);
    const { queu } = useSelector(state => state.inputs);
    const { missing_queu } = useSelector(state => state.indicator);
    const { missing_inputs } = useSelector(state => state.indicator);
    const { inputs : inputs_mod } = useSelector(state => state.indicator);
    const { selectedIndicator} = useSelector(state => state.indicator);
    const { username: user_id } = useSelector(state => state.user)
    const { selectedContext } = useSelector(state => state.context);
    const dispatch = useDispatch();
    var route = window.location.pathname;
  
    function handleShow(breakpoint) {
      setFullscreen(breakpoint);
      setShow(true);
    }

    function handleClose(){
      if(route === '/inputs' && queu.length > 0 ){
        dispatch(submitInput(queu));      
      } 
      if(route === '/modulo' && missing_queu.length > 0){
        dispatch(submitMissingInput(missing_queu, missing_inputs, inputs_mod));    
      }
    }

    React.useEffect(()=>{
      if(route === '/modulo') dispatch(fetchIndicatorByUser(selectedIndicator.indicator, selectedContext, user_id))
    },[missing_queu])
  

    return (
        <div style={{height: '30vh'}}>
        <div>
          <h5>Inputs</h5>
        </div>
        
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '5px', textAlign:'left'}}>
          {values.map((v, idx) => (
            <>
            <p key={idx} style={{textAlign: 'left'}}>
              This the list of inputs associated to this indicator. Check it's values, add new ones or change them!
              {typeof v === 'string' && `below ${v.split('-')[0]}`}
            </p>

            <div style={{margin:'auto'}}>
            {selectedContext 
            ? <Button key={idx + 1} variant="outlined" color="primary" onClick={() => handleShow(v)} startIcon={<MdInput/>} style={{ width: '210px'}}>
                Inputs!
                {typeof v === 'string' && `below ${v.split('-')[0]}`}
              </Button>
            : <Button key={idx + 1} variant="outlined" color="primary" disabled>
                Select a context to get Inputs!
              </Button>
            }
              </div>
            
            </>
          ))}
          <Modal show={show} fullscreen={fullscreen} onExit={()=> handleClose()} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Inputs</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputHome/>
            </Modal.Body>
          </Modal>
          </div>
        </div>
      );
    }
  
  