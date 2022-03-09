import React from 'react'
import ContextCardListItem from './contextCardItem';
import Alert from '@mui/material/Alert';
import { Typography } from '@mui/material';

export default function ContextCardListContainer({  contextForUser, contexts,  addContext, removeContext}) {
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
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
