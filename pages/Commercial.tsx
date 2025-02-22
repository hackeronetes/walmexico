import React, { useState, useEffect } from 'react'
import MultiStep from '../components/common/multistep/MultiStep'
import {CommercialStep1} from '../components/forms/CommercialStep1'
import {CommercialStep2} from '../components/forms/CommercialStep2'
import {CommercialStep3} from '../components/forms/CommercialStep3'
import {MainTitle} from '../components/common/Titles'
import {TextP} from '../components/common/TextP'
import { postRequestPremisesForm } from '../services/localCommercial/localCommercialService'
import PopupContentCustom from '../components/popups/PopupContentCustom'
import PopupModel from '../components/popups/PopupModel'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import {POPUP_TYPE_SUCCESS, POPUP_TYPE_ERROR} from '../resources/project-constants'
import { getUploadedCommercialStep2Files } from '../../src/store/fileUploadReducer';
import {useAppSelector} from '../../src/store/hooks';
import axios from 'axios';
import { uploadFilesLocalComercial as uploadFileCommercial } from '../resources/api-constants';
import {formatPriceNumber} from '../utility/commonFunctions';
import { useAppDispatch } from '../../src/store/hooks';
import { setLoader } from '../store/loaderReducer'

export const Commercial: React.FC = () => {
    const dispatch = useAppDispatch();
    const uploadedFiles = useAppSelector(getUploadedCommercialStep2Files);
    const location = useLocation();
    const navigate = useNavigate();
    const [formValues1, setFormValues1] = useState<any>({})
    const [formValues2, setFormValues2] = useState<any>({})
    const [formValues3, setFormValues3] = useState<any>({})
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [commerStore, setCommerStore] = useState<any>()
    const [paramStatus, setParamStatus] = useState<any>()
    const [popupType, setPopupType] = useState<any>('')


    //let selectedStore:any = {}

    const checkRequiredParams = () => {
        let status = true
        if(location.hasOwnProperty('state'))
        {
            if(!location.state)
                status = false
            else
                setCommerStore(location.state)
        }

        if(!status)
        {
           
        }

        setParamStatus(status)
    }

    useEffect(() => {
        checkRequiredParams()
        
    }, [])

    useEffect(() => {
        if(commerStore)
            setFormValues2({interest: commerStore.name})
        
    }, [commerStore])

    if(!paramStatus)
    {
        return (
            <>Not Found</>
        )
    }
    
   

   

   
   
    function openModel(type:any){
        setPopupType(type)
        setIsOpen(true)
       
    }
    
    const uploadFiles = async(filesParam: any, reqId: any)=>{
        if(filesParam && filesParam.length){
            const formData = new FormData();
            formData.append('uploadToken', reqId);
            // formData.append('requestRecordId', reqRecordId);
            for(let i = 0; i< filesParam.length; i++){
                formData.append('files', filesParam[i]);
            }
            try {
                await axios.post(uploadFileCommercial(), formData);
                dispatch(setLoader(false))
                openModel(POPUP_TYPE_SUCCESS)
            } catch (error) {
                console.log('error while uploading files from local commercial2 is: ', error);
            }
        }
    }
    const saveFormValues1 = (formValues:any) => {
        setFormValues1(formValues)
    }
    const saveFormValues2 = (formValues:any) => {
        setFormValues2(formValues)
    }


    function handleModelClose(){
        setIsOpen(false)
        navigate('/')
    }
    
    const postFormData = (allFormValues: any) => {
        dispatch(setLoader(true))
        allFormValues.commercialId = commerStore.commercialId
        allFormValues.stateId = commerStore.stateId
        allFormValues.determinantId = commerStore.determinantId
        allFormValues.storeDs = commerStore.storeDs
       
        allFormValues.ofData = formatPriceNumber(allFormValues.ofData)
        allFormValues.toData = formatPriceNumber(allFormValues.toData)
        
        postRequestPremisesForm(allFormValues).then((res:any) => {
            if(res && res.data)
                uploadFiles(uploadedFiles, res.data.uploadToken);

        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            console.log('getStateList error', error)
            openModel(POPUP_TYPE_ERROR)
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

    

    
    
    

    return (
        <div className='page-container'>
           
            <div className='container main-container'>
                <div className='page-content'>
                    <div className='desc-container'>
                        <div className="title-wrapper">
                            <MainTitle text={"Solicitud de Locales"} />
                        </div>
                        <div className="page-desc-wrapper">
                            <TextP >Capture los datos indicados en los siguientes formularios para evaluar su solicitud de local.</TextP>
                        </div>
                        
                    </div>
                    <div className='multistep-container'>
                        <MultiStep numberSteps={3} activeStep={0} showNavigation={true} stepCustomStyle={{ width: '32%' }}>
                            <CommercialStep1  saveFormValues={saveFormValues1} formValues={formValues1} />
                            <CommercialStep2  saveFormValues={saveFormValues2} formValues={formValues2} />
                            <CommercialStep3  saveFormValues={saveFormValues3} formValues={formValues3} submitForm={submitForm} />
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
  