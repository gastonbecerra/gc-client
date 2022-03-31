import React, {useState, useEffect} from 'react'
import ContextCardListItem from './contextCardItem';
import Alert from '@mui/material/Alert';
import { Typography, Button } from '@mui/material';
import { useSelector } from "react-redux";

export default function ContextCardListContainer({  contextForUser, contexts,  addContext, removeContext}) {
  const { username} = useSelector((state) => state.user);
  const [createdContext, setCreatedContexts] = useState(false)
  
  useEffect(()=>{
    (contexts && username) && setCreatedContexts(contexts.filter(c => c.user === username));
  },[contexts])

  return (
    <div className="context-content">
      <div className="lister-wrapper">
        <Typography variant="h5">Subscribed Contexts</Typography>
        {contextForUser ? (
          <>
            <Alert severity="info" className="info">
              These are the contexts you will use to compare your self through
              indicators
            </Alert>
            <div className="lister">
              {contextForUser.map((context, i) => (
                <ContextCardListItem
                  context={context}
                  removeContext={removeContext}
                  list={"have"}
                  key={i}
                />
              ))}
            </div>
          </>
        ) : (
          <p>Elige de los contextos disponibles para adcribirte</p>
        )}
      </div>

      <div className="lister-wrapper" style={{ marginTop: "10px" }}>
        <Typography variant="h5">Unsubscribed Contexts</Typography>
        <Alert className="info">
          These are all the contexts you can use to compare your self through
          indicators. You may only choose 3 differents context for your
          comparations.
        </Alert>

        {contexts && (
          <div className="lister">
            {contexts.map((context, i) => (
              <ContextCardListItem
                context={context}
                addContext={addContext}
                list={"dont"}
                key={i}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="lister-wrapper" style={{ marginTop: "10px", textAlign: 'left' }}>
        <Typography align="left" variant="h5">Created Context</Typography>
        {createdContext && createdContext.map((context, i) => (
              <ContextCardListItem
                context={context}
                key={i}
                list={"created"}
              />
            ))}
      </div>
      
      <div className="lister-wrapper" style={{ marginTop: "10px", textAlign: 'left' }}>
      <Typography align="left" variant='h5'>Context under scope</Typography>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginBottom: '70px'}}>
        <Button
          style={{marginTop: '7px', width: '80vw'}}
          size="large"
          id="checkSocpe"
          variant={'outlined'}
          onClick={()=> alert('t2')}
        >
          Check it!
        </Button>
      </div>
    </div>
  );
}
