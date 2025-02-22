import React, { useState, useEffect } from 'react'
import { MainTitle } from '../../components/common/Titles'
import { getRoleOptions, getSectionOptions, getFormatOptions, postUserForm} from '../../services/userRole/userRoleService'
import ToggleButton from '../../components/common/ToggleButton'
import { useLocation } from 'react-router-dom'
import useStates from './components/useStates'
import useStateMunicipilaty from './components/useStateMunicipilaty'
import {  css } from 'goober'
import { useForm  } from 'react-hook-form';
import { InputSelect } from '../../components/common/InputSelect';
import { Input } from '../../components/common/Input';
import {  SecondryButton } from '../../components/common/Buttons';
import { useNavigate } from 'react-router-dom'
import RoutesConstants from '../../resources/route-constants'
import PopupContentCustom from '../../components/popups/PopupContentCustom'
import PopupModel from '../../components/popups/PopupModel'
import {POPUP_TYPE_SUCCESS, POPUP_TYPE_ERROR} from '../../resources/project-constants'
import { useAppDispatch } from '../../store/hooks';
import { setLoader } from '../../store/loaderReducer'

const toggleLabel = css`
    font-size: 14px;
    color: #333333;
`


type FormValues = {
    name: string;
    section: string;
    role: string;
    userName: string;
    login: string;
    email: string;
    active: string;
    boss: string;
    format: string;

};


let FormFields: any = {
    name: {
        id: 'name',
        placeholder: 'Ingrese',
        label: 'Nombre',
        validation: {
            required: {
                value: true,
                message: 'Debe ingresar Nombre',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
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
    role: {
        id: 'role',
        placeholder: 'Ingrese',
        label: 'Rol asignado',
        validation: {
            required: {
                value: true,
                message: 'Debe seleccionar Rol asignado.',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    format: {
        id: 'format',
        placeholder: 'Ingrese',
        label: 'Formato',
        validation: {
            required: {
                value: true,
                message: 'Debe seleccionar Formato',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    userName: {
        id: 'userName',
        placeholder: 'Ingrese',
        label: 'User Nombre',
        validation: {
            required: {
                value: false,
                message: 'Debe seleccionar User Nombre.',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    login: {
        id: 'login',
        placeholder: 'Ingrese',
        label: 'Usuario',
        validation: {
            required: {
                value: true,
                message: 'Debe seleccionar Usuario.',
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
    active: {
        id: 'active',
        placeholder: 'Ingrese',
        label: 'Activo',
        validation: {
            required: {
                value: false,
                message: 'Debe ingresar Activo',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },
    boss: {
        id: 'active',
        placeholder: 'Ingrese',
        label: 'Jefe',
        validation: {
            required: {
                value: false,
                message: 'Debe ingresar Activo',
            },
            maxLength: {
                value: 50,
                message: '50 characters max',
            },
        }
    },


}


const config:any = {
    roleLabel: 'name',
    roleValue: 'id',
    sectionLabel: 'sectionName',
    sectionValue: 'id',   
    stateLabel: 'state',
    stateValue: 'id', 
    formatLabel: 'propertyFormatDs',
    formatValue: 'id', 
    stateGridColumns : [
        {'label': 'ESTADO', 'key' : 'state', 'type' : 'text' },
        {'label': '', 'key' : '', 'type' : 'rowDelete'},
    ],
    localComercialId: 1,  
    landSaleId: 3,  
}



export const UserCreate: React.FC = () => {
    
    const dispatch = useAppDispatch();
    const [popupType, setPopupType] = useState<any>('')
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalEmailIsOpen, setModalEmailIsOpen] = React.useState(false);

    const [roleOptions, setRoleOptions] = useState<any>([])
    const [sectionOptions, setSectionOptions] = useState<any>([])
    const [formatOptions, setFormatOptions] = useState<any>([])

    const [section, setSection] = useState<any>('')
    //const [format, setFormat] = useState<any>('')
    // const [userName, setUserName] = useState<any>('')
   // const [role, setRole] = useState<any>('')
    const [isActive, setIsActive] = useState<boolean>(false)
    const [isBoss, setIsBoss] = useState<boolean>(false)
    const [userId, setUserId] = useState<boolean>(false)
    
    const {renderStates, getSelectedStates, setSelectedStates} = useStates()
    const {renderStatesMunicipality, getSelectedStatesMunicipality, setSelectedStatesMunicipality} = useStateMunicipilaty()
    
    const [editing, setEditing] = useState(false);
    const [user, setUser] = useState<any>({});

    const [errorMessage, setErrorMessage] = useState('')

    const location = useLocation()
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const newUser = params.get('newUser');

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormValues>()

    const checkIsEditing = () => {
        if (location.hasOwnProperty('state')) {
            if (location.state) {
                let temp = location.state
                
                setEditing(true)
                // setUserName(temp.name)
                setIsActive(temp.active)
                setIsBoss(temp.boss)
                setUserId(temp.id)
                

                reset({
                    email:temp.email,
                    name:temp.name,
                    login:temp.userID,
                    
                })

                //setSection(1)
                

                if(temp.state)
                {
                    setSelectedStates(temp.state)
                }

                if(temp.sectionId == 3)
                {
                    setSelectedStatesMunicipality(temp.stateArray)
                }

                setUser(temp)
                
                
            }

        }

    }

    useEffect(() => {
        checkIsEditing()

    }, [])


    
     
    function getDropdownRole(sec:any){
        let data  = {
            sectionId: sec
        }
        getRoleOptions(data).then((res:any) => {
            
            if(res.data)
                setRoleOptions(res.data)
            else
                setRoleOptions(res.data)
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
                setRoleOptions([])
            console.log('getStateList error', error)
        })
    }   

    function getDropdownSection(){
        let tempparams:any = {page: 1}
        getSectionOptions(tempparams).then((res:any) => {
            if(res.data)
                setSectionOptions(res.data)
            else
                setSectionOptions(res.data)
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            setSectionOptions([])
            console.log('getStateList error', error)
        })
    }   

    function getDropdownFormat(){

        getFormatOptions().then((res:any) => {
            if(res.data)
                setFormatOptions(res.data)
            else
                setFormatOptions(res.data)
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            setFormatOptions([])
            console.log('getStateList error', error)
        })
    }   

    useEffect(() => {
        if(user)
        {
            let sectionOption = sectionOptions.filter((item:any) => item[config.sectionLabel] == user.section)
            if(sectionOption.length > 0)
            {
                setSection(sectionOption[0].id)
                getDropdownRole(sectionOption[0][config.sectionValue])
                setValue(FormFields.section.id, sectionOption[0].id)
            }
            
        }
            

    }, [sectionOptions])

    useEffect(() => {
        if(user)
        {
            let roleOption = roleOptions.filter((item:any) => item[config.roleLabel] == user.role)
            if(roleOption.length > 0)
            {
                setValue(FormFields.role.id, roleOption[0].id)
            }
            
        }
            

    }, [roleOptions])
    useEffect(() => {
         if(user)
        {
            if(user.format && user.format.length > 0)
            {
                setValue(FormFields.format.id, user.format[0].formatId)
            }
            
            
        }
            

    }, [formatOptions])
    

   

    useEffect(() => {
        getDropdownSection()
        getDropdownFormat()
    }, [])

    
    
    const handleSectionChange = (selected:any ) => {
        setSection(selected)
        getDropdownRole(selected)
        
    }
    const handleRoleChange = (selected:any ) => {
       
        console.log(selected)
        
    }
    const handleFormatChange = (selected:any ) => {
        console.log(selected)
        //setFormat(selected)
        
        
    }

    const isLocalComercialSelected = () => {
        return section == config.localComercialId
    }

    const isLandSaleSelected = () => {
        return section == config.landSaleId
    }

    
    function handleModelClose(){
        setIsOpen(false)
        navigate(RoutesConstants.UserIndex)
    }
    
    function handleModelCloseEmail(){
        setModalEmailIsOpen(false)
        // navigate(RoutesConstants.UserIndex)
    }

    function openModel(type:any){
        setPopupType(type)
        setIsOpen(true)
       
    }

const isWalmartEmail = (email: string): boolean => {
    // Regular expression to match a Gmail address
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@walmart\.com$/;

    if(email.endsWith('@walmart.com') || email.endsWith('@Lab.Wal-Mart.com'))
        return true;
    
    // Test the provided email against the regular expression
    return gmailRegex.test(email);
}

const postForm = (data: any) => {
    
        
        if(!isWalmartEmail(data.email)){
            //true then move ahead else return from this point
            
            setModalEmailIsOpen(true)
            return false;                
        }
        
       if(editing)
       {
            data.userId = userId
       }
       dispatch(setLoader(true));
        postUserForm(data).then(() => {
            dispatch(setLoader(false));
            //navigate(RoutesConstants.UserIndex)
            openModel(POPUP_TYPE_SUCCESS)
        })
        .catch((error: any) => {
            dispatch(setLoader(false));
            //alert('Something went wrong')
            //setSelectStateOptions([])
            // console.log('error', error)
            if(error.status == 503)
            {
                setErrorMessage('Este user id ya existe')
                openModel(POPUP_TYPE_ERROR)
            }
            else{
                setErrorMessage('')
                openModel(POPUP_TYPE_ERROR)
            }
            
            console.log('getStateList error', error)
        })
    }

   
    const isFormDisabled = () => {
        return user.deleteCd ? true : false
     }
   
     

    const onSubmit = handleSubmit((data:any) => {

        if(!isFormDisabled)
            return false;
        
       let states = []

        if(isLocalComercialSelected())
            states = getSelectedStates()

        if(isLandSaleSelected())
            states = getSelectedStatesMunicipality()

        let postData = {
            states: states,
            userName: data.name,
            login: data.login,
            email: data.email,
            sectionId: data.section,
            format: data.format,
            roleId: data.role,
            active: isActive ? 1 : 0,
            boss: isBoss ? 1 : 0,
        }
        
        setErrorMessage('')
        postForm(postData)
               
    })

    const handleCancelClick = () => {
        if(editing)
            navigate(RoutesConstants.UserIndex, {state: {isBack: true}})
        else
            navigate(RoutesConstants.UserIndex)
    }

    
    
    

    
    
    
    return (
        <div className='page-container type-filter'>
            <div className='container main-container'>
                <div className='page-content '>
                    <div className='desc-container'>
                        <div className="title-wrapper">
                            <MainTitle text={newUser === '1'? "Alta de Usuario" : 'Actualizar usuario'} />
                        </div>
                        
                       
                    </div>
                    <div className='filter-form-container'>
                        <form onSubmit={onSubmit} encType='multipart/form-data'>
                        
                       
                       
                            <fieldset disabled={isFormDisabled()} className={isFormDisabled() ? 'disabled' : ''}  >
                       
                        
                            <div className='row'>
                                <div className='col s12 m12'>
                                    <Input field={FormFields.name} register={register} error={errors.name} />
                                    
                                </div>
                                <div className='col s12 m6 l4'>

                                    <div>
                                        <InputSelect 
                                            field={FormFields.section} 
                                            register={register} 
                                            error={errors.section} 
                                            selectOptions={sectionOptions}
                                            onChange={handleSectionChange} 
                                            optionLabel={'sectionName'}
                                            optionValue={'id'}
                                            
                                        />
                                    </div> 
                                </div>
                                <div className='col s12 m6 l4'>
                                    <div>
                                        <InputSelect 
                                            field={FormFields.role} 
                                            register={register} 
                                            error={errors.role} 
                                            selectOptions={roleOptions}
                                            onChange={handleRoleChange} 
                                            optionLabel={config.roleLabel}
                                            optionValue={config.roleValue}
                                        />
                                    </div>  
                                </div>  

                                
                            </div>
                            
                            <div className='row'>
                                {/* <div className='col s4'>
                                    <Input field={FormFields.userName} register={register} error={errors.userName} />
                                </div> */}
                                <div className='col s12 m6 l4'>
                                    <Input field={FormFields.login} register={register} error={errors.login} disabled={editing} />
                                </div>
                                <div className='col s12 m6 l4'>
                                    <Input field={FormFields.email} register={register} error={errors.email} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col s6 m4 l4'>
                                    <div className={toggleLabel}>
                                        <label htmlFor='format' className="input-label">Activo</label>
                                    </div>
                                    
                                    <ToggleButton  callbackToggle={(checked:boolean) => setIsActive(checked)} checked={isActive} />
                                </div>
                                <div className='col s6 m4 l4'>
                                    <div className={toggleLabel}>
                                        <label htmlFor='format' className="input-label">Jefe</label>
                                    </div>
                                    <ToggleButton  callbackToggle={(checked:boolean) => setIsBoss(checked)}  checked={isBoss}/>
                                </div>

                                { isLandSaleSelected() &&  (
                                    <div className='col s12 m4'>
                                        <InputSelect 
                                            field={FormFields.format} 
                                            register={register} 
                                            error={errors.format} 
                                            selectOptions={formatOptions}
                                            onChange={handleFormatChange} 
                                            optionLabel={config.formatLabel}
                                            optionValue={config.formatValue}
                                        />
                                    </div>
                                )}

                            </div>

                            <div className='row'>
                                <div className='col s12'> 
                        
                                    {isLocalComercialSelected() && renderStates()}

                                </div>
                            </div>
                            <div className='row'>
                                <div className='col s12'> 
                        
                                    {isLandSaleSelected() && renderStatesMunicipality()}

                                </div>
                            </div>
                       
                            </fieldset>
                       
                        
                            <div className='row'>
                                <div className='col offset-m2 s12 m4'>
                                    <SecondryButton onClick={handleCancelClick} className='submit-btn'>Cancelar</SecondryButton>
                                </div>
                                <div className='col s12 m4'>
                                    <input type="submit" className='submit-btn' value='Guardar'/>
                                </div>
                            </div>
                            
                        </form>
                    </div>

                    
                </div>
           </div>

           <PopupModel hideScroll={true}  hideCloseIcon={true}  isOpen={modalIsOpen} closePopup={handleModelClose} height='260px' width='30%'>
                <PopupContentCustom closePopup={handleModelClose} type={popupType} message={errorMessage} />
            </PopupModel>
            
            <PopupModel hideScroll={true}  hideCloseIcon={true}  isOpen={modalEmailIsOpen} closePopup={handleModelCloseEmail} height='260px' width='30%'>
                <PopupContentCustom closePopup={handleModelCloseEmail} type={POPUP_TYPE_ERROR}  message="Solo correo de Walmart está permitido" />
            </PopupModel>

        </div>
    )
  }
  