import { createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';

export const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        chart_comments: false,
        context_comments: false
    },
    reducers : {
        setChartComments : ( state, action ) => {
            state.chart_comments = action.payload;
        }
    }

})

export const { setChartComments } = commentSlice.actions;

export default commentSlice.reducer;

export const fetchChartComments = () => (dispatch) => {
    Axios.get(`/comments/chart`)
    .then((response)=>{
        dispatch(setChartComments(response.data))
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
        console.log(e)
      })
}