import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    data: [], 
    isLoading: false, 
    error: null, 
}
const roomsSlice = createSlice({
    name: 'rooms', 
    initialState:{}, 
    reducers:{
        getData: (state, action) =>  {
            state.data.fields = action.payload.fields; 
            console.log(state.data.fields);
        }
    }
})

export const {getData} = roomsSlice.actions; 
export default roomsSlice.reducer; 