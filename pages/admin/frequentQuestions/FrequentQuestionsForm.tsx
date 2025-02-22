import React, { useState, useEffect } from 'react'


import { MainTitle } from '../../../components/common/Titles'
// import { postContactsEditApi } from '../../services/adminGeneral/adminGeneralService'
import { useLocation } from 'react-router-dom'
import { SecondryButton } from '../../../components/common/Buttons'
import { postQuestion } from '../../../services/adminContent/adminContentService'
import { useNavigate } from 'react-router-dom'
import RoutesConstants from '../../../resources/route-constants'
import { Input } from '../../../components/common/Input';
import { InputTextbox } from '../../../components/common/InputTextbox';
import { useForm } from 'react-hook-form';
import { InputSelect } from '../../../components/common/InputSelect';
import { getSectionOptions } from '../../../services/userRole/userRoleService'
import ToggleButton from './../../../components/common/ToggleButton';
import {  getLoginUser } from '../../../store/authReducer'
import { useAppSelector } from '../../../store/hooks'


type FormValues = {
    section: string;
    questionText: string;
    answerText : string;
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
   questionText: {
        id: 'questionText',
        placeholder: 'Ingrese ',
        label: 'Título de descripción',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar el título de la descripción.',
            },
            // maxLength: {
            //     value: 50,
            //     message: '50 characters max',
            // },
        }
    },
    answerText: {
        id: 'answerText',
        placeholder: 'Ingrese',
        label: 'Respuesta',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar el contenido de la descripción.',
            },
            // maxLength: {
            //     value: 50,
            //     message: '50 characters max',
            // },
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



export const FrequentQuestionsForm: React.FC = () => {

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormValues>()

    const location = useLocation()
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const newQue = params.get('newQue');

    const loginUser = useAppSelector(getLoginUser);

    const [description, setDescription] = useState<any>({});
    const [editing, setEditing] = useState(false);

    
    const [sectionOptions, setSectionOptions] = useState<any>([])
    const [activeStatus, setActiveStatus] = useState(false);


    

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
    

    useEffect(() => {
        if(description.sectionId)
            setValue(FormFields.section.id, description.sectionId)
    }, [sectionOptions])
   
    const setImageObject = (obj: any) => {

        setDescription(obj)
        reset({   //#pnd
            section: obj.sectionId,
            questionText: obj.questionText,
            answerText: obj.answerText,
            active: obj.active,

        });
        setActiveStatus(obj.active)

        //setStartDate(obj.publicationStartDate)
        //setEndDate(obj.publicationEndDate)


    }

    const checkIsEditing = () => {
        if (location.hasOwnProperty('state')) {
            if (location.state) {
                setEditing(true)
                setImageObject(location.state.question)
            }



        }


    }

    useEffect(() => {
        checkIsEditing()

    }, [])




    useEffect(() => {
        getDropdownSection()
    }, [])




    const postForm = (data: any) => {

        let dataTemp:any = {
            sectionId: data.section,
            questionText: data.questionText,
            answerText: data.answerText,
            active: data.active,
            internalUserId: loginUser.id,
        }

        if (editing) {
            dataTemp.id = description.id // #pnd

        }

        postQuestion(dataTemp).then(() => {
                navigate(RoutesConstants.FrequentQuestionsAdmin)
            })
            .catch((error: any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
    
                console.log('getStateList error', error)
            })
        
       

       
    }


    

    const onSubmit = handleSubmit((data) => {


       
        postForm(data)


    })






    const handleCancelClick = () => {
        navigate(RoutesConstants.FrequentQuestionsAdmin)
    }


    

    const handleToggleChange = (status: any) => {
        setActiveStatus(status);
        setValue('active', status);
    }

    return (
        <div className='page-container page-suppliers'>


            <div className='container main-container  mb-20'>
                <div className='page-content'>
                    <section>
                        <div className="title-wrapper  mb-20">
                            <MainTitle text={newQue === '1'? 'Alta de Preguntas frecuentes' : 'Actualización de Preguntas Frecuentes'} />
                        </div>

                    </section>

                    <div className='form-container'>
                        <form onSubmit={onSubmit}>
                            <div className='row'>

                               
                                <div className='col s12  m6'>
                                    <Input field={FormFields.questionText} register={register} error={errors.questionText}/>
                                </div>
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
                                <div className='col s12'>
                                    <InputTextbox field={FormFields.answerText} register={register} error={errors.answerText}/>
                                </div>

                                

                            </div>
                            

                            <div className='row'>
                                
                                <div className='col s12  m6'>
                                    <ToggleButton callbackToggle={(status: any) => handleToggleChange(status)}   checked={activeStatus} />
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


        </div>
    )
}
