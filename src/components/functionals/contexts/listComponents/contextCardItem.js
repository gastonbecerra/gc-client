import React from "react";
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { RiUserUnfollowLine } from 'react-icons/ri';
import { AiOutlineUsergroupAdd} from 'react-icons/ai';
import { MdSearch } from 'react-icons/md';

export default function ContextCardListItem({   context,  addContext, removeContext, list}) {
  
  
    return (
    <Card sx={{ width: 370, m:0.4, height: 50, border: "0px solid lightgray" }}>
      <CardContent sx={{display: 'flex', justifyContent:'flex-start', alignItems: 'center', position: 'relative'}}>
        
        <div style={{display:'flex', justifyContent: 'start'}}>
          <Typography sx={{ mb: 0 }} variant={"h6"}>
            {context.context}
          </Typography>
        </div>
          <Button 
            onClick={ 
              list === 'have' ? (e)=> removeContext(context, e) 
              : list === 'dont' ? (e)=> addContext(context, e) 
              : (e) => e.preventDefault()} 
            size="small"
            variant="outlined" 
            startIcon={ 
              list === 'have' ? <RiUserUnfollowLine /> 
              : list === 'dont' ? <AiOutlineUsergroupAdd /> 
              : list === "created" ? <MdSearch/> : null  }
            style={{
                position: 'absolute',
                right: '1%'
              }}
              color={  list === 'have' ? 'error' : 'primary'}
          > 
              </Button>
      </CardContent>
    </Card>
  );
}
  