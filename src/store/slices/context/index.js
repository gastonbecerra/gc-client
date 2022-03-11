import { createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'; 

export const contextSlice = createSlice({
    name: 'context',
    initialState: {
        contexts: false,
        selectedContext: false,
        context4user: false,
        contextCreated: false,
        contextScope: false
    },
    reducers: {
        getContexts : (state, action) => {
            state.contexts = action.payload;
        },
        selectContext : (state, action) => {
            state.selectedContext = action.payload;
        },
        getContexts4User : (state, action) => {
            state.context4user = action.payload;
        },
        setContextCreated : (state, action) => {
            state.contextCreated = action.payload;
        },
        setContextScope : (state, action) => {
            state.contextScope = action.payload;
        },
    }
})

export const {getContexts, selectContext, getContexts4User, setContextCreated} = contextSlice.actions;

export default contextSlice.reducer;

export const fetchContexts = () => (dispatch) => {
    Axios({
        method: 'GET',
        withCredentials: true,
        url: '/contexts'
    })
    .then((res)=>{
        dispatch(getContexts(res.data));
    })
    .catch((error)=>{
        console.log(error, ' error fetching contexts');
    })
}

export const pickContext = (picked) => (dispatch) => {
    dispatch(selectContext(picked))
}

export const fetchContexts4User = (id) => (dispatch) => {
    Axios({
        method: 'GET',
        withCredentials: true,
        url: `/contexts/${id}`
    })
    .then((res)=>{
        dispatch(getContexts4User(res.data));
    })
    .catch((error)=>{
        console.log(error, ' error fetching contexts');
    })
}

export const removeContexts4User = (id, context) => (dispatch) => {
    Axios({
        method: 'POST',
        withCredentials: true,
        url: `/contexts/remove/${id}/${context}`
    })
    .then((res)=>{
        fetchContexts4User(id);
    })
    .catch((error)=>{
        console.log(error, ' error removing contexts');
    })
}

export const addContexts4User = (id, context) => (dispatch) => {
    Axios({
        method: 'POST',
        withCredentials: true,
        url: `/contexts/add/${id}/${context}`
    })
    .then((res)=>{
        fetchContexts4User(id);
    })
    .catch((error)=>{
        console.log(error, ' error removing contexts');
    })
}

export const setCreatedContext = ({data}) => (dispatch) => {
    dispatch(setContextCreated(data))
}

