import React, {  useEffect, useState } from 'react'
import Select from 'react-select'
import {PrimaryButton, SecondryButton} from '../components/common/Buttons'
import ToggleButton from '../components/common/ToggleButton'
import {MainTitle, SmallTitle} from '../components/common/Titles'
import Permissions from '../components/rolePage/Permissions' 
import { getSections, getRoles, getRolePermissions, RolePostForm, postRoleForm } from "../services/adminRole/adminRoleService";
import { useAppDispatch } from '../store/hooks';
import { setLoader } from '../store/loaderReducer'
import PopupContentCustom from '../components/popups/PopupContentCustom'
import {POPUP_TYPE_SUCCESS, POPUP_TYPE_ERROR} from '../resources/project-constants'
import PopupModel from '../components/popups/PopupModel'


const config:any = {
    sectionLabel: 'sectionName',
    sectionValue: 'id',
    roleLabel: 'name',
    roleValue: 'id',
    
    
}



export const RoleForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const [isAdding, setIsAdding] = useState(false);
    const [roleStatus] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [roleSelect, setRoleSelect] = useState<any>('');
    const [roleText, setRoleText] = useState('');
    const [sectionOptions, setSectionOptions] = useState([]);
    const [roleOptions, setRoleOptions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [selectedSection, setSelectedSection] = useState('');
    const [activeStatus, setActiveStatus] = useState(false);
    
    const [popupType, setPopupType] = useState<any>('');
    const [modalIsOpen, setModelIsOpen] = React.useState(false);

    
    function openModel(type:any){
        setPopupType(type)
        setModelIsOpen(true)
       
    }
    
    

    // const setDefaultSection = () => {
    //     selectedSection = 
    // }

    const getSectionOptions = () => { 
        dispatch(setLoader(true))
        getSections().then((res:any) => {
            if(res.data)
            {
                setSectionOptions(res.data)
                dispatch(setLoader(false));
                //setDefaultSection(es.data.menu)
            }

            
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
                // setTableRows([])
                dispatch(setLoader(false))
            console.log('getStateList error', error)
        })
    } 

    const getRoleOptions = (sec:any) => { 
        dispatch(setLoader(true));
       
        getRoles(sec).then((res:any) => {
            if(res.data){
                setRoleOptions(res.data)
                dispatch(setLoader(false))
            }
            
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
                // setTableRows([])
            console.log('getStateList error', error)
            dispatch(setLoader(false));
            setRoleOptions([])
        })
    } 

    const getRolePermissionsList = (roleSel:any) => { 
        dispatch(setLoader(true));
        getRolePermissions(roleSel).then((res:any) => {
            if(res.data){
                setSelectedPermissions(res.data.menu)
                 dispatch(setLoader(false));
            }
            
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
                // setTableRows([])
            console.log('getStateList error', error)
            setSelectedPermissions([])
            dispatch(setLoader(false));
        })
    } 

    const postFormData = () => {
       


        let postData:RolePostForm = {
            roleId: roleSelect.id,
            roleName: roleText,
            menu: selectedPermissions,
            section: selectedSection,
            active: roleStatus ? 1 : 0,
        }
        dispatch(setLoader(true));
        postRoleForm(postData).then(() => {
            dispatch(setLoader(false));

            setIsAdding(false)
            setIsEditing(false)
            setSelectedPermissions([])
            setRoleSelect('')
            openModel(POPUP_TYPE_SUCCESS);
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            console.log('getStateList error', error)
            dispatch(setLoader(false));
            openModel(POPUP_TYPE_ERROR)
            //setErrorIsOpen(true)
        })
    }

    useEffect(() => {
        getSectionOptions()
        
    }, [])
  

    const resetRole = () => {
        setRoleSelect('')
        setRoleText('')
        setSelectedPermissions([])
    }
    

    const handleSectionChange = (selected:any) => {
        setSelectedSection( selected[config.sectionValue])
        getRoleOptions(selected[config.sectionValue])
        resetRole()
    }

    const handleRoleChange = (selected:any) => {

        
        setRoleSelect(selected)
        setRoleText(selected[config.roleLabel])

        getRolePermissionsList(selected[config.roleValue])

    }

    function handleModelClose(){
        setModelIsOpen(false)
        
        
    }
    
    const handleCancelClick = () => {
        setIsAdding(false)
        setIsEditing(false)
    }

    const handleSubmitClick = () => {
         postFormData()
    }

    const handleAddNewRoleClick = () => {
        setRoleSelect('')
        setRoleText('')
        setIsAdding(true)
        setSelectedPermissions([])
        
    }

    const handleClickEditRole = () => {
        setIsEditing(true)
        setActiveStatus(roleSelect.active)
    }


    function renderRoleInputOrDropdown()   {
        
        if(isAdding || isEditing)
            return <input type='text' onChange={(e:any) => setRoleText(e.target.value) } value={roleText} />
        else
            return <Select  
                classNamePrefix='input-select-react' 
                id='state' className='input-select-react' 
                options={roleOptions} 
                onChange={handleRoleChange} 
                value={roleSelect}
                getOptionLabel={(option:any) => option[config.roleLabel]}
                getOptionValue={(option:any) => option[config.roleValue]}
                placeholder='Seleccione'
            />
    }


    function getPageTitle()   {
        let title = ''
        
        if(isAdding)
            title = 'Create Role'
        else if(isEditing)
            title = 'Edit Role'   
        else
            title = 'Role'   
        
        return title
    }
    


    
    return (
        <div className='page-container'>
           
            <div className='container main-container'>
                <div className='page-content'>
                    <div className='desc-container mb-30'>
                        <div className="title-wrapper">
                            <MainTitle text={getPageTitle()} className={'mb-10'} />
                            { (!isAdding && !isEditing) && (
                                <div className="role-new-btn-wrapper" >
                                    <span onClick={handleAddNewRoleClick}>
                                        <span className='icon-plus'><i className="fa fa-plus-circle" aria-hidden="true"></i></span>
                                        <span>Nuevo</span>
                                    </span>
                                    
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='form-container'>
                        <div className='row'>
                            <div className='col s12  offset-m2 m8 offset-l2 l8'>
                                    <div className='flex-container mbl-role-page-flex'>
                                    <div className='flex-item flex-2 mr-20 mbl-input-item-role'>
                                        <div className="">
                                            <label htmlFor='state' className="input-label">
                                              Sección
                                            </label>
                                            <Select  
                                                classNamePrefix='input-select-react' 
                                                id='state' className='input-select-react' 
                                                options={sectionOptions} 
                                                onChange={handleSectionChange}
                                                getOptionLabel={(option:any) => option[config.sectionLabel]}
                                                getOptionValue={(option:any) => option[config.sectionValue]}
                                                placeholder='General'
                                            />
                                        </div>
                                    </div>
                                    <div className='flex-item flex-2 mr-20 mbl-input-item-role'>
                                        <div className="role-role-flex">
                                            <div className="role-role-select-cont">
                                                <label htmlFor='state' className="input-label">
                                                    Rol
                                                </label>
                                                {renderRoleInputOrDropdown()}
                                            </div>
                                            {!isEditing && !isAdding && roleSelect && (
                                                <div className='role-edit-btn' onClick={handleClickEditRole}>
                                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    { (isAdding || isEditing) && (
                                            <div className='flex-item flex-0'>
                                                <ToggleButton  callbackToggle={() => void 0} checked={activeStatus} />
                                            </div>
                                        )
                                    }
                                    
                                </div>
                            </div>

                        </div>
                        
                        <div className='row'>
                            <div className='col offset-m4 offset-s2 s8  m4'>
                                
                                <SmallTitle text='Permisos' />

                                <Permissions isDisabled={!isAdding && !isEditing} selectedPermissions={selectedPermissions} setSelectedPermissions={setSelectedPermissions}/>
                                
                                
                                
                            </div>
                        </div>

                        { (isAdding || isEditing) && (
                            <div className='row'>
                                <div className='col  offset-m3 s12 m3'>
                                    <SecondryButton
                                        className='submit-btn'
                                        onClick={handleCancelClick}
                                    >
                                        Cancelar
                                    </SecondryButton>
                                </div>
                                <div className='col s12 m3'>
                                    <PrimaryButton 
                                        className='submit-btn'
                                        onClick={handleSubmitClick}
                                    >
                                        GUARDAR
                                    </PrimaryButton>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <PopupModel  isOpen={modalIsOpen} closePopup={handleModelClose} height='260px' width='30%'>
                <PopupContentCustom closePopup={handleModelClose} type={popupType}/>
            </PopupModel>
        </div>
    )
  }
  