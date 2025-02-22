import React, { useEffect } from 'react'
import { Input } from '../common/Input';
import { useForm  } from 'react-hook-form';
// import {getValidUserDetails} from '../../services/folioTracking/folioTrackingService';
// import PopupModel from '../popups/PopupModel';
// import PopupContentSubmitSuccess from '../popups/validUserPopup';
// import GmailUserDetailsPopup from '../popups/gmailDetailPopup';

type FormValues = {
    name: string;
    paternalSurname: string;
    maternalSurname: string;
    companyName: string;
    telephone: string;
    mobileNumber: string;
    email: string;
    emailConfirmation: string;
};

const FormFields:any = {
    name: {
        id: 'name',
        placeholder: 'Ingrese',
        label: 'Nombre(s)',
        validation: {
            pattern: {
                value: /^[A-Za-zÀ-ÿñáéíóúüÑ \s]+$/,
                message: 'Debe ingresar letras',
            },
            required: {
                value: true,
                message: 'Ingrese el nombre',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
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
                message: 'Ingrese el apellido paterno',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
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
                value: true,
                message: 'Ingrese la razón social',
            },
            maxLength: {
                value: 200,
                message: '200 characters max',
            },
        }
    },
    telephone: {
        id: 'telephone',
        placeholder: 'Ingrese',
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
                message: 'Ingrese el correo',
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
                message: 'Ingrese el correo para confirmar',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
            pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Debe capturar un correo válido',
            },
            validate: ''
        }
    },


    select: {
        id: 'select',
        placeholder: 'Enter select',
        label: 'Select',
        validation: {
            required: {
                value: true,
                message: 'required SElect',
            },
        }
    },
    

}

export const LocalComerEvent1: React.FC<any> = (props) => {

    const { register, handleSubmit, formState: { errors }, reset  } = useForm<FormValues>()
    // const [modalErrorIsOpen, setModalErrorIsOpen] = React.useState(false);
    // const [modalValidGamilIsOpen, setModalValidGamilIsOpen] = React.useState(false);

   

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

    const onSubmit = handleSubmit(async(data) => {
        //validate userEmail
        // const response: any = await getValidUserDetails(data.email);
        // if(response && !response.data.validUser){
        //     // validate the mail as gmail only
        //     if(!isValidGmailUser(data.email)){
        //     //true then move ahead else return from this point
        //         setModalValidGamilIsOpen(true);
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

    const isEmailSame = (value:any, formValues:any) => {
        if(value === formValues.email)
            return true
        else
            return 'Los correos no coinciden'

    }
    FormFields.emailConfirmation.validation.validate = isEmailSame
    
    useEffect(() => {
        if(props.formValues)
        {
            reset({
                name: props.formValues.name,
                paternalSurname: props.formValues.paternalSurname,
                maternalSurname: props.formValues.maternalSurname,
                companyName: props.formValues.companyName,
                telephone: props.formValues.telephone,
                mobileNumber: props.formValues.mobileNumber,
                email: props.formValues.email,
                emailConfirmation: props.formValues.email,
            });
        }
        
    }, [])


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
                        <Input field={FormFields.companyName} register={register} error={errors.companyName}/>
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.telephone} register={register} error={errors.telephone}/>
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
            </PopupModel> */}

            {/* <PopupModel  isOpen={modalValidGamilIsOpen} closePopup={handleModelClose} width='40%' height='250px' >
                <GmailUserDetailsPopup closePopup={handleModelClose}/>
            </PopupModel>
             */}
            
        </div>
    )
}
