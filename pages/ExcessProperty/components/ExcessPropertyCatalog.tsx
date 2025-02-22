import React, { useState, useEffect } from 'react'
import { MainTitle } from '../../../components/common/Titles'
import { TextP } from '../../../components/common/TextP'
import { Input } from '../../../components/common/Input';
import { InputSelect } from '../../../components/common/InputSelect';
import { useForm  } from 'react-hook-form';
import ToggleButton from '../../../components/common/ToggleButton';
import PopupModel from '../../../components/popups/PopupModel';
import { InputFile } from '../../../components/common/InputFile';
// import PopupContentMapLatLong from '../../../components/popups/PopupContentMapLatLong';
//import Image from '../../../components/common/Image';
import { InputTextbox } from '../../../components/common/InputTextbox';
import { SecondryButton } from '../../../components/common/Buttons';
import { getExcessPropRow } from '../../../store/excessPropertyReducer';
import { useAppSelector } from '../../../store/hooks';
import { getStateOptions } from '../../../services/userRole/userRoleService';
import { getComboOptions, getNegotiationOptions } from '../../../services/report/reportService';
import CustomAxios from '../../../utility/customAxios';
import { putExcessPropURL } from '../../../resources/api-constants';
import PopupContentCustom from '../../../components/popups/PopupContentCustom'
import {POPUP_TYPE_SUCCESS, POPUP_TYPE_ERROR} from '../../../resources/project-constants'
import { useNavigate, useLocation } from 'react-router-dom';
import RoutesConstants from '../../../resources/route-constants';
import axios from 'axios';
import { uploadFilesExePCatlogImgs, uploadFilesExePCatlogPdf } from '../../../resources/api-constants';
// import { InputNumber } from '../../../components/common/InputNumber';
import { InputNumber } from '../../../components/common/InputNumber';
import { formatNumberToCurrency } from '../../../utility/commonFunctions';


type FormValues = {
    Clave: string;
    Nombre: string;
    Estado: string;
    Direccion: string;
    Combo: any[];
    M2: string;
    negociation: string;
    Condicion: string;
    Latitud: string;
    Longitud: string;
    'Ficha Técnica': string;
    Fotos: string;
    eventDescription: string;
};

let FormFields:any = {
    Clave: {
        id: 'Clave',
        placeholder: 'Ingrese',
        label: 'Clave',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Nombre',
            },
            maxLength: {
                value: 5,
                message: '5 characters max',
            },
        }
    },
    Estado: {
        id: 'Estado',
        placeholder: 'Mexico',
        label: 'Estado',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Nombre',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    Nombre: {
        id: 'Nombre',
        placeholder: 'Ingrese',
        label: 'Nombre',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Nombre',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    Direccion: {
        id: 'Direccion',
        placeholder: 'Ingrese',
        label: 'Dirección',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Nombre',
            },
            maxLength: {
                value: 1000,
                message: '50 characters max',
            },
        }
    },
    Combo: {
        id: 'Combo',
        placeholder: 'Ingrese',
        label: 'Combo',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Nombre',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    M2: {
        id: 'M2',
        placeholder: 'Ingrese',
        label: 'M2',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Nombre',
            },
            maxLength: {
                value: 1000000,
                message: '1000000  max',
            },
            pattern: {
                value: /^[0-9\.\,]+$/,
                message: 'Debe ingresar números',
            },
        }
    },
    negociation: {
        id: 'negociation',
        placeholder: 'Ingrese',
        label: 'Negociación',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Negociación',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    Condicion: {
        id: 'Condicion',
        placeholder: 'Ingrese',
        label: 'Condición',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Nombre',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    Latitud: {
        id: 'Latitud',
        placeholder: 'Ingrese',
        label: 'Latitud',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Nombre',
            },
            
        }
    },
    Longitud: {
        id: 'Longitud',
        placeholder: 'Ingrese',
        label: 'Longitud',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Nombre',
            },
           
        }
    }, 
    'Ficha Técnica':{
        id: 'Ficha Técnica',
        placeholder: 'Enter',
        label: 'Ficha Técnica',
        multiple: true,
        validationCustom: {
            validate: '',
            required: {
                value: true,
                message: 'Debe seleccionar el(los) documento(s) adicional(es)',
            }
        }
    },
    'Fotos':{
        id: 'Fotos',
        placeholder: 'Enter',
        label: 'Fotos',
        multiple: true,
        validationCustom: {
            validate: '',
            required: {
                value: false,
                message: 'Debe seleccionar el(los) documento(s) adicional(es)',
            }    
           
        }
    },
    eventDescription: {
        id: 'eventDescription',
        placeholder: 'Enter',
        label: 'Descripción del evento',
        validation: {
            required: {
                value: true,
                message: 'Ingrese la descripción del evento',
            },
            maxLength: {
                value: 1000,
                message: '50 characters max',
            },
        }
    }
}


export const ExcessPropertyCatalog: React.FC = () => {
    const navigate = useNavigate();
    const excessPropRow = useAppSelector(getExcessPropRow);

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const newCatlog = params.get('newCatlog');
    
    const [activeStatus, setActiveStatus] = useState(false);

    

    const [states, setStates] = useState([]);
    const [combos, setCombos] = useState<any[]>([]);
    const [negotiationOps, setnegotiationOps] = useState([]);
    const [active, setActive] = useState(false);
    const [modalErrorIsOpen, setErrorIsOpen] = useState(false);
    const [popupType, setPopupType] = useState<any>('')
    const [waitOnPage, setWaitOnPage] = useState(true);
    const [comboSelected, setComboSelected] = useState<string[]>([]);
    let combd: any[] = [];

    const { register, handleSubmit, formState: { errors }, setValue, getValues, setError, clearErrors, watch, reset } = useForm<FormValues>();
    
    
    const styleFormTopMargin = {
        marginTop: '2rem'
    }
    const styleActivToggleLabel = {
        margin: '1rem'
    }

    const styleToggleAndLabel = {
        display: 'flex',
        alignItems: 'center'
    };
    
    const watchToData = watch("M2")

    
    function openModel(type:any){
        setPopupType(type)
        
       
    }


    useEffect(() => {
        getStateOptions().then((res:any) => {
            setStates(res.data);
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            console.log('getStateList error', error)
        });
        if(!excessPropRow){
            getComboOptions().then((res:any) => {
                let data = res.data.map((ele: any)=>{
                    return {...ele, isChecked: false}
                })
                setCombos(data);
            })
            .catch((error:any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
                console.log('getStateList error', error)
            }); 
        }
        getNegotiationOptions().then((res:any) => {
            setnegotiationOps(res.data);
            
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            console.log('getStateList error', error)
        });

        
    }, []);
    
    useEffect(() => {
        if(excessPropRow)
                setValue('negociation', excessPropRow.transactionId)
    }, [negotiationOps])
    useEffect(() => {
        if(excessPropRow)
                setValue('Estado', excessPropRow.stateId)
    }, [states])

    
    // const { register, handleSubmit, formState: { errors }, reset, setValue, trigger } = useForm<FormValues>()

    


    const setFormValues = ()=>{
       if(excessPropRow){
            reset({  
                M2: formatNumberToCurrency(excessPropRow.squareMeter, true)
               
            });
            setValue('Latitud', excessPropRow.latitude);
            setValue('Longitud', excessPropRow.longitude);
            setValue('Nombre', excessPropRow.name);
            // setValue('M2', excessPropRow.squareMeter);
            setValue('Direccion', excessPropRow.address);


            //undefine checking if we have one value then put it in array
            // if we have multiple values then destruct it and store it in array
            if(excessPropRow?.combo?.length){
                setCombos(excessPropRow.combo);
                setValue('Combo', excessPropRow.combo);
            }
            

            setValue('eventDescription', excessPropRow.comments);
            setValue('Condicion', excessPropRow.condition);
            setValue('Estado', excessPropRow.stateId);
            setValue('negociation', excessPropRow.transactionId)
            setValue('Clave', excessPropRow.key);

            setActiveStatus(excessPropRow.active)

        }
    }

    useEffect(()=>{
        setFormValues();
    }, [excessPropRow]);
    
    
    
    const getComboSeletedIds = ()=>{
        let seletedCombos = combos?.filter((ele: any)=> ele.isChecked === true);
        seletedCombos = seletedCombos?.map(ele=>{
            return ele.id
        });
        combd = seletedCombos;
       
    }

    const uploadFile = async(filesParam: any, url: string, id:any)=>{
        if(filesParam && filesParam.length){
            const formData = new FormData();
            for(let i = 0; i< filesParam.length; i++){
                formData.append('files', filesParam[i]);
                formData.append('id', id);
            }
            try {
                await axios.post(url, formData);
                setActive(true);
            } catch (error) {
                console.log('error while uploading files from local commercial2 is: ', error);
            }
        }
        
    }

    const validateFileAndUpload = (field: any, url: string, id:any) => {

        let files:any = getValues(field)
        if(FormFields[field].validationCustom.required.value && files.length == 0)
        {
           
            setError(field, {
                type: "manual",
                message: "Debe seleccionar el(los) documento(s) adicional(es)",
            })
            return false;
            
        }   
        uploadFile(files, url, id);
        
       
    }
    const validations: any = (dat:any) =>{
      
         
            if(dat.Latitud > 180 && dat.Longitud > 180){
                setError('Latitud', {
                    type: "manual",
                    message: "Valor maximo permitido 180",
                })
                setError('Longitud', {
                    type: "manual",
                    message: "Valor maximo permitido 180",
                })
                return false;   
            }else if(dat.Latitud < -180 && dat.Longitud < -180){
                setError('Latitud', {
                    type: "manual",
                    message: "Valor minimo permitido -180",
                })
                setError('Longitud', {
                    type: "manual",
                    message: "Valor minimo permitido -180",
                })
                return false; 
            }else if(dat.Latitud < -180 && dat.Longitud > 180){
                setError('Latitud', {
                    type: "manual",
                    message: "Valor minimo permitido -180",
                })
                setError('Longitud', {
                    type: "manual",
                    message: "Valor maximo permitido 180",
                })
                return false; 
            }else if(dat.Latitud > 180 && dat.Longitud < -180){
                setError('Latitud', {
                    type: "manual",
                    message: "Valor maximo permitido 180",
                })
                setError('Longitud', {
                    type: "manual",
                    message: "Valor minimo permitido -180",
                })
                return false; 
            }else if(dat.Latitud > 180){
                setError('Latitud', {
                    type: "manual",
                    message: "Valor maximo permitido 180",
                })
                return false;  
            }else if(dat.Longitud > 180){
                setError('Longitud', {
                    type: "manual",
                    message: "Valor maximo permitido 180",
                })
                return false;  
            }else if(dat.Longitud < -180){
                setError('Longitud', {
                    type: "manual",
                    message: "Valor minimo permitido -180",
                })
                return false;  
            }else if(dat.Latitud < -180){
                setError('Latitud', {
                    type: "manual",
                    message: "Valor minimo permitido -180",
                })
                return false;  
            }
         
      
      
     return true;
    }

    const validateNumbersData = () => {
       if(watchToData > FormFields.M2.validation.maxLength.value )
        {
            setError("M2", {
                type: "manual",
                message:  FormFields.M2.validation.maxLength.message,
            })
            return false
        }
        else
        {
            clearErrors("M2")
        }
        return true
    }

    const onSubmit = handleSubmit((data)=>{
        if(validations(data)){
        setActiveStatus(true);

        if(!validateNumbersData())
            return false

        
        //upload file logic
        
        let reqData = {
            "key" : data.Clave,
            "name" : data.Nombre,
            "address" : data.Direccion,
            "sqmtr" : data.M2,
            "conditionText" : data.Condicion,
            "dataSheet" :"rtyu",
            "active": active.toString(),
            "comboId": data.Combo,
            "latitude":  data.Latitud,
            "longitude": data.Longitud,
            "stateId": data.Estado,
            "transactionId": data.negociation
        };
        // call put if you have data, we'll have data in case of edit
        getComboSeletedIds();
        if(excessPropRow){
            CustomAxios.put(putExcessPropURL(),
            {...reqData, comboList: combd, requestId: excessPropRow.id},
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            ).then(
                (response: any)=>{
                    if(response && response.status === 200){
                        validateFileAndUpload('Ficha Técnica', uploadFilesExePCatlogPdf(), excessPropRow.id.toString());
                        validateFileAndUpload('Fotos', uploadFilesExePCatlogImgs(), excessPropRow.id.toString());


                        setErrorIsOpen(true);
                        setWaitOnPage(false);
                        openModel(POPUP_TYPE_SUCCESS);
                    }
                    else {
                        setErrorIsOpen(true);
                        setWaitOnPage(true);
                        openModel(POPUP_TYPE_ERROR);
                        
                        
                    }
                }
            ).catch(
                () => {
                    setErrorIsOpen(true);
                    openModel(POPUP_TYPE_ERROR);
                }
            )
        }
        else{
            CustomAxios.post(putExcessPropURL(),
            {...reqData, comboList: combd, requestId: 0},
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            ).then(
                (response: any)=>{
                    if(response && response.status === 200){
                        if(response.data.length > 0)
                        {
                            validateFileAndUpload('Ficha Técnica', uploadFilesExePCatlogPdf(), response.data[0].requestId);
                            validateFileAndUpload('Fotos', uploadFilesExePCatlogImgs(), response.data[0].requestId);
                        }
                        


                        setErrorIsOpen(true);
                        setWaitOnPage(false);
                        openModel(POPUP_TYPE_SUCCESS);
                    }
                    else {
                        setErrorIsOpen(true);
                        setWaitOnPage(true);
                        openModel(POPUP_TYPE_ERROR);
                        
                        
                    }
                }
            ).catch(
                (error: any) => {
                    console.log(error)
                    setErrorIsOpen(true);
                    openModel(POPUP_TYPE_ERROR);
                }
            )
        }
        
    }});

    const handleModelPopupClose = ()=>{
        setErrorIsOpen(false);
        if(!waitOnPage)
            navigate(RoutesConstants.CatalogueEP);
    }

    const handleToggleChange = (status: boolean)=>{
       
        setActive(status);
    };

    const handleLineStateChange = (selectedObj: any)=>{
        console.log('selected object : ', selectedObj);
    };

    const handleLineNegoChange = (selectedObj: any)=>{
        setValue('negociation', selectedObj);
        
    };
    const handelCheckbox = (e: any)=>{
        const value = e.target.value;
        let comboTemp:any =  Array.from(JSON.parse(JSON.stringify(combos)));
        comboTemp.filter((ele:any)=>{
            if(ele.id.toString() === value){
                return true;
            }
            else{
                return false;
            } 
        })[0].isChecked = e.target.checked;
        setCombos([...comboTemp]);
        setComboSelected((prev:string[])=>{
            return [...prev, value]
        })
        console.log(comboSelected)
    }

    return(
        <div className='container main-container'>
            <section className='section-suppliers'>
                <div className="title-wrapper">
                    <MainTitle text={newCatlog === '1' ? 'Carga de información' : 'Actualización de información'} />
                </div>
                <div style={{textAlign: 'inherit'}} className="page-desc-wrapper">
                    <TextP >Este formulario es para dar de alta o modificar una propiedad. 
                        Los campos obligatorios son: Clave, Nombre, Estado, Combo, m2, Negoción,
                        Condición, Coordenadas, Ficha técnica.
                    </TextP>
                </div>
            </section>
            <div style={styleFormTopMargin} className='form-container'>
                <form onSubmit={onSubmit}>
                    <div className='row'>
                        <div className='col s12 m4'>
                            <Input field={FormFields.Clave} register={register} error={errors.Clave}/>
                        </div>
                        <div className='col s12 m4'>
                            <Input field={FormFields.Nombre} register={register} error={errors.Nombre}/>
                        </div>
                        <div className='col s12 m4'>
                            <InputSelect field={FormFields.Estado} register={register} error={errors.Estado}
                                selectOptions={states}
                                onChange={handleLineStateChange} 
                                optionLabel='state'
                                optionValue='id'
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col s12 m4'>
                            <Input field={FormFields.Direccion} register={register} error={errors.Direccion}/>
                        </div>
                        <div style={{height: '5rem', overflow: 'scroll', padding: '5px 0px 5px 0px', overflowX: 'hidden'}} className='col s12 m4'>
                            {
                                combos.map((ele: any)=>{
                                    return <div style={{display: 'flex', columnGap:'10px'}}><input checked={ele.isChecked} onChange={(e:any)=>handelCheckbox(e)} value={ele.id} style={{marginLeft: '10px'}} type='checkbox'></input>{ele.name}</div>
                                 })
                            }      
                        </div>
                        <div className='col s12 m4'>
                            {/* <InputNumber maxLength={123} field={FormFields.M2} register={register} error={errors.M2} showZero={false} setValue={setValue} watch={watch}  clearErrors={clearErrors}/> */}
                            {/* <InputNumberSimple field={FormFields.M2} register={register} error={errors.M2}  watch={watch} setError={setError}  clearErrors={clearErrors}/> */}
                            <InputNumber 
                                field={FormFields.M2} 
                                register={register} 
                                error={errors.M2} 
                                setValue={setValue} 
                                watch={watch} 
                                setError={setError} 
                                clearErrors={clearErrors}
                                // onBlur={validateToData}
                                value={getValues(FormFields.M2.id)}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col s12 m4'>
                            <InputSelect field={FormFields.negociation} register={register} error={errors.negociation}
                                selectOptions={negotiationOps}
                                onChange={handleLineNegoChange} 
                                optionLabel='negotiation'
                                optionValue='id'
                            />
                        </div>
                        <div className='col s12 m4'>
                            <Input field={FormFields.Condicion} register={register} error={errors.Condicion}/>
                        </div>
                        <div className='col s12 m4'>
                            <Input field={FormFields.Latitud} register={register} error={errors.Latitud}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col s12 m4 relative-div'>
                            <Input field={FormFields.Longitud} register={register} error={errors.Longitud}/>
                            <span  className='map-btn'></span>
                        </div>
                        <div style={styleToggleAndLabel} className='col s12 m4'>
                            <label style={styleActivToggleLabel} className='input-label'>Activo</label>
                            <ToggleButton callbackToggle={(status:any) => handleToggleChange(status)} checked={activeStatus}  />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col s12 m4'>
                            <InputFile field={FormFields['Ficha Técnica']} setError={setError} register={register} getValues={getValues}  setValue={setValue} clearErrors={clearErrors} error={errors['Ficha Técnica']} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col s12 m4'>
                            <InputFile  field={FormFields.Fotos} register={register} setError={setError} getValues={getValues}  setValue={setValue} clearErrors={clearErrors} error={errors.Fotos} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col s12'>
                            <InputTextbox field={FormFields.eventDescription} register={register} error={errors.eventDescription} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col s12 m3'></div>
                        <div className='col s12 m3'>
                            <SecondryButton onClick={()=> navigate(RoutesConstants.CatalogueEP)} className='submit-btn full-width'>Cancelar</SecondryButton>
                        </div>
                        <div className='col s12 m3'>
                            <input type="submit" className='submit-btn full-width' value='Guardar'/>
                        </div>
                        <div className='col s12 m3'></div>
                </div>
                </form>
               
                <PopupModel  isOpen={modalErrorIsOpen} closePopup={handleModelPopupClose} height='260px' width='30%'>
                        <PopupContentCustom closePopup={handleModelPopupClose} type={popupType} />
                </PopupModel>
            </div>
        </div>
    )
};
