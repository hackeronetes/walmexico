import React, { useState } from 'react'
import MultiStep from '../components/common/multistep/MultiStep'
import {TerranoStep1} from '../components/forms/TerranoStep1'
import {TerranoStep2} from '../components/forms/TerranoStep2'
import {TerranoStep3} from '../components/forms/TerranoStep3'
import {MainTitle} from '../components/common/Titles'
import {TextP} from '../components/common/TextP'
import { postOfferLandForm } from '../services/localCommercial/localCommercialService'
import PopupContentCustom from '../components/popups/PopupContentCustom'
import {POPUP_TYPE_SUCCESS, POPUP_TYPE_ERROR} from '../resources/project-constants'
import PopupModel from '../components/popups/PopupModel'
import { useNavigate } from "react-router-dom";
import { getUploadedFiles } from '../../src/store/fileUploadReducer';
import {useAppSelector} from '../../src/store/hooks';
import axios from 'axios';
import { formatPriceNumber } from './../utility/commonFunctions';
import { uploadFilesOfferUsLand } from '../resources/api-constants';
import { useAppDispatch } from '../../src/store/hooks';
import { setLoader } from '../store/loaderReducer'


export const Terreno: React.FC = () => {
    const uploadedFiles = useAppSelector(getUploadedFiles);
    const dispatch = useAppDispatch();

    const [formValues1, setFormValues1] = useState<any>({})
    const [formValues2, setFormValues2] = useState<any>({})
    const [formValues3, setFormValues3] = useState<any>({})
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [popupType, setPopupType] = useState<any>('')

    const navigate = useNavigate();

    const saveFormValues1 = (formValues:any) => {
        setFormValues1(formValues)
    }
    const saveFormValues2 = (formValues:any) => {
        setFormValues2(formValues)
    }

    function openModel(type:any){
        setPopupType(type)
        setIsOpen(true)
       
    }

    const uploadFiles = async(filesParam: any, uploadToken: any)=>{
        if(filesParam && filesParam.length){
            const formData = new FormData();
            formData.append('uploadToken', uploadToken);
            // formData.append('requestRecordId', reqRecordId);
            for(let i = 0; i< filesParam.length; i++){
                formData.append('files', filesParam[i]);
            }
            try {
                await axios.post(uploadFilesOfferUsLand(), formData);
                //dispatch(setLoader(false));
                //setIsOpen(true)
                dispatch(setLoader(false));
                openModel(POPUP_TYPE_SUCCESS);
            } catch (error) {
                console.log('error while uploading files from local commercial2 is: ', error);
                dispatch(setLoader(false));
                openModel(POPUP_TYPE_ERROR);
            }
        }
    }

    
    const postFormData = (allFormValues: any) => {
        dispatch(setLoader(true));
        allFormValues.price = formatPriceNumber(allFormValues.price)
        allFormValues.surface = formatPriceNumber(allFormValues.surface)
        postOfferLandForm(allFormValues).then((res:any) => {
            if(res && res.data)
                uploadFiles(uploadedFiles, res.data.uploadToken);

        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            console.log('getStateList error', error)
            dispatch(setLoader(false));
            openModel(POPUP_TYPE_ERROR);
        })
    }

    const mergerFormValues = (formData3: any) => {
        

        let finalFormValues = {
            ...formValues1,
            ...formValues2,
            ...formData3
        };
        
        postFormData(finalFormValues)
        
    }

    
    

    const submitForm = (formValuesData3:any) => {
        setFormValues3(formValuesData3)
        mergerFormValues(formValuesData3)

    }
    const saveFormValues3 = (formValues:any) => {
        setFormValues3(formValues)
       
    }

    

    function handleModelClose(){
        dispatch(setLoader(false));
        setIsOpen(false)
        navigate('/')
    }

    
    

    return (
        <div className='page-container'>
           
            <div className='container main-container'>
                <div className='page-content'>
                    <div className='desc-container'>
                        <div className="title-wrapper">
                            <MainTitle text={"Terrenos"} />
                        </div>
                        <div className="page-desc-wrapper">
                            <TextP >Antes de registrar su propuesta, es importante hacer de su conocimiento que en Bienes Raíces contamos con un proceso detallado de análisis y estudio de viabilidad, por lo que se entiende que su solicitud no será aceptada hasta cumplir con todos los procesos de autorización, anticorrupción y políticas internas de Walmart de México y Centroamérica.</TextP>
                        </div>

                        
                    </div>
                    <div className='multistep-container'>
                        <MultiStep numberSteps={3} activeStep={0} showNavigation={true} stepCustomStyle={{ width: '32%' }}>
                            <TerranoStep1  saveFormValues={saveFormValues1} formValues={formValues1} />
                            <TerranoStep2  saveFormValues={saveFormValues2} formValues={formValues2} />
                            <TerranoStep3  saveFormValues={saveFormValues3} formValues={formValues3} submitForm={submitForm} />
                        </MultiStep>
                    </div>

                </div>
            </div>

            <PopupModel  isOpen={modalIsOpen} closePopup={handleModelClose} height='260px' width='30%'>
                <PopupContentCustom closePopup={handleModelClose} type={popupType}/>
            </PopupModel>
            
        </div>
    )
  }
  