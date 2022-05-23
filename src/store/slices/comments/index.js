import { createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';

export const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: false,
        chart_comments: false,
        context_comments: false,
    },
    reducers : {
        setComments : ( state, action ) => {
            state.comments = action.payload;
        },        
        setChartComments : ( state, action ) => {
            state.chart_comments = action.payload;
        },
        setContextComments : ( state, action ) => {
            state.context_comments = action.payload;
        }
    }

})

export const {setComments, setChartComments, setContextComments } = commentSlice.actions;

export default commentSlice.reducer;

export const fecthComments = (limit) => (dispatch) => {
    Axios.get(`/comments/${limit}`)
    .then((response)=>{   
        dispatch(setComments(response.data));
        dispatch(setChartComments(response.data.filter(com => com.base_reference.entity === 'chart')));
        dispatch(setContextComments(response.data.filter(com => com.base_reference.entity === 'post')));
    })
    .catch((e)=>{
        console.log('failure fetching comments for charts');
    })
}

export const postComment = (message, base_reference, comment_reference) => (dispatch) => {
    Axios({
        method: "POST",
        url: "/comments",
        withCredentials: true,
        data: {
          message,
          base_reference: base_reference,
          comment_reference: comment_reference ? comment_reference : false,
        },
      })
      .then(()=>{
          return true;
      })
      .catch((e)=>{
        console.log('error submiting context post')
      })
}

export const deleteComment = (client_id) => (dispatch) => {
    Axios({
        method: 'DELETE',
        url: `/comments/:${client_id}`,
        withCredentials: true
    })
    .then(()=>{
        console.log('msge succesfully deleted')
    })
    .catch((e)=>{
        console.log('error deleting mssge');
    })
}