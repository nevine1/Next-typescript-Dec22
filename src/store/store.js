import { configureStore ,  applyMiddleware } from "@reduxjs/toolkit";

import rootReducer from './rootReducer';

const store = configureStore({
    reducer: rootReducer,
    
    //applyMiddleware: [thunk],
    });

export default store; 