import React, { useState, useEffect} from 'react'

import FolioTracking from '../components/common/FolioTracking'
import { MainTitle } from '../components/common/Titles'
import { TextP } from '../components/common/TextP'
import { Input } from '../components/common/Input'
import { InputTextbox } from '../components/common/InputTextbox'
import { InputReadAcceptTerms } from '../components/common/InputReadAcceptTerms'
import Captcha from '../components/common/Captcha'
import { useForm } from 'react-hook-form'
import {  postContactForm, getContactSectionOptions } from '../services/common/commonService'
import { InputSelect } from '../components/common/InputSelect';
import PopupContentCustom from '../components/popups/PopupContentCustom'
import {POPUP_TYPE_SUCCESS, POPUP_TYPE_ERROR} from '../resources/project-constants'
import PopupModel from '../components/popups/PopupModel'
import { useNavigate } from "react-router-dom";

const FormFields: any = {
    name: {
        id: 'name',
        placeholder: 'Ingrese nombre',
        label: 'Nombre(s)',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Nombre',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    email: {
        id: 'email',
        placeholder: 'ejemplo@empresa.com',
        label: 'Correo electrónico',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Correo Electrónico',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
            pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Debe capturar un correo válido',
            },
        }
    },
    emailConfirmation: {
        id: 'emailConfirmation',
        placeholder: 'ejemplo@empresa.com',
        label: 'Confirmación de correo',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar confirmación de correo',
            },
            pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Debe capturar un correo válido',
            },
            validate: ''
        }
    },
    mobileNumber: {
        id: 'mobileNumber',
        placeholder: 'Ingrese',
        label: 'Teléfono',
        validation: {
            pattern: {
                value: /^[0-9]+$/,
                message: 'Teléfono inválido.',
            },
            maxLength: {
                value: 10,
                message: '50 characters max',
            },
        }
    },
    contactArea: {
        id: 'contactArea',
        placeholder: 'Antecedentes o experiencia comercial?',
        label: 'Área que desea contactar',
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
                value: 100,
                message: '50 characters max',
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
                message: 'Debe ingresar Captcha.',
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


export const Contact: React.FC = () => {

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, setError } = useForm<any>()
    const { loadCaptcha, validateCaptcha } = Captcha()

    const [sectionOptions, setSectionOptions] = useState<any[]>([])
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [popupType, setPopupType] = useState<any>('')

    function openModel(type:any){
        setPopupType(type)
        setIsOpen(true)
       
    }

    function getDropdownSection() {

        getContactSectionOptions().then((res: any) => {
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


    useEffect(() => {
        getDropdownSection()
    }, [])


    const isEmailSame = (value:any, formValues:any) => {
        if(value === formValues.email)
            return true
        else
            return 'Los correos no coinciden'

    }
    FormFields.emailConfirmation.validation.validate = isEmailSame
    
    const validateCaptchaInput = (captcha: string) => {
        if (!validateCaptcha(captcha)) {
            setError("captcha", {
                type: "manual",
                message: "Captcha inválido",
            })

            return false
        }
        return true
    }

    const postFormData = (data: any) => {

        let postData: any = {
            name: data.name,
            email: data.email,
            contact: data.mobileNumber,
            contactId: data.contactArea,
            feedback: data.comment,
        }

        
       // return false;
        postContactForm(postData).then(() => {
            
            // alert('hahaha')
            //setIsOpen(true)
            openModel(POPUP_TYPE_SUCCESS);

        })
            .catch((error: any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
                console.log('getStateList error', error)
                //setIsOpen(true)
                openModel(POPUP_TYPE_ERROR);
            })
    }

    const onSubmit = handleSubmit((data) => {

        if (!validateCaptchaInput(data.captcha))
            return false

        postFormData(data);
    })


    function handleModelClose(){
        setIsOpen(false)
        navigate('/')
    }


    return (
        <div className='page-container page-suppliers'>
            <FolioTracking />

            <div className='container main-container  mb-20'>
                <div className='page-content'>
                    <section>
                        <div className="title-wrapper  mb-20">
                            <MainTitle text='Contacto' />
                        </div>
                        <div className="page-desc-wrapper text-left mb-20">
                            <TextP >¿Necesita ayuda?, consulte nuestra sección de Preguntas frecuentes, si aún persisten sus dudas complete el formulario y en breve será contactado por el área correspondiente, estamos para servirle</TextP>
                        </div>
                    </section>

                    <section>
                        <div className='form-container'>
                            <form onSubmit={onSubmit} encType='multipart/form-data'>
                                <div className='row'>
                                    <div className='col s12 m6'>
                                        <Input field={FormFields.name} register={register} error={errors.name} />
                                    </div>
                                    <div className='col s12 m6'>
                                        <Input field={FormFields.email} register={register} error={errors.email} />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col s12 m6'>
                                        <Input field={FormFields.emailConfirmation} register={register} error={errors.emailConfirmation} />
                                    </div>
                                    <div className='col s12 m6'>
                                        <Input field={FormFields.mobileNumber} register={register} error={errors.mobileNumber} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col 12'>
                                        <InputSelect
                                            field={FormFields.contactArea}
                                            register={register}
                                            error={errors.contactArea}
                                            selectOptions={sectionOptions}
                                            optionLabel='section'
                                            optionValue='id'
                                        />
                                    </div>

                                </div>

                                <div className='row'>
                                    <div className='col s12 m6'>
                                        <InputTextbox field={FormFields.comment} register={register} error={errors.comment} />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col offset-m3 s12 m6'>
                                        {loadCaptcha()}
                                        <Input field={FormFields.captcha} register={register} error={errors.captcha} />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col s12 text-center'>
                                        <InputReadAcceptTerms field={FormFields.readButton} register={register} error={errors.readButton} />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col offset-m4 s12 m4'>
                                        <input type="submit" className='submit-btn' value='Enviar' />
                                    </div>
                                </div>

                            </form>


                        </div>
                    </section>


                </div>
            </div>

            <PopupModel  isOpen={modalIsOpen} closePopup={handleModelClose} height='260px' width='30%'>
                <PopupContentCustom closePopup={handleModelClose} type={popupType} />
            </PopupModel>

        </div>
    )
}
