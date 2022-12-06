
import {createSlice,   createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', 
async(_, thunkAPI) =>{

    const{getState} = thunkAPI; 
    console.log(getState());
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        return response.json();
       
    }catch(error){
        console.log(error)
    }
    }

);
const initialState = {
    todos: [], 
    status: 'isLoading', 
    error: null
}

const todosSlice  = createSlice({
    name: 'todos', //
    initialState, // initial state
    reducers: {}, 
    extraReducers:{
        [fetchTodos.pending]: (state, action) => {
            state.status  = 'isLoading';
            
        },
        [fetchTodos.pending]: (state, action) => {
            state.todos = action.payload; //
            state.status = 'success';
        },
        [fetchTodos.pending]: (state, action) => {
            state.error = action.payload; //
            state.status = 'failed';
        },
    },
});

export default todosSlice.reducer; 