import { createSlice } from "@reduxjs/toolkit";
import Axios from 'axios';

export const inputSlice = createSlice({
    name: 'inputs',
    initialState: {
        inputs: false,
        queu: []
    },
    reducers: {
        setInputs : (state, action) => {
            state.inputs = action.payload;
        },
        setRequest : (state, action) => {
            state.queu = action.payload;
        },
    }
})

export const {setInputs, setRequest } = inputSlice.actions;

export default inputSlice.reducer;

export const fetchInputsByUser = (user_id) => (dispatch) => {
    Axios.get(`/vars/${user_id}`)
    .then((response)=>{
        dispatch(setInputs(response.data))
    })
    .catch((error)=>{
        console.log(error)
        return false;
    })
}

export const setInputRequest = (data) => (dispatch) => {
    dispatch(setRequest(data))
}

export const submitInput = (body) => (dispatch) => {
    
    Promise.all(body).then((body) => {        
    
        switch (body[0].op) {
        case 'PUT':
            Axios({
                method: 'put',
                url: `/values/${body[0].id}`,
                data: body[0].data 
              })
              .then((res)=>{
                  var queu_updated = body.filter(q => q.field !== body[0].field )
                  dispatch(setRequest(queu_updated))
              })
              .catch((error) => {
                  return false;
              })
            break;
        
        case 'POST':
            Axios({
                method: 'post',
                url: '/values',
                data: body[0].data        
              })
              .then((res)=>{
                var queu_updated = body.filter(q => q.field !== body[0].field )
                dispatch(setRequest(queu_updated))                
              })
              .catch((error)=>{
                  console.log(error)
              })
        
            break;
    
        default:
            break;
    } 
    });
}

