import { createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'; 

export const contextSlice = createSlice({
    name: 'context',
    initialState: {
        subscribedContexts: false,
        createdContexts: false,
        scopedContexts: false,
        otherContexts: false,
        selectedContext: false,
    },
    reducers: {
        setSubscribedContext : (state, action) => {
            state.subscribedContexts = action.payload;
        },
        setCreatedContexts : (state, action) => {
            state.createdContexts = action.payload;
        },
        setScopedContexts : (state, action) => {
            state.scopedContexts = action.payload;
        },
        setOtherContexts : (state, action) => {
            state.otherContexts = action.payload;
        },
        selectContext : (state, action) => {
            state.selectedContext = action.payload;
        },
        setContextScope : (state, action) => {
            state.contextScope = action.payload;
        },
    }
})

export const {setOtherContexts, selectContext, setSubscribedContext, setCreatedContexts, setScopedContexts} = contextSlice.actions;

export default contextSlice.reducer;

export const fetchSubscribedContexts = (id) => (dispatch) => {
    Axios({
        method: 'GET',
        withCredentials: true,
        url: `/contexts/subscribed/${id}`
    })
    .then((res)=>{
        dispatch(setSubscribedContext(res.data));
    })
    .catch((error)=>{
        console.error(error, ' error fetching contexts');
    })
}

export const fetchCreatedContexts = (id) => (dispatch) => {
    Axios({
        method: 'GET',
        withCredentials: true,
        url: `/contexts/created/${id}`
    })
    .then((res)=>{
        dispatch(setCreatedContexts(res.data));
    })
    .catch((error)=>{
        console.log(error, ' error fetching contexts');
    })
}

export const fetchScopedContexts = (id) => (dispatch) => {
    Axios({
        method: 'GET',
        withCredentials: true,
        url: `/contexts/scoped/${id}`
    })
    .then((res)=>{
        dispatch(setCreatedContexts(res.data));
    })
    .catch((error)=>{
        console.log(error, ' error fetching contexts');
    })
}

export const fetchOthersContexts = (subscribedContexts, createdContexts) => (dispatch) => {
    var contexts = []; // stores names for all subscribed and created
    if(subscribedContexts || createdContexts){
        try{
            subscribedContexts && subscribedContexts.forEach(element => {
                contexts.push(element.context)
            });

            createdContexts && createdContexts.forEach(element => {
                contexts.push(element.context)
            });
            
            if (contexts)
            Axios({
                method: 'POST',
                url: `/contexts/otherscontexts`,
                data: contexts
            })
            .then((data)=>{
                dispatch(setOtherContexts(data.data))
            })
            .finally(()=>{
                console.info('others contexts setted');
            })           
        }catch(e){
            console.error("err accmumlating contextes")
        }
    }
}


export const pickContext = (picked) => (dispatch) => {
    dispatch(selectContext(picked))
}

// export const removeContexts4User = (id, context) => (dispatch) => {
//     Axios({
//         method: 'POST',
//         withCredentials: true,
//         url: `/contexts/remove/${id}/${context}`
//     })
//     .then((res)=>{
//         fetchContexts4User(id);
//     })
//     .catch((error)=>{
//         console.log(error, ' error removing contexts');
//     })
// }

// export const addContexts4User = (id, context) => (dispatch) => {
//     Axios({
//         method: 'POST',
//         withCredentials: true,
//         url: `/contexts/add/${id}/${context}`
//     })
//     .then((res)=>{
//         fetchContexts4User(id);
//     })
//     .catch((error)=>{
//         console.log(error, ' error removing contexts');
//     })
// }

// export const setCreatedContext = ({data}) => (dispatch) => {
//     dispatch(setContextCreated(data))
// }

