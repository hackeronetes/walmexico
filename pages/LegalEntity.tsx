import React, { useState, useEffect } from 'react'
import MultiStep from '../components/common/multistep/MultiStep'
import {LegalEntityStep1} from '../components/forms/LegalEntityStep1'
import {LegalEntityStep2} from '../components/forms/LegalEntityStep2'
import {MainTitle} from '../components/common/Titles'
import {TextP} from '../components/common/TextP'
import { postLegalEntityForm } from '../services/landSale/landSaleService'
import PopupContentCustom from '../components/popups/PopupContentCustom'
import PopupModel from '../components/popups/PopupModel'
import { useNavigate, useLocation } from "react-router-dom";
import {POPUP_TYPE_SUCCESS, POPUP_TYPE_ERROR} from '../resources/project-constants';
import { useAppDispatch } from '../store/hooks';
import { setLoader } from '../store/loaderReducer'


export const LegalEntity: React.FC = () => {

    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [formValues1, setFormValues1] = useState<any>({})
    const [formValues2, setFormValues2] = useState<any>({})
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

         setParamStatus(status)
    }

    useEffect(() => {
        checkRequiredParams()
        
    }, [])
    useEffect(() => {
        if(commerStore)
            setFormValues2({addressOfInterest: commerStore.address})
        
    }, [commerStore])

    if(!paramStatus)
    {
        return (
            <>Not Found</>
        )
    }

   
    function handleModelClose(){
        setIsOpen(false)
        dispatch(setLoader(false));
        navigate('/')
    }

    function openModel(type:any){
        setPopupType(type)
        setIsOpen(true)
       
    }


    const saveFormValues1 = (formValues:any) => {
        setFormValues1(formValues)
    }

    
    const postFormData = (allFormValues: any) => {
        dispatch(setLoader(true));
        if(commerStore.selectedItems.length > 0)
        {
            //allFormValues.excessPropertyId = commerStore.selectedItems // Hsto
            allFormValues.excessPropertyId = commerStore.selectedItems[0]
        }
       

        allFormValues.moralPerson = true;

        postLegalEntityForm(allFormValues).then(() => {
            dispatch(setLoader(false));

           // alert('hahaha')
            openModel(POPUP_TYPE_SUCCESS)
            dispatch(setLoader(false));
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            console.log('getStateList error', error)
            openModel(POPUP_TYPE_ERROR)
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

    

    


    
    

    return (
        <div className='page-container'>
           
            <div className='container main-container'>
                <div className='page-content'>
                    <div className='desc-container'>
                        <div className="title-wrapper">
                            <MainTitle text={"Excess Property - Registro"} />
                        </div>
                        <div className="page-desc-wrapper">
                            <TextP >Indique sus datos para poder considerarlo como posible comprador o arrendatario de un area en una tienda.</TextP>
                        </div>
                        
                    </div>
                    <div className='multistep-container'>
                        <MultiStep numberSteps={2} activeStep={0} showNavigation={true} stepCustomStyle={{ width: '32%' }}>
                            <LegalEntityStep1  saveFormValues={saveFormValues1} formValues={formValues1} />
                            <LegalEntityStep2  saveFormValues={saveFormValues2} formValues={formValues2} submitForm={submitForm} />
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
  