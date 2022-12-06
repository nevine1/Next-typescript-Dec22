import {createSlice} from '@reduxjs/toolkit'


const authSlice = createSlice({
    name: 'auth', 
    initialState:{name: 'Nevine Samaan' , isLoggedIn: false},
    reducers:{
        LogInOut: (state, action) => {
            state.isLoggedIn = !state.isLoggedIn; 
        }, 
        
    }
});

export const {LogInOut} = authSlice.actions; 
export default authSlice.reducer; 