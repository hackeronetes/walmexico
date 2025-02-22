import React, { useEffect} from 'react'
import { Input } from '../common/Input';
import { useForm  } from 'react-hook-form';
import { InputRadio } from '../common/InputRadio';
// import {getValidUserDetails} from '../../services/folioTracking/folioTrackingService';
// import PopupModel from '../popups/PopupModel';
// import PopupContentSubmitSuccess from '../popups/validUserPopup';
// import GmailUserDetailsPopup from '../popups/gmailDetailPopup';


const typeOfPersonsOptions = [
    { value: '0', label: 'Física' },
    { value: '1', label: 'Moral' },
]

type FormValues = {
    bussinessNm: string;
    rfc: string;
    typeOfPerson: string;
    nameContact: string;
    mobileNumber: string;
    cellPhone: string;
    email: string;
    emailConfirmation: string;
   

};

let FormFields:any = {
    bussinessNm: {
        id: 'bussinessNm',
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
    rfc: {
        id: 'rfc',
        placeholder: 'Ingrese RFC',
        label: 'RFC (Cedula)',
        validation: {
            pattern: {
                value: /^[A-Za-zÀ-ÿñáéíóúüÑ0-9 \s]+$/,
                message: 'Debe ingresar letras número',
            },
            required: {
                value: true,
                message: 'Debe capturar RFC',
            },
            maxLength: {
                value: 13,
                message: '13 characters max',
            },
        }
    },
    typeOfPerson: {
        id: 'typeOfPerson',
        placeholder: 'Tipo de persona',
        label: 'Tipo de persona',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Tipo de persona',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    nameContact: {
        id: 'nameContact',
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
    mobileNumber: {
        id: 'mobileNumber',
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
    cellPhone: {
        id: 'cellPhone',
        placeholder: 'Ingrese teléfono',
        label: 'Teléfono',
        validation: {
            required: {
                value: true,
                message: 'Debe capturar Teléfono',
            },
            maxLength: {
                value: 50,
                message: '50 characters máximo',
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




export const ConstructionStep1: React.FC<any> = (props) => {

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormValues>()
    // const [modalErrorIsOpen, setModalErrorIsOpen] = React.useState(false);
    // const [modalValidGamilIsOpen, setModalValidGamilIsOpen] = React.useState(false);
    

    //FormFields.test.validation.validate = validateFile()

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
        //     setModalValidGamilIsOpen(true);
        //         return false;                
        //     }
        //     props.saveFormValues(data);
        //     setModalErrorIsOpen(true);
        // }else{
        //     props.saveFormValues(data);
        //     props.handleNextClick()
        // }

        props.saveFormValues(data);
            props.handleNextClick()
       
    })

    //trigger('emailConfirmation')

    const isEmailSame = (value:any, formValues:any) => {
        if(value === formValues.email)
            return true
        else
            return 'Los correos no coinciden'

    }
    FormFields.emailConfirmation.validation.validate = isEmailSame

   
   

    
    

    useEffect(() => {
        if(Object.keys(props.formValues).length > 0)
        {
            reset({
                bussinessNm: props.formValues.bussinessNm,
                rfc: props.formValues.rfc,
                typeOfPerson: props.formValues.typeOfPerson,
                nameContact: props.formValues.nameContact,
                mobileNumber: props.formValues.mobileNumber,
                cellPhone: props.formValues.cellPhone,
                email: props.formValues.email,
                emailConfirmation: props.formValues.emailConfirmation,
            });
        }
        else {
            reset({
                typeOfPerson: "0",
            });
        }
        
    }, [])

    

    return (
        <div className='form-container'>
            <form onSubmit={onSubmit}>
                <div className='row'>
                    
                    <div className='col s12 m4'>
                        <Input field={FormFields.bussinessNm} register={register} error={errors.bussinessNm}/>
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.rfc} register={register} error={errors.rfc}/>
                    </div>
                    <div className='col s12 m4'>
                        <InputRadio field={FormFields.typeOfPerson} register={register} error={errors.typeOfPerson} radioOptions={typeOfPersonsOptions} selected={watch(FormFields.typeOfPerson.id)}/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col s12 m4'>
                        <Input field={FormFields.nameContact} register={register} error={errors.nameContact}/>
                    </div>
                    <div className='col s12 m4'>
                    <Input field={FormFields.cellPhone} register={register} error={errors.cellPhone}/>
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
            </PopupModel> */}
        </div>
    )
}
