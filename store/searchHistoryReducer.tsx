import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export interface SearchHistoryState {
    user: any
};

const initialState:SearchHistoryState = {
    user: {}
};

export const SearchHistorySlice = createSlice({
    name: 'searchHistoryReducer',
    initialState,
    reducers:{
        setUser: (state, action: PayloadAction<any>)=>{
            state.user = action.payload
        }
    }
});

export const {setUser} = SearchHistorySlice.actions;

export const getsearchHistoryUser = (state: RootState) => state.searchHistory.user;


export default SearchHistorySlice.reducer;