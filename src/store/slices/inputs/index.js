import { createSlice } from "@reduxjs/toolkit";
import Axios from 'axios';

export const inputSlice = createSlice({
    name: 'inputs',
    initialState: {
        inputs: false
    },
    reducers: {
        setInputs : (state, action) => {
            state.inputs = action.payload;
        }
    }
})

export const {setInputs} = inputSlice.actions;

export default inputSlice.reducer;

export const fetchInputs = (user_id) => dispatch => {
    
}