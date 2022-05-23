import { createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'; 

export const indicatorSlice = createSlice({
    name: 'indicator',
    initialState: {
        indicators: false,
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
            if(action.payload.spread === true){
                state.inputs = [...state.inputs, action.payload.data[0]];    
            }else{
                state.inputs = action.payload;
            }
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

export const submitMissingInput = (body, missings, inputs, user, indicator) => (dispatch) => {
    
    
    Promise.all(body).then((body) => {
        
        switch (body[0].op) {
        case 'PUT':
            Axios({
                method: 'put',
                url: `/values/${body[0].id}`,
                data: body[0].data 
              })
              .then((res)=>{
                var queu_updated = body.filter(q => q.field !== body[0].field)
                dispatch(setRequiredRequest(queu_updated))
              })
              .then((res)=>{
                var updated_missings = missings.filter(q => q.field !== body[0].field)
                setMissingInputs(updated_missings)                  
              })
              .then((res)=>{
                if(missings.length === 0)  console.log(user, indicator.indicator)
                Axios({
                    method: 'POST',
                    withCredentials: true,
                    url: '/values/user_value',
                    data: {user: user, indicator: indicator.indicator}
                })
                .then((data)=>{
                    console.log(data.data[0])
                    dispatch(setUserValue(data.data))
                })
                
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
                var new_input = [{
                    required: false,
                    type:body[0].type,
                    validation:body[0].validation,
                    ux_input: body[0].ux_input,
                    var: body[0].field,
                    description: body[0].description,
                    measurement: body[0].measurement,
                    value: body[0].data.value,
                    user: body[0].data.user,
                    timestamp: body[0].data.timestamp
                }]
                dispatch(setInputs({spread: true, data: new_input}))
             })
              .then(()=>{                
                var queu_updated = body.filter(q => q.field !== body[0].field)
                dispatch(setRequiredRequest(queu_updated))
              })
              .then(()=>{        
                var updated_missings = missings.filter(q => q.var !== body[0].field)
                dispatch(setMissingInputs(updated_missings))
                return updated_missings;
              })
              .then((missings)=>{
                if(missings.length === 0) console.log(user, indicator.indicator)
                Axios({
                    method: 'POST',
                    withCredentials: true,
                    url: '/values/user_value',
                    data: {user: user, indicator: indicator.indicator}
                })
                .then((data)=>{
                    console.log(data.data[0])
                    dispatch(setUserValue(data.data))
                })
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


