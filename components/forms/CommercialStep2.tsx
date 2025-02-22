import React, {useState, useEffect} from 'react'
import { Input } from '../common/Input';
import { InputSelect } from '../common/InputSelect';
import { InputTextbox } from '../common/InputTextbox';
import { InputFile } from '../common/InputFile';
import { InputNumber } from '../common/InputNumber';
import { useForm  } from 'react-hook-form';
import {  SecondryButton } from '../common/Buttons';
import { getBusinessLineOptions } from '../../services/localCommercial/localCommercialService';
import { getUploadedFiles } from '../../store/fileUploadReducer';
import {useAppSelector} from '../../store/hooks';
import axios from 'axios';
import {uploadFiles as uploadFilesUrl} from '../../../src/resources/api-constants';

// const landUseOptions = [
//     { value: '1', label: 'Allowed' },
//     { value: '2', label: 'Forbidden' },
//     { value: '3', label: 'Conditioned' },
// ]



type FormValues = {
    ofData: string;
    toData: string;
    lineBusinessId: string;
    lineBusinessSpecify: string;
    twistDescription: string;
    specialRequirements: string;
    document: string;
    interest: string;
    
};

const FormFields:any = {
    ofData: {
        id: 'ofData',
        placeholder: 'Ingrese',
        label: 'M² Requeridos',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar los metros',
            },
            maxLength: {
                value: 9,  
                message: 'Valor fuera del rango permitido',
            },
            // pattern: {
            //     value: /^[0-9]+$/,
            //     message: 'Debe ingresar números',
            // },
        }
    },
    toData: {
        id: 'toData',
        placeholder: 'Ingrese',
        label: '',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar los metros',
            },
            maxLength: {
                value: 9,  
                message: 'Valor fuera del rango permitido',
            },
            // minLength: {
            //     value: 10,  
            //     message: '10 characters min',
            // },
            // pattern: {
            //     value: /^[0-9]+$/,
            //     message: 'Debe ingresar números',
            // },
        }
    },
    lineBusinessId: {
        id: 'lineBusinessId',
        placeholder: 'Seleccione',
        label: 'Giro de la empresa',
        validation: {
            required: {
                value: true,
                message: 'Debe seleccionar el giro de la empresa',
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
    twistDescription: {
        id: 'twistDescription',
        placeholder: 'Ingrese',
        label: 'Descripción del giro',
        validation: {
            required: {
                value: true,
                message: 'Ingrese la descripcion del giro',
            },
            maxLength: {
                value: 500,
                message: '500 characters max',
            },
        }
    },
    specialRequirements: {
        id: 'specialRequirements',
        placeholder: 'Ingrese',
        label: 'Requerimientos Especiales',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar requerimientos especiales',
            },
            maxLength: {
                value: 500,
                message: '500 characters max',
            },
        }
    },
    document: {
        id: 'document',
        placeholder: '0.00',
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
        //         message: 'Debe seleccionar el(los) documento(s) adicional(es)',
        //     },
        //     maxLength: {
        //         value: 50,
        //         message: '50 characters max',
        //     },
        // }
    },
    interest: {
        id: 'interest',
        placeholder: 'SC PLAYA DEL CARMEN, L02',
        label: 'Tiendas de interés',
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
    

    
}

export const CommercialStep2: React.FC<any> = (props) => {

    const { register, handleSubmit, formState: { errors }, setError, watch,  reset, setValue, getValues, clearErrors  } = useForm<FormValues>()
    
    const [ businessLineOptions, setBusinessLineOptions ] = useState<any[]>([])
    const [lineBusinessId, setLineBusinessId] = useState<any>('');

    const watchToData = watch("toData")
    const watchOfData = watch("ofData")
   

    const handleLineBusinessChange = (value:any) => {
        
        setLineBusinessId(value)
    }

    const validateToData = () => {
        
        if(parseFloat(watchToData) < parseFloat(watchOfData))
        {
           
            setError("toData", {
                type: "manual",
                message: "No puede ser menor",
            })
            return false
        }
        else
        {
           
            clearErrors("toData")
        }
        return true
    }

    const uploadedFiles = useAppSelector(getUploadedFiles);

    useEffect(() => {
        if(props.formValues)
        {
            reset({
                ofData: props.formValues.ofData,
                toData: props.formValues.toData,
                lineBusinessId: props.formValues.lineBusinessId,
                lineBusinessSpecify: props.formValues.lineBusinessSpecify,
                twistDescription: props.formValues.twistDescription,
                specialRequirements: props.formValues.specialRequirements,
                document: props.formValues.document,
                interest: props.formValues.interest,
            });
        }
        
    }, [])

    useEffect(() => {
        getBusinessLineOptions().then((res:any) => {
            
            setBusinessLineOptions(res.data)
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            console.log('getStateList error', error)
        })

        
    }, [])

    useEffect (() => {
       
        if(props.formValues.lineBusinessId)
            setValue(FormFields.lineBusinessId.id, props.formValues.lineBusinessId)
     }, [businessLineOptions])

    

    const validateFile = () => {

        let files:any = getValues('document')
       
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

        if(!validateToData())
            return false
       

        if(!validateFile())
            return false

        

        uploadFiles(uploadedFiles);
        props.saveFormValues(data)
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
                    <div className='col s12 m3'>
                        <div className='price-dollar-div'>
                            De
                        </div>
                        <div className='price-input'>
                            <InputNumber 
                                field={FormFields.ofData} 
                                register={register} 
                                error={errors.ofData} 
                                setValue={setValue} 
                                watch={watch} 
                                setError={setError} 
                                clearErrors={clearErrors}
                                onBlur={validateToData}
                            />
                        </div>
                    </div>
                    <div className='col s12 m3'>
                        <div className='price-dollar-div'>
                            A
                        </div>
                        <div className='price-input'>
                            <InputNumber 
                                field={FormFields.toData} 
                                register={register} 
                                error={errors.toData} 
                                setValue={setValue} 
                                watch={watch} 
                                setError={setError} 
                                clearErrors={clearErrors} 
                                onBlur={validateToData}
                            />
                        </div>
                    </div>
                    <div className='col s12 m6'>
                        <InputSelect 
                            field={FormFields.lineBusinessId} 
                            register={register} 
                            error={errors.lineBusinessId} 
                            selectOptions={businessLineOptions}
                            onChange={handleLineBusinessChange} 
                            optionLabel='dx_line_business_ds'
                            optionValue='sk_line_business_id'
                        />
                    </div>
                    <div className='col s12 m3'>
                        {lineBusinessId == -2 && (
                                <Input field={FormFields.lineBusinessSpecify} register={register} error={errors.lineBusinessSpecify}/>
                        )}
                    </div>
                    
                </div>

                <div className='row'>
                    <div className='col s12'>
                        <InputTextbox field={FormFields.twistDescription} register={register} error={errors.twistDescription}/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col s12 m4'>
                        <Input field={FormFields.specialRequirements} register={register} error={errors.specialRequirements}/>
                    </div>
                    
                    <div className='col s12 m4'>
                        <InputFile field={FormFields.document} register={register} error={errors.document}  getValues={getValues}  setValue={setValue} setError={setError} clearErrors={clearErrors} fromName='comercial2'/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col s12'>
                        <Input disabled={true} field={FormFields.interest} register={register} error={errors.interest} />
                    </div>
                </div>
                

                <div className='row'>
                    <div className='col offset-m2 s12 m4'>
                        <SecondryButton onClick={handlePreviousClick} className='submit-btn'>Regresar</SecondryButton>
                    </div>
                    <div className='col s12 m4'>
                        <input type="submit" className='submit-btn' value='Siguiente'/>
                    </div>
                </div>

            </form>
            
            
        </div>
    )
}
