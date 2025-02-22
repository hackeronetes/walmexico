import React, { useState, useEffect } from 'react'


import { MainTitle } from '../../../components/common/Titles'
// import { postContactsEditApi } from '../../services/adminGeneral/adminGeneralService'
import { useLocation } from 'react-router-dom'
import { SecondryButton } from '../../../components/common/Buttons'
import {getPageOptions,  postDescriptionCreate, postDescriptionUpdate } from '../../../services/adminContent/adminContentService'
import { useNavigate } from 'react-router-dom'
import RoutesConstants from '../../../resources/route-constants'
import { Input } from '../../../components/common/Input';
import { InputTextbox } from '../../../components/common/InputTextbox';
import { InputRadio  } from '../../../components/common/InputRadio';
import { useForm } from 'react-hook-form';
import { InputSelect } from '../../../components/common/InputSelect';
import { getSectionOptions } from '../../../services/userRole/userRoleService'
import ToggleButton from './../../../components/common/ToggleButton';
import { POPUP_TYPE_ERROR, POPUP_TYPE_SUCCESS} from '../../../resources/project-constants'
import PopupModel from '../../../components/popups/PopupModel'
import PopupContentCustom from '../../../components/popups/PopupContentCustom'
import { useAppDispatch } from '../../../store/hooks'
import { setLoader } from '../../../store/loaderReducer'

const tenantTypes = [
    { value: '1', label: '1 columna' },
    { value: '2', label: '2 columnas' },
]


type FormValues = {
    section: string;
    page: string;
    columns: any;
    title: string;
    content : string;
    content2 : string;
    active: string;

};


let FormFields: any = {
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
    page: {
        id: 'page',
        placeholder: 'Ingrese',
        label: 'Página asignada',
        validation: {
            required: {
                value: false,
                message: 'Debe seleccionar una página.',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    title: {
        id: 'title',
        placeholder: 'Ingrese ',
        label: 'Título de descripción',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar el título de la descripción.',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    columns: {
        id: 'columns',
        placeholder: 'Ingrese',
        label: 'Columnas',
        validation: {
            required: {
                value: false,
                message: 'Debe ingresar Fecha de inicio de publicación.',
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
        label: 'Contenido de columna',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar el contenido de la descripción.',
            },
             maxLength: {
                 value: 500,
                 message: '500 characters max',
            },
        }
    },
    content2: {
        id: 'content2',
        placeholder: 'Ingrese',
        label: 'Contenido de columna',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar el contenido de la descripción.',
            },
            maxLength: {
                value: 500,
                message: '500 characters max',
           },
        }
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



export const DescriptionForm: React.FC = () => {

    const { register, handleSubmit, formState: { errors }, setValue, reset, watch} = useForm<FormValues>()

    const location = useLocation()
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const params = new URLSearchParams(location.search);
    const newDescription = params.get('newDescription');

    const [description, setDescription] = useState<any>({});
    const [editing, setEditing] = useState(false);

    
    const [sectionOptions, setSectionOptions] = useState<any>([])
    const [pageOptions, setPageOptions] = useState<any>([])
    const [activeStatus, setActiveStatus] = useState(false);
    const [modelOpen, setModelOpen] = useState(false);
    const [popupType, setPopupType] = useState<any>('')

    const columnSelected = watch(FormFields.columns.id)

    
    function openModel(type:any){
        setPopupType(type)
        setModelOpen(true)
       
    }

    function handleModelClose(){
        
        setModelOpen(false)
        navigate(RoutesConstants.Descriptions)
    }
    
    

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
    function getDropdownPages(id:any) {
        let paramsTemp = {
            section: id
        }
        getPageOptions(paramsTemp).then((res: any) => {
           
            if (res.data)
                setPageOptions(res.data)
            else
                setPageOptions(res.data)
        })
            .catch((error: any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
                //setPageOptions([])
                console.log('getStateList error', error)
            })
    }

    useEffect(() => {
        if(description.sectionId)
            setValue(FormFields.section.id, description.sectionId)
    }, [sectionOptions])
    useEffect(() => {
        if(description.pagesAssigned)
            setValue(FormFields.page.id, description.pagesAssigned)
    }, [pageOptions])

    const setImageObject = (obj: any) => {

        setDescription(obj)
        reset({   //#pnd
            section: obj.sectionId,
            page: obj.pagesAssigned,
            columns: obj.columnQuantity,
            title: obj.descriptionTitle,
            content: obj.descriptionDs,
            content2: obj.descriptionD2s,
            active: obj.active,

        });
        setActiveStatus(obj.active)
        getDropdownPages(obj.sectionId)

        //setStartDate(obj.publicationStartDate)
        //setEndDate(obj.publicationEndDate)


    }

    const checkIsEditing = () => {
       
        if (location.hasOwnProperty('state')) {
            if (location.state) {
                setEditing(true)
                setImageObject(location.state.description)
            }



        }


    }

    useEffect(() => {
        checkIsEditing()

    }, [])




    useEffect(() => {
        getDropdownSection()
        //getDropdownPages()

    }, [])




    const postForm = (data: any) => {

        dispatch(setLoader(true));

        let dataTemp:any = {
            sectionId: data.section,
            descriptionTitle: data.title,
            descriptionDs: data.content,
            descriptionD2s: data.content2,
            pagesAssigned: data.page,
            columnQuantity: parseInt(data.columns),
            active: data.active ? 1 : 0
        }

        if (editing) {
            dataTemp.id = description.id // #pnd

            postDescriptionUpdate(dataTemp).then(() => {
                
                openModel(POPUP_TYPE_SUCCESS)
                dispatch(setLoader(false));
                //navigate(RoutesConstants.Descriptions)
            })
            .catch((error: any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
                openModel(POPUP_TYPE_ERROR)
                dispatch(setLoader(false));
                console.log('getStateList error', error)
            })
        }
        else{
            if(data.active){
            setActiveStatus(true);
            }            
            postDescriptionCreate(dataTemp).then(() => {
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

       

       
    }


    const handleSectionChange = (id:any) => {
        getDropdownPages(id)
    }

    const onSubmit = handleSubmit((data) => {


       
        postForm(data)


    })





    const handleCancelClick = () => {
        navigate(RoutesConstants.Descriptions)
    }


    

    const handleToggleChange = (status: any) => {
        setValue('active', status);
        
    }

    return (
        <div className='page-container page-suppliers'>


            <div className='container main-container  mb-20'>
                <div className='page-content'>
                    <section>
                        <div className="title-wrapper  mb-20">
                            <MainTitle text={newDescription === '1'? 'Alta de Descripción general' : 'Actualización de Descripción general'}/>
                        </div>

                    </section>

                    <div className='form-container'>
                        <form onSubmit={onSubmit}>
                            <div className='row'>

                                <div className='col s6'>
                                    <InputSelect
                                        field={FormFields.section}
                                        register={register}
                                        error={errors.section}
                                        selectOptions={sectionOptions}
                                        optionLabel='sectionName'
                                        optionValue='id'
                                        onChange={(id:any) => handleSectionChange(id)}
                                    />
                                </div>
                                <div className='col s6'>
                                    <InputSelect
                                        field={FormFields.page}
                                        register={register}
                                        error={errors.page}
                                        selectOptions={pageOptions}
                                        optionLabel='page' // #pnd
                                        optionValue='page' // #pnd
                                    />
                                </div>



                            </div>

                            <div className='row'>
                                <div className='col s6'>
                                    <Input field={FormFields.title} register={register} error={errors.title}/>
                                </div>
                                <div className='col s6'>
                                    <InputRadio 
                                        field={FormFields.columns}
                                        register={register}
                                        error={errors.columns}
                                        radioOptions={tenantTypes}
                                        selected={watch(FormFields.columns.id) ? watch(FormFields.columns.id) : "1"} />
                                </div>

                            </div>

                            <div className='row'>
                                <div className='col s12'>
                                    <InputTextbox field={FormFields.content} register={register} error={errors.content} />
                                </div>

                                

                            </div>
                            {columnSelected == 2 && (
                            <div className='row'>
                                <div className='col s12'>
                                    <InputTextbox field={FormFields.content2} register={register} error={errors.content2}/>
                                </div>
                            </div>
                            )}

                            <div className='row'>
                                
                                <div className='col s6'>
                                    <ToggleButton callbackToggle={(status: any) => handleToggleChange(status)}   checked={activeStatus} />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col  s3 offset-s3'>
                                    <SecondryButton onClick={handleCancelClick} className='submit-btn'>Regresar</SecondryButton>
                                </div>
                                <div className='col s3'>
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
