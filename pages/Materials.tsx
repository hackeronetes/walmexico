import React, { useState } from 'react'
import MultiStep from '../components/common/multistep/MultiStep'
import {Material1} from '../components/forms/Material1'
import {Material2} from '../components/forms/Material2'
import {MainTitle} from '../components/common/Titles'
import {TextP} from '../components/common/TextP'
import { postMaterialsForm } from '../services/supplier/supplierService'
import PopupContentCustom from '../components/popups/PopupContentCustom'
import {POPUP_TYPE_SUCCESS, POPUP_TYPE_ERROR} from '../resources/project-constants'
import PopupModel from '../components/popups/PopupModel'
import { useNavigate } from "react-router-dom";
import { getUploadedMaterials1Files, getUploadedMaterials2Files } from '../../src/store/fileUploadReducer';
import {useAppSelector} from '../../src/store/hooks';
import axios from 'axios';
import { uploadFilesMaterial as uploadFilesTrenos } from '../resources/api-constants';
import { useAppDispatch } from '../../src/store/hooks';
import { setLoader } from '../store/loaderReducer'



export const Materials: React.FC = () => {
    const dispatch = useAppDispatch();
    const materials1UploadedFiles = useAppSelector(getUploadedMaterials1Files);
    const materials2UploadedFiles = useAppSelector(getUploadedMaterials2Files);

    const [formValues1, setFormValues1] = useState<any>({})
    const [formValues2, setFormValues2] = useState<any>({})
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [popupType, setPopupType] = useState<any>('')

    const navigate = useNavigate();

    const saveFormValues1 = (formValues:any) => {
        setFormValues1(formValues)
    }

    function openModel(type:any){
        setPopupType(type)
        setIsOpen(true)
       
    }

    
    const uploadFiles = async(filesParam: any, uploadToken: any)=>{
        dispatch(setLoader(true));
        if(filesParam && filesParam.length){
            const formData = new FormData();
            formData.append('uploadToken', uploadToken);
            // formData.append('requestRecordId', reqRecordId);
            for(let i = 0; i< filesParam.length; i++){
                formData.append('files', filesParam[i]);
            }
            try {
                await axios.post(uploadFilesTrenos(), formData);
                dispatch(setLoader(false));

            } catch (error) {
                console.log('error while uploading files from local commercial2 is: ', error);
                openModel(POPUP_TYPE_ERROR);
            }
        }
    }
    
    const postFormData = (allFormValues: any) => {
        dispatch(setLoader(true));
        postMaterialsForm(allFormValues).then((res:any) => {
            if(res && res.data){
                Promise.all([
                    uploadFiles(materials1UploadedFiles, res.data.uploadToken),
                    uploadFiles(materials2UploadedFiles, res.data.uploadToken)
                ])
                .then(([...uploadValues])=>{
                    console.log(uploadValues);
                    openModel(POPUP_TYPE_SUCCESS);
                    dispatch(setLoader(false));
                })
            };
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            console.log('getStateList error', error)
            openModel(POPUP_TYPE_ERROR);
            dispatch(setLoader(false));
        })
    }

    const mergerFormValues = (formData2: any) => {
        

        let finalFormValues = {
            ...formValues1,
            ...formData2
           
        };
        
        postFormData(finalFormValues)
    }

    const submitForm = (formValuesData3:any) => {
        setFormValues2(formValuesData3)
        mergerFormValues(formValuesData3)

    }

    const saveFormValues2 = (formValues:any) => {
        setFormValues2(formValues)
        
        
    }

    

    function handleModelClose(){
        setIsOpen(false)
        dispatch(setLoader(false));
        navigate('/')
    }

    return (
        <div className='page-container'>
           
            <div className='container main-container'>
                <div className='page-content'>
                    <div className='desc-container'>
                        <div className="title-wrapper">
                            <MainTitle text={"Proveedores de Materiales para la Construcción"} />
                        </div>
                        <div className="page-desc-wrapper text-left">
                            <TextP >Antes de registrar su propuesta, es importante hacer de su conocimiento que en Bienes Raíces contamos con un proceso detallado de análisis y estudio de viabilidad, por lo que se entiende que su solicitud no será aceptada hasta cumplir con todos los procesos de autorización, anticorrupción y políticas internas de Walmart de México y Centroamérica.</TextP>
                        </div>
                        
                    </div>
                    <div className='multistep-container'>
                        <MultiStep numberSteps={2} activeStep={0} showNavigation={true} stepCustomStyle={{ width: '32%' }}>
                            <Material1  saveFormValues={saveFormValues1} formValues={formValues1} />
                            <Material2 saveFormValues={saveFormValues2} formValues={formValues2} submitForm={submitForm} />
                        </MultiStep>
                    </div>

                </div>
            </div>

            <PopupModel  isOpen={modalIsOpen} closePopup={handleModelClose} height='260px' width='30%'>
                <PopupContentCustom closePopup={handleModelClose} type={popupType} />
            </PopupModel>
            
        </div>
    )
  }
  