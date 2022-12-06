import { CardActionArea } from '@mui/material';
import {createSlice, nanoid } from '@reduxjs/toolkit'
import {createAsyncThunk} from '@reduxjs/toolkit';


export const getBooks = createAsyncThunk('books/getBooks',
     async (_, thunkAPI) => { // _ it is any argument and  could be the payload will send to the action
    const {rejectWithValue} = thunkAPI
    try{
        //there are 3 actions created out of the slice , so we should use extraReducers
        //what happen at extraReducers actions 
        //1- before the fetching books , it dispatch for action called pending and the type called getBooks
        //and its payload is undefined (dispatch{type: books/getBooks/pending, payload:undefined}) 
        const response = await fetch('http://localhost:8000/books');
        const data = await response.json();
        return data;
    
        // 2 - after connecting to the server and it succeeded to get the data from the server, and returns the data
        // dispatch({type: 'books/getBooks/fulfilled', payload: data}), payload is the data returned from the server
        }catch(err){
            // 3- if it can not connect to the server , so it will return error
            // dispatch({type:'books/getBooks/rejected', payload:error}) 
            return rejectWithValue(err.message); 
        } 
    });

    export const insertBook = createAsyncThunk(
        'book/insertBook',
        async (bookData, thunkAPI) => {
          const { rejectWithValue , getState} = thunkAPI;
         
      
          try {
            //bookData.username = getState().auth.name; // to get the username 
            const res = await fetch('http://localhost:8000/books', {
              method: 'POST',
              body: JSON.stringify(bookData),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            });
            const data = await res.json();
            return data;
          } catch (error) {
            return rejectWithValue(error.message);
          }
        }
      );

    export const deleteBook = createAsyncThunk('books/deleteBook', 
        async (id, thunkAPI) => {
          
          
          try{
            const res = await fetch('http://localhost:8000/books/${id}', {
              method: 'DElETE',
              
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            });
            return id;
            //console.log(res);
          } catch (error) {
            return rejectWithValue(error.message);
          }
        }
      );

      export const getBook = createAsyncThunk('books/deleteBook', 
        async (item, thunkAPI) => {
          
          
          try{
            const res = await fetch('http://localhost:8000/books/${item.id}', {
              method: 'GET',
              
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            });
            return item;
            //console.log(res);
          } catch (error) {
            return rejectWithValue(error.message);
          }
        }
      );

const booksSlice = createSlice({
    name: 'books', //
    initialState: {
        books: [], isLoading: false, error: null , bookInfo: null
        },
    reducers: {
        addingNewBook:  {
            reducer: (state, action) =>{
                state.books.push(action.paylod);
            }, 
            prepare (title, description, price) {
                return{
                    payload:{
                        id: nanoid(), 
                        title,
                        description, 
                        price,
                        
                    }
            }
        },
    },
    deleteBooking: (state, action) => {
      const existingBook  = state.books.find((book) => book.id === action.payload);
      if(existingBook){
        return state.books.filter((book) => book.id !== action.payload);
      }
      return state.books.filter((boo))
    }
},
    extraReducers: {
        [getBooks.pending]: (state, action) => {
          state.isLoading = true; 
          state.error = null;  
         
        },
        [getBooks.fulfilled]: (state, action) => {
            state.books = action.payload; 
            state.isLoading = false; 
            
        },
        [getBooks.rejected]: (state, action) => {
            state.isLoading = false; 
            state.error = action.payload
        },
        //Insert new Book 
        [insertBook.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
          },
          [insertBook.fulfilled]: (state, action) => {
            state.books.push(action.payload);
            state.isLoading = false;
          },
          [insertBook.rejected]: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
          },

          //delete new Book 
        [deleteBook.pending]: (state, action) => {
          state.isLoading = true;
          state.error = null;
        },
        [deleteBook.fulfilled]: (state, action) => {
          state.isLoading = false;
         // console.log(CardActionArea);
          state.books = state.books.filter((book) => book.id !== action.payload.id)
         
        },
        [deleteBook.rejected]: (state, action) => {
          state.error = action.payload;
          state.isLoading = false;
        },
        //getting book info 
        [getBook.fulfilled]: (state, action) => {
          state.isLoading = false;
          state.bookInfo = action.payload;
         
        },
        
          
    },


});

export const {addingNewBook, deleteBooking} = booksSlice.actions
export default booksSlice.reducer;