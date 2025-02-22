import React, {useEffect} from 'react'
import { Input } from '../common/Input';
import { useForm  } from 'react-hook-form';
// import PopupModel from '../popups/PopupModel';
// import GmailUserDetailsPopup from '../popups/gmailDetailPopup';
// import {getValidUserDetails} from '../../services/folioTracking/folioTrackingService';


type FormValues = {
    businessName: string;
    contactName: string;
    phoneNo: string;
    cellNo: string;
    email: string;
    emailConfirmation: string;
};

const FormFields:any = {
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
    contactName: {
        id: 'contactName',
        placeholder: 'Ingrese nombre+apellido',
        label: 'Nombre del contacto ',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar Nombre del contacto',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    phoneNo: {
        id: 'phoneNo',
        placeholder: 'Ingrese',
        label: 'Teléfono',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar Teléfono',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    cellNo: {
        id: 'cellNo',
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

export const Material1: React.FC<any> = (props) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>()

    //const [modalErrorIsOpen, setModalErrorIsOpen] = React.useState(false);
    // const [modalValidGamilIsOpen, setModalValidGamilIsOpen] = React.useState(false);

    const isEmailSame = (value:any, formValues:any) => {
        if(value === formValues.email)
            return true
        else
            return 'Los correos no coinciden'

    }
    FormFields.emailConfirmation.validation.validate = isEmailSame
    
    
    // const isValidGmailUser = (email: string): boolean => {
    //     // Regular expression to match a Gmail address
    //     const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      
    //     // Test the provided email against the regular expression
    //     if(email.endsWith('@walmart.com') || email.endsWith('@Lab.Wal-Mart.com'))
    //         return true;
    //     return gmailRegex.test(email);
    //   }

    const onSubmit = handleSubmit(async(data) => {

        // commenting code for walmart users
        // validate userEmail
        // const response: any = await getValidUserDetails(data.email);
        // if(response && !response.data.validUser){
        //     // validate the mail as gmail only
        //     if(!isValidGmailUser(data.email)){
        //     //true then move ahead else return from this point
        //     setModalValidGamilIsOpen(true);
        //         return false;                
        //     }
        //     props.saveFormValues(data);
        //    // setModalErrorIsOpen(true);
        // }else{
        //     props.saveFormValues(data);
        //     props.handleNextClick()
        // }
        props.saveFormValues(data);
        props.handleNextClick()
        // props.saveFormValues(data);
        // props.handleNextClick()
    })

    // function handleModelClose(){
    //     setModalValidGamilIsOpen(false); 
    // }


    useEffect(() => {
        if(props.formValues)
        {
            reset({
                businessName: props.formValues.businessName,
                contactName: props.formValues.contactName,
                phoneNo: props.formValues.phoneNo,
                cellNo: props.formValues.cellNo,
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
                        <Input field={FormFields.businessName} register={register} error={errors.businessName}/>
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.contactName} register={register} error={errors.contactName}/>
                    </div>
                    <div className='col s12 m4'>
                        <Input field={FormFields.phoneNo} register={register} error={errors.phoneNo}/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col s12 m4'>
                        <Input field={FormFields.cellNo} register={register} error={errors.cellNo}/>
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
            {/* <PopupModel  isOpen={modalValidGamilIsOpen} closePopup={handleModelClose} width='40%' height='250px' >
                <GmailUserDetailsPopup closePopup={handleModelClose}/>
            </PopupModel> */}
            
        </div>
    )
}
