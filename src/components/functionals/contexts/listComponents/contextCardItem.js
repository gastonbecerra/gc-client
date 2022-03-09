import React from "react";
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { RiUserUnfollowLine } from 'react-icons/ri';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';

export default function ContextCardListItem({   context,  addContext, removeContext, list}) {
  
  if( list === 'have'){
    return (
    <Card sx={{ minWidth: 345, m:0.4, height: 50 }}>
      <CardContent sx={{display: 'flex', justifyContent:'flex-start', alignItems: 'center', position: 'relative'}}>
        
        <div style={{display:'flex', justifyContent: 'start'}}>
          <Typography sx={{ mb: 0 }} color="text.secondary">
            {context.context}
          </Typography>
        </div>
          <Button 
            onClick={(e)=> removeContext(context, e)} 
            size="small"
            color="error"
            variant="outlined" 
            startIcon={<RiUserUnfollowLine />}
            style={{
                position: 'absolute',
                right: '1%'
              }}
          > 
            
              </Button>
        
        
        
      </CardContent>
    </Card>
  );
}

  if(list = 'dont'){
    return (
      <Card sx={{ minWidth: 345, m:0.4, height: 50 }}>
        <CardContent sx={{display: 'flex', justifyContent:'flex-start', alignItems: 'center', position: 'relative'}}>
          
          <div style={{display:'flex', justifyContent: 'start'}}>
            <Typography sx={{ mb: 0 }} color="text.secondary">
              {context.context}
            </Typography>
          </div>
            <Button 
              onClick={(e)=> addContext(context, e)} 
              size="small"
              color="primary"
              variant="outlined" 
              startIcon={<AiOutlineUsergroupAdd />}
              style={{
                  position: 'absolute',
                  right: '1%'
                }}
            > 
              
                </Button>
          
          
          
        </CardContent>
      </Card>
    );
  }
}
  