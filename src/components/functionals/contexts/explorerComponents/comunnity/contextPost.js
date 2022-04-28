import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "../../context.scss";
import Button from '@mui/material/Button';
import { MdAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getSamples } from "../../../../../store/slices/samples";
import { postComment } from "../../../../../store/slices/comments";
import { ButtonBase, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from '@mui/material/DialogContentText';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { MdClose } from 'react-icons/md';
import { BsTextareaT } from 'react-icons/bs';
import { GrImage } from 'react-icons/gr';
import { IoVideocamOutline } from 'react-icons/io5';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { v4 as uuidv4 } from 'uuid';
import EventPost from "../../../events/types/EventPost";
import CardContent from "@mui/material/CardContent";
import '../../../contexts/context.scss';

export default function ContextPost({ context, posts }) {
  const [open, setOpen] = useState(false);
  const [openInner, setOpenInner] = useState(false);
  const dispatch = useDispatch();
  const { username } = useSelector(state => state.user);
  const [state, setState] = useState({
    title: '',
    author: username,
    description: '',
    media: 'text',
    timestamp: '',
    source: undefined,
    accesibility: 'closed',
    client_id : '',
  })
  const [choice, setChoice] = useState('text');
  const [source, setSource] = useState();
  const [checked, setChecked] = useState('closed');
  const [urlError, setUrlError] = useState();

  // STATE Functions
  const handleSource = (value) => {    
    if(isURL(value)){
      setUrlError(true)
      setSource(value);
    }else{
      setUrlError(false)
    }
    console.log(86, urlError)
  };

  const isURL = (str) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return (!!pattern.test(str));
  };

  const submitInnerValue = () => {
    setOpenInner(false);    
    if(isURL(source)){
      setState({
        ...state,
        source: source
      });
    }    
  };

  const handleValue = (evt) => {
    const value =
      evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const submitPost = () => {
    var flag = (Object.values(state).every((v) => v !== false));
    console.log(flag);
    if(flag){
      var body = {
        message :{
          user: username,
          client_id: uuidv4(),
          message: state.title,
          timestamp: Date.now(),
          level: 0,
          comments: [
            state.description
          ],
          type: state.media,
      },
        base_reference: {
          entity: 'post',
          context: context.context,
          source: state.source,
          accesibility: state.accesibility,
        },
        comment_reference: false,        
      }
      dispatch(postComment(body.message, body.base_reference, body.comment_reference));
      handleInnerClose(true);
    }
  }    

  const handleChecked = (e) => {
    setChecked(e.target.name)
    setState({
      ...state,
      accesibility: e.target.name,
    });
  }

  // UI Functions => close and open inners dialogs
  const handleChoice = (op) => {
    op !== 'text' && setOpenInner(true);
    op !== choice && setChoice(op);
    setState({
      ...state,
      media: op,
      source: op === 'text' && undefined
    });
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleInnerClose = (post) => {
    setOpenInner(false);
    // if(post){
    //   setState({

    //   })
    // }
  };
  
  //State login
  useEffect(()=>{    
    console.log(state, source)
  },[state, source])

  return (
    <CardContent>
      {/* add a new context post */}
      
      <div
        style={{
          display: "flex",          
          alignItems: "center",                                    
          justifyContent: 'center',          
        }}
        onClick={()=>setOpen(!open)}
      >        
        <MdAddCircleOutline style={{fontWeight:'700', fontSize: '17', color: '#1E90FF'}}/>
        <span> {' '} </span>
        <span >Add a new Context Post</span>
      </div>

      {/* list contexts posts */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}   
      >
      <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <MdClose />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Context Post
            </Typography>
          </Toolbar>
        </AppBar>
      
      <div className="context-explorer-element my-2"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          style={{
            width: '96%'
          }}
          id="title"
          name="title"
          label="Insert a catchy title"
          type="search"
          variant="filled"
          onChange={(e) => handleValue(e)}
        />
        
        <div
          style={{
            marginTop: '10px',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
        <TextField
          style={{
            marginTop: '10px',
            width: '96vw',
            display: state.media !== 'text' && 'none'   
          }}
          id="description"
          name="description"
          label="Dou you want to deep a litle bit?"
          multiline
          rows={6}
          type="search"
          variant="filled"          
          onChange={(e) => handleValue(e)}
        />

        {
          <>
          {state.media === 'image' && !state.source 
          ? 
          <div style={{              
              marginTop: '10px',
              width: '96vw',
              minHeight: '200px',
              backgroundColor: !state.source && 'lightgrey',                        
            }}>
          </div>            
          :
          (state.media === 'image' && state.source) &&
          <img 
            style={{
              display: (state.media !== 'image' || state.source === false ) && 'none',                   
              marginTop: '10px',
              width: '96vw',
              minHeight: '200px',
            }}
            src={ state.source }
          />
          }            
          </>
        }

        {
          <>
          {state.media === 'video' && !state.source 
          ? 
          <div style={{              
              marginTop: '10px',
              width: '96vw',
              minHeight: '200px',
              backgroundColor: !state.source && 'lightgrey',                        
            }}>
          </div>            
          :
          (state.media === 'video' && state.source) &&
          <video 
            style={{
              display: (state.media !== 'video' || state.source === false ) && 'none',                   
              marginTop: '10px',
              width: '96vw',
              minHeight: '200px',
            }}
            src={ state.source }
          />
          }            
          </>
        }

        {/* <Typography variant="subtitle2">Choose post type</Typography> */}
        <div className="media-options-container">          
            <div 
              className={state.media !== 'text' ? "media-choice" : "media-choice-active"}
              onClick={()=> handleChoice('text')}
            >
              <BsTextareaT style={{fontSize:'24px'}}/>
              <span>Text</span>
            </div>
            <div 
              className={state.media !== 'image' ? "media-choice" : "media-choice-active"}
              onClick={()=> handleChoice('image')}
            >
              <GrImage style={{fontSize:'24px'}}/>
              <span>Image</span>
            </div>
            <div 
              className={state.media !== 'video' ? "media-choice" : "media-choice-active"}
              onClick={()=> handleChoice('video')}
            >
              <IoVideocamOutline style={{fontSize: '24px'}}/>
              <span>Video</span>
            </div>          
        </div>

        <Dialog 
                open={openInner}
                onClose={handleInnerClose}   
              >
              <DialogTitle> {state.media} Link Source</DialogTitle>
              <DialogContent>
                <DialogContentText>                
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="src"
                  name="src"
                  onChange={(e) => handleSource(e.target.value)}
                  label="www.media.com"
                  type="text"
                  fullWidth
                  variant="standard"
                  style={{fontStyle: 'italic'}}
                />
                {!urlError && <Typography variant="caption" style={{color: 'tomato'}}>Enter a valid url</Typography>}
              </DialogContent>
              <DialogActions>
                <Button onClick={()=> submitInnerValue(false)}>Submit</Button>                
                <Button onClick={()=> handleInnerClose(false)}>Cancel</Button>                
              </DialogActions>
            </Dialog>
            
            <div style={{
              margin: '20px',
              display: 'flex',
              justifyContent: 'center'
            }}> 
            
            <FormControl>
              <div stlye={{display: 'flex', alignItems: 'flex-start'}}>
                <Typography variant="h6" id="demo-row-radio-buttons-group-label">Accesibility</Typography>
              </div>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleChecked}
              >
                <FormControlLabel checked={checked === 'closed'} name="closed" value="subscribers-scoped" control={<Radio />}  labelPlacement="bottom" label="subs-scopped" />                
                <FormControlLabel checked={checked === 'open'} name="open" value="all" control={<Radio />}  labelPlacement="bottom" label="all" />              
              </RadioGroup>
            </FormControl>
            </div>

            <Button 
              variant="outlined"
              style={{

              }}
              onClick={()=>submitPost()}
            >
              Submit POST
            </Button>


        </div>
      </div>    
      </Dialog>

      {posts ?
        posts.map((p,i)=>(
          <EventPost key={i} event={p}/>
        ))
      :      
      null 
      }
    </CardContent>
  );
}
