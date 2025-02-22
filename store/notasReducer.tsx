import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export interface NotasState {
    rowDetails: any
};

const initialState:NotasState = {
    rowDetails: {}
};

export const NotasSlice = createSlice({
    name: 'notasReducer',
    initialState,
    reducers:{
        setNotasRow: (state, action: PayloadAction<any>)=>{
            state.rowDetails = action.payload
        }
    }
});

export const {setNotasRow} = NotasSlice.actions;

export const getNotasRow = (state: RootState) => state.notas.rowDetails;


export default NotasSlice.reducer;