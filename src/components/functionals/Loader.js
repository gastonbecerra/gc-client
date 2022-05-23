import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from '../../store/slices/user';
import { fetchInputsByUser } from '../../store/slices/inputs';
import { fetchSubscribedContexts, fetchCreatedContexts, fetchOthersContexts } from '../../store/slices/context';
import { Link } from 'react-router-dom';
import { fetchSamples } from '../../store/slices/samples';
import { fecthComments } from '../../store/slices/comments';

export default function Loader() {
    const dispatch = useDispatch();
    const { username } = useSelector(state => state.user);
    const { inputs } = useSelector(state => state.inputs);
    const { subscribedContexts, createdContexts, otherContexts } = useSelector(state => state.context);
    const { samples } = useSelector(state => state.samples);
    const { comments } = useSelector(state => state.comments);
    const { indicators } = useSelector(state => state.indicator);

    useEffect(()=>{
        // if (username !== true) dispatch(fetchUser());

        if (username && !inputs){
            dispatch(fetchInputsByUser(username))
        }

        if(username && !subscribedContexts){
            dispatch(fetchSubscribedContexts(username));
        }

        if(username && !createdContexts){
            dispatch(fetchCreatedContexts(username));            
        }
    },[username])

    useEffect(()=>{
        if(!samples && (subscribedContexts || createdContexts)){
            dispatch(fetchSamples(subscribedContexts, createdContexts));            
        }

        if(username && !otherContexts && (subscribedContexts || createdContexts)){
            dispatch(fetchOthersContexts(subscribedContexts, createdContexts));
        }
    },[subscribedContexts, createdContexts])

    useEffect(()=>{
        if(!comments) dispatch(fecthComments(100))
    },[comments])

    useEffect(()=>{
        if(!indicators){
            console.log(45);
        }
    },[indicators])


  return (
    <>
        <div>Loader</div>
        <hr />
        <div>
            <h4>INPUTS</h4>
            <li>{inputs && "Inputs:" + inputs.length}</li>
        </div>
        <hr />
        <div>
        <h4>CONTEXTS</h4>
            <li>{subscribedContexts && "Subscribed: " + subscribedContexts.length}</li>
            <li>{createdContexts && "Created: " + createdContexts.length}</li>
            <li>{otherContexts && "Others: " + otherContexts.length}</li>
        </div>
        <div>
            <hr />
        <h4>SAMPLES</h4>
        <span>samples for created and subscribed contexts</span>
            <li>{samples && "Related :" + samples.length}</li>
        </div>
        <hr />
        <div>
        <h4>COMMENTS</h4>
        <span>comments</span>
            <li>{comments && "Qty :" + comments.length}</li>
        </div>
        <div></div>
        <div></div>
        <Link to="/test"><p style={{}}>lines</p></Link>
        <Link to="/distribution"><p style={{}}>distribution</p></Link>
        <Link to="/slider"><p style={{}}>slider</p></Link>
        <Link to="/slidermui"><p style={{}}>slider MUI</p></Link>
        <Link to="/tagger"><p style={{}}>Tagger</p></Link>
    </>
  )
}
