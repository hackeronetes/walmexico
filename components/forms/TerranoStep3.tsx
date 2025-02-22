import React, {useState, useEffect} from 'react'
import { Input } from '../common/Input';
import { InputSelect } from '../common/InputSelect';
import { InputRadio } from '../common/InputRadio';
import { InputTextbox } from '../common/InputTextbox';
import { InputFile } from '../common/InputFile';
import { InputNumber } from '../common/InputNumber';
import { useForm  } from 'react-hook-form';
import Captcha from '../common/Captcha'
import {  SecondryButton } from '../common/Buttons';
import { getLandUseList } from '../../services/localCommercial/localCommercialService';
import { InputReadAcceptTerms } from '../common/InputReadAcceptTerms';


// const landUseOptions = [
//     { value: '1', label: 'Allowed' },
//     { value: '2', label: 'Forbidden' },
//     { value: '3', label: 'Conditioned' },
// ]

const operationTypeOptions = [
    { value: '1', label: 'Venta' },
    { value: '2', label: 'Renta' },
    { value: '3', label: 'Venta / Renta' },
]


type FormValues = {
    surface: string;
    landUse: string;
    description: string;
    operationType: string;
    price: string;
    document: string;
    captcha: string;
    readButton: string;
    
    
};

const FormFields:any = {
    surface: {
        id: 'surface',
        placeholder: 'Ingrese',
        label: 'Superficie',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Superficie',
            },
            maxLength: {
                value: 16,  
                message: '10 characters máximo',
            },
            // pattern: {
            //     value: /^[0-9]+$/,
            //     message: 'Please enter a number',
            // },
        }
    },
    landUse: {
        id: 'landUse',
        placeholder: 'Seleccione',
        label: 'Uso de suelo',
        validation: {
            required: {
                value: true,
                message: 'Debe seleccionar Uso de Suelo.',
            },
            maxLength: {
                value: 50,
                message: '50 characters máximo',
            },
        }
    },
    description: {
        id: 'description',
        placeholder: 'Enter',
        label: 'Descripción del terreno',
        validation: {
            required: {
                value: false,
                message: '',
            },
            maxLength: {
                value: 500,
                message: '500 characters máximo',
            },
        }
    },
    operationType: {
        id: 'operationType',
        placeholder: 'Tipo de operación',
        label: 'Tipo de operación',
        validation: {
            required: {
                value: true,
                message: 'Debe seleccionar Tipo de Operación.',
            },
            maxLength: {
                value: 50,
                message: '50 characters máximo',
            },
        }
    },
    price: {
        id: 'price',
        placeholder: '0.00',
        label: 'Precio',
        validation: {
            required: {
                value: false,
                message: '',
            },
            maxLength: {
                value: 16,
                message: '10 characters máximo',
            },
            // pattern: {
            //     value: /^[0-9]+$/,
            //     message: 'Debe ingresar números',
            // },
        }
    },
    document: {
        id: 'document',
        placeholder: '0.00',
        label: 'Carga de documentos y/o fotografías del sitio',
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
        //         message: 'Debe seleccionar el(los) documento(s) adicional(es)',
        //     },
        //     maxLength: {
        //         value: 50,
        //         message: '50 characters máximo',
        //     },
        // }
    },
    captcha: {
        id: 'captcha',
        placeholder: 'Ingrese código de la imagen',
        label: '',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar Captcha',
            },
            maxLength: {
                value: 50,
                message: '50 characters máximo',
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
                message: '50 characters máximo',
            },
        }
    },

    
}

export const TerranoStep3: React.FC<any> = (props) => {

    const { register, handleSubmit, formState: { errors }, setError, reset, watch, setValue, getValues, clearErrors  } = useForm<FormValues>()
    const { loadCaptcha, validateCaptcha } = Captcha()
    const [ landUseOptions, setLandUseOptions ] = useState<any[]>([])
    


    function formatNumber( number: string){
        console.log('formatNumber', number)
    }

   formatNumber(watch("price"))


    useEffect(() => {
        console.log(' props.formValues',  props.formValues)
        if(Object.keys(props.formValues).length > 0)
        {
            reset({
                surface: props.formValues.surface,
                landUse: props.formValues.landUse,
                description: props.formValues.description,
                operationType: props.formValues.operationType,
                price: props.formValues.price,
                document: props.formValues.document,
                captcha: props.formValues.captcha,
            });
        }
        // else {
        //     reset({
        //         operationType: "0",
        //     });
        // }
        
    }, [])

    useEffect(() => {
        getLandUseList().then((res:any) => {
            setLandUseOptions(res.data)
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            console.log('getStateList error', error)
        })

        
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

        let files:any = getValues('document')
        console.log('files', files)
        console.log('files.length',files.length)
        if(FormFields.document.validationCustom.required.value && files.length == 0)
        {
            setError("document", {
                type: "manual",
                message: "Debe seleccionar el(los) documento(s) adicional(es)",
            })
            return false
        }
            
        return true
       
    }


    const onSubmit = handleSubmit((data) => {

        if(!validateFile())
            return false

        if(!validateCaptchaInput(data.captcha))
            return false
        
        props.submitForm(data);
        props.handleNextClick()
       
    })

    function handlePreviousClick()  {
        console.log('getValues()', getValues())
        props.saveFormValues(getValues())
        props.handlePreviousClick()
       
    }


    return (
        <div className='form-container'>
            <form onSubmit={onSubmit} encType='multipart/form-data'>
                <div className='row'>
                    <div className='col s12'>
                        <div className='price-notice'>* Por favor ingrese los montos en su modeda local</div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col s12 m6'>
                        <InputNumber 
                            field={FormFields.surface} 
                            register={register} 
                            error={errors.surface} 
                            setValue={setValue} 
                            watch={watch} 
                            setError={setError} 
                            clearErrors={clearErrors}
                           
                        />
                    </div>
                    <div className='col s12 m6'>
                        <InputSelect 
                            field={FormFields.landUse} 
                            register={register} 
                            error={errors.landUse} 
                            selectOptions={landUseOptions}
                            optionLabel='useFloorDs'
                            optionValue='useFloorId'
                        />
                            
                    </div>
                    
                </div>

                <div className='row'>
                    <div className='col s12'>
                        <InputTextbox field={FormFields.description} register={register} error={errors.description}/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col s12 m4'>
                        <InputRadio field={FormFields.operationType} register={register} error={errors.operationType} radioOptions={operationTypeOptions} selected={watch(FormFields.operationType.id)} />
                    </div>
                    <div className='col s12 m4'>
                        
                    </div>
                    <div className='col s12 m4'>
                        <div className='price-dollar-div'>
                            $
                        </div>
                        <div className='price-input'>
                            <InputNumber 
                                field={FormFields.price} 
                                register={register}
                                error={errors.price} 
                                setValue={setValue} 
                                watch={watch} 
                                setError={setError} 
                                clearErrors={clearErrors} 
                            />
                        </div>
                        
                    </div>
                </div>
                <div className='row'>
                    <div className='col s12 m4'>
                        <InputFile field={FormFields.document} register={register} error={errors.document} getValues={getValues}  setValue={setValue} setError={setError} clearErrors={clearErrors} />
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
                    <div className='col offset-m2 s12 m4'>
                        <SecondryButton onClick={handlePreviousClick} className='submit-btn'>Regresar</SecondryButton>
                    </div>
                    <div className='col s12 m4'>
                        <input type="submit" className='submit-btn' value='Enviar'/>
                    </div>
                </div>

            </form>
            
            
        </div>
    )
}
