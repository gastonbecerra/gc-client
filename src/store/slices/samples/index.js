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

export const fetchSamples = (subscribedContexts, createdContexts) => (dispatch) => {
    var contexts = []; // stores names for all subscribed and created
    if(subscribedContexts || createdContexts){
        try{
            subscribedContexts && subscribedContexts.forEach(element => {
                contexts.push(element.context)
            });

            createdContexts && createdContexts.forEach(element => {
                contexts.push(element.context)
            });
            
            if (contexts )
            Axios({
                method: 'POST',
                url: `/samples/contexts/`,
                data: contexts
            })
            .then((data)=>{
                dispatch(setSamples(data.data))
            })
            .finally(()=>{
                console.info('samples setted');
            })           
        }catch(e){
            console.error("err accmumlating contextes")
        }
    }
}