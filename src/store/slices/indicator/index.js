import { createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'; 

export const indicatorSlice = createSlice({
    name: 'indicator',
    initialState: {
        indicator: false,
        inputs: false,
        inputs_faltantes: false,
        sample: false,
        user_value: false,
        selectedIndicator: false
    },
    reducers: {
        setSelectedIndicator : (state, action) => {
            state.selectedIndicator = action.payload;
        },
        setMissingInputs : (state, action) => {
            state.inputs_faltantes = action.payload;
        },
        setInputs : (state, action) => {
            state.inputs = action.payload;
        },
        setIndicator : (state, action) => {
            state.indicator = action.payload;
        },
        setSample : (state, action) => {
            if(action.payload !== false){
                state.sample = action.payload[0]
            }else{
                state.sample = false;    
            }
        },
        setUserValue : (state, action) => {
            state.user_value = action.payload;
        }
    }
})

export const { setSelectedIndicator, setMissingInputs, getIndicatorByUser, postInput, setInputs, setIndicator, setSample, setUserValue  } = indicatorSlice.actions;

export default indicatorSlice.reducer;

export const selectIndicator = (id, name) => (dispatch) => {
    dispatch(setSelectedIndicator({id, name}))
}

export const fetchIndicatorByUser = (indicator_id, context_id, user_id) => (dispatch) => {
    Axios.get(`/indicators/${indicator_id}/${context_id}/${user_id}`)
        .then((response)=>{            
            if(response.data){
                dispatch(setInputs(response.data.inputs.inputs));
                dispatch(setMissingInputs(response.data.inputs.inputs_faltantes));
                dispatch(setIndicator(response.data.indicator))
                dispatch(setSample(response.data.context))
                dispatch(setUserValue(response.data.user.user))
            }
        })
}
