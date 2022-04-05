import React, {useState, useEffect} from "react";
import "./messaging.scss";
import { BsArrowUpSquare, BsArrowDownSquare } from "react-icons/bs";
import { Row } from "react-bootstrap";
import { MdOutlineAccountCircle, MdInput } from "react-icons/md";
import Typography from "@mui/material/Typography";
import { HiOutlineMenu } from "react-icons/hi";
import CommentAnswer from "./answerComment";
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { deleteComment } from '../../../store/slices/comments';
import { useDispatch, useSelector } from 'react-redux';

export default function BaseCommentItem({message, base_reference, setResponse, handleDeleting, username}) {
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
      <div className="comment-content">{message.message}</div>
      <div className="comment-actions">
        <HiOutlineMenu style={{ display: "inline" }} />
        
        <CommentAnswer message={message} func={setResponse} base_reference={base_reference} />
        
        <div className="p-2">
          <BsArrowDownSquare />
          <span>{" " + 22 + " "}</span>
          <BsArrowUpSquare />
        </div>
        <div>
            <MdOutlineDeleteOutline onClick={(e)=>{handleDeleting(message._id, message.user, username)}}/>
        </div>
      </div>
    </div>
    </>
  )
}
