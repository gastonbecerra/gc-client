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
            state.sample = action.payload[0];
        },
        setUserValue : (state, action) => {
            state.user_value = action.payload[0];
        }
    }
})

export const { setSelectedIndicator, setMissingInputs, getIndicatorByUser, postInput, setInputs, setIndicator, setSample, setUserValue  } = indicatorSlice.actions;

export default indicatorSlice.reducer;

export const selectIndicator = (id, name) => (dispatch) => {
    dispatch(setSelectedIndicator({id, name}))
}

export const fetchIndicatorByUser = (indicator_id, context_id, user_id) => (dispatch) => {
    Axios.get(`/inputs/full/${indicator_id}/${context_id}/${user_id}`)
        .then((response)=>{            
            if(response.data){
                dispatch(setInputs(response.data.user_data.inputs));
                dispatch(setMissingInputs(response.data.user_data.inputs_required));
                dispatch(setIndicator(response.data.indicator))
                dispatch(setSample(response.data.sample))
                dispatch(setUserValue(response.data.user_data.user_value))
            }
        })
}
