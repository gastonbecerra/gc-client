import { createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'; 

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: false,
        username: 'pepe',
        auth: false,
        type: ''
    },
    reducers: {
        getUser : (state, action) =>{
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.type = action.payload.type;
            state.auth = action.payload.id ? true : false;
        }
    }
})

export const { getUser } = userSlice.actions;

export default userSlice.reducer;

export const fetchUser = () => (dispatch) => {
    Axios({
        method: "GET",
        withCredentials: true,
        url: "/user",
    }).then((res) => {
        dispatch(getUser(res.data))
    }).catch((error)=> console.log(error))
}