import React, {useState, useEffect} from "react";
import "./messaging.scss";
import { BsArrowUpSquare, BsArrowDownSquare } from "react-icons/bs";
import { Row } from "react-bootstrap";
import { MdOutlineAccountCircle, MdInput } from "react-icons/md";
import Typography from "@mui/material/Typography";
import { HiOutlineMenu } from "react-icons/hi";
import CommentAnswer from "./answerComment";
import { MdOutlineDeleteOutline } from 'react-icons/md';

export default function CommentBase({ message, handleAnswer, idx }) { 
    const [response, setResponse] = useState(false);

    useEffect(()=>{
        let obj = Object.assign({level: 1}, message);
        if(response !== false){
            obj.comments.push(response)            
            handleAnswer(obj, idx)
        }
    },[response])   

  return (
      <>
    <div className="comment-container">
      <Row>
        <div className="comment-header px-2">
          <div style={{ display: "flex", alignItems: "center" }}>
            <MdOutlineAccountCircle />
            <span style={{ paddingLeft: "5px" }}>{message.user}</span>
          </div>
          <span style={{ display: "flex" }}>{message.timestamp}</span>
        </div>
      </Row>
      <Row className="comment-content">{message.message}</Row>
      <div className="comment-actions">
        <HiOutlineMenu style={{ display: "inline" }} />
        <CommentAnswer message={message} func={setResponse} />
        <div className="p-2">
          <BsArrowDownSquare />
          <span>{" " + 22 + " "}</span>
          <BsArrowUpSquare />
        </div>
        <div>
            <MdOutlineDeleteOutline/>
        </div>
      </div>
    </div>
      
      {message.comments.length > 0 ? 
        message.comments.map((message, i)=>(
          <div style={{maxWidth: '300px', display: 'flex', flexDirection: 'column', marginLeft:'29px'}}key={i}>



          <div className="comment-container">
          <Row>
            <div className="comment-header px-2">
              <div style={{ display: "flex", alignItems: "center" }}>
                <MdOutlineAccountCircle />
                <span style={{ paddingLeft: "5px" }}>{message.user}</span>
              </div>
              <span style={{ display: "flex" }}>{message.timestamp}</span>
            </div>
          </Row>
          <Row className="comment-content">{message.message}</Row>
          <div className="comment-actions">
            <HiOutlineMenu style={{ display: "inline" }} />
            <CommentAnswer message={message} func={setResponse} />
            <div className="p-2">
              <BsArrowDownSquare />
              <span>{" " + 22 + " "}</span>
              <BsArrowUpSquare />
            </div>
            <div>
                <MdOutlineDeleteOutline/>
            </div>
          </div>
        </div>
        </div>
        ))
      :
      null
      }
      </>

  );
}
