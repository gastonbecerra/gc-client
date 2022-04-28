import React, {useEffect, useState} from 'react'
import ColumnNav from '../../layout/columnNav';
import Axios from 'axios';
import './events.scss'
import * as EventCard from './index';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../store/slices/user";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { fetchContexts, fetchContexts4User } from '../../../store/slices/context';
import { getSamples } from '../../../store/slices/samples';
import { fecthComments } from '../../../store/slices/comments';
import Chip from '@mui/material/Chip';
import { VscActivateBreakpoints } from "react-icons/vsc";
import { MdViewModule } from 'react-icons/md';

export default function Event() {
  let history = useHistory();
  const dispatch = useDispatch();
  const [events, setEvents] = useState(false);
  const { username } = useSelector(state => state.user);
  const { contexts, context4user } = useSelector(state => state.context);
  const { chart_comments, context_comments, comments } = useSelector(state => state.comments); 
  const { samples } = useSelector(state => state.samples);

  useEffect(()=>{
    // 1) => GET USER DATA SESSION
    if (username !== true) dispatch(fetchUser())
    // 2.i) => GET USER SUBSCRIBED CONTEXTS
    if ((username && !context4user)) dispatch(fetchContexts4User(username));
  },[username])

  useEffect(()=>{
    try{
      // 2.ii) => GET CONTEXTS IF USER DOESENT HAVE ANY
      if ((!username && !context4user && !contexts)) dispatch(fetchContexts())
      
      // 3) => GET SAMPLES BY USER'S CONTEXTS
      var contexts = []; // => stores contexts req params
      if (context4user && !samples){
        context4user.forEach(element => {
          contexts.push(element.context);            
        });
        if (contexts.length > 0) {          
          dispatch(getSamples(contexts));
        }
      }

      // 4) => GET COMMENTS BY CONTEXTS       
      if(!context_comments && !chart_comments) dispatch(fecthComments());

      // 5 MANUALLY SETTING "EVENTS" FOR FEED DISPLAY
      if(chart_comments.length > 0 && context_comments.length > 0){
        setEvents(chart_comments.concat(context_comments))
      }
    }catch(e){
      console.log(e);
    }
  },[contexts, context4user, samples])

  useEffect(()=>{
    console.log(events);
  },[events])
  //render required event
  const renderequiredEvent = (event) => {
    try{      
      let type;
  
      switch (event.type) {
        case 'CONTEXT_CREATION':
          type='EventContext'
          break;
  
        case 'VALUE_CREATION':
          type='EventValue'
          break;
        
        case 'comment':
          type='EventComment';
          break;
        
        case 'image':
          type = 'EventPost';

        default:
          break;
      }
      var Component;
      if(type){
        Component = EventCard[type];
        return (
          <>
          <div 
          className="event-title"
          style={{
            display: 'flex',
            padding: '7px',
            justifyContent: 'flex-start',
            marginTop: '10px',
            paddingTop: '3px',
            borderTop: 'solid 1px lightgrey'
          }}
        >
           <Chip 
            label={event.base_reference.context}
            icon={<VscActivateBreakpoints />}
          /> 
          {type === "EventComment" &&
          <Chip
            color="success"
            label={event.base_reference.indicator}
            icon={<MdViewModule/>}
          />
          }
        </div>
          <Component event={event} data={event.data}/>
          </>
        );
      }else{
        return null;
      }
    }catch(e){
      console.log(e)
    }
  }
    
  return (
    <div className="main">
      <ColumnNav/>

      <div className="wrap-content">

        <div className="content">
          <div className="inner-content">

              <div className="event-list">

              {chart_comments && samples && events.length > 0 ?
                
                events.map((e,i)=>(
                  
                  <Card key={i} sx={{width: '100%'}} className='event'>
                      <div className="event-mold">
                        <Typography className="event-date" sx={{ fontSize: 11 }} color="text.secondary">
                          {e.timestamp}
                        </Typography>
                        <div className='event-card'>
                          {renderequiredEvent(e)}
                        </div>
                      </div>
                      <div className="event-comment">

                      </div>
                  </Card>
                  
                ))
                : null
              }

              </div>


          </div>
        </div>
      </div>

    </div>
  )
}
