import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInputsByUser } from "../../../../store/slices/inputs";
import EventValueNumber from "./EventValueNumber";
import Axios from 'axios';

export default function EventValue({ event, data }) {
  const { inputs } = useSelector((state) => state.inputs);
  const { username } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [uservalue, setUservalue] = useState(false);

  useEffect(() => {
    inputs === false && username && dispatch(fetchInputsByUser(username));
  }, []);

  useEffect(() => {
    if (inputs !== false) {
      var value = inputs.filter((val) => val.var === data.var);
      setUservalue(value);
    }
  }, [inputs]);

  const submitValue = (body, action) => {
    Axios.get({
      method: action,
      url: `/values/${body._id}`,
      data: body
    })
    .then((res)=>{
      
    })
  }

  // render the required UI associated value
  const renderAssociatedValue = () => {
    try {
      if (uservalue) {
        switch (uservalue[0].ux_input) {
          case "numberUx":
            return <EventValueNumber submit={submitValue} uservalue={uservalue[0]}/>

          case "radioUx":
            return <></>;

          case "open_cat" || "cat_open":
            return <></>;

          default:
            return null;
        }
      }
    } catch (e) {
      console.log({ status: "failed ux value render", err: e });
    }
  };

  return (
    <>
      <div className="event-title">
        <span>A user has filled a new value!</span>
      </div>

      <div className="event-main">
        <span style={{ color: "dodgerblue" }}>{" " + data.var + " "}</span>
        {" " + " = " + " "}
        <span style={{ color: "tomato" }}>{" " + data.value}</span>
      </div>

      <div className="event-content">
        {uservalue && renderAssociatedValue()}
      </div>
    </>
  );
}
