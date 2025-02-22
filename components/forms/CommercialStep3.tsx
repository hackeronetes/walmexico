import React, {  useEffect} from 'react'
import { Input } from '../common/Input';
import { InputRadio } from '../common/InputRadio';
import { InputTextbox } from '../common/InputTextbox';
import { useForm  } from 'react-hook-form';
import Captcha from '../common/Captcha'
import {  SecondryButton } from '../common/Buttons';
import { InputReadAcceptTerms } from '../common/InputReadAcceptTerms';

// const landUseOptions = [
//     { value: '1', label: 'Allowed' },
//     { value: '2', label: 'Forbidden' },
//     { value: '3', label: 'Conditioned' },
// ]

const tenantTypes = [
    { value: '1', label: 'Si' },
    { value: '0', label: 'No' },
]


type FormValues = {
    isWalmartLocation: string;
    walmartLocationDeterminant: string;
    walmartLocationName: string;
    walmartLocationAddress: string;
    businessBackground: string;
    businessBackgroundSpecify: string;
    comment: string;
    captcha: string;
    readButton: string;
    
    
};

const FormFields:any = {
    isWalmartLocation: {
        id: 'isWalmartLocation',
        placeholder: '¿Es inquilino de un local de Walmart?',
        label: '¿Es inquilino de un local de Walmart?',
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
    walmartLocationDeterminant: {
        id: 'walmartLocationDeterminant',
        placeholder: 'Ingrese',
        label: 'Determinante',
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
    walmartLocationName: {
        id: 'walmartLocationName',
        placeholder: 'Ingrese',
        label: 'Nombre de la unidad',
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
    walmartLocationAddress: {
        id: 'walmartLocationAddress',
        placeholder: 'Ingrese',
        label: 'Dirección',
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
    businessBackground: {
        id: 'businessBackground',
        placeholder: '¿Antecedentes o experiencia comercial?',
        label: '¿Antecedentes o experiencia comercial?',
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
    businessBackgroundSpecify: {
        id: 'businessBackgroundSpecify',
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
    comment: {
        id: 'comment',
        placeholder: 'Ingrese',
        label: 'Comentarios',
        validation: {
            required: {
                value: false,
                message: '',
            },
            maxLength: {
                value: 500,
                message: '500 characters max',
            },
        }
    },
    captcha: {
        id: 'captcha',
        placeholder: 'Ingrese código de la imagen',
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

export const CommercialStep3: React.FC<any> = (props) => {

    const { register, handleSubmit, formState: { errors }, getValues, setError, reset, watch } = useForm<FormValues>()
    const { loadCaptcha, validateCaptcha } = Captcha()
    //const [businessBackground, setBusinessBackground] = useState<any>('');
    //let businessBackground = ''

    const businessBackground = watch("businessBackground")
    const isWalmartLocation = watch("isWalmartLocation")
    
   

    useEffect(() => {
        if(Object.keys(props.formValues).length > 0)
        {
            reset({
                isWalmartLocation: props.formValues.isWalmartLocation,
                walmartLocationDeterminant: props.formValues.walmartLocationDeterminant,
                walmartLocationName: props.formValues.walmartLocationName,
                walmartLocationAddress: props.formValues.walmartLocationAddress,
                businessBackground: props.formValues.businessBackground,
                businessBackgroundSpecify: props.formValues.businessBackgroundSpecify,
                comment: props.formValues.comment,
                captcha: props.formValues.captcha,
            });
        }
        else {
            reset({
                isWalmartLocation: "0",
                businessBackground: "0",
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

    const onSubmit = handleSubmit((data) => {

        if(!validateCaptchaInput(data.captcha))
            return false
        
        props.submitForm(data);
        props.handleNextClick()
       
    })

    function handlePreviousClick()  {
        props.saveFormValues(getValues())
        props.handlePreviousClick()
       
    }


    return (
        <div className='form-container'>
            <form onSubmit={onSubmit} encType='multipart/form-data'>
                <div className='row'>
                    <div className='col s12'>
                        <InputRadio field={FormFields.isWalmartLocation} register={register} error={errors.isWalmartLocation} radioOptions={tenantTypes} selected={watch(FormFields.isWalmartLocation.id) ? watch(FormFields.isWalmartLocation.id) : "0"} />
                    </div>
                    {isWalmartLocation == '1' && (
                        <div className='row'>
                            <div className='col s12 m4'>
                                <Input field={FormFields.walmartLocationDeterminant} register={register} error={errors.walmartLocationDeterminant}/>
                            </div>
                        
                            <div className='col s12 m4'>
                                <Input field={FormFields.walmartLocationName} register={register} error={errors.walmartLocationName}/>
                            </div>
                    
                            <div className='col s12 m4'>
                                <Input field={FormFields.walmartLocationAddress} register={register} error={errors.walmartLocationAddress}/>
                            </div>
                        </div>
                    )}
                </div>
                <div className='row'>
                    <div className='col s12 m6'>
                        <InputRadio field={FormFields.businessBackground} register={register} error={errors.businessBackground} radioOptions={tenantTypes} selected={watch(FormFields.businessBackground.id) ? watch(FormFields.businessBackground.id) : "0"} />
                    </div>
                    <div className='col s12 m4'>
                        {businessBackground == '1' && (
                                <Input field={FormFields.businessBackgroundSpecify} register={register} error={errors.businessBackgroundSpecify}/>
                        )}
                    </div>
                </div>

                <div className='row'>
                    <div className='col s12'>
                        <InputTextbox field={FormFields.comment} register={register} error={errors.comment}/>
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
