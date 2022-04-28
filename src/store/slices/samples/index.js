import { createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'; 

export const samplesSlice = createSlice({
    name: 'samples',
    initialState : {
        samples: false
    },

    reducers : {
        setSamples : ( state, action ) => {
            state.samples = action.payload;
        }
    }
})

export const { setSamples } = samplesSlice.actions;

export default samplesSlice.reducer;

export const getSamples = (contexts) => (dispatch) => {
    try{
        Axios({
            method: 'GET',
            url: `/samples/samples-per-contexts/${contexts}`
        })
        .then((data)=>{
            console.log(data);
            dispatch(setSamples(data.data))
        })
        .finally(()=>{
            console.log('samples setted');
        })
    }catch(e){
        console.log({status: 'failed on fetching samples data', e});
    }    
}