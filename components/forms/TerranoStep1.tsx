import React, {useState, useEffect} from 'react'
import { Input } from '../common/Input';
import { InputSelect } from '../common/InputSelect';

import { useForm  } from 'react-hook-form';
import {getProfileList} from '../../services/localCommercial/localCommercialService';
// import {getValidUserDetails} from '../../services/folioTracking/folioTrackingService';
// import PopupModel from '../popups/PopupModel';
// import PopupContentSubmitSuccess from '../popups/validUserPopup';
// import GmailUserDetailsPopup from '../popups/gmailDetailPopup';


// const profileOptions = [
//     { value: '1', label: 'Owner' },
//     { value: '2', label: 'Real Estate Broker' },
// ]

type FormValues = {
    name: string;
    paternalSurname: string;
    maternalSurname: string;
    businessName: string;
    profile: string;
    mobile: string;
    phoneNumber: string;
    email: string;
    emailConfirmation: string;
   

};

let FormFields:any = {
    name: {
        id: 'name',
        placeholder: 'Ingrese nombre',
        label: 'Nombre(s)',
        validation: {
            pattern: {
                value: /^[A-Za-zÀ-ÿñáéíóúüÑ \s]+$/,
                message: 'Debe ingresar letras',
            },
            required: {
                value: true,
                message: 'Debe capturar Nombre',
            },
            maxLength: {
                value: 50,
                message: '50 characters máximo',
            },
        }
    },
    paternalSurname: {
        id: 'paternalSurname',
        placeholder: 'Ingrese',
        label: 'Apellido Paterno',
        validation: {
            pattern: {
                value: /^[A-Za-zÀ-ÿñáéíóúüÑ \s]+$/,
                message: 'Debe ingresar letras',
            },
            required: {
                value: true,
                message: 'Debe capturar Apellido Paterno',
            },
            maxLength: {
                value: 50,
                message: '50 characters máximo',
            },
        }
    },
    maternalSurname: {
        id: 'maternalSurname',
        placeholder: 'Ingrese',
        label: 'Apellido Materno',
        validation: {
            pattern: {
                value: /^[A-Za-zÀ-ÿñáéíóúüÑ \s]+$/,
                message: 'Debe ingresar letras',
            },
            required: {
                value: false,
                message: '',
            },
            maxLength: {
                value: 50,
                message: '50 characters máximo',
            },
        }
    },
    businessName: {
        id: 'businessName',
        placeholder: 'Ingrese',
        label: 'Razón Social',
        validation: {
            required: {
                value: false,
                message: '',
            },
            maxLength: {
                value: 50,
                message: '50 characters máximo',
            },
        }
    },
    profile: {
        id: 'profile',
        placeholder: 'Seleccione',
        label: 'Perfil',
        validation: {
            required: {
                value: true,
                message: 'Debe seleccionar Perfil.',
            },
            maxLength: {
                value: 50,
                message: '50 characters máximo',
            },
        }
    },
    phoneNumber: {
        id: 'phoneNumber',
        placeholder: 'Ingrese teléfono',
        label: 'Teléfono',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Teléfono',
            },
            maxLength: {
                value: 35,
                message: '35 characters máximo',
            },
           
        }
    },
    mobile: {
        id: 'mobile',
        placeholder: 'Ingrese',
        label: 'Número celular',
        validation: {
            pattern: {
                value: /^[0-9]+$/,
                message: 'Debe ingresar números',
            },
            maxLength: {
                value: 10,
                message: '10 characters máximo',
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
                message: '50 characters máximo',
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

    
    
}




export const TerranoStep1: React.FC<any> = (props) => {

    const { register, handleSubmit, formState: { errors }, reset, setValue, trigger } = useForm<FormValues>()
    const[profiles, setProfiles] = useState<any[]>([])
    // const [modalErrorIsOpen, setModalErrorIsOpen] = React.useState(false);
    // const [modalValidGamilIsOpen, setModalValidGamilIsOpen] = React.useState(false);


    /* Add email same validation */
    const isEmailSame = (value:any, formValues:any) => {
        if(value === formValues.email)
            return true
        else
            return 'Los correos no coinciden'
    }
    FormFields.emailConfirmation.validation.validate = isEmailSame



    /* UseEffect function
    * Set dropdown values if re enter page
    */
    const setDropDownValues = () => {
        if(props.formValues.profile)
            setValue(FormFields.profile.id, props.formValues.profile)
    }

   

    /* UseEffect function
    * Get Profile drodown options from API
    */
    const getProfiles = () => {
        getProfileList().then((res:any) => {
            
            setProfiles(res.data)
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            console.log('getStateList error', error)
        })
    }

    /* UseEffect function
    * Set Form values if re enter page
    */
    const setFormValues = () => {
        if(props.formValues)
        {
            reset({
                name: props.formValues.name,
                paternalSurname: props.formValues.paternalSurname,
                maternalSurname: props.formValues.maternalSurname,
                businessName: props.formValues.businessName,
                mobile: props.formValues.mobile,
                phoneNumber: props.formValues.phoneNumber,
                email: props.formValues.email,
                emailConfirmation: props.formValues.emailConfirmation,
            });
        }
    }

    useEffect(() => {
        getProfiles()
        setDropDownValues()
        setFormValues()
    }, [])

    // const isValidGmailUser = (email: string): boolean => {
    //     // Regular expression to match a Gmail address
    //     const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        
    //     if(email.endsWith('@walmart.com') || email.endsWith('@Lab.Wal-Mart.com'))
    //         return true;
    //     // Test the provided email against the regular expression
    //     return gmailRegex.test(email);
    //   }
 
    /* On form submit after initial validation is done */
    const onSubmit = handleSubmit(async (data) => {
        console.log('data from terano ..', data);

        //validate userEmail
        // const response: any = await getValidUserDetails(data.email);
        // if(response && !response.data.validUser){
        //     // validate the mail as gmail only
        //     if(!isValidGmailUser(data.email)){
        //     //true then move ahead else return from this point
        //     setModalValidGamilIsOpen(true);
        //         return false;                
        //     }
        //     props.saveFormValues(data);
        //     setModalErrorIsOpen(true);
        // }
        // else{
        //     props.saveFormValues(data);
        //     props.handleNextClick();
        // }

        props.saveFormValues(data);
        props.handleNextClick();
    })

   
    /* On change of Profile dropdown value */
    const handleOnchangeProfile = (value:any) => {
        setValue(FormFields.profile.id, value)
        trigger(FormFields.profile.id)
    }

    return (
        <div className='form-container'>
            <form onSubmit={onSubmit}>
                <div className='row'>
                    
                    <div className='col s12 m4'>
                        <Input field={FormFields.name} register={register} error={errors.name}/>
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.paternalSurname} register={register} error={errors.paternalSurname}/>
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.maternalSurname} register={register} error={errors.maternalSurname}/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col s12 m4'>
                        <Input field={FormFields.businessName} register={register} error={errors.businessName}/>
                    </div>
                    <div className='col s12 m4'>
                        <InputSelect 
                            field={FormFields.profile} 
                            register={register} 
                            error={errors.profile} 
                            selectOptions={profiles}
                            optionLabel='profileDs'
                            optionValue='profileId'
                            onChange={handleOnchangeProfile}
                        />
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.phoneNumber} register={register} error={errors.phoneNumber}/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col s12 m4'>
                        <Input field={FormFields.mobile} register={register} error={errors.mobile}/>
                    </div>
                    
                    <div className='col s12 m4'>
                        <Input field={FormFields.email} register={register} error={errors.email}/>
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.emailConfirmation} register={register} error={errors.emailConfirmation}/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col s12 m4 offset-m4'>
                        <input type="submit" className='submit-btn full-width' value='Siguiente'/>
                    </div>
                </div>

            </form>
            
            {/* <PopupModel  isOpen={modalErrorIsOpen} closePopup={handleModelErrorClose} width='40%' height='250px' >
                <PopupContentSubmitSuccess closePopup={handleModelErrorClose}/>
            </PopupModel>

            <PopupModel  isOpen={modalValidGamilIsOpen} closePopup={handleModelClose} width='40%' height='250px' >
                <GmailUserDetailsPopup closePopup={handleModelClose}/>
            </PopupModel> */}
        </div>
    )
}
