import React, {useEffect, useState} from 'react'
import ColumnNav from '../../layout/columnNav';
import Axios from 'axios';
import './events.scss'
import * as EventCard from './index';

export default function Event() {

  const [events, setEvents] = useState(false);
  
  // ONINITIS actions: get event data
  useEffect(()=>{
    Axios({
      method: 'get',
      withCredentials: true,
      url: '/events/10'
    })
    .then((data)=>{
      setEvents(data.data)
    })
    .then(()=>{
      console.log(events)
    })
  },[])

  //render required event
  const renderequiredEvent = (event) => {
    console.log(event);
    let type;

    switch (event.type) {
      case 'CONTEXT_CREATION':
        type='EventContext'
        break;

      case 'VALUE_CREATION':
        type='EventValue'
        break;
    
      default:
        break;
    }
    const Component = EventCard[type]
    return <Component event={event} data={event.data}/>;
  }
    
  return (
    <div className="main">
      
      <ColumnNav/>

      <div className="wrap-content">

        <div className="content">
          <div className="inner-content">

              <div className="event-list">

              {events !== false && 
                
                events.map((e,i)=>(
                  
                  <div className='event'>
                      <div className="event-mold">
                        <div className="event-date">
                          {e.timestamp}
                        </div>
                        <div className='event-card'>
                          {renderequiredEvent(e)}
                        </div>
                      </div>
                      <div className="event-comment">

                      </div>
                  </div>
                
                ))

              }

              </div>


          </div>
        </div>
      </div>

    </div>
  )
}
