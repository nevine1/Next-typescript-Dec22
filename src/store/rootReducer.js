import { combineReducers } from '@reduxjs/toolkit';

import roomsReducer from './slices/roomsSlice'


 const rootReducer = combineReducers({
    rooms: roomsReducer,
   
})

export default rootReducer; 