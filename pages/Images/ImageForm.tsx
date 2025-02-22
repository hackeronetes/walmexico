import React, { useState, useEffect } from 'react'


import { MainTitle } from '../../components/common/Titles'
// import { postContactsEditApi } from '../../services/adminGeneral/adminGeneralService'
import { useLocation } from 'react-router-dom'
import { SecondryButton } from '../../components/common/Buttons'
import { postImageForm, putImageForm, getImageSection } from '../../services/adminContent/adminContentService'
import { useNavigate } from 'react-router-dom'
import RoutesConstants from '../../resources/route-constants'
import { Input } from '../../components/common/Input';
import { useForm } from 'react-hook-form';
import DatePickerInput from '../../components/common/DatePickerInput';
import { InputSelect } from '../../components/common/InputSelect';
import { InputFile } from '../../components/common/InputFile';
import ToggleButton from './../../components/common/ToggleButton';
import {formatDate} from '../../utility/commonFunctions'
import PopupModel from '../../components/popups/PopupModel'
import PopupContentCustom from '../../components/popups/PopupContentCustom'
import { POPUP_TYPE_ERROR, POPUP_TYPE_SUCCESS } from '../../resources/project-constants'

const positionOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },

]


type FormValues = {
    name: string;
    url: string;
    startDate: string;
    endDate: string;
    section: string;
    position: string;
    image: string;
    active: string;

};


let FormFields: any = {
    name: {
        id: 'name',
        placeholder: 'Ingrese',
        label: 'Nombre de la imagen',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar Nombre de la imagen.',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    url: {
        id: 'url',
        placeholder: 'Ingrese ',
        label: 'URL',
        validation: {
            required: {
                value: false,
                message: 'Debe ingresar nombre de la compañía',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    startDate: {
        id: 'startDate',
        placeholder: 'Ingrese',
        label: 'Fecha Inicio Publicación',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar Fecha de inicio de publicación.',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    endDate: {
        id: 'endDate',
        placeholder: 'Ingrese',
        label: 'Fecha Fin Publicación',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar Fecha de fin de publicación.',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    section: {
        id: 'section',
        placeholder: 'Ingrese',
        label: 'Sección',
        validation: {
            required: {
                value: true,
                message: 'Debe seleccionar Sección.',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    position: {
        id: 'position',
        placeholder: 'Ingrese',
        label: 'Indique posición',
        validation: {
            required: {
                value: false,
                message: 'Debe seleccionar Sección.',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },

    image: {
        id: 'image',
        placeholder: '',
        label: 'Imagen',
        validationCustom: {
            validate: '',
            required: {
                value: true,
                message: 'Debe seleccionar el(los) documento(s) adicional(es)',
            },
            
        },
    },
    active: {
        id: 'active',
        placeholder: 'Ingrese',
        label: 'Activo',
        validation: {
            required: {
                value: false,
                message: 'Debe ingresar teléfono',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },


}


let fileExtensions = ['jpg', 'png', 'jpeg']


export const ImageForm: React.FC = () => {

    const { register, handleSubmit, formState: { errors }, setValue, clearErrors, getValues, setError, reset } = useForm<FormValues>()

    const location = useLocation()
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const newImage = params.get('newImage');
    

    const [image, setImage] = useState<any>();
    const [editing, setEditing] = useState(false);

    const [startDate, setStartDate] = useState<any>();
    const [endDate, setEndDate] = useState<any>();

    const [sectionOptions, setSectionOptions] = useState<any>([])
    const [activeStatus, setActiveStatus] = useState(true);

    const [modelOpen, setModelOpen] = useState(false);
    const [popupType, setPopupType] = useState<any>('')

    function openModel(type:any){
        setPopupType(type)
        setModelOpen(true)
       
    }
    

    function getDropdownSection() {

        getImageSection().then((res: any) => {
           
            if (res.data)
                setSectionOptions(res.data)
            else
                setSectionOptions(res.data)
        })
            .catch((error: any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
                setSectionOptions([])
                console.log('getStateList error', error)
            })
    }

    
    const setImageObject = (obj: any) => {

        setImage(obj)
        reset({
            name: obj.imageDescription,
            url: obj.url,
            startDate: formatDate(obj.publicationStartDate),
            endDate: formatDate(obj.publicationEndDate),
            section: obj.sectionId,
            position: obj.orderNumber,
            active: obj.active,
           
        });
        
        setActiveStatus(obj.active)
        setStartDate(new Date(obj.publicationStartDate))
        setEndDate(new Date(obj.publicationEndDate))
       

    }

    const checkIsEditing = () => {
        
        if (location.hasOwnProperty('state')) {
            if (location.state) {
                setEditing(true)
                setImageObject(location.state.image)
            }



        }


    }

    

    useEffect(() => {
        checkIsEditing()

    }, [])




useEffect(() => {
    getDropdownSection()

}, [])


useEffect(() => {
    if(image)
        setValue('section', image.sectionId);
}, [sectionOptions])



const postForm = (data: any) => {
   
    

    if(editing)
    {
        data.id = image.imageId
        putImageForm(data).then(() => {
            openModel(POPUP_TYPE_SUCCESS)
        })
            .catch((error: any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
                openModel(POPUP_TYPE_ERROR)
                console.log('getStateList error', error)
            })
    }else{
     data.active = true;
    postImageForm(data).then(() => {
        
       
        openModel(POPUP_TYPE_SUCCESS)
    })
        .catch((error: any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            openModel(POPUP_TYPE_ERROR)
            console.log('getStateList error', error)
        })
    }
}


const validateFile = () => {

    let status = true

    const documents = [FormFields.image.id]

    documents.forEach(function (file: any) {
        let files: any = getValues(file)
        
        if (FormFields[file].validationCustom.required.value && files.length == 0) {
            setError(file, {
                type: "manual",
                message: "Debe seleccionar Imagen.",
            })
            status = false
        }

    })


    return status

}

const validateDatepickerDates = (data: any) => {

    //let files:any = getValues('documents')
   
   

    let status = true;

    if (!data.startDate) {
        setError("startDate", {
            type: "manual",
            message: "Debe ingresar Fecha de inicio de publicación.",
        })
        status = false
    }
    if (!data.endDate) {
        setError("endDate", {
            type: "manual",
            message: 'Debe ingresar Fecha de fin de publicación.',
        })
        status = false
    }



    return status

}

const onSubmit = handleSubmit((data) => {
   
    if (!validateDatepickerDates(data))
        return false

   

    if (!editing && !validateFile())
        return false
    
    postForm(data)


})






const handleCancelClick = () => {
    navigate(RoutesConstants.Images)
}


function handleStartDateChange(date: any) {

    clearErrors('startDate')
    setValue('startDate', date);
    setStartDate(date)
}

function handleEndDateChange(date: any) {

    clearErrors('endDate')
    setValue('endDate', date);
    setEndDate(date)
}

const handleToggleChange = (status: any) => {
    
    setValue('active', status);
}

function handleModelClose(){
    
    setModelOpen(false)
    navigate(RoutesConstants.Images)
}

return (
    <div className='page-container page-suppliers'>


        <div className='container main-container  mb-20'>
            <div className='page-content'>
                <section>
                    <div className="title-wrapper  mb-20">
                        <MainTitle text={newImage === '1'? 'Alta de Imagen' : 'Editar Imagen'} />
                    </div>

                </section>

                <div className='form-container'>
                    <form onSubmit={onSubmit}>
                        <div className='row'>

                            <div className='col s12  m6'>
                                <Input field={FormFields.name} register={register} error={errors.name} />
                            </div>
                            <div className='col s12  m6'>
                                <Input field={FormFields.url} register={register} error={errors.url} />
                            </div>



                        </div>

                        <div className='row'>
                            <div className='col s12  m6'>
                                <DatePickerInput
                                    label={'Fecha Inicio Publicación'}
                                    value={startDate}
                                    handleDateChange={(date: any) => handleStartDateChange(date)}
                                />
                                <div className="input-error">{errors.startDate && errors.startDate.message}</div>
                            </div>
                            <div className='col s12  m6'>
                                <DatePickerInput
                                    label={'Fecha Fin Publicación'}
                                    value={endDate}
                                    handleDateChange={(date: any) => handleEndDateChange(date)}
                                />
                                <div className="input-error">{errors.endDate && errors.endDate.message}</div>
                            </div>

                        </div>

                        <div className='row'>
                            <div className='col s12  m6'>
                                <InputSelect
                                    field={FormFields.section}
                                    register={register}
                                    error={errors.section}
                                    selectOptions={sectionOptions}
                                    optionLabel='sectionDescription'
                                    optionValue='sectionId'
                                />
                            </div>

                            <div className='col s12  m6'>
                                <InputSelect
                                    field={FormFields.position}
                                    register={register}
                                    error={errors.position}
                                    selectOptions={positionOptions}
                                    optionLabel='label'
                                    optionValue='value'
                                />
                            </div>

                        </div>

                        <div className='row'>
                            <div className='col s12  m6'>
                                <InputFile
                                    field={FormFields.image}
                                    register={register}
                                    error={errors.image}
                                    getValues={getValues}
                                    setValue={setValue}
                                    setError={setError}
                                    clearErrors={clearErrors}
                                    fileExtensions={fileExtensions}
                                />
                            </div>
                            <div className='col s12  m6'>
                                <ToggleButton  callbackToggle={(status:any) => handleToggleChange(status)}  checked={activeStatus} />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col  s12  m3 offset-m3'>
                                <SecondryButton onClick={handleCancelClick} className='submit-btn'>Regresar</SecondryButton>
                            </div>
                            <div className='col s12  m3'>
                                <input type="submit" className='submit-btn full-width' value='Siguiente' />
                            </div>
                        </div>

                    </form>


                </div>

            </div>
        </div>

        <PopupModel  isOpen={modelOpen} closePopup={handleModelClose} height='260px' width='30%'>
            <PopupContentCustom closePopup={handleModelClose} type={popupType}  />
        </PopupModel>
    </div>
)
}
