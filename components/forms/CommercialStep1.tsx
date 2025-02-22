import React, {useEffect} from 'react'
import { Input } from '../common/Input';
import { useForm  } from 'react-hook-form';
// import {getValidUserDetails} from '../../services/folioTracking/folioTrackingService';
// import PopupModel from '../popups/PopupModel';
// import PopupContentSubmitSuccess from '../popups/validUserPopup';
// import GmailUserDetailsPopup from '../popups/gmailDetailPopup';


// const profileOptions = [
//     { value: '1', label: 'Owner' },
//     { value: '2', label: 'Real Estate Broker' },
// ]

type FormValues = {
    tradename: string;
    companyName: string;
    firstNames: string;
    lastName: string;
    motherLastName: string;
    phone: string;
    phoneNumber: string;
    email: string;
    emailConfirmation: string;
};

let FormFields:any = {
    tradename: {
        id: 'tradename',
        placeholder: 'Ingrese',
        label: 'Nombre comercial',
        validation: {
            pattern: {
                value: /^[A-Za-zÀ-ÿñáéíóúüÑ \s]+$/,
                message: 'Debe ingresar letras',
            },
            required: {
                value: true,
                message: 'Debe ingresar nombre comercial',
            },
            maxLength: {
                value: 200,
                message: '200 characters max',
            },
        }
    },
    companyName: {
        id: 'companyName',
        placeholder: 'Ingrese ',
        label: 'Nombre compañía',
        validation: {
            pattern: {
                value: /^[A-Za-zÀ-ÿñáéíóúüÑ \s]+$/,
                message: 'Debe ingresar letras',
            },
            required: {
                value: true,
                message: 'Debe ingresar nombre de la compañía',
            },
            maxLength: {
                value: 200,
                message: '200 characters max',
            },
        }
    },
    firstNames: {
        id: 'firstNames',
        placeholder: 'Ingrese',
        label: 'Nombre(s)',
        validation: {
            pattern: {
                value: /^[A-Za-zÀ-ÿñáéíóúüÑ \s]+$/,
                message: 'Debe ingresar letras',
            },
            required: {
                value: true,
                message: 'Debe ingresar nombre',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    lastName: {
        id: 'lastName',
        placeholder: 'Ingrese',
        label: 'Apellido Paterno',
        validation: {
            pattern: {
                value: /^[A-Za-zÀ-ÿñáéíóúüÑ \s]+$/,
                message: 'Debe ingresar letras',
            },
            required: {
                value: true,
                message: 'Debe ingresar apellido paterno',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    motherLastName: {
        id: 'motherLastName',
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
    phone: {
        id: 'phone',
        placeholder: 'Ingrese',
        label: 'Número celular  ',
        validation: {
            maxLength: {
                value: 10,
                message: '10 characters máximo',
            },
            pattern: {
                value: /^[0-9]+$/,
                message: 'Debe ingresar números',
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
                message: 'Debe ingresar teléfono',
            },
            maxLength: {
                value: 35,
                message: '35 characters max',
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
                message: 'Debe ingresar correo electrónico',
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
                message: 'Debe confirmar correo',
            },
            pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Debe capturar un correo válido',
            },
            validate: ''
        }
    },
    
}




export const CommercialStep1: React.FC<any> = (props) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>()
    // const [modalErrorIsOpen, setModalErrorIsOpen] = React.useState(true);
    // const [modalValidGamilIsOpen, setModalValidGamilIsOpen] = React.useState(false);

    // const isValidGmailUser = (email: string): boolean => {
    //     // Regular expression to match a Gmail address
    //     const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    //     if(email.endsWith('@walmart.com') || email.endsWith('@Lab.Wal-Mart.com'))
    //         return true;
      
    //     // Test the provided email against the regular expression
    //     return gmailRegex.test(email);
    // }

    // function handleModelClose(){
    //     setModalValidGamilIsOpen(false); 
    // }
   
    // function handleModelErrorClose(){
    //     props.handleNextClick();
    //     setModalErrorIsOpen(false)
       
    // }
   
    const onSubmit = handleSubmit(async(data) => {
        

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
                tradename: props.formValues.tradename,
                companyName: props.formValues.companyName,
                firstNames: props.formValues.firstNames,
                lastName: props.formValues.lastName,
                motherLastName: props.formValues.motherLastName,
                phone: props.formValues.phone,
                phoneNumber: props.formValues.phoneNumber,
                email: props.formValues.email,
                emailConfirmation: props.formValues.emailConfirmation,
            });
        }
        
    }, [])

    return (
        <div className='form-container'>
            <form onSubmit={onSubmit}>
                <div className='row'>
                    
                    <div className='col s12 m4'>
                        <Input field={FormFields.tradename} register={register} error={errors.tradename}/>
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.companyName} register={register} error={errors.companyName}/>
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.firstNames} register={register} error={errors.firstNames}/>
                    </div>

                   
                </div>

                <div className='row'>
                    <div className='col s12 m4'>
                        <Input field={FormFields.lastName} register={register} error={errors.lastName}/>
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.motherLastName} register={register} error={errors.motherLastName}/>
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.phoneNumber} register={register} error={errors.phoneNumber}/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col s12 m4'>
                        <Input field={FormFields.phone} register={register} error={errors.phone}/>
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
            </PopupModel> */}

            {/* <PopupModel  isOpen={modalValidGamilIsOpen} closePopup={handleModelClose} width='40%' height='250px' >
                <GmailUserDetailsPopup closePopup={handleModelClose}/>
            </PopupModel> */}
            
            
        </div>
    )
}
