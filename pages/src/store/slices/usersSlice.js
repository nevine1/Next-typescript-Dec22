import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';


const initialState = [
    { id: '0', name: 'Dude Lebowski' },
    { id: '1', name: 'Neil Young' },
    { id: '2', name: 'Dave Gray' }
]

 export const fetchUsers = createAsyncThunk('users/fetchUsers', 
 async() => {
        try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/users'); 
            return [...response.data];
        }catch(err){
            return err; 
        }
    })
const usersSlice = createSlice({
    name: 'users', 
    initialState,
    reducers: {},
    extraReducers:(build) =>{
        build.addCase(fetchUsers.fulfilled, (state, action) =>{
            return action.payload;
        })
    }
});


export default  usersSlice.reducer; 