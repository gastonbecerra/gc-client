import { createSlice } from "@reduxjs/toolkit";

export const moduleSlice = createSlice({
    name: 'modulo',
    initialState: {
        modules: false,
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