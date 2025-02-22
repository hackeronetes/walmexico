import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export interface ExcessPropertyState {
    row: any
};

const initialState:ExcessPropertyState = {
    row: {}
};

export const excessPropSlice = createSlice({
    name: 'excessPropertyEdit',
    initialState,
    reducers:{
        setExcessPRopertyRow: (state, action: PayloadAction<any>)=>{
            state.row = action.payload
        }
    }
});

export const {setExcessPRopertyRow} = excessPropSlice.actions;

export const getExcessPropRow = (state: RootState) => state.excessProp.row;


export default excessPropSlice.reducer;