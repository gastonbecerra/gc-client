import { Accordion, Switch } from "@mui/material";
import React from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getSamples } from "../../../../store/slices/samples";
import ChartContainer from "../../charts/chartContainer";

export default function ContextResultCard({ context }) {
  const [open, setOpen] = React.useState(false);
  const { samples } = useSelector((state) => state.samples);
  const dispatch = useDispatch();

  const handleClickOpen = (context) => {
    setOpen(true);
    dispatch(getSamples(context));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <Card
        sx={{ width: "100vw", border: "none", padding: 0 }}
        style={{ marginTop: "5px", border: "0px solid lightgray" }}
      >
        <CardContent>
          <Typography variant="h6" component="div">
            {context.context}
          </Typography>
          <Typography sx={{ mb: 0.5 }} color="text.secondary">
            rules / date / scope / subscribers
          </Typography>
          <Typography variant="body2">{context.info}</Typography>

          <Button
            size="small"
            onClick={() => {
              handleClickOpen(context.context);
            }}
          >
            Explore
          </Button>

          <Dialog 
            fullScreen 
            open={open} 
            onClose={handleClose}
          >

            <DialogTitle
              id="responsive-dialog-title"
              style={{ textAlign: "center" }}
            >
              <Typography variant="h3" component="div">
                {context.context}
              </Typography>
            </DialogTitle>

            <DialogContent
              style={{
                display: "flex",
                justifyContent: "center",
                overflow: "visible",
                minWidth: '100vw',
                maxWidth: '900px'
              }}
            >
              <Card
                sx={{
                  minHeight: 200,
                  minWidth: '100vw', 
                  maxWidth: '450px',
                  display: 'flex',
                  justifyContent: 'center'
                }}
                square={true}
              >
                <CardContent
                  className="event-content"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: '100vw'
                  }}
                >
                  {/* -----------------------------INFO CARD ACCORDION------------------------------------ */}
                  <Accordion
                    className="accordion-card"
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography variant="h6">Info</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" gutterBottom component="div">
                        {context.info}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  {/* -----------------------------RULES CARD ACCORDION------------------------------------ */}

                  <Accordion
                    className="accordion-card"
                    expanded={expanded === "panel2"}
                    onChange={handleChange("panel2")}
                  >
                    <AccordionSummary
                      aria-controls="panel2d-content"
                      id="panel2d-header"
                    >
                      <Typography variant="h6">Rules</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="h6" sx={{ color: "dodgerblue" }}>
                          ingresos{" "}
                        </Typography>

                        <Typography variant="h6" sx={{ color: "black" }} mx={2}>
                          {" "}
                          {" = "}
                        </Typography>

                        <Typography variant="h6" sx={{ color: "tomato" }}>
                          20{" "}
                        </Typography>
                      </div>
                    </AccordionDetails>
                  </Accordion>

                  {/* <div style={{ marginTop: "20px" }}>
                    <Typography variant="subtitle1">Rules</Typography>

                      <Typography variant="h6" sx={{ color: "dodgerblue" }}>
                        ingresos{" "}
                      </Typography>
                      <Typography variant="h6" sx={{ color: "black" }} mx={2}>
                        {" "}
                        {" = "}
                      </Typography>
                      <Typography variant="h6" sx={{ color: "tomato" }}>
                        20{" "}
                      </Typography>
                      <div></div>
                  </div> */}

                  {/* -----------------------------SCOPE AND REACH CARD ACCORDION------------------------------------ */}

                  <Accordion
                    className="accordion-card"
                    expanded={expanded === "panel3"}
                    onChange={handleChange("panel3")}
                  >
                    <AccordionSummary
                      aria-controls="panel3d-content"
                      id="panel3d-header"
                    >
                      <Typography variant="h6">Scope and Followers</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                      <Row>
                        <Col className="highlight-column">
                          <Typography
                            className="highlight-title"
                            variant="body2"
                          >
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
                          <Typography
                            className="highlight-title"
                            variant="body2"
                          >
                            Scope
                          </Typography>
                          <div className="highlight-header">
                            {/* {scope} */}2
                          </div>
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
                    </AccordionDetails>
                  </Accordion>

                  {/* -----------------------------INDICATORS CARD ACCORDION------------------------------------ */}
                  <Accordion
                    className="accordion-card"
                    expanded={expanded === "panel4"}
                    onChange={handleChange("panel4")}
                  >
                    <AccordionSummary
                      aria-controls="panel4d-content"
                      id="panel4d-header"
                    >
                      <Typography variant="h6">Indicators</Typography>
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

                  {/* <Row style={{ marginTop: "15px" }}>
                    <Typography variant="subtitle1">Samples</Typography>
                  </Row>

                  <Row>
                    {samples &&
                      samples.map((muestra, i) => (
                        <div key={i}>
                        <ChartContainer
                          indicator={false}
                          muestra={samples[i]}
                        />
                        </div>
                      ))}
                  </Row> */}
                </CardContent>
              </Card>
            </DialogContent>

            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Disagree
              </Button>
              <Button onClick={handleClose} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    </>
  );
}
