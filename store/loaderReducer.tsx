import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export interface LoaderState {
    isLoader: boolean
};

const initialState:LoaderState = {
    isLoader: false
};

export const LoaderSlice = createSlice({
    name: 'mainPageLoader',
    initialState,
    reducers:{
        setLoader: (state, action: PayloadAction<any>)=>{
            state.isLoader = action.payload
        }
    }
});

export const {setLoader} = LoaderSlice.actions;

export const getLoader = (state: RootState) => state.loader.isLoader;


export default LoaderSlice.reducer;