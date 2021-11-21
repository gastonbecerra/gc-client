import { createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'; 

export const contextSlice = createSlice({
    name: 'context',
    initialState: {
        contexts: false,
        selectedContext: false
    },
    reducers: {
        getContexts : (state, action) => {
            state.contexts = action.payload;
        },
        selectContext : (state, action) => {
            state.selectedContext = action.payload;
        }
    }
})

export const {getContexts, selectContext} = contextSlice.actions;

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