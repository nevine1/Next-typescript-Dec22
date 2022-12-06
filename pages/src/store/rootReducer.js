import { combineReducers } from '@reduxjs/toolkit';
import postsReducer from '../../src/store/slices/postsSlice';
import usersReducer from '../../src/store/slices/usersSlice';
import authReducer from '../../src/store/slices/authSlice'
import booksReducer from '../../src/store/slices/booksSlice'
import todosReducer from '../../src/store/slices/todosSlice'



 const rootReducer = combineReducers({
    posts: postsReducer, 
    users: usersReducer,
    books: booksReducer,
    auth: authReducer,
    todos: todosReducer,
   
})

export default rootReducer; 