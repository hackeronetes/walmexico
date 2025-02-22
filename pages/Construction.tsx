import React, { useState } from 'react'
import MultiStep from '../components/common/multistep/MultiStep'
import {ConstructionStep1} from '../components/forms/ConstructionStep1'
import {ConstructionStep2} from '../components/forms/ConstructionStep2'
import {ConstructionStep3} from '../components/forms/ConstructionStep3'
import {MainTitle} from '../components/common/Titles'
import {TextP} from '../components/common/TextP'
import { postConstructionForm } from '../services/supplier/supplierService'
import PopupContentCustom from '../components/popups/PopupContentCustom'
import PopupModel from '../components/popups/PopupModel'
import {POPUP_TYPE_SUCCESS, POPUP_TYPE_ERROR} from '../resources/project-constants'
import { useNavigate } from "react-router-dom";
import {formatPriceNumber} from '../utility/commonFunctions';
import { getUploadedConstruction1Files, getUploadedConstruction2Files, getUploadedConstruction3Files } from '../store/fileUploadReducer';
import {useAppSelector} from '../store/hooks';
import axios from 'axios';
import {uploadFilesMaterial as uploadFilesUrl} from '../../src/resources/api-constants';
import { useAppDispatch } from '../store/hooks';
import { setLoader } from '../store/loaderReducer'

export const Construction: React.FC = () => {

    const dispatch = useAppDispatch();
    const [formValues1, setFormValues1] = useState<any>({})
    const [formValues2, setFormValues2] = useState<any>({})
    const [formValues3, setFormValues3] = useState<any>({})
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [popupType, setPopupType] = useState<any>('')
    const uploadedFilesCon1 = useAppSelector(getUploadedConstruction1Files);
    const uploadedFilesCon2 = useAppSelector(getUploadedConstruction2Files);
    const uploadedFilesCon3 = useAppSelector(getUploadedConstruction3Files);

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
        dispatch(setLoader(true));
        if(filesParam && filesParam.length){
            const formData = new FormData();
            formData.append('uploadToken', uploadToken);
            // formData.append('requestRecordId', reqRecordId);
            for(let i = 0; i< filesParam.length; i++){
                formData.append('files', filesParam[i]);
            }
            try {
                await axios.post(uploadFilesUrl(), formData);
                dispatch(setLoader(false));
                openModel(POPUP_TYPE_SUCCESS);
            } catch (error) {
                console.log('error while uploading files from local commercial2 is: ', error);
                openModel(POPUP_TYPE_ERROR);
                dispatch(setLoader(false));
            }
        }
    }
    
    const postFormData = (allFormValues: any) => {

        dispatch(setLoader(true));

        

        allFormValues.areaOfOfficeFacilities = formatPriceNumber(allFormValues.areaOfOfficeFacilities)
        allFormValues.numberOfPermanentStaff = formatPriceNumber(allFormValues.numberOfPermanentStaff)
        allFormValues.revenueBilled = formatPriceNumber(allFormValues.revenueBilled)
        allFormValues.workingCapital = formatPriceNumber(allFormValues.workingCapital)

       
        postConstructionForm(allFormValues).then((res:any) => {
            if(res && res.data){
                Promise.all([
                    uploadFiles(uploadedFilesCon1, res.data.uploadToken),
                    uploadFiles(uploadedFilesCon2, res.data.uploadToken),
                    uploadFiles(uploadedFilesCon3, res.data.uploadToken)
                ]).then(([...uploadfiles])=>{
                    console.log(uploadfiles);
                    //setIsOpen(true)
                    openModel(POPUP_TYPE_SUCCESS);
                    dispatch(setLoader(false));
                })
                // uploadFiles(uploadedFilesCon1, res.data.requestId, res.data.requestRecordId);
                // uploadFiles(uploadedFilesCon2, res.data.requestId, res.data.requestRecordId);
                // uploadFiles(uploadedFilesCon3, res.data.requestId, res.data.requestRecordId);
            }
           // alert('hahaha')

        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            console.log('getStateList error', error)
            //setIsOpen(true)
            openModel(POPUP_TYPE_ERROR);
            dispatch(setLoader(false));
        })
    }

    const convertString = (finalFormValues:any) => {
        
        finalFormValues.typeOfPerson = parseInt(finalFormValues.typeOfPerson);
        finalFormValues.prevPadron = parseInt(finalFormValues.prevPadron);
        finalFormValues.subsidiariesWalmartFacility = parseInt(finalFormValues.subsidiariesWalmartFacility);
        finalFormValues.subsidiaryWalmartMexico = parseInt(finalFormValues.subsidiaryWalmartMexico);
        //finalFormValues.areaOfOfficeFacilities = parseFloat(finalFormValues.areaOfOfficeFacilities);
        //finalFormValues.numberOfPermanentStaff = parseFloat(finalFormValues.numberOfPermanentStaff);
        //finalFormValues.revenueBilled = parseFloat(finalFormValues.revenueBilled);
        //finalFormValues.workingCapital = parseFloat(finalFormValues.workingCapital);
        
        delete finalFormValues.curricularExperience;
        delete finalFormValues.annualDeclaration;
        delete finalFormValues.financialStatements;
        


        postFormData(finalFormValues)
        
    }

    const mergerFormValues = (formData3: any) => {
        

        let finalFormValues = {
            ...formValues1,
            ...formValues2,
            ...formData3
        };
        
        convertString(finalFormValues);
    }

    
    

    const submitForm = (formValuesData3:any) => {
        setFormValues3(formValuesData3)
        mergerFormValues(formValuesData3)

    }
    const saveFormValues3 = (formValues:any) => {
        setFormValues3(formValues)
        
       
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
                            <MainTitle text={"Proveedores de la industria de la Construcción"} />
                        </div>
                        <div className="page-desc-wrapper">
                            <TextP >Antes de registrar su propuesta, es importante hacer de su conocimiento que en Bienes Raíces contamos con un proceso detallado de análisis y estudio de viabilidad, por lo que se entiende que su solicitud no será aceptada hasta cumplir con todos los procesos de autorización, anticorrupción y políticas internas de Walmart de México y Centroamérica.</TextP>
                        </div>
                        
                    </div>
                    <div className='multistep-container'>
                        <MultiStep numberSteps={3} activeStep={0} showNavigation={true} stepCustomStyle={{ width: '32%' }}>
                            <ConstructionStep1  saveFormValues={saveFormValues1} formValues={formValues1} />
                            <ConstructionStep2  saveFormValues={saveFormValues2} formValues={formValues2} />
                            <ConstructionStep3  saveFormValues={saveFormValues3} formValues={formValues3} submitForm={submitForm} />
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
  