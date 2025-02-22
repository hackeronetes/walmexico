import React, {useEffect} from 'react'
import { Input } from '../common/Input';
import { InputRadio } from '../common/InputRadio';
import { InputTextbox } from '../common/InputTextbox';
import { InputFile } from '../common/InputFile';
import { useForm  } from 'react-hook-form';
import Captcha from '../common/Captcha'
import {  SecondryButton } from '../common/Buttons';
import { InputReadAcceptTerms } from '../common/InputReadAcceptTerms';
import { getUploadedFiles } from '../../store/fileUploadReducer';
import {useAppSelector} from '../../store/hooks';
import axios from 'axios';
import {uploadFilesMaterial as uploadFilesUrl} from '../../../src/resources/api-constants'

const manufacturerOptions = [
    { value: '1', label: 'Fabricante' },
    { value: '0', label: 'Distribuidor' },
]

const salesExOptions = [
    { value: '1', label: 'Si' },
    { value: '0', label: 'No' },
]



type FormValues = {
    productName: string;
    productType: string;
    salesEx: string;
    coverLetter: string;
    technical: string;
    comment: string;
    captcha: string;
    readButton: string;
};

const FormFields:any = {
    productName: {
        id: 'productName',
        placeholder: 'Ingrese',
        label: 'Nombre del producto',
        validation: {
            required: {
                value: true,
                message: 'Introducir su nombre',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    productType: {
        id: 'productType',
        placeholder: '¿Fabricante o Distribuidor?',
        label: '¿Fabricante o Distribuidor?',
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
    salesEx: {
        id: 'salesEx',
        placeholder: '¿Exclusividad de venta?',
        label: '¿Exclusividad de venta?',
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
    coverLetter: {
        id: 'coverLetter',
        placeholder: 'Enter',
        label: 'Carta de presentación',
        validationCustom: {
            validate: '',
            required: {
                value: true,
                message: 'Debe seleccionar el(los) documento(s) adicional(es)',
            },
            
        },
    },
    technical: {
        id: 'technical',
        placeholder: 'Enter Start Date',
        label: 'Especificaciones técnicas del producto',
        validationCustom: {
            validate: '',
            required: {
                value: true,
                message: 'Debe seleccionar el(los) documento(s) adicional(es)',
            },
            
        },
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

export const Material2: React.FC<any> = (props) => {

    const { loadCaptcha, validateCaptcha } = Captcha()
    const { register, handleSubmit, formState: { errors }, reset,  setValue, getValues, clearErrors, setError, watch } = useForm<FormValues>()

    const uploadedFiles = useAppSelector(getUploadedFiles);
    
    let productType = ''

    let uploadedFileNames = {
        presentationLetterDocName:'',
        technicalSepcificationDocName:'',
    }

    const updateCheckboxState = () => {
        productType = watch(FormFields.productType.id)
       
    }
    
    updateCheckboxState()
    
    
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

    function handlePreviousClick()  {
        props.saveFormValues(getValues())
        props.handlePreviousClick()
       
    }

    const validateFile = () => {

        let status = true

        const documents = [FormFields.coverLetter.id, FormFields.technical.id]

        documents.forEach(function(file:any) {

            let files:any = getValues(file)

            if(files.length > 0 && file ==FormFields.coverLetter.id )
            {
                uploadedFileNames.presentationLetterDocName = files[0].name
            }
            if(files.length > 0 && file == FormFields.technical.id )
            {
                uploadedFileNames.technicalSepcificationDocName = files[0].name
            }

            if(FormFields[file].validationCustom.required.value && files.length == 0)
            {
                setError(file, {
                    type: "manual",
                    message: "Debe seleccionar el(los) documento(s) adicional(es)",
                })
                status =  false
            }

        })


            
        return status
       
    }

    const uploadFiles = async(filesParam: any)=>{
        if(filesParam && filesParam.length){
            const formData = new FormData();
            for(let i = 0; i< filesParam.length; i++){
                formData.append('files', filesParam[i]);
            }
            try {
                await axios.post(uploadFilesUrl(), formData);
            } catch (error) {
                console.log('error while uploading files from local commercial2 is: ', error);
            }
        }
    }

    const onSubmit = handleSubmit((data) => {

        if(!validateFile())
            return false

        if(!validateCaptchaInput(data.captcha))
            return false
        
        uploadFiles(uploadedFiles);
        
        let dataFinal = {...data, ...uploadedFileNames};

        props.submitForm(dataFinal);
        props.handleNextClick()
       
    })

    useEffect(() => {
        if(Object.keys(props.formValues).length > 0)
        {
            reset({
                productName: props.formValues.productName,
                productType: props.formValues.productType,
                salesEx: props.formValues.salesEx,
                coverLetter: props.formValues.coverLetter,
                technical: props.formValues.technical,
                comment: props.formValues.comment,
                

            });
        }
        else {
            reset({
                productType: "1",
                salesEx: "1",
            });
        }
        


        
    }, [])


    return (
        <div className='form-container'>
            <form onSubmit={onSubmit}>
                <div className='row'>
                    <div className='col s12 m4'>
                        <Input field={FormFields.productName} register={register} error={errors.productName} />
                    </div>
                    <div className='col s12 m4'>
                        <InputRadio field={FormFields.productType} register={register} error={errors.productType} radioOptions={manufacturerOptions} selected={watch(FormFields.productType.id) ? watch(FormFields.productType.id) : "1"}/>
                    </div>
                    <div className='col s12 m4'>
                        {productType === '0' && (
                            <InputRadio field={FormFields.salesEx} register={register} error={errors.salesEx} radioOptions={salesExOptions} selected={watch(FormFields.salesEx.id)}/>
                        )}
                        
                    </div>
                    
                </div>

                <div className='row'>
                    
                   
                    
                </div>

                <div className='row'>
                    <div className='col s12 m4'>
                        <InputFile field={FormFields.coverLetter} register={register} error={errors.coverLetter} getValues={getValues}  setValue={setValue} setError={setError} clearErrors={clearErrors} fromName='materials1' />
                    </div>
                    <div className='col s12 m4'>
                        
                        <InputFile field={FormFields.technical} register={register} error={errors.technical} getValues={getValues}  setValue={setValue} setError={setError} clearErrors={clearErrors} fromName='materials2'/>
                    </div>
                   
                </div>

                <div className='row'>
                    <div className='col s12'>
                        <InputTextbox field={FormFields.comment} register={register} error={errors.comment} />
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
