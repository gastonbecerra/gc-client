import React, { useState, useEffect } from "react";
import "./messaging.scss";
import { MdOutlineModeComment } from "react-icons/md";
import { FiShare2 } from "react-icons/fi";
import { BsArrowUpSquare, BsArrowDownSquare } from "react-icons/bs";
import CommentBase from "./listCommentBase";
import BaseInput from "./baseComment";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { postComment } from "../../../store/slices/comments";
import { useDispatch } from "react-redux";

export default function Message({ muestra, comments, event }) {
  var route = window.location.pathname;
  // console.log(comments);
  const dispatch = useDispatch();
  const [counterM, setMCounter] = useState(0);
  const [counterL, setLCounter] = useState(0);
  const [flag, setFlag] = useState(false); // if true available comments are displayed
  const [message, setMessage] = useState(false); // setter and getter for messaage object sended by user
  const [stack, setStack] = useState([]); // stores comments send by client. If repeated in stack, not sended to DB (provisional solution to bug)
  const [loading, setoLading] = useState(false);
  const [responseTree, setResponseTree] = useState({
    reference: {
      entity: "chart",
      context: muestra.context,
      indicator: muestra.indicator,
    },
    comments: [],
  });

  useEffect(() => {
    if (route !== '/' && comments !== false && comments.length > 0 ) {
      setMCounter(comments.length);
      setResponseTree((prevState) => ({
        ...prevState,
        comments: comments,
      }));
    }
    setoLading(true);
  }, [comments]);

  /*---------------------------------CICLOS--------------------------------- */

  //When MESSAGE hcanges IT SEEMS NOT USED
  useEffect(() => {
    try {
      if (message.message !== (undefined && false && '') && stack.length > 0) {
        var index = stack.findIndex(
          (m) => m.message === message.message && m.user === message.user
        );
        index === -1 && commentApiHandler(message);
      }
      if (message.message !== (undefined && false && '') && stack.length === 0) {
        commentApiHandler(message);
      }
    } catch (e) {
      console.log("failure saving none repetead comments");
    }
    if (message.message !== (undefined && false && '')) {
      var aux = Object.assign({}, responseTree);
      aux.comments.push(message);
      setResponseTree(aux);
    }
  }, [message]);
  
  useEffect(()=>{
    if(responseTree.comments !== undefined){
      setMCounter(responseTree.comments.length)
    }
  },[responseTree])

  /*---------------------------------FUNCIONES--------------------------------- */

  //Update comments an inner.comments in UI
  const handleAnswer = (obj, idx) => {
    try {
      let aux = Object.assign({}, responseTree.comments);
      aux[idx] = obj;
      setResponseTree((prevState) => ({
        ...prevState,
        comments: comments,
      }));
    } catch (e) {
      console.log({mssge: "failure setting answers into responsetree", e});
    }
  };


  // POST or PUT new comments
  const commentApiHandler = (message) => {
    message !== (false || '') && setStack([...stack, message]);
    dispatch(postComment(message, responseTree.reference, false))
  };

  return (
    <>
      <>
      {route === '/' && muestra ?
        
      <CommentBase
        message={event}
        handleAnswer={handleAnswer}
        base_reference={event.base_reference}
      />

        :
        
        loading ? (
        <>
          <div onClick={() => setFlag(!flag)} className="message-container">
            <div className="p-2">
              <BsArrowDownSquare />
              <span>{" " + counterL + " "}</span>
              <BsArrowUpSquare />
            </div>
            <div className="p-2">
              {!flag ? "show " : " hide "}
              <MdOutlineModeComment />
              {" " + counterM}
            </div>
            <div>
              <FiShare2 /> Share
            </div>
          </div>
          <>
            {flag && responseTree.comments.length > 0 ? (
              <>
                {responseTree.comments.map((message, i) => (
                  <>
                    <CommentBase
                      message={message}
                      handleAnswer={handleAnswer}
                      key={i}
                      idx={i}
                      base_reference={responseTree.reference}
                    />
                  </>
                ))}
                <BaseInput setMessage={setMessage} />
              </>
            ) : (
              <BaseInput setMessage={setMessage} />
            )}
          </>
        </>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      </>

    </>
  );
}

