import React, { useState, useEffect } from 'react'


import { MainTitle } from '../../../components/common/Titles'
// import { postContactsEditApi } from '../../services/adminGeneral/adminGeneralService'
import { useLocation } from 'react-router-dom'
import { SecondryButton } from '../../../components/common/Buttons'
import { postNewsUpdate, postNewsCreate } from '../../../services/adminContent/adminContentService'
import { useNavigate } from 'react-router-dom'
import RoutesConstants from '../../../resources/route-constants'
import { Input } from '../../../components/common/Input';
import { useForm } from 'react-hook-form';
import DatePickerInput from '../../../components/common/DatePickerInput';
import { InputSelect } from '../../../components/common/InputSelect';
import { InputFile } from '../../../components/common/InputFile';
import { getSectionOptions } from '../../../services/userRole/userRoleService'
import ToggleButton from '../../../components/common/ToggleButton';
// import { formatDate } from '../../../utility/commonFunctions'
import { InputTextbox } from '../../../components/common/InputTextbox';
import PopupContentCustom from '../../../components/popups/PopupContentCustom'
import PopupModel from '../../../components/popups/PopupModel'
import {POPUP_TYPE_SUCCESS, POPUP_TYPE_ERROR} from '../../../resources/project-constants'
import { formatDateNotes } from '../../../utility/commonFunctions'
import { useAppDispatch } from '../../../store/hooks'
import { setLoader } from '../../../store/loaderReducer'


type FormValues = {
    name: string;
    url: string;
    startDate: string;
    endDate: string;
    section: string;
    content: string;
    image: string;
    active: string;
    priority: string;
    home: string;

};


let FormFields: any = {
    name: {
        id: 'name',
        placeholder: 'Ingrese',
        label: 'Título',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar Título',
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
        label: 'Fecha Fin de Publicación',
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
    content: {
        id: 'content',
        placeholder: 'Ingrese',
        label: 'Texto',
        validation: {
            required: {
                value: false,
                message: 'Debe seleccionar Sección.',
            },
            maxLength: {
                value: 500,
                message: '500 characters max',
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
    priority: {
        id: 'priority',
        placeholder: 'Ingrese',
        label: 'Prioridad',
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
    home: {
        id: 'home',
        placeholder: 'Ingrese',
        label: 'Home',
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


export const NewsForm: React.FC = () => {

    const { register, handleSubmit, formState: { errors }, setValue, clearErrors, getValues, setError, reset } = useForm<FormValues>()

    const location = useLocation()
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const params = new URLSearchParams(location.search);
    const newNews = params.get('newNews');

    const [image, setImage] = useState<any>({});
    const [editing, setEditing] = useState(false);

    const [startDate, setStartDate] = useState<any>();
    const [endDate, setEndDate] = useState<any>();

    const [toggleHome, setToggleHome] = useState<any>(true);
    const [togglePriority, setTogglePriority] = useState<any>(true);
    const [toggleActive, setToggleActive] = useState<any>(true);

    const [sectionOptions, setSectionOptions] = useState<any>([])

    const [modalIsOpen, setIsOpen] = useState(false);
    const [popupType, setPopupType] = useState<any>('')



    function getDropdownSection() {
        let tempparams:any = {page: 0}
        getSectionOptions(tempparams).then((res: any) => {
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
            name: obj.articleTitle,
            url: obj.articleUrl,
            startDate: obj.publicationStartDate,
            endDate: (obj.publicationEndDate),
            section: obj.sectionId,
            active: obj.active,
            priority: obj.priority,
            home: obj.home,
            content: obj.articleText,

        });

        setToggleHome(obj.home)
        setTogglePriority(obj.priority)
        setToggleActive(obj.active)
        setStartDate(new Date(obj.publicationStartDate))
        setEndDate(new Date(obj.publicationEndDate))

        //setStartDate(obj.publicationStartDate)
        //setEndDate(obj.publicationEndDate)


    }

    const checkIsEditing = () => {
        if (location.hasOwnProperty('state')) {
            if (location.state) {
                setEditing(true)
                setImageObject(location.state.item)
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
        if(image.sectionId)
            setValue(FormFields.section.id, image.sectionId)
            // setValue(FormFields.section.id,2)
    }, [sectionOptions])

    function handleModelClose(){
        setIsOpen(false)
        navigate(RoutesConstants.NewsIndex)
    }

    function openModel(type:any){
       setPopupType(type)
        setIsOpen(true)
       
    }

    const postForm = (data: any) => {

       
        dispatch(setLoader(true));

        const dataTemp:any = {
            articleTitle: data.name,
            articleText: data.content,
            articleUrl: data.url,
            sectionId: parseInt(data.section),
            isPriority: data.priority ? data.priority : false,
            isHome: data.home ? data.home : false,
            isActive: data.active ? data.active : false,
            publicationStartDate: formatDateNotes(data.startDate),
            publicationEndDate: formatDateNotes(data.endDate),
            articleImage: null,
        }

        if( data.image  &&  data.image.length > 0)
            dataTemp.articleImage= data.image[0]

       

        // if(1 == 1)
        //     return false;

        if (editing) {
            dataTemp.articleId = image.articleId
            postNewsUpdate(dataTemp).then(() => {
                openModel(POPUP_TYPE_SUCCESS)
                dispatch(setLoader(false));
                //navigate(RoutesConstants.NewsIndex)
            })
                .catch((error: any) => {
                    //alert('Something went wrong')
                    //setSelectStateOptions([])
                    openModel(POPUP_TYPE_ERROR)
                    dispatch(setLoader(false));
                    console.log('getStateList error', error)
                })
        }
        else
        {
            postNewsCreate(dataTemp).then(() => {
                openModel(POPUP_TYPE_SUCCESS)
                dispatch(setLoader(false));
                //navigate(RoutesConstants.NewsIndex)
            })
                .catch((error: any) => {
                    //alert('Something went wrong')
                    //setSelectStateOptions([])
                    openModel(POPUP_TYPE_ERROR)
                    dispatch(setLoader(false));
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
        navigate(RoutesConstants.NewsIndex)
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

    const handleToggleChange = (status: any, type: string) => {
        if(type == 'active')
        {
            setToggleActive(status)
            setValue('active', status);
        }
        if(type == 'priority')
        {
            setTogglePriority(status)
            setValue('priority', status);
        }
        if(type == 'home')
        {
            setToggleHome(status)
            setValue('home', status);
        }
        
    }

    return (
        <div className='page-container page-suppliers'>


            <div className='container main-container  mb-20'>
                <div className='page-content'>
                    <section>
                        <div className="title-wrapper  mb-20">
                            <MainTitle text={newNews === '1'? 'Nuevo Noticias' : 'Editar Noticias'} />
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
                                        label={'Fecha Fin de Publicación'}
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
                                        optionLabel='sectionName'
                                        optionValue='id'

                                    />
                                </div>



                            </div>

                            <div className='row'>
                                <div className='col s12  m6'>
                                    <InputTextbox field={FormFields.content} register={register} error={errors.content} />
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
                                <div className='col s12  m12 l6'>
                                    <div>
                                       <div> Activo</div>
                                        <ToggleButton callbackToggle={(status: any) => handleToggleChange(status, 'active')} checked={toggleActive} />
                                        
                                    </div>
                                    <div>
                                        <div> Prioridad</div>
                                        <ToggleButton callbackToggle={(status: any) => handleToggleChange(status, 'priority')} checked={togglePriority} />

                                        </div>
                                    <div>
                                         <div> Home</div>
                                        <ToggleButton callbackToggle={(status: any) => handleToggleChange(status, 'home')} checked={toggleHome} />

                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col  s12  m4 offset-m2'>
                                    <SecondryButton onClick={handleCancelClick} className='submit-btn'>Regresar</SecondryButton>
                                </div>
                                <div className='col s12  m4'>
                                    <input type="submit" className='submit-btn full-width' value='Siguiente' />
                                </div>
                            </div>

                        </form>


                    </div>

                </div>
            </div>

            <PopupModel  isOpen={modalIsOpen} closePopup={handleModelClose} height='260px' width='30%'>
                <PopupContentCustom closePopup={handleModelClose} type={popupType}/>
            </PopupModel>


        </div>
    )
}
