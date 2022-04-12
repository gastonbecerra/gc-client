import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText";
import { MdOutlineModeComment } from "react-icons/md";
import { postComment } from '../../../store/slices/comments';
import { useDispatch } from 'react-redux';

export default function CommentAnswer({ message, func, base_reference }) {
  const [answer, setAnswer] = useState(false);
  const [state, setState] = useState(message);
  const [value, setValue] = useState();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  // open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // close dialog
  const handleClose = () => {
    setOpen(false);
  };

  
  const handleChange = (e) => {
    try {
      if (value.length < 160) {
        setValue(e.target.value);
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  // handles answer data
  const handleValue = (e) => {
    e.preventDefault();
    if(value.length !== (false && undefined && '')){
      setAnswer({
        user: message.username,
        message: value,
        timestamp: Date.now(),
        level: 1,
        comments: [
  
        ],
        comment_reference: message.client_id,
        base_reference: base_reference
      });
    }
  };

  useEffect(()=>{
    answer.message !== (false && '') &&
      func(answer)
      setValue('')
      handleClose()
      dispatch(postComment(answer, base_reference, message.client_id ))
  },[answer])

  return (
    <>
      <MdOutlineModeComment onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Answer to {message.user}:</DialogTitle>
        <DialogContent>
          <DialogContentText>{message.message}</DialogContentText>
          <TextField
            autoFocus
            id="outlined-start-adornment"
            margin="dense"
            value={value}
            fullWidth
            multiline
            rows={4}
            variant="standard"
            onChange={(e) => handleChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            variant="outlined" 
            size="small"
            type="submit" 
            value="Submit" 
            onClick={(e) => handleValue(e)} 
            disabled={value == '' ? true : false} 
          >
            Submit answer
        </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
