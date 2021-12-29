import { createSlice } from "@reduxjs/toolkit";

export const moduleSlice = createSlice({
    name: 'modulo',
    initialState: {
        modules: false,
        selectedModule: false
    },
    reducers : {
        setModules : (state, action) => {
            state.modules = action.payload; 
        },
        setModule : (state, action) => {
            state.selectedModule = action.payload; 
        }
    }
})

export const { setModules, setModule } = moduleSlice.actions;

export default moduleSlice.reducer;

export const saveModules = (response) => (dispatch) => {
    dispatch(setModules(response))
}

export const setSelectedModule = (data) => (dispatch) => {
    dispatch(setModule(data))
}