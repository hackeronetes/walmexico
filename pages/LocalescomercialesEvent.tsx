import React, { useState, useEffect } from 'react'
import MultiStep from '../components/common/multistep/MultiStep'
import {LocalComerEvent1} from '../components/forms/LocalComerEvent1'
import {LocalComerEvent2} from '../components/forms/LocalComerEvent2'
import {MainTitle} from '../components/common/Titles'
import {TextP} from '../components/common/TextP'
import PopupContentCustom from '../components/popups/PopupContentCustom'
import PopupModel from '../components/popups/PopupModel'
import { postEventRequestForm } from '../services/localCommercial/localCommercialService'
import { useNavigate, useLocation } from "react-router-dom";
import { getUploadedFiles } from '../../src/store/fileUploadReducer';
import {useAppSelector} from '../../src/store/hooks';
import axios from 'axios';
import {POPUP_TYPE_SUCCESS, POPUP_TYPE_ERROR} from '../resources/project-constants'
import { uploadFilesLocalComercial } from '../resources/api-constants'
import {formatPriceNumber} from '../utility/commonFunctions'
import { useAppDispatch } from '../../src/store/hooks'
import { setLoader } from '../store/loaderReducer'

export const LocalescomercialesEvent: React.FC = () => {

    const dispatch = useAppDispatch();

    const uploadedFiles = useAppSelector(getUploadedFiles);

    const [commerStore, setCommerStore] = useState<any>()
    const [paramStatus, setParamStatus] = useState<any>()
    const [formValues1, setFormValues1] = useState<any>({})
    const [formValues2, setFormValues2] = useState<any>({})
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [popupType, setPopupType] = useState<any>('')
    const navigate = useNavigate();

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
                await axios.post(uploadFilesLocalComercial(), formData);
                dispatch(setLoader(false));
                openModel(POPUP_TYPE_SUCCESS);
            } catch (error) {
                console.log('error while uploading files from local commercial2 is: ', error);
                openModel(POPUP_TYPE_ERROR);
                dispatch(setLoader(false));
            }
        }
    }

    const location = useLocation();
    //let selectedStore:any = {}
    
   

        const checkRequiredParams = () => {
            let status = true
            if(location.hasOwnProperty('state'))
            {
                if(!location.state)
                    status = false
                else
                {
                    //selectedStore = location.state
                    setCommerStore(location.state)
                    
                    
                }
                   

            }
    
    
            setParamStatus(status)
        }
    
        //const paramStatus = checkRequiredParams()
    
       

    useEffect(() => {
        checkRequiredParams()
        
    }, [])
    useEffect(() => {
        if(commerStore)
            setFormValues2({branchesInterest: commerStore.storeDs})
        
    }, [commerStore])

    if(!paramStatus)
    {
        return (
            <>Not Found</>
        )
    }
 
    
    function handleModelClose(){
        setIsOpen(false)
        navigate('/')
    }



    

    const saveFormValues = (formValues:any) => {
        setFormValues1(formValues)
    }

    const saveFormValues2 = (formValues:any) => {
        setFormValues2(formValues)
    }

    const postFormData = (allFormValues: any) => {
        dispatch(setLoader(true));

        if(commerStore.csCommercial.length > 0)
        {
            allFormValues.commercialId = commerStore.csCommercial[0].commercialId
            allFormValues.stateId = commerStore.stateId
            allFormValues.determinantId = commerStore.determinantId
            allFormValues.storeDs = commerStore.storeDs
        }
       
        allFormValues.specify = formatPriceNumber(allFormValues.specify)

        postEventRequestForm(allFormValues).then((res:any) => {
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

    const submitForm = (formValuesData2:any) => {
        setFormValues2(formValuesData2)
        mergerFormValues(formValuesData2)

    }

    




    return (
        <div className='page-container'>
           
            <div className='container main-container'>
                <div className='page-content'>
                    <div className='desc-container'>
                        <div className="title-wrapper">
                            <MainTitle text={"Solicitud de Evento"} />
                        </div>
                        <div className="page-desc-wrapper">
                            <TextP >Capture los datos indicados en los siguientes formularios para evaluar su solicitud de evento.</TextP>
                        </div>
                        
                    </div>
                    <div className='multistep-container'>
                        <MultiStep numberSteps={2} activeStep={0} showNavigation={true} stepCustomStyle={{ width: '32%' }}>
                            <LocalComerEvent1 saveFormValues={saveFormValues} formValues={formValues1}/>
                            <LocalComerEvent2 saveFormValues={saveFormValues2} formValues={formValues2} submitForm={submitForm}/>
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
  
