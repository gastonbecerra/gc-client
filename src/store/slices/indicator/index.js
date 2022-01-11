import { createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'; 

export const indicatorSlice = createSlice({
    name: 'indicator',
    initialState: {
        inputs: false,
        missing_inputs: false,
        sample: false,
        user_value: false,
        selectedIndicator: false,
        missing_queu: []
    },
    reducers: {
        setSelectedIndicator : (state, action) => {
            state.selectedIndicator = action.payload;
        },
        setInputs : (state, action) => {
            state.inputs = action.payload;
        },
        setSample : (state, action) => {            
            state.sample = action.payload[0];
        },
        setUserValue : (state, action) => {
            state.user_value = action.payload[0];
        },
        setMissingInputs : (state, action) => {
            state.missing_inputs = action.payload;
        },
        setRequiredRequest : (state, action) => {
            state.missing_queu = action.payload;
        },
    }
})

export const { setSelectedIndicator, getIndicatorByUser, postInput, setInputs, setSample, setUserValue, setMissingInputs, setRequiredRequest } = indicatorSlice.actions;

export default indicatorSlice.reducer;

export const selectIndicator = (id, name) => (dispatch) => {
    dispatch(setSelectedIndicator({id, name}))
}

export const fetchIndicatorByUser = (indicator_id, context_id, user_id) => (dispatch) => {
    ![false, undefined, null].includes(indicator_id, context_id, user_id) &&
    Axios.get(`/indicators/${indicator_id}/${context_id}/${user_id}`)
        .then((response)=>{            
            
            dispatch(setSample(response.data.sample));
            dispatch(setUserValue(response.data.user_value));
            dispatch(setInputs(response.data.inputs_front));
            dispatch(setMissingInputs(response.data.missing_inputs));
            
        })
}

export const setMissingRequest = (data) => (dispatch) => {
    dispatch(setRequiredRequest(data))
}

export const submitMissingInput = (body, missings) => (dispatch) => {
    
    Promise.all(body).then((body) => {
        
        switch (body[0].op) {
        case 'PUT':
            console.log(body[0], body[0].data)
            Axios({
                method: 'put',
                url: `/values/${body[0].id}`,
                data: body[0].data 
              })
              .then(()=>{
                var queu_updated = missings.filter(q => q.field !== body[0].field)
                dispatch(setRequiredRequest(queu_updated))
              })
              .then(()=>{
                var updated_missings = missings.filter(q => q.field !== body[0].field)
                console.log(updated_missings);
                  
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
              .then(()=>{                
                var queu_updated = body.filter(q => q.field !== body[0].field)
                dispatch(setRequiredRequest(queu_updated))
              })
              .then(()=>{
                    console.log('data layer contact for user value');
                    var updated_missings = missings.filter(q => q.var !== body[0].field)
                    dispatch(setMissingInputs(updated_missings))
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

