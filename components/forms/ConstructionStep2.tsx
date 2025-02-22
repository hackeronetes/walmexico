import React, { useState, useEffect} from 'react'
import { useForm  } from 'react-hook-form';
import { InputCheckbox } from '../common/InputCheckbox';
import { Input } from '../common/Input';
import { InputNumber } from '../common/InputNumber';
import { InputFile } from '../common/InputFile';
import  DatePickerInput  from '../common/DatePickerInput';

import { SecondryButton } from '../common/Buttons';

type FormValues = {
    builderWork: string;
    builderWorkDes: string;
	constructionSupervisor: string;
    constructionSupervisorDes: string;
	laboratory: string;
    laboratoryDes: string;
	designer: string;
    designerDes: string;
	electicalConnection: string;
    electicalConnectionDes: string;
	specialist: string;
    dnSpecialistDes: string;
	startDateOfOperation: string;
	areaOfOfficeFacilities: string;
	numberOfPermanentStaff: string;
	revenueBilled: string;
	workingCapital: string;
	curricularExperience: string;
	annualDeclaration: string;
	financialStatements: string;
   

};

let FormFields:any = {
    startDateOfOperation: {
        id: 'startDateOfOperation',
        placeholder: 'Enter Start Date',
        label: 'Fecha inicio de operaciones',
        validation: {
            required: {
                value: true,
                message: 'Debe especificar fecha de inicio de operaciones',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    builderWorkDes: {
        id: 'builderWorkDes',
        placeholder: '',
        label: 'Especifique',
        validation: {
            required: {
                value: true,
                message: 'Debe especificar constructor de obra',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    constructionSupervisorDes: {
        id: 'constructionSupervisorDes',
        placeholder: '',
        label: 'Especifique',
        validation: {
            required: {
                value: true,
                message: 'Debe especificar supervisor de obra',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    laboratoryDes: {
        id: 'laboratoryDes',
        placeholder: '',
        label: 'Especifique',
        validation: {
            required: {
                value: true,
                message: 'Debe especificar laboratorio',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    designerDes: {
        id: 'designerDes',
        placeholder: '',
        label: 'Especifique',
        validation: {
            required: {
                value: true,
                message: 'Debe especificar proyectista',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    electicalConnectionDes: {
        id: 'electicalConnectionDes',
        placeholder: '',
        label: 'Especifique',
        validation: {
            required: {
                value: true,
                message: 'Debe especificar Acometida electrica',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    dnSpecialistDes: {
        id: 'dnSpecialistDes',
        placeholder: '',
        label: 'Especifique',
        validation: {
            required: {
                value: true,
                message: 'Debe especificar Especialista',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    builderWork: {
        id: 'builderWork',
        placeholder: '',
        label: 'Constructor de obra',
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
    constructionSupervisor: {
        id: 'constructionSupervisor',
        placeholder: '',
        label: 'Supervisor de obra',
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
    laboratory: {
        id: 'laboratory',
        placeholder: '',
        label: 'Laboratorio',
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
    designer: {
        id: 'designer',
        placeholder: '',
        label: 'Proyectista',
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
    electicalConnection: {
        id: 'electicalConnection',
        placeholder: '',
        label: 'Acometida electrica',
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
    specialist: {
        id: 'specialist',
        placeholder: '',
        label: 'Especialista',
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
    areaOfOfficeFacilities: {
        id: 'areaOfOfficeFacilities',
        placeholder: '',
        label: 'Superficie de las instalaciones de su oficina (m²)',
        validation: {
            required: {
                value: true,
                message: 'Debe especificar la superficie de las instalaciones de su oficina',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    numberOfPermanentStaff: {
        id: 'numberOfPermanentStaff',
        placeholder: '',
        label: 'Número de personas que forman parte de su plantilla fija en oficina',
        validation: {
            required: {
                value: true,
                message: 'Debe especificar número de personas',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    curricularExperience: {
        id: 'curricularExperience',
        placeholder: '',
        label: 'Experiencia curricular (Sólo en trabajos para centros comerciales y naves industriales)',
        validationCustom: {
            validate: '',
            required: {
                value: true,
                message: 'Debe seleccionar el(los) documento(s) adicional(es)',
            },
            
        },
    },
    revenueBilled: {
        id: 'revenueBilled',
        placeholder: '',
        label: 'Ingresos facturados en el año inmediato anterior',
        validation: {
            required: {
                value: true,
                message: 'Debe especificar Capital de trabajo',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    annualDeclaration: {
        id: 'annualDeclaration',
        placeholder: '',
        label: 'Declaracion anual del ejercicio inmediato anterior',
        validationCustom: {
            validate: '',
            required: {
                value: true,
                message: 'Debe seleccionar el(los) documento(s) adicional(es)',
            },
            
        },
    },
    workingCapital: {
        id: 'workingCapital',
        placeholder: '',
        label: 'Capital de trabajo (No mayor a dos meses de antigüedad)',
        validation: {
            required: {
                value: true,
                message: 'Debe especificar Capital de trabajo',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    financialStatements: {
        id: 'financialStatements',
        placeholder: '',
        label: 'Estados financieros base para el cálculo del cápital de trabajo',
        validationCustom: {
            validate: '',
            required: {
                value: true,
                message: 'Debe seleccionar el(los) documento(s) adicional(es)',
            },
            
        },
    },
    




    
}



    
let fileExtensions= ['pdf' ,'ppt' ,'pptx', 'doc', 'docx' ] 



export const ConstructionStep2: React.FC<any> = (props) => {

    const { register, handleSubmit, formState: { errors }, reset, watch, setError, setValue, clearErrors, getValues } = useForm<FormValues>()
    //const [checkboxesState,  /*setCheckboxesState*/ ] = useState(checkboxes)
    const [startDateOfOperation, setStartDateOfOperation] = useState<any>();
    const [changeState, setChangeState] = useState<any>(true) // to change state of checkboxes
    const [checkboxes,setCheckboxes ] = useState<any>({
            builderWork: {
                state: false,
                enabled: true,
            },
            constructionSupervisor: {
                state: false,
                enabled: true,
            },
            laboratory: {
                state: false,
                enabled: true,
            },
            designer: {
                state: false,
                enabled: true,
            },
            electicalConnection: {
                state: false,
                enabled: true,
            },
            specialist: {
                state: false,
                enabled: true,
            },
        });
    
    //FormFields.test.validation.validate = validateFile()

    let uploadedFileNames = {
        curricularExperienceDocName:'',
        annualDeclarationDocName:'',
        financialStatementDocName:'',
    }
    
    const formValues2:any = watch()

    const visibleSupLab = (tempCheckboxs:any) => {
        let visible = !(tempCheckboxs.builderWork.state || tempCheckboxs.electicalConnection.state || tempCheckboxs.designer.state || tempCheckboxs.specialist.state);
        return visible;
    }
    

    
    const disableChekboxes = ( checked:any,  type:any) => {
        let tempCheckboxs = checkboxes
        tempCheckboxs[type].state = checked
        
        console.log('formValues2', formValues2)
        let chkSupLab = visibleSupLab(tempCheckboxs);

        switch(type)
        {
            case 'builderWork':
                tempCheckboxs.constructionSupervisor.enabled = chkSupLab;
                tempCheckboxs.laboratory.enabled = chkSupLab;
                break;
            
            case 'constructionSupervisor':
                if (!tempCheckboxs.constructionSupervisor.state && !tempCheckboxs.laboratory.state)
                {
                    tempCheckboxs.builderWork.enabled = true;
                    tempCheckboxs.designer.enabled = true;
                    tempCheckboxs.electicalConnection.enabled = true;
                    tempCheckboxs.specialist.enabled = true;
                }
                else
                {
                    tempCheckboxs.builderWork.enabled = false;
                    tempCheckboxs.designer.enabled = false;
                    tempCheckboxs.electicalConnection.enabled = false;
                    tempCheckboxs.specialist.enabled = false;
                }
                setCheckboxes(tempCheckboxs)
                
                break;
            case 'laboratory':
                if (!tempCheckboxs.laboratory.state && !tempCheckboxs.constructionSupervisor.state)
                {
                    tempCheckboxs.builderWork.enabled = true;
                    tempCheckboxs.designer.enabled = true;
                    tempCheckboxs.electicalConnection.enabled = true;
                    tempCheckboxs.specialist.enabled = true;
                }
                else
                {
                    tempCheckboxs.builderWork.enabled = false;
                    tempCheckboxs.designer.enabled = false;
                    tempCheckboxs.electicalConnection.enabled = false;
                    tempCheckboxs.specialist.enabled = false;
                }
                setCheckboxes(tempCheckboxs)
                break;
            case 'designer':
                tempCheckboxs.constructionSupervisor.enabled = chkSupLab;
                tempCheckboxs.laboratory.enabled = chkSupLab;
                break;
            case 'electicalConnection':
                tempCheckboxs.constructionSupervisor.enabled = chkSupLab;
                tempCheckboxs.laboratory.enabled = chkSupLab;
                break;
            case 'specialist':
                tempCheckboxs.constructionSupervisor.enabled = chkSupLab;
                tempCheckboxs.laboratory.enabled = chkSupLab;
                break;
            
        }

        setChangeState(!changeState)
        //setTest(false)

    }

    

    const handleCheckboxChange = (checked:any, checkbox:any) => {
        
       // setTest(!test)
        disableChekboxes( checked,checkbox )
        //updateCheckboxState()
    }

    
   
    const validateFile = () => {

        let status = true

        const documents = [FormFields.curricularExperience.id, FormFields.annualDeclaration.id, FormFields.financialStatements.id]

        documents.forEach(function(file:any) {
            let files:any = getValues(file)

            if(files.length > 0 && file ==FormFields.curricularExperience.id )
            {
                uploadedFileNames.curricularExperienceDocName = files[0].name
            }
            if(files.length > 0 && file == FormFields.annualDeclaration.id )
            {
                uploadedFileNames.annualDeclarationDocName = files[0].name
            }
            if(files.length > 0 && file == FormFields.financialStatements.id )
            {
                uploadedFileNames.financialStatementDocName = files[0].name
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

    const validateDatepickerDates = (data:any) => {

        
        let status = true;

        if(!data.startDateOfOperation)
        {
            setError("startDateOfOperation", {
                type: "manual",
                message: "Debe ingresar fecha de inicio",
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

        let dataFinal = {...data, ...uploadedFileNames};

        props.saveFormValues(dataFinal);
        props.handleNextClick()
        
       
    })

    

    function handleDateChange( date:any) {
        
            clearErrors('startDateOfOperation')
            setValue('startDateOfOperation', date);
            setStartDateOfOperation(date)
       
            
    }

    function handlePreviousClick()  {
        props.saveFormValues(getValues())
        props.handlePreviousClick()
       
    }
    
    

    useEffect(() => {
        if(props.formValues)
        {
            reset({
                builderWork: props.formValues.builderWork,
                constructionSupervisor: props.formValues.constructionSupervisor,
                laboratory: props.formValues.laboratory,
                designer: props.formValues.designer,
                electicalConnection: props.formValues.electicalConnection,
                specialist: props.formValues.specialist,
                startDateOfOperation: props.formValues.startDateOfOperation,
                areaOfOfficeFacilities: props.formValues.areaOfOfficeFacilities,
                numberOfPermanentStaff: props.formValues.numberOfPermanentStaff,
                revenueBilled: props.formValues.revenueBilled,
                workingCapital: props.formValues.workingCapital,
                curricularExperience: props.formValues.curricularExperience,
                annualDeclaration: props.formValues.annualDeclaration,
                financialStatements: props.formValues.financialStatements,
                builderWorkDes: props.formValues.builderWorkDes,
                constructionSupervisorDes: props.formValues.constructionSupervisorDes,
                laboratoryDes: props.formValues.laboratoryDes,
                designerDes: props.formValues.designerDes,
                electicalConnectionDes: props.formValues.electicalConnectionDes,
                dnSpecialistDes: props.formValues.dnSpecialistDes,
               
            });
            
            setStartDateOfOperation(props.formValues.startDateOfOperation)

        }
        
    }, [])

    return (
        <div className='form-container'>
            <form onSubmit={onSubmit}>
                <div className='row'>
                    <div className='col s12'>
                        <div className='price-notice'>* Por favor ingrese los montos en su modeda local</div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col s12 m4'>
                        Especialidad solicitada
                    </div>
                    <div className='col s12 m4'>

                        { /*
                        <div>
                            <label className="input-label">Fecha de Inicio</label>
                        </div>
                        <div className='datepicker-container'>
                            <DatePicker selected={startDateOfOperation} onChange={(date:any) => handleDateChange( date)} />
                            <Image className="datepicker-img" name="icon_calendar.png" />
                        </div>
                        */}

                        <DatePickerInput 
                            label={'Fecha inicio de operaciones'}
                            value={startDateOfOperation}
                            handleDateChange={(date:any) => handleDateChange(date)}
                        />
                        <div className="input-error">{errors.startDateOfOperation && errors.startDateOfOperation.message}</div>
                    </div>
                </div>
                <div className='row'>
                    
                    <div className='col s12 m4'>
                        <InputCheckbox 
                            field={FormFields.builderWork} 
                            register={register}
                            error={errors.builderWork} 
                            disabled={!checkboxes.builderWork.enabled}
                            handleOnChange={(checked:any) => handleCheckboxChange(checked, 'builderWork')}
                        />
                    </div>
                    <div className='col s12 m4'>
                        
                        {checkboxes.builderWork.state && (
                            <Input field={FormFields.builderWorkDes} register={register} error={errors.builderWorkDes}/>
                        )}
                        
                    </div>
                    
                </div>
               <div className='row'>
                    
                    <div className='col s12 m4'>
                        <InputCheckbox
                            field={FormFields.constructionSupervisor} 
                            register={register} 
                            error={errors.constructionSupervisor} 
                            disabled={!checkboxes.constructionSupervisor.enabled}
                            handleOnChange={(checked:any) => handleCheckboxChange(checked, 'constructionSupervisor')}
                        />
                    </div>
                    <div className='col s12 m4'>
                        
                        {checkboxes.constructionSupervisor.state && (
                            <Input field={FormFields.constructionSupervisorDes} register={register} error={errors.constructionSupervisorDes}/>
                        )}
                    </div>
                    <div className='col s12 m4'>
                        
                    </div>
                </div>
                 <div className='row'>
                    
                    <div className='col s12 m4'>
                        <InputCheckbox 
                            field={FormFields.laboratory}
                            register={register} 
                            error={errors.laboratory} 
                            disabled={!checkboxes.laboratory.enabled}
                            handleOnChange={(checked:any) => handleCheckboxChange(checked, 'laboratory')}
                        />
                    </div>
                    <div className='col s12 m4'>
                        
                        {checkboxes.laboratory.state && (
                            <Input field={FormFields.laboratoryDes} register={register} error={errors.laboratoryDes}/>
                        )}
                    </div>
                    <div className='col s12 m4'>
                        
                    </div>
                </div>
                 <div className='row'>
                    
                    <div className='col s12 m4'>
                        <InputCheckbox 
                            field={FormFields.designer} 
                            register={register} 
                            error={errors.designer} 
                            disabled={!checkboxes.designer.enabled}
                            handleOnChange={(checked:any) => handleCheckboxChange(checked, 'designer')}
                        />
                    </div>
                    <div className='col s12 m4'>
                        
                        {checkboxes.designer.state && (
                            <Input field={FormFields.designerDes} register={register} error={errors.designerDes}/>
                        )}
                    </div>
                    <div className='col s12 m4'>
                        
                    </div>
                </div>
                <div className='row'>
                    
                    <div className='col s12 m4'>
                        <InputCheckbox 
                            field={FormFields.electicalConnection} 
                            register={register} 
                            error={errors.electicalConnection} 
                            disabled={!checkboxes.electicalConnection.enabled}
                            handleOnChange={(checked:any) => handleCheckboxChange(checked, 'electicalConnection')}
                        />
                    </div>
                    <div className='col s12 m4'>
                       
                        {checkboxes.electicalConnection.state && (
                             <Input field={FormFields.electicalConnectionDes} register={register} error={errors.electicalConnectionDes}/>
                        )}
                    </div>
                    <div className='col s12 m4'>
                        
                    </div>
                </div>
                <div className='row'>
                    <div className='col s12 m4'>
                        <InputCheckbox 
                            field={FormFields.specialist} 
                            register={register} 
                            error={errors.specialist} 
                            disabled={!checkboxes.specialist.enabled}
                            handleOnChange={(checked:any) => handleCheckboxChange(checked, 'specialist')}
                        />
                    </div>
                    <div className='col s12 m4'>
                       
                        {checkboxes.specialist.state && (
                            <Input field={FormFields.dnSpecialistDes} register={register} error={errors.dnSpecialistDes}/>
                        )}
                    </div>
                    <div className='col s12 m4'>
                        
                    </div>
                </div> 
                <div className='row'>
                    <div className='col s12 m4'>
                        <InputNumber field={FormFields.areaOfOfficeFacilities} register={register} error={errors.areaOfOfficeFacilities} setValue={setValue} watch={watch} setError={setError} clearErrors={clearErrors} />
                    </div>
                    <div className='col s12 m4'>
                       
                        <InputNumber field={FormFields.numberOfPermanentStaff} register={register} error={errors.numberOfPermanentStaff} setValue={setValue} watch={watch} setError={setError} clearErrors={clearErrors} showZero={false} />
                    </div>
                    <div className='col s12 m4'>
                        <InputFile field={FormFields.curricularExperience} 
                            register={register} 
                            error={errors.curricularExperience}  
                            getValues={getValues}  
                            setValue={setValue} 
                            setError={setError} 
                            clearErrors={clearErrors} 
                            fileExtensions={fileExtensions}
                            fromName='construction1'
                        />
                    </div>
                </div> 
                <div className='row'>
                    <div className='col s12 m4'>
                        <div className='price-dollar-div'>
                            $
                        </div>
                        <div className='price-input'>
                            <InputNumber 
                                field={FormFields.revenueBilled} 
                                register={register}
                                error={errors.revenueBilled} 
                                setValue={setValue} 
                                watch={watch} 
                                setError={setError} 
                                clearErrors={clearErrors} 
                            />
                        </div>
                    </div>
                    <div className='col s12 m4'>
                        <InputFile 
                            field={FormFields.annualDeclaration} 
                            register={register} 
                            error={errors.annualDeclaration} 
                            getValues={getValues}  
                            setValue={setValue} 
                            setError={setError} 
                            clearErrors={clearErrors} 
                            fileExtensions={fileExtensions}
                            fromName='construction2'
                        />
                    </div>
                </div> 
                <div className='row'>
                    <div className='col s12 m4'>
                        <div className='price-dollar-div'>
                            $
                        </div>
                        <div className='price-input'>
                            <InputNumber 
                                field={FormFields.workingCapital} 
                                register={register}
                                error={errors.workingCapital} 
                                setValue={setValue} 
                                watch={watch} 
                                setError={setError} 
                                clearErrors={clearErrors} 
                            />
                        </div>
                    </div>
                    <div className='col s12 m4'>
                        <InputFile 
                            field={FormFields.financialStatements} 
                            register={register} 
                            error={errors.financialStatements}  
                            getValues={getValues}  
                            setValue={setValue} 
                            setError={setError} 
                            clearErrors={clearErrors} 
                            fileExtensions={fileExtensions}
                            fromName='construction3'
                        />
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

            
            {/* <div>
                {changeState && ''}
            </div> */}
            
            
        </div>
    )
}
