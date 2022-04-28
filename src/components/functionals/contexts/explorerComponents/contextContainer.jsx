import React, { useState, useEffect, useContext } from "react";
import { Accordion, Switch } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Col, Row } from "react-bootstrap";
import "../context.scss";
import FormGroup from "@mui/material/FormGroup";
import ColumnNav from "../../../layout/columnNav";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useDispatch, useSelector } from "react-redux";
import ChartContainer from "../../charts/chartContainer";
import { getSamples } from "../../../../store/slices/samples";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ContextPost from "./comunnity/contextPost";
import { fecthComments } from '../../../../store/slices/comments';
import { useHistory } from "react-router-dom";

export default function ContextContainer(props) {
  //State captured from url state
  const [context, setContext] = useState(false);
  const { samples } = useSelector((state) => state.samples);
  const { username } = useSelector((state) => state.user);
  const { context_comments } = useSelector((state) => state.comments);
  const [ contextsPost, setContextsPosts ] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  //State captured on mounting
  useEffect(() => {
    props.location.state.context && setContext(props.location.state.context);
    dispatch(getSamples(context.context));
    dispatch(fecthComments())
  }, []);

  useEffect(()=>{
    console.log(contextsPost);
  },[contextsPost])

  useEffect(()=>{
    try{
      setContextsPosts(context_comments.filter(c => c.base_reference.context === context.context));
    }catch(e){
      console.log('error merging data');
    }
  },[context_comments, context])

  return (
    <>
      {context && (
        <div className="main">
          <ColumnNav />

          <div className="wrap-content">
            <div className="content">
              <div className="inner-content">
                {/* -----------------------------HEADER------------------------------------ */}
                <div
                  className="context-explorer-element"
                  style={{ textAlign: "center" }}
                >
                  <Typography variant="h3" component="div">
                    {context.context}
                  </Typography>
                  <div style={{marginBottom: '10px'}}>
                    <Breadcrumbs
                      aria-label="breadcrumb"                      
                      id="breadcrumber"
                    >
                    

                      <span><Link underline="hover" href="">
                        Info
                      </Link></span>
                      <span><Link underline="hover" href="">
                        Rules
                      </Link></span>
                      <span><Link underline="hover" href="">
                        Scope & Subs
                      </Link></span>
                      <span><Link underline="hover" href="">
                        Indicators
                      </Link></span>
                      <span><Link underline="hover" href="">
                        Community
                      </Link></span>
                    
                    </Breadcrumbs>
                  </div>
                </div>

                {/* -----------------------------INFO CARD ------------------------------------ */}

                <Card
                  square={true}
                  sx={{                  
                    maxWidth: "96vw",                    
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: 'column',                    
                    borderTop: 'solid 2px lightgrey',                    
                  }}
                >
                  <Typography 
                    variant="h6" 
                    gutterBottom component="div"
                    className="section-header"
                    style={{
                      paddingTop: '10px'
                    }}
                  >
                    Info
                  </Typography>
                  <CardContent>
                    <Typography variant="body2" gutterBottom component="div">
                      {context.info}
                    </Typography>
                  </CardContent>
                </Card>

                {/* -----------------------------RULES CARD ------------------------------------ */}
                <Card
                  square={true}
                  sx={{
                    minHeight: 10,
                    minWidth: "96vw",
                    maxWidth: "400px",
                    display: "flex",
                    marginTop: "6px",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    className="section-header"
                  >
                    Rules
                  </Typography>
                  <CardContent>
                    {context.condition.map(
                      (rule, i) =>
                        rule && (
                          <div
                            style={{
                              textAlign: "center",
                              display: "flex",
                            }}
                          >
                            <Typography
                              variant="h6"
                              className="section-header"
                              sx={{ color: "dodgerblue" }}
                            >
                              {rule.var}
                            </Typography>

                            <Typography
                              variant="h6"
                              sx={{ color: "black" }}
                              mx={2}
                            >
                              {" "}
                              {rule.op === "gte"
                                ? ">"
                                : rule.op === "$eq"
                                ? "="
                                : "="}
                            </Typography>

                            <Typography variant="h6" sx={{ color: "tomato" }}>
                              {rule.value}
                            </Typography>
                          </div>
                        )
                    )}
                  </CardContent>
                </Card>

                {/* -----------------------------SCOPE AND REACH CARD ------------------------------------ */}

                <Card
                  square={true}
                  sx={{
                    minHeight: 100,
                    minWidth: "96vw",
                    maxWidth: "400px",
                    marginTop: "6px",
                  }}
                >
                  <Typography 
                    variant="h6" 
                    gutterBottom component="div"
                    className="section-header"
                  >
                    Scope & Subscribers
                  </Typography>

                  <CardContent
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Row>
                      <Col className="highlight-column">
                        <Typography className="highlight-title" variant="body2">
                          Subscribers
                        </Typography>
                        <div className="highlight-header">
                          {/* {subscribes} */}
                          26
                        </div>
                      </Col>

                      <Col
                        className="highlight-column"
                        style={{ border: "none" }}
                      >
                        <Typography className="highlight-title" variant="body2">
                          Scope
                        </Typography>
                        <div className="highlight-header">{/* {scope} */}2</div>
                      </Col>
                    </Row>
                    <Row
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Col>
                        <div style={{ marginTop: "10px" }}>
                          <FormGroup>
                            <FormControlLabel
                              control={<Switch size="small" checked={true} />}
                              label={
                                <Typography
                                  variant="body2"
                                  color="textSecodary"
                                >
                                  {/* ascription */}
                                  {true ? "Suscribed!" : " Subscribe!"}{" "}
                                </Typography>
                              }
                              labelPlacement="bottom"
                            />
                          </FormGroup>
                        </div>
                      </Col>

                      <Col>
                        <div
                          style={{
                            textAlign: "center",
                            fontWeight: "600",
                            paddingTop: "3px",
                          }}
                        >
                          {/* reach */}
                          {true ? (
                            <Typography
                              variant="body2"
                              style={{ color: "dodgerblue" }}
                            >
                              Reached
                            </Typography>
                          ) : (
                            <span>Note reached</span>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </CardContent>
                </Card>

                {/* -----------------------------INDICATORS CARD ------------------------------------ */}
                <Card
                  square={true}
                  sx={{
                    minHeight: 100,
                    minWidth: "96vw",
                    maxWidth: "400px",
                    marginTop: "6px",
                  }}
                >
                <Accordion>
                    <AccordionSummary
                      aria-controls="panel4d-content"
                      id="panel4d-header"
                    >
                    <Typography 
                    variant="h6" 
                    gutterBottom component="div"
                    
                  >
                    
                      Indicators
                    </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                      {samples &&
                        samples.map((muestra, i) => (                          
                            <ChartContainer
                              key={i}
                              muestra={muestra}
                            />                          
                        ))}
                    </AccordionDetails>
                  </Accordion>
                </Card>

                <Card
                sx={{
                    minHeight: 100,
                    minWidth: "96vw",
                    maxWidth: "400px",
                    marginTop: "6px",
                  }}
                >
                <Typography 
                    variant="h6" 
                    gutterBottom 
                    component="div"
                    className="section-header"                  
                  >                  
                    Community
                    </Typography>
                  
                    <ContextPost 
                      context={context}     
                      posts={contextsPost}                 
                    />

                  
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
