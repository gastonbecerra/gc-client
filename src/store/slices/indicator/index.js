import { createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'; 

export const indicatorSlice = createSlice({
    name: 'indicator',
    initialState: {
        indicator: {
            name: '',
            id: false,
            formula: '',
            description: '',
            module: '',
            type: '',
            documentation: ''
        },
        inputs:[],
        inputs_faltantes: false,
        context: [],
        user: {},
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
        postInput : (state, action) => {
            
        }
    }
})

export const { setSelectedIndicator,setMissingInputs, getIndicatorByUser, postInput, setInputs  } = indicatorSlice.actions;

export default indicatorSlice.reducer;

export const selectIndicator = (id, name) => (dispatch) => {
    dispatch(setSelectedIndicator({id, name}))
}

export const fetchIndicatorByUser = (indicator_id, context_id, user_id) => (dispatch) => {
    Axios.get(`/indicators/${indicator_id}/${context_id}/${user_id}`)
        .then((response)=>{            
            if(response.data.inputs){
                dispatch(setInputs(response.data.inputs.inputs));
                dispatch(setMissingInputs(response.data.inputs.inputs_faltantes));
            }
        })
}
