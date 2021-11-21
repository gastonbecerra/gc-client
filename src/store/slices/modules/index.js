import { createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'; 

export const moduleSlice = createSlice({
    name: 'modulo',
    initialState: {
        modules: [],
        undefined: true
    },
    reducers : {
        setModules : (state, action) => {
            state.modules = action.payload; 
        }
    }
})

export const { setModules } = moduleSlice.actions;

export default moduleSlice.reducer;

export const saveModules = (response) => (dispatch) => {
    dispatch(setModules(response))
}