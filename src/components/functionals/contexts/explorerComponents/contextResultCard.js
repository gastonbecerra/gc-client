import { Switch } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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

          <Dialog fullScreen open={open} onClose={handleClose}>
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
              }}
            >
              <Card
                sx={{
                  minWidth: 380,
                  p: 1.4,
                  minHeight: 200,
                }}
                square={true}
              >
                <CardContent className="event-content">
                  <Typography variant="subtitle1" component={'div'} gutterBottom >Info</Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    {context.info}
                  </Typography>

                  <div style={{ marginTop: "20px" }}>
                    <Typography variant="subtitle1">Rules</Typography>

                    <div style={{ display: "flex", justifyContent: "center" }}>
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
                    </div>
                  </div>

                  <Row className="highlights" style={{ marginTop: "20px" }}>
                  <Typography variant="subtitle1" component={'div'} gutterBottom >Scope and Followers</Typography>
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

                  {/* ----------------------------SUBS - SCOPES ----------------------------*/}

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
                          <Typography variant="body2" style={{ color: "dodgerblue" }}>Reached</Typography>
                        ) : (
                          <span>Note reached</span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  {/* ------------------------------ SAMPLES ----------------------------*/}

                  <Row style={{ marginTop: "15px" }}>
                    <Typography variant="subtitle1">Samples</Typography>
                  </Row>

                  <Row>
                    <ChartContainer indicator={false} muestra={samples[0]} />
                    {samples &&
                      samples.map((muestra, i) => (
                        <div key={i}>
                        <ChartContainer
                          indicator={false}
                          muestra={samples[i]}
                        />
                        </div>
                      ))}
                  </Row>
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
