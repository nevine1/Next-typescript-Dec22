import {createSlice, nanoid,  createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from 'axios';



export const fetchPosts = createAsyncThunk('posts/fetchPosts',
    async (_, thankAPI) => {

        try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            return response.data;
           
            
         
        }catch(err){
            return err; 
        }
       
    });
    
     const initialState = {
        posts: [], //
        status: 'succeeded', //'idle' || ''loading' || 'succeeded' || 'failed'
        error: null
    } 
    
const postsSlice = createSlice({
    name: 'posts', 
    initialState, 
    reducers: {
        addPost: {
            reducer(state,action) {
                state.push(action.payload);
            }, 
            prepare( title, body, userId) {
                return{
                    payload:{
                        id: nanoid(), 
                        title,
                        body, 
                        userId,
                        
                    }
                }
            }
        }, 
        reactionAdded:(state, action) => {
            const {postId, reaction} = action.payload; 
            const existingPost = state.posts.find(post => postId == post.id); 
            if(existingPost) {
                existingPost.reactions[reaction]++; 
            }
        }
       
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) =>{
            state.status = 'loading';
        }, 
        [fetchPosts.fullfilled]: (state, action) =>{
            state.posts = action.payload; 
            state.status = 'succeeded'
        }, 
        [fetchPosts.rejected]: (state, action) =>{
            state.error = action.payload; 
            state.status = 'failed'
        }, 
            
    } 
});
 
export const {addPost, reactionAdded} = postsSlice.actions; 
export default postsSlice.reducer; 