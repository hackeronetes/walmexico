import React, {useState, useEffect} from 'react'
import { Input } from '../common/Input';
import { InputSelect } from '../common/InputSelect';
import { InputTextbox } from '../common/InputTextbox';
import { useForm  } from 'react-hook-form';
import Captcha from '../common/Captcha'
import {  SecondryButton } from '../common/Buttons';
import { getBusinessLineOptions } from '../../services/localCommercial/localCommercialService';
import { InputReadAcceptTerms } from '../common/InputReadAcceptTerms';


// const landUseOptions = [
//     { value: '1', label: 'Allowed' },
//     { value: '2', label: 'Forbidden' },
//     { value: '3', label: 'Conditioned' },
// ]


type FormValues = {
    lineOfBusiness: string;
    lineBusinessSpecify: string;
    addressOfInterest: string;   
    feedback: string;
    description: string;
    captcha: string;
    readButton: string;
};

const FormFields:any = {
    lineOfBusiness: {
        id: 'lineOfBusiness',
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
    addressOfInterest: {
        id: 'addressOfInterest',
        placeholder: '',
        label: 'Direcciones de interés',
        validation: {
            required: {
                value: false,
                message: '',
            },
            maxLength: {
                value: 1000000,
                message: '10000 characters max',
            },
        }
    },
    feedback: {
        id: 'feedback',
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
    description: {
        id: 'description',
        placeholder: 'Ingrese',
        label: 'Descripción del uso que se le dará a la propiedad',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar la Descripción del uso',
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
                message: 'Debe ingresar Captcha',
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

export const LegalEntityStep2: React.FC<any> = (props) => {

    const { register, handleSubmit, formState: { errors }, setError, reset, getValues  } = useForm<FormValues>()
    const { loadCaptcha, validateCaptcha } = Captcha()
    const [ turnBusinessOptions, setTurnBusinessOptions ] = useState<any[]>([])
    const [lineBusinessId, setLineBusinessId] = useState<any>('');
    
    const handleLineBusinessChange = (value:any) => {
        setLineBusinessId(value)
    }



    useEffect(() => {
        if(props.formValues)
        {
            reset({
                lineOfBusiness: props.formValues.lineOfBusiness,
                lineBusinessSpecify: props.formValues.lineBusinessSpecify,
                addressOfInterest: props.formValues.addressOfInterest,
                feedback: props.formValues.feedback,
                description: props.formValues.description,
                captcha: props.formValues.captcha,
            });
        }
        
    }, [])

    useEffect(() => {
        getBusinessLineOptions().then((res:any) => {
            setTurnBusinessOptions(res.data)
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
                    <div className='col s12 m6'>
                        <InputSelect 
                            field={FormFields.lineOfBusiness} 
                            register={register} 
                            error={errors.lineOfBusiness} 
                            selectOptions={turnBusinessOptions}
                            optionLabel='dx_line_business_ds'
                            optionValue='sk_line_business_id'
                            onChange={handleLineBusinessChange} 
                        />
                            
                    </div>
                    <div className='col s12 m4'>
                        {lineBusinessId == -2 && (
                                <Input field={FormFields.lineBusinessSpecify} register={register} error={errors.lineBusinessSpecify}/>
                        )}
                    </div>
                </div>
                <div className='row'>
                    <div className='col s12'>
                        <Input field={FormFields.addressOfInterest} register={register} error={errors.addressOfInterest} />
                    </div>
                    
                </div>
                <div className='row'>
                    <div className='col s12'>
                        <Input field={FormFields.feedback} register={register} error={errors.feedback} />
                    </div>
                    
                </div>

                <div className='row'>
                    <div className='col s12'>
                        <InputTextbox field={FormFields.description} register={register} error={errors.description}/>
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
