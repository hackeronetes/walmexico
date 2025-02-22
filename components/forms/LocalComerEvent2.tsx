import React , {  useState, useEffect }from 'react'
import { Input } from '../common/Input';
import { InputSelect } from '../common/InputSelect';
import { InputRadio } from '../common/InputRadio';
import { InputTextbox } from '../common/InputTextbox';
import { InputFile } from '../common/InputFile';
import { useForm  } from 'react-hook-form';
import { InputReadAcceptTerms } from '../common/InputReadAcceptTerms';
import Captcha from '../common/Captcha'
import { SecondryButton } from '../common/Buttons';
import  DatePickerInput  from '../common/DatePickerInput';
import { InputNumber } from '../common/InputNumber';
import {getBusinessLineOptions} from '../../services/localCommercial/localCommercialService';



const m2Options = [
    { value: 'M2', label: 'm<sup>2</sup>' },
    { value: 'Cajon', label: 'Cajones de Estacionamiento' },
]






type FormValues = {
    lineBusinessId: string;
    lineBusinessSpecify: string;
    m2ParkingSpaces: string;
    specify: string;
    requestBegDt: string;
    requestEndDt: string;
    documents: string;
    eventDescription: string;
    branchesInterest: string;   
    captcha: string;
    readButton: string;
};

const FormFields:any = {
    lineBusinessId: {
        id: 'lineBusinessId',
        placeholder: 'Enter',
        label: 'Giro o negocio',
        validation: {
            required: {
                value: true,
                message: 'Seleccione el giro',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    m2ParkingSpaces: {
        id: 'm2ParkingSpaces',
        placeholder: 'm<sup>2</sup> o número de cajones requeridos',
        label: 'm2',
        validation: {
            required: {
                value: true,
                message: 'Seleccione M2 o número de cajones requeridos',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    specify: {
        id: 'specify',
        placeholder: 'Ingrese',
        label: 'Especifique',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar valor',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    lineBusinessSpecify: {
        id: 'lineBusinessSpecify',
        placeholder: 'Ingrese',
        label: 'Especifique',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar valor',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    requestBegDt: {
        id: 'requestBegDt',
        placeholder: 'Enter Start Date',
        label: 'Start Date',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar fecha de inicio',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    requestEndDt: {
        id: 'requestEndDt',
        placeholder: 'Enter End Date',
        label: 'End Date',
        validation: {
            required: {
                value: false,
                message: 'Debe ingresar fecha fin',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    documents: {
        id: 'documents',
        placeholder: 'Enter',
        label: 'Carga de documentos',
        multiple: true,
        validationCustom: {
            validate: '',
            required: {
                value: true,
                message: 'Debe seleccionar el(los) documento(s) adicional(es)',
            },
        },
        // validation: {
        //     required: {
        //         value: true,
        //         message: 'Ingresar documentos',
        //     },
        //     maxLength: {
        //         value: 50,
        //         message: '50 characters max',
        //     },
        // }
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
                value: 500,
                message: '500 characters max',
            },
        }
    },
    branchesInterest: {
        id: 'branchesInterest',
        placeholder: 'Enter',
        label: 'Sucursales de interés',
        validation: {
            required: {
                value: false,
                message: '',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    captcha: {
        id: 'captcha',
        placeholder: '',
        label: '',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar Captcha.',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    readButton: {
        id: 'readButton',
        placeholder: '',
        label: 'He leído y acepto los términos y condiciones del Aviso de Privacidad.',
        validation: {
            required: {
                value: true,
                message: 'Términos y condiciones, Debes aceptar los términos y condiciones del aviso de privacidad',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    
    
}

// const defaultValues = {
//     m2ParkingSpaces: 'Cajon',
//     captcha: ''
// }

export const LocalComerEvent2: React.FC<any> = (props) => {

    const { register, handleSubmit, formState: { errors }, getValues, setError, reset, setValue , clearErrors, watch, } = useForm<FormValues>()
    const { loadCaptcha, validateCaptcha } = Captcha()
     const [maxLength,setMaxLength ] = useState<any>(9);
    const [requestBegDt, setStartDate] = useState<any>();
    const [requestEndDt, setEndDate] = useState<any>();
    // const test = watch(FormFields.lineBusinessId.id, false) 
     const [lineBusinessId, setLineBusinessId] = useState<any>('');
     const [ businessLineOptions, setBusinessLineOptions ] = useState<any[]>([])


    
    const handleLineBusinessChange = (value:any) => {
        setLineBusinessId(value)
    }

   const gotSelectedValue = (selected:any) =>{
     if (selected === "Cajon"){
        setMaxLength(5);
     } else {
        setMaxLength(9);
     }

   }
    const getLineBusinessOptions = () => {
        getBusinessLineOptions().then((res:any) => {
            setBusinessLineOptions(res.data)
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            console.log('getStateList error', error)
        })

        
    }

    useEffect(() => {
        getLineBusinessOptions()
    }, [])
    

    useEffect(() => {
       

        //selectDefaultValues()

        if(Object.keys(props.formValues).length > 0 )
        {
            reset({
                lineBusinessId: props.formValues.lineBusinessId,
                m2ParkingSpaces: props.formValues.m2ParkingSpaces,
                specify: props.formValues.specify,
                lineBusinessSpecify: props.formValues.lineBusinessSpecify,
                requestBegDt: props.formValues.requestBegDt,
                requestEndDt: props.formValues.requestEndDt,
                documents: props.formValues.documents,
                eventDescription: props.formValues.eventDescription,
                branchesInterest: props.formValues.branchesInterest,
            });
            setStartDate(props.formValues.requestBegDt)
            setEndDate(props.formValues.requestEndDt)
        }
        else {
            //alert('fdsf')
            reset({
                m2ParkingSpaces: "Cajon",
            });
        }
        
        
    }, [])

    const validateCaptchaInput = (captcha:string) => {
        if(!validateCaptcha(captcha))
        {
            setError("captcha", {
                type: "manual",
                message: "Captcha inválido",
            })

            return false
        }
        return true
    }

    
    const validateFile = () => {

        let files:any = getValues('documents')
        if(FormFields.documents.validationCustom.required.value && files.length == 0)
        {
            setError("documents", {
                type: "manual",
                message: "Debe seleccionar el(los) documento(s) adicional(es)",
            })
            return false
        }
            
        return true
       
    }

    const validateDatepickerDates = (data:any) => {

        

        let status = true;

        if(!data.requestBegDt)
        {
            setError("requestBegDt", {
                type: "manual",
                message: "Debe ingresar fecha de inicio",
            })
            status =  false
        }
            
        if(!data.requestEndDt)
        {
            setError("requestEndDt", {
                type: "manual",
                message: "Debe ingresar fecha fin",
            })
            status =  false
        }
            
        return status
       
    }

    const onSubmit = handleSubmit((data) => {
        if(!validateDatepickerDates(data))
            return false

        if(!validateFile())
            return false

        if(!validateCaptchaInput(data.captcha))
            return false
        
        // if(!validateStartEndDate())
        //     return false
        

        props.submitForm(data);
        props.handleNextClick()
       
    })

    function handlePreviousClick()  {
        props.saveFormValues(getValues())
        props.handlePreviousClick()
       
    }

    const resetEndDate = () => {
        setValue('requestEndDt', '');
        setEndDate('')
    }

    function handleDateChange(type:string, date:any) {
        if(type === 'start')
        {
            clearErrors('requestBegDt')
            setValue('requestBegDt', date);
            setStartDate(date)
            resetEndDate()
        }
            
        else
        {
            clearErrors('requestEndDt')
            setValue('requestEndDt', date);
            setEndDate(date)
        }
            
    }
    

    return (
        <div className='form-container'>
            <form onSubmit={onSubmit}>
                <div className='row'>
                    <div className='col s12 m4'>
                        <InputSelect field={FormFields.lineBusinessId} register={register} error={errors.lineBusinessId} selectOptions={businessLineOptions} onChange={handleLineBusinessChange} 
                            optionLabel='dx_line_business_ds'
                            optionValue='sk_line_business_id'
                        />
                    </div>
                    <div className='col s12 m4'>
                        {lineBusinessId == -2 && (
                                <Input field={FormFields.lineBusinessSpecify} register={register} error={errors.lineBusinessSpecify}/>
                        )}
                    </div>
                    
                </div>

                <div className='row'>
                    <div className='col s12 m4'>
                    <InputRadio field={FormFields.m2ParkingSpaces} passSelectedValue={gotSelectedValue} register={register} error={errors.m2ParkingSpaces} radioOptions={m2Options} selected={watch(FormFields.m2ParkingSpaces.id)} />
                    </div>
                    <div className='col s12 m4'>
                        <InputNumber maxLength={maxLength} field={FormFields.specify} register={register} error={errors.specify} setValue={setValue} watch={watch} setError={setError} clearErrors={clearErrors} />
                    </div>
                    
                </div>

                <div className='row'>
                    <div className='col s12 m4'>
                        {/*
                        <div>
                            <label className="input-label">Fecha de Inicio</label>
                        </div>
                        <div className='datepicker-container'>
                             <DatePicker selected={requestBegDt} onChange={(date:any) => handleDateChange('start', date)} />
                            <Image className="datepicker-img" name="icon_calendar.png" /> 
                        </div>

                       */ }

                            <DatePickerInput 
                                label={'Fecha de Inicio'}
                                value={requestBegDt}
                                handleDateChange={(date:any) => handleDateChange( 'start', date)}
                                minDate={new Date()}
                            />
                        
                        <div className="input-error">{errors.requestBegDt && errors.requestBegDt.message}</div>
                       
                    </div>
                    <div className='col s12 m4'>
                           

                        { /*<div>
                            <label className="input-label">Fecha de Fin</label>
                        </div>
                        <div className='datepicker-container'>
                            <DatePicker selected={requestEndDt} onChange={(date:any) => handleDateChange('end', date)} minDate={requestBegDt} />
                            <Image className="datepicker-img" name="icon_calendar.png" />
                        </div>
                        */}

                        <DatePickerInput 
                            label={'Fecha de Fin'}
                            value={requestEndDt}
                            handleDateChange={(date:any) => handleDateChange( 'end', date)}
                            minDate={requestBegDt}
                        />

                        <div className="input-error">{errors.requestEndDt && errors.requestEndDt.message}</div>
                        
                    </div> 
                    <div className='col s12 m4'>
                        <InputFile field={FormFields.documents} register={register} error={errors.documents} getValues={getValues}  setValue={setValue} setError={setError} clearErrors={clearErrors} />
                    </div>
                </div>

                <div className='row'>
                    <div className='col s12'>
                        <InputTextbox field={FormFields.eventDescription} register={register} error={errors.eventDescription} />
                    </div>
                    
                </div>

                <div className='row'>
                    <div className='col s12'>
                        <Input disabled={true} field={FormFields.branchesInterest} register={register} error={errors.branchesInterest} />
                    </div>
                    
                </div>
                <div className='row'>
                    <div className='col offset-m3 s12 m6'>
                        {loadCaptcha()}
                        <Input field={FormFields.captcha} register={register} error={errors.captcha}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col s12 text-center'>
                        <InputReadAcceptTerms field={FormFields.readButton} register={register} error={errors.readButton}/>
                    </div>
                </div>
                
                <div className='row'>
                    <div className='col s12 m6'>
                        <SecondryButton onClick={handlePreviousClick} className='submit-btn full-width'>Regresar</SecondryButton>
                    </div>
                    <div className='col s12 m6'>
                        <input type="submit" className='submit-btn full-width' value='Siguiente'/>
                    </div>
                </div>

            </form>
            
            
        </div>
    )
}
