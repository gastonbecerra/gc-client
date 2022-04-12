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
import BaseCommentItem from "./baseCommentItem";

export default function CommentBase({ message, handleAnswer, idx, base_reference }) { 
    const [response, setResponse] = useState(false);
    const dispatch = useDispatch();
    const { username } = useSelector(state => state.user);

    useEffect(()=>{
      try{
        let obj = Object.assign({level: 1}, message);
        if(response !== false){
            obj.comments.push(response)            
            handleAnswer(obj, idx)
        }
      }catch(e){
        console.log({msge: 'failure setting response tree answers', e});
      }
    },[response])   

    const handleDeleting = (id, user_m, username) => {
      if(username === user_m ){
        dispatch(deleteComment(id))
      }
    }

  return (
      <>

      <BaseCommentItem 
        message={message} 
        base_reference={base_reference} 
        setResponse={setResponse} 
        handleDeleting={handleDeleting} 
        username={username}
      />
      
      {message.comments !== undefined ? 
        message.comments.map((message, i)=>(
          <div style={{maxWidth: '300px', display: 'flex', flexDirection: 'column', marginLeft:'29px'}}key={i}>
          <div className="comment-container my-1">
          <Row>
            <div className="comment-header px-2">
              <div style={{ display: "flex", alignItems: "center" }}>
                <MdOutlineAccountCircle />
                <span style={{ paddingLeft: "5px" }}>{message.user}</span>
              </div>
              <span style={{ display: "flex" }}>{message.timestamp}</span>
            </div>
          </Row>
          <Row className="comment-content">
            <Typography variant="body2">{message.message}</Typography>
          </Row>
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
