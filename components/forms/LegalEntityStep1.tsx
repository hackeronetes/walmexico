import React, { useEffect} from 'react'
import { Input } from '../common/Input';

import { useForm  } from 'react-hook-form';
// import {getValidUserDetails} from '../../services/folioTracking/folioTrackingService';
// import PopupModel from '../popups/PopupModel';
// import PopupContentSubmitSuccess from '../popups/validUserPopup';
// import GmailUserDetailsPopup from '../popups/gmailDetailPopup';


type FormValues = {
    // name: string;
    // paternalSurname: string;
    // maternalSurname: string;
    contactName: string;
    companyName: string;
    businessName: string;
    rfc: string;
    mobileNumber: string;
    phoneNumber: string;
    email: string;
    emailConfirmation: string;
   

};

let FormFields:any = {
    contactName: {
        id: 'name',
        placeholder: 'Ingrese',
        label: 'Nombre del contacto',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Nombre del contacto',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    companyName: {
        id: 'companyName',
        placeholder: 'Ingrese',
        label: 'Razón Social',
        validation: {
            required: {
                value:  true,
                message: 'Debe capturar Razón Social',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    businessName: {
        id: 'businessName',
        placeholder: 'Ingrese',
        label: 'Nombre de la empresa',
        validation: {
            required: {
                value: true,
                message: 'Ingrese el nombre de la empresa',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    // name: {
    //     id: 'name',
    //     placeholder: 'Ingrese',
    //     label: 'Nombre(s)',
    //     validation: {
    //         pattern: {
    //             value: /^[A-Za-zÀ-ÿñáéíóúüÑ \s]+$/,
    //             message: 'Debe ingresar letras',
    //         },
    //         required: {
    //             value: true,
    //             message: 'Debe capturar Nombre',
    //         },
    //         maxLength: {
    //             value: 50,
    //             message: '50 characters max',
    //         },
    //     }
    // },
    // paternalSurname: {
    //     id: 'paternalSurname',
    //     placeholder: 'Ingrese',
    //     label: 'Apellido Paterno',
    //     validation: {
    //         pattern: {
    //             value: /^[A-Za-zÀ-ÿñáéíóúüÑ \s]+$/,
    //             message: 'Debe ingresar letras',
    //         },
    //         required: {
    //             value: true,
    //             message: 'Debe capturar Apellido Paterno',
    //         },
    //         maxLength: {
    //             value: 50,
    //             message: '50 characters max',
    //         },
    //     }
    // },
    // maternalSurname: {
    //     id: 'maternalSurname',
    //     placeholder: 'Ingrese',
    //     label: 'Apellido Materno',
    //     validation: {
    //         pattern: {
    //             value: /^[A-Za-zÀ-ÿñáéíóúüÑ \s]+$/,
    //             message: 'Debe ingresar letras',
    //         },
    //         required: {
    //             value: false,
    //             message: '',
    //         },
    //         maxLength: {
    //             value: 50,
    //             message: '50 characters max',
    //         },
    //     }
    // },
    rfc: {
        id: 'rfc',
        placeholder: 'Ingrese',
        label: 'R.F.C.',
        validation: {
            pattern: {
                value: /^[a-zA-Z À-ÿñáéíóúüÑ0-9]+$/,
                message: 'Debe ingresar letras número',
            },
            required: {
                value: true,
                message: 'Debe ingresar RFC.',
            },
            maxLength: {
                value: 13,
                message: '13 characters max',
            },
        }
    },
   phoneNumber: {
        id: 'phoneNumber',
        placeholder: 'Ingrese',
        label: 'Teléfono',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Teléfono',
            },
            maxLength: {
                value: 35,
                message: '35 characters max',
            },
           
        }
    },
    mobileNumber: {
        id: 'mobileNumber',
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

    
    
}




export const LegalEntityStep1: React.FC<any> = (props) => {

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormValues>()
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



    // function handleModelErrorClose(){
    //     props.handleNextClick();
    //     setModalErrorIsOpen(false)
       
    // }

    // function handleModelClose(){
    //     setModalValidGamilIsOpen(false); 
    // }


    // const isValidGmailUser = (email: string): boolean => {
    //     // Regular expression to match a Gmail address
    //     const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        
    //     if(email.endsWith('@walmart.com') || email.endsWith('@Lab.Wal-Mart.com'))
    //         return true;
    //     // Test the provided email against the regular expression
    //     return gmailRegex.test(email);
    //   }
    /* UseEffect function
    * Set dropdown values if re enter page
    */
    const setDropDownValues = () => {
        
        if(props.formValues.profile)
            setValue(FormFields.profile.id, props.formValues.profile)
    }

  

    /* UseEffect function
    * Set Form values if re enter page
    */
    const setFormValues = () => {
        if(props.formValues)
        {
            reset({
                contactName: props.formValues.contactName,
                businessName: props.formValues.businessName,
                companyName: props.formValues.companyName,
                // name: props.formValues.name,
                // paternalSurname: props.formValues.paternalSurname,
                // maternalSurname: props.formValues.maternalSurname,
                rfc: props.formValues.rfc,
                mobileNumber: props.formValues.mobileNumber,
                phoneNumber: props.formValues.phoneNumber,
                email: props.formValues.email,
                emailConfirmation: props.formValues.emailConfirmation,
            });
        }
    }

    useEffect(() => {
        setDropDownValues()
        setFormValues()
    }, [])

 
    /* On form submit after initial validation is done */
    const onSubmit = handleSubmit(async(data) => {
       

        props.saveFormValues(data);
        props.handleNextClick();

    })

   
   

    return (
        <div className='form-container'>
            <form onSubmit={onSubmit}>
                <div className='row'>
                    <div className='col s12 m4'>
                        <Input field={FormFields.contactName} register={register} error={errors.contactName}/>
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.companyName} register={register} error={errors.companyName}/>
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.businessName} register={register} error={errors.businessName}/>
                    </div>
                </div>
                {/* <div className='row'>
                    
                    <div className='col s12 m4'>
                        <Input field={FormFields.name} register={register} error={errors.name}/>
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.paternalSurname} register={register} error={errors.paternalSurname}/>
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.maternalSurname} register={register} error={errors.maternalSurname}/>
                    </div>
                </div> */}

                <div className='row'>
                    <div className='col s12 m4'>
                        <Input field={FormFields.rfc} register={register} error={errors.rfc}/>
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.phoneNumber} register={register} error={errors.phoneNumber}/>
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.mobileNumber} register={register} error={errors.mobileNumber}/>
                    </div>
                </div>

                <div className='row'>
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
            </PopupModel>
             */}
            
        </div>
    )
}
