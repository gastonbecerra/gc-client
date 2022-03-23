import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText";
import { MdOutlineModeComment } from "react-icons/md";

export default function CommentAnswer({ message, func }) {
  const [answer, setAnswer] = useState(false);
  const [state, setState] = useState(message);
  const [value, setValue] = useState();

  const [open, setOpen] = React.useState(false);

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
  const handleValue = () => {
    setAnswer({
      message: value,
      user: message.user,
      timestamp: Date.now(),
      level: 1,
      comment_reference: message.client_id
    });
  };

  useEffect(()=>{
    answer !== false &&
      func(answer)
      setValue('')
      handleClose()
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
          <Button onClick={() => handleValue()}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
