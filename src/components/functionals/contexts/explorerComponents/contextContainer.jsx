import React, {useState, useEffect, useContext} from 'react'
import { Accordion, Switch } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Col, Row } from "react-bootstrap";
import "../context.scss";
import FormGroup from "@mui/material/FormGroup";
import ColumnNav from '../../../layout/columnNav';

export default function ContextContainer(props) {
 
  //State captured from url state
  const [context, setContext] = useState(false);
  
  //State captured on mounting
  useEffect(()=>{
    props.location.state.context && setContext(props.location.state.context);
    console.log(context);
  },[])

  return (
    <>
    {context && 
      <div className="main">
        <ColumnNav/>

        <div className="wrap-content">
          <div className="content">  
          <div className="inner-content">
            
            <Card
                variant="outlined"
                square={true}
              >
                <DialogTitle
                  id="responsive-dialog-title"
                  style={{ textAlign: "center" }}
                >
                <Typography variant="h3" component="div">
                  {context.context}
                </Typography>                
              </DialogTitle> 
              <CardContent>
              
              <div className="explorer element">
              <Typography variant="h6" gutterBottom component="div">Info</Typography>      
                <Typography variant="body2" gutterBottom component="div">
                  {context.info}
                </Typography>       
              </div>
              
              <div className="contex-explorer-element">
                
                <Typography variant="h6" gutterBottom component="div">Rules</Typography>
                {context.condition.map((rule, i)=>(
                  rule && 
                  <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="h6" sx={{ color: "dodgerblue" }}>
                          {rule.var}
                        </Typography>

                        <Typography variant="h6" sx={{ color: "black" }} mx={2}>
                          {" "}
                          {rule.op === "gte" ? '>' : rule.op === "$eq" ? '=': '=' }
                        </Typography>

                        <Typography variant="h6" sx={{ color: "tomato" }}>
                          20{" "}
                        </Typography>
                      </div>
                ))}                
              </div>          
                
              </CardContent>
              </Card>
            
            <div className="contex-explorer-element"></div>
              <div className="context-explorer-subscribers">
              
            </div>          
            


            <div className="contex-explorer-element">
              <div className="context-explorer-rules"></div>
            </div>

            <div className="contex-explorer-element">
              <div className="context-explorer-indicators"></div>
            </div>

            <div className="contex-explorer-element">
              <div className="context-explorer-community"></div>
            </div>
            
            </div>
            </div>
        </div>
      </div>
    }
      
    </>
  )
}
