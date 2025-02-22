import React, { useState, useEffect } from 'react'


import { MainTitle } from '../../../components/common/Titles'
// import { postContactsEditApi } from '../../services/adminGeneral/adminGeneralService'
import { useLocation } from 'react-router-dom'
import { SecondryButton } from '../../../components/common/Buttons'
// import {  postDescriptionCreate, postDescriptionUpdate } from '../../../services/adminContent/adminContentService'
import {getMenuParentOptions, getMenuOrderNoOptions, postContactFormCreate, postContactFormUpdate  } from '../../../services/adminGeneral/adminGeneralService'
import { useNavigate } from 'react-router-dom'
import RoutesConstants from '../../../resources/route-constants'
import { Input } from '../../../components/common/Input';
import { useForm } from 'react-hook-form';
import { InputSelect } from '../../../components/common/InputSelect';

import ToggleButton from './../../../components/common/ToggleButton';
import PopupContentCustom from '../../../components/popups/PopupContentCustom'
import PopupModel from '../../../components/popups/PopupModel'
import {POPUP_TYPE_SUCCESS, POPUP_TYPE_ERROR} from '../../../resources/project-constants'



type FormValues = {
    superior: string;
    name: string;
    url: string;
    order: string;
    public : string;
    active: string;

};


let FormFields: any = {
    superior: {
        id: 'superior',
        placeholder: 'Ingrese',
        label: 'Opción superior',
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
    name: {
        id: 'name',
        placeholder: 'Ingrese',
        label: 'Nombre',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar nombre.',
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
                message: 'Debe ingresar el título de la descripción.',
            },
            maxLength: {
                value:200,
                message: '200 characters max',
            },
        }
    },
    order: {
        id: 'order',
        placeholder: 'Ingrese',
        label: 'Orden',
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
    
    
    public: {
        id: 'public',
        placeholder: 'Ingrese',
        label: 'Acceso público',
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



export const MenuForm: React.FC = () => {

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormValues>()

    const location = useLocation()
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const newMenu = params.get('newMenu');

    const [menu, setMenu] = useState<any>({});
    const [editing, setEditing] = useState(false);

    const [publicAccessStatus, setPublicAccessStatus] = useState(false);
    const [activeStatus, setActiveStatus] = useState(false);
    // const [superiorSelect, setSuperiorSelect] = useState<any>('')
    // const [orderSelect, setOrderSelect] = useState<any>('')

    
    const [superiorOptions, setSuperiorOptions] = useState<any>([])
    const [orderOptions, setOrderOptions] = useState<any>([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [popupType, setPopupType] = useState<any>('')


    function getDropdownSuperior() {

        getMenuParentOptions().then((res: any) => {
            if (res.data)
                setSuperiorOptions(res.data)
            else
                setSuperiorOptions(res.data)
        })
            .catch((error: any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
                setSuperiorOptions([])
                console.log('getStateList error', error)
            })
    }
    function getDropdownOrder(id:any) {

        getMenuOrderNoOptions({knMenuId:id}).then((res: any) => {
           if (res.data)
                setOrderOptions(res.data)
            else
                setOrderOptions(res.data)
        })
            .catch((error: any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
                setOrderOptions([])
                console.log('getStateList error', error)
            })
    }

    useEffect(() => {
        if(menu.knMenuId)
            setValue(FormFields.superior.id, menu.knMenuId)
    }, [superiorOptions])

    useEffect(() => {
        if(menu.orderNumber)
            setValue(FormFields.order.id, menu.orderNumber)
    }, [orderOptions])

    const handleParentChange = (id:any) => {
        getDropdownOrder(id)
    }
    

    const setMenuObject = (obj: any) => {

        setMenu(obj)
        reset({   //#pnd
            superior: obj.knMenuId,
            name: obj.description,
            url: obj.url,
            order: obj.orderNumber,
            public: obj.publicAccess,
            active: obj.dnActive,

           
        });
        setPublicAccessStatus(obj.publicAccess)
        setActiveStatus(obj.dnActive)

        

        handleParentChange(obj.knMenuId)

        //setStartDate(obj.publicationStartDate)
        //setEndDate(obj.publicationEndDate)


    }

    const checkIsEditing = () => {
        if (location.hasOwnProperty('state')) {
            if (location.state) {
                setEditing(true)
                setMenuObject(location.state.item)
            }



        }


    }

    useEffect(() => {
        checkIsEditing()

    }, [])




    useEffect(() => {
        getDropdownSuperior()
       

    }, [])


    function handleModelClose(){
        setIsOpen(false)
        navigate(RoutesConstants.MenuIndex)
    }

    function openModel(type:any){
         setPopupType(type)
        setIsOpen(true)
       
    }



    const postForm = (data: any) => {

        let dataTemp:any = {
            knMenuId: data.superior,
            description: data.name,
            url: data.url,
            orderNumber: data.order,
            publicAccess: data.public ? 1 : 0 ,
            dnActive: data.active ? 1 : 0 ,
            sectionId: 0
        }

        if (editing) {
            dataTemp.id = menu.id // #pnd

            postContactFormUpdate(dataTemp).then(() => {
                openModel(POPUP_TYPE_SUCCESS)
                
            })
            .catch((error: any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
                openModel(POPUP_TYPE_ERROR)
                console.log('getStateList error', error)
            })
        }
        else{
            
            postContactFormCreate(dataTemp).then(() => {
                openModel(POPUP_TYPE_SUCCESS)
                // navigate(RoutesConstants.MenuIndex)
            })
            .catch((error: any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
                openModel(POPUP_TYPE_ERROR)
                console.log('getStateList error', error)
            })
        }

       

       
    }


    

    const onSubmit = handleSubmit((data) => {


       
        postForm(data)


    })





    const handleCancelClick = () => {
        navigate(RoutesConstants.MenuIndex)
    }


    

    const handlePublicAccessChange = (status: any) => {
        setValue('public', status);
    }
    const handleStatusChange = (status: any) => {
        setValue('active', status);
    }

    return (
        <div className='page-container page-suppliers'>


            <div className='container main-container  mb-20'>
                <div className='page-content'>
                    <section>
                        <div className="title-wrapper  mb-20">
                            <MainTitle text={newMenu === '1'? 'Nuevo Menú' : 'Editar Menú'} />
                        </div>

                    </section>

                    <div className='form-container'>
                        <form onSubmit={onSubmit}>
                            <div className='row'>

                                <div className='col s12  m6 l3'>
                                    <InputSelect
                                        field={FormFields.superior}
                                        register={register}
                                        error={errors.superior}
                                        selectOptions={superiorOptions}
                                        optionLabel='description'
                                        optionValue='id'
                                        onChange={(id:any) => handleParentChange(id)}
                                        //value={superiorSelect}
                                    />
                                </div>
                                <div className='col s12  m6 l3'>
                                     <Input field={FormFields.name} register={register} error={errors.name}/>
                                    
                                </div>
                                <div className='col s12  m6 l3'>
                                    <Input field={FormFields.url} register={register} error={errors.url}/>
                                    
                                </div>
                                <div className='col s12  m6 l3'>
                                    <InputSelect
                                        field={FormFields.order}
                                        register={register}
                                        error={errors.order}
                                        selectOptions={orderOptions}
                                        optionLabel='orderNumber' // #pnd
                                        optionValue='orderNumber' // #pnd
                                        //value={orderSelect}
                                    />
                                </div>



                            </div>

                            

                            <div className='row'>
                                
                                <div className='col s12  m6 l3'>
                                    <div className="toggleLabel">
                                        <label htmlFor='format' className="input-label">Acceso público</label>
                                    </div>
                                    <ToggleButton callbackToggle={(status: any) => handlePublicAccessChange(status)} checked={publicAccessStatus} />
                                </div>
                                <div className='col s12  m6 l3'>
                                    <div className="toggleLabel">
                                        <label htmlFor='format' className="input-label">Activo</label>
                                    </div>
                                    <ToggleButton callbackToggle={(status: any) => handleStatusChange(status)}   checked={activeStatus} />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col  s12 m4'>
                                    <SecondryButton onClick={handleCancelClick} className='submit-btn'>Regresar</SecondryButton>
                                </div>
                                <div className='col s12 m4'>
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
