import React, { useState, useEffect } from 'react'


import { MainTitle } from '../../../components/common/Titles'
// import { postContactsEditApi } from '../../services/adminGeneral/adminGeneralService'
import { useLocation } from 'react-router-dom'
import { SecondryButton } from '../../../components/common/Buttons'
import { postNoteForm } from '../../../services/adminContent/adminContentService'
import { useNavigate } from 'react-router-dom'
import RoutesConstants from '../../../resources/route-constants'
import { Input } from '../../../components/common/Input';
import { useForm } from 'react-hook-form';
import DatePickerInput from '../../../components/common/DatePickerInput';
import { InputFile } from '../../../components/common/InputFile';
import ToggleButton from '../../../components/common/ToggleButton';
import { formatDateNotes } from '../../../utility/commonFunctions'
import { InputTextbox } from '../../../components/common/InputTextbox';
import { useAppSelector } from '../../../store/hooks';
import { getNotasRow } from '../../../store/notasReducer'
import PopupModel from '../../../components/popups/PopupModel'
import PopupContentCustom from '../../../components/popups/PopupContentCustom'
import { POPUP_TYPE_ERROR, POPUP_TYPE_SUCCESS} from '../../../resources/project-constants'
import { useAppDispatch } from '../../../store/hooks'
import { setLoader } from '../../../store/loaderReducer'



type FormValues = {
    name: string;
    url: string;
    startDate: string;
    endDate: string;
    content: string;
    image: string;
    active: boolean;
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


export const NoteForm: React.FC = () => {
    const notasRow = useAppSelector(getNotasRow);
    const dispatch = useAppDispatch();

    const { register, handleSubmit, formState: { errors }, setValue, clearErrors, getValues, setError, reset } = useForm<FormValues>()

    const location = useLocation()
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const newNote = params.get('newNote');


    const [image, setImage] = useState<any>();
    const [editing, setEditing] = useState(false);

    const [startDate, setStartDate] = useState<any>();
    const [endDate, setEndDate] = useState<any>();
    const [toggleActive, setToggleActive] = useState<any>();

    const [modelOpen, setModelOpen] = useState(false);
    const [popupType, setPopupType] = useState<any>('')

    function openModel(type:any){
        setPopupType(type)
        setModelOpen(true)
       
    }
    

    function handleModelClose(){
        setModelOpen(false)
        navigate(RoutesConstants.NoteIndex)
    }
    

    const setImageObject = (obj: any) => {
          
        setImage(obj)
        reset({
            name: obj.imageDescription,
            url: obj.url,
            startDate: obj?.begDate,
            endDate: obj?.endDate,
            active: obj.active,
            priority: obj.priority,
            home: obj.home,

        });

        //setStartDate(obj.publicationStartDate)
        //setEndDate(obj.publicationEndDate)
        setToggleActive(obj.active == "1" ? true : false)
        setStartDate(new Date())
        let date = new Date();
        setEndDate(date.setDate(date.getDate() + 20));


    }

    const checkIsEditing = () => {
        if (location.hasOwnProperty('state')) {
            if (location.state) {
                setEditing(true)
                setImageObject(location.state.item)
            }
        }
    }

    useEffect(()=>{
        if(notasRow){
            setValue('active', notasRow.active === "0" ? false : true);
            
            //for start date
            setStartDate(new Date(notasRow.begDate));
            setEndDate(new Date(notasRow.endDate));
            
            setToggleActive(notasRow.active == "1" ? true : false)
            
            setValue('startDate', notasRow.begDate);
            setValue('endDate', notasRow.endDate);


            setValue('content', notasRow.noteDs);
            setValue('name', notasRow.title);
            setValue('url', notasRow.url);
        }
    },[notasRow]);

    useEffect(() => {
        checkIsEditing()

    }, [])








    const postForm = (data: any) => {

        dispatch(setLoader(true));
        
        let img = ''

        if(data.image)
        {
            if(data.image.length > 0)
                img = data.image[0]
        }
        

        const dataTemp:any = {
            title: data.name,
            noteDs: data.content,
            url: data.url,
            active: data.active,
            begDate: formatDateNotes(startDate),
            endDate: formatDateNotes(endDate),
            image: img,
            note:"",
        }

        if (editing) {
            dataTemp.id = image.id
        }

         postNoteForm(dataTemp).then(() => {
             openModel(POPUP_TYPE_SUCCESS)
             dispatch(setLoader(false));
            
        })
        .catch((error: any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            openModel(POPUP_TYPE_ERROR)
            dispatch(setLoader(false));
            console.log('getStateList error', error)
        })
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
        console.log('data', data)
       

        let status = true;

        if (!startDate) {
            setError("startDate", {
                type: "manual",
                message: "Debe ingresar Fecha de inicio de publicación.",
            })
            status = false
        }
        if (!endDate) {
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
        navigate(RoutesConstants.NoteIndex)
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
        setToggleActive(status);
        setValue('active', status);
        
    }

    return (
        <div className='page-container page-suppliers'>


            <div className='container main-container  mb-20'>
                <div className='page-content'>
                    <section>
                        <div className="title-wrapper  mb-20">
                            <MainTitle text={newNote === '1'? 'Nuevo Nota' : 'Editar Nota'}/>
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
                                    <InputTextbox field={FormFields.content} register={register} error={errors.content} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col s12  m6'>
                                    <div>
                                        <img src={image ? image.imgUrl : ''} className="full-width"/>
                                    </div>
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
                                    <div>
                                       <div> Activo</div>
                                        <ToggleButton callbackToggle={(status: any) => handleToggleChange(status)} checked={toggleActive} />
                                        
                                    </div>
                                   
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col   s12  m3 offset-m3'>
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
