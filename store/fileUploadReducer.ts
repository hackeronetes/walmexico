import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export interface FileState {
  uploadedFiles: any[],
  CommercialStep2Files: any[],
  CommercialStep3Files: any[],
  constructionOneFiles: any[],
  constructionTwoFiles: any[],
  constructionThreeFiles: any[],
  materialsOneFiles: any[],
  materialsTwoFiles: any[],
}


const initialState: FileState = {
    uploadedFiles: [],
    CommercialStep2Files: [],
    CommercialStep3Files: [],
    constructionOneFiles: [],
    constructionTwoFiles: [],
    constructionThreeFiles: [],
    materialsOneFiles: [],
    materialsTwoFiles: [],
};


export const fileSlice = createSlice({
  name: 'fileUpload',
  initialState,
  reducers: {
    setUploadFiles: (state, action: PayloadAction<any>)=>{
      state.uploadedFiles = action.payload
    },
    setUploadFilesComercial2: (state, action: PayloadAction<any>)=>{
      state.CommercialStep2Files = action.payload
    },
    setUploadFilesComercial3: (state, action: PayloadAction<any>)=>{
      state.CommercialStep3Files = action.payload
    }
    ,
    setUploadFilesConstructionOne: (state, action: PayloadAction<any>)=>{
      state.constructionOneFiles = action.payload
    }
    ,
    setUploadFilesConstructionTwo: (state, action: PayloadAction<any>)=>{
      state.constructionTwoFiles = action.payload
    }
    ,
    setUploadFilesConstructionThree: (state, action: PayloadAction<any>)=>{
      state.constructionThreeFiles = action.payload
    },
    setUploadFilesMaterialsOne: (state, action: PayloadAction<any>)=>{
      state.materialsOneFiles = action.payload
    }
    ,
    setUploadFilesMaterialsTwo: (state, action: PayloadAction<any>)=>{
      state.materialsTwoFiles = action.payload
    }
  }
});

export const { setUploadFiles, setUploadFilesComercial2, setUploadFilesComercial3, setUploadFilesConstructionOne, setUploadFilesConstructionTwo, setUploadFilesConstructionThree, setUploadFilesMaterialsOne, setUploadFilesMaterialsTwo } = fileSlice.actions;

export const getUploadedFiles = (state: RootState) => state.fileUpload.uploadedFiles;

export const getUploadedCommercialStep2Files = (state: RootState) => state.fileUpload.CommercialStep2Files;

export const getUploadedCommercialStep3Files = (state: RootState) => state.fileUpload.CommercialStep3Files;

export const getUploadedConstruction1Files = (state: RootState) => state.fileUpload.constructionOneFiles;

export const getUploadedConstruction2Files = (state: RootState) => state.fileUpload.constructionTwoFiles;

export const getUploadedConstruction3Files = (state: RootState) => state.fileUpload.constructionThreeFiles;

export const getUploadedMaterials1Files = (state: RootState) => state.fileUpload.materialsOneFiles;

export const getUploadedMaterials2Files = (state: RootState) => state.fileUpload.materialsTwoFiles;


export default fileSlice.reducer;
