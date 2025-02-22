import React, { useEffect, useState} from 'react'
import { Input } from '../common/Input';
import { InputRadio } from '../common/InputRadio';
import { useForm  } from 'react-hook-form';
import Captcha from '../common/Captcha'
import {  SecondryButton } from '../common/Buttons';
import { InputReadAcceptTerms } from '../common/InputReadAcceptTerms';

const typeOfPersonsOptions = [
    { value: '1', label: 'Si' },
    { value: '0', label: 'No' },
]


type FormValues = {
    prevPadron: string;
    subsidiariesWalmartFacility: string;
    subsidiaryWalmartMexico: string;
    captcha: string;
    readButton: string;
    previouslyPadronDs: string;
    previouslySubsidiaryDs: string;
    previouslySubsidiaryPadronDs: string;
    
    
};

const FormFields:any = {
    prevPadron: {
        id: 'prevPadron',
        placeholder: 'Anteriormente formó parte del padrón de Walmart?',
        label: '',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Superficie',
            },
            maxLength: {
                value: 50,  
                message: '50 characters max',
            },
           
        }
    },
    subsidiariesWalmartFacility: {
        id: 'subsidiariesWalmartFacility',
        placeholder: 'Anteriormente alguna de sus filiales formó parte del padrón de Walmart?',
        label: '',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Superficie',
            },
            maxLength: {
                value: 50,  
                message: '50 characters max',
            },
           
        }
    },
    subsidiaryWalmartMexico: {
        id: 'subsidiaryWalmartMexico',
        placeholder: 'Cuenta con alguna filial trabajando para Walmart de México?',
        label: '',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Superficie',
            },
            maxLength: {
                value: 50,  
                message: '50 characters max',
            },
           
        }
    },
    
    previouslyPadronDs: {
        id: 'previouslyPadronDs',
        placeholder: 'Ingrese',
        label: 'Especifique',
        validation: {
            required: {
                value: true,
                message: 'Debe especificar si formó parte del padrón de Walmart',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    previouslySubsidiaryDs: {
        id: 'previouslySubsidiaryDs',
        placeholder: 'Ingrese',
        label: 'Especifique',
        validation: {
            required: {
                value: true,
                message: 'Debe especificar si alguna de sus filiales formó parte del padrón de Walmart',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    previouslySubsidiaryPadronDs: {
        id: 'previouslySubsidiaryPadronDs',
        placeholder: 'Ingrese',
        label: 'Especifique',
        validation: {
            required: {
                value: true,
                message: 'Debe especificar si cuenta con alguna filial trabajando para Walmart',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    captcha: {
        id: 'captcha',
        placeholder: 'Ingrese',
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


let checkboxes:any = {
    prevPadron: true,
    subsidiariesWalmartFacility: true,
    subsidiaryWalmartMexico: true
}


export const ConstructionStep3: React.FC<any> = (props) => {

    const { register, handleSubmit, formState: { errors }, setError, reset,  getValues, watch  } = useForm<FormValues>()
    const { loadCaptcha, validateCaptcha } = Captcha()
    const [checkboxesState,  /*setCheckboxesState*/ ] = useState(checkboxes)

    
    const updateCheckboxState = () => {
        const formValues:any = watch()
        
        checkboxes.constructionBuilder = formValues.constructionBuilder
       
        for (let key in checkboxes) {
            if(formValues[key])
                checkboxes[key] = formValues[key] ;
        }

        console.log('checkboxesState', checkboxesState)
    }
    
    updateCheckboxState()
    


   
   

    useEffect(() => {
        if(Object.keys(props.formValues).length > 0 )
        {
            reset({
                prevPadron: props.formValues.prevPadron,
                previouslyPadronDs: props.formValues.previouslyPadronDs,
                subsidiariesWalmartFacility: props.formValues.subsidiariesWalmartFacility,
                previouslySubsidiaryDs: props.formValues.previouslySubsidiaryDs,
                subsidiaryWalmartMexico: props.formValues.subsidiaryWalmartMexico,
                previouslySubsidiaryPadronDs: props.formValues.previouslySubsidiaryPadronDs,
                captcha: props.formValues.captcha,
            });
        }
        else {
            reset({
                prevPadron: "1",
                subsidiariesWalmartFacility: "1",
                subsidiaryWalmartMexico: "1",
                
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
                    <div className='col s12 m6'>
                        <InputRadio field={FormFields.prevPadron} register={register} error={errors.prevPadron} radioOptions={typeOfPersonsOptions} selected={watch(FormFields.prevPadron.id) ? watch(FormFields.prevPadron.id) : "1"} />
                    </div>
                    <div className='col s12 m6'>
                        {checkboxes.prevPadron == 1 && (
                            <Input field={FormFields.previouslyPadronDs} register={register} error={errors.previouslyPadronDs}/>
                        )}
                    </div>
                    
                </div>
                <div className='row'>
                    <div className='col s12 m6'>
                        <InputRadio field={FormFields.subsidiariesWalmartFacility} register={register} error={errors.subsidiariesWalmartFacility} radioOptions={typeOfPersonsOptions} selected={watch(FormFields.subsidiariesWalmartFacility.id) ? watch(FormFields.subsidiariesWalmartFacility.id) : "1"} />
                    </div>
                    <div className='col s12 m6'>
                        {checkboxes.subsidiariesWalmartFacility == 1  && (
                            <Input field={FormFields.previouslySubsidiaryDs} register={register} error={errors.previouslySubsidiaryDs}/>
                        )}
                    </div>
                    
                </div>
                <div className='row'>
                    <div className='col s12 m6'>
                        <InputRadio field={FormFields.subsidiaryWalmartMexico} register={register} error={errors.subsidiaryWalmartMexico} radioOptions={typeOfPersonsOptions} selected={watch(FormFields.subsidiaryWalmartMexico.id) ? watch(FormFields.subsidiaryWalmartMexico.id) : "1"} />
                    </div>
                    <div className='col s12 m6'>
                        {checkboxes.subsidiaryWalmartMexico == 1 && (
                            <Input field={FormFields.previouslySubsidiaryPadronDs} register={register} error={errors.previouslySubsidiaryPadronDs}/>
                        )}
                    </div>
                    
                </div>

               
                <div className='row'>
                    <div className='col offset-m4 s12 m4'>
                        {loadCaptcha()}
                        <Input field={FormFields.captcha} register={register} error={errors.captcha}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col offset-m3 s12 m6'>
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
