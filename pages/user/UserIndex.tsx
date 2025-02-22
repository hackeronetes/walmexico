import React, { useState, useEffect } from 'react'
import { MainTitle } from '../../components/common/Titles'
import Select from 'react-select'
import { PrimaryButton } from '../../components/common/Buttons'
import DataTable2 from '../../components/datatable/DataTable2'
import { /*getStatusOptions,*/ getSectionOptions, getUserList, UserSearchParams, deleteUser } from '../../services/userRole/userRoleService'
import Image from '../../components/common/Image'
import RoutesConstants from '../../resources/route-constants'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setLoader } from '../../store/loaderReducer'
import PopupContentCustom from '../../components/popups/PopupContentCustom'
import PopupContentUserDeleteConfirmation from '../../components/popups/PopupContentUserDeleteConfirmation'
import PopupModel from '../../components/popups/PopupModel'
import { POPUP_TYPE_ERROR, POPUP_TYPE_SUCCESS, SECTION_ID } from '../../resources/project-constants'
import { getsearchHistoryUser, setUser } from '../../store/searchHistoryReducer'



// const statusOptions = [
//     { value: '1', label: 'Todos' },
//     { value: '2', label: 'Activo' },
//     { value: '3', label: 'Inactivo' },
// ]

const statusOptions = [
    {value: '', label: 'Todos'},
    { value: '1', label: 'Activo' },
    { value: '0', label: 'Inactivo' },
]

const renderTableActiveColumn = (row: any) => {
    return (
        <span>
            {row.active ? 'Si' : 'No'}
        </span>
    )
}

const renderTableStatesColumn = (row: any) => {
    let states = ''
    if(row.sectionId == SECTION_ID.SECTION_LANDSALE || row.sectionId == SECTION_ID.SECTION_SUPPLIER)
    {
        states= 'Todos'
    }
    else {
        states = row.state
    }
    return (
      <span>{states}</span> 
    )
    
}



const config:any = {
    statusLabel: 'label',
    statusValue: 'value',
    sectionLabel: 'sectionName',
    sectionValue: 'id',
    storeLabel: 'storeName',
    storeValue: 'id',
    gridColumns : [
        {'label': 'NOMBRE', 'key' : 'name', 'type' : 'text' },
        {'label': 'USER ID', 'key' : 'userID', 'type' : 'text'},
        {'label': 'SECCIÓN', 'key' : 'section', 'type' : 'text'},
        {'label': 'ROL', 'key' : 'role', 'type' : 'text'},
        // {'label': 'ESTADOS', 'key' : 'state', 'type' : 'text', 'className':'text-break-word'},
        //{'label': 'ACTIVO', 'key' : 'active', 'type' : 'text'},
        { 'label': 'ESTADOS', 'key': 'state', 'type': 'cellRenderer', 'className':'text-break-word', 'cellRenderer': renderTableStatesColumn },
        { 'label': 'ACTIVO', 'key': 'active', 'type': 'cellRenderer', 'cellRenderer': renderTableActiveColumn },
        {'label': '', 'key' : '', 'type' : 'rowEdit'},
        {'label': '', 'key' : '', 'type' : 'rowDelete'},
        
    ]
}

export const UserIndex: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const searchHistory = useAppSelector(getsearchHistoryUser);

    const {state} = useLocation();
    console.log('history', navigate)
    console.log('state', state)
    console.log('searchHistory', searchHistory)

    //const [statusOptions, setStatusOptions] = useState<any>([])
    const [sectionOptions, setSectionOptions] = useState<any>([])
    const [popupType, setPopupType] = useState<any>('')
    const [modalIsOpen, setIsOpen] = useState(false);
    const [deletedMessage, setDeletedMessage] = useState('');
    const [modelConfirm, setModelConfirm] = useState(false);
    const [deleteRowId, setDeleteRowId] = useState<any>('');
    const [isBackFromDetail, setIsBackFromDetail] = useState<any>(false);

    
    
    
    const [searchParams, setSearchParams] = useState<UserSearchParams>({
        name: '',
        userId: '',
        email: '',
        status: '',
        role: '',
        section: '',
    } );

    const [tableRows, setTableRows] = useState<any>([])
    const [tableTotalRows] = useState(0)

   

    function getDropdownSection(){
        let tempparams:any = {page: 1}
        getSectionOptions(tempparams).then((res:any) => {
            const firstObject = {
                "id": 0,
                "sectionName": "Seleccione",
                "active": "1"
            };
            if (res.data){
                setSectionOptions([firstObject, ...res.data]);
            }else
                setSectionOptions(res.data)
        })
        .catch(() => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
                setSectionOptions([])
        })
    }   

    
    function openModel(type:any){
        setPopupType(type)
        setIsOpen(true)
       
    }

    const getTableRows = () => { 
        dispatch(setLoader(true));
        getUserList(searchParams).then((res:any) => {
            if(res.data){
                setTableRows(res.data)
                dispatch(setLoader(false))
            }
            else{
                setTableRows([])

                dispatch(setLoader(false))
            }
        })
        .catch(() => {
            setTableRows([])
            dispatch(setLoader(false));
        })


    } 
    const deleteUserRow = (id:any) => { 
        deleteUser(id).then((res:any) => {
            if(res.data)
            {
                getTableRows()
                openModel(POPUP_TYPE_SUCCESS)
            }
        })
        .catch(() => {
            openModel(POPUP_TYPE_ERROR)
                
        })


    } 

    

    /* check if coming back from detail page and searched by user id  */
    const setSearchedUserId = () =>  {
        if (state && state.isBack) {
           
            // const { userId } = state;
            console.log('searchHistory.userId', searchHistory.userId)
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    userId: searchHistory.userId
                }
            })
            setIsBackFromDetail(true)
        }
        else{

            getTableRows()
        }
           
    }


    useEffect(() => {
        if(isBackFromDetail)
        {
            getTableRows()
            setIsBackFromDetail(false)
        }
    }, [isBackFromDetail])
   

    useEffect(() => {
        //getDropdownStatus()
        getDropdownSection()
        // getTableRows()

        setSearchedUserId()
    }, [])

    
    
    const handleInputChange = (selected:any, type: 'name' | 'userId' | 'email' | 'status' | 'role' | 'section') => {

        

        if(type == 'name')
        {
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    name: selected.target.value
                }
            })
        }
        if(type == 'userId')
        {
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    userId: selected.target.value
                }
            })
        }
        if(type == 'email')
        {
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    email: selected.target.value
                }
            })
        }


        if(type == 'status')
        {
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    status: selected[config.statusValue]
                }
            })
            
        }
        if(type == 'role')
        {
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    role: selected.target.value
                }
            })
        }
        if(type == 'section')
        {
            if(!selected.id){
                setSearchParams((prevState: any) => {
                    return {
                        ...prevState,
                        section: ""
                    }
                })
                getTableRows();
            }else{
                setSearchParams((prevState: any) => {
                    return {
                        ...prevState,
                        section: selected[config.sectionValue]
                    }
                })
            }
        }

    }


    function handleFilterClick(){
        getTableRows()
    }
    
    const handleDeleteConfirm = (userInput:any) => {
        
        if(userInput)
            deleteUserRow(deleteRowId)

        setModelConfirm(false)
    }

    const handleDeleteState = (deletedRow: any) => {
        if(deletedRow.deleteCd)
        {
            setDeletedMessage('Este usuario ya fue eliminado.')
            setPopupType(POPUP_TYPE_ERROR)
            setIsOpen(true)
        }
        else {
            setModelConfirm(true)
            setDeleteRowId(deletedRow.id)
        }

        
        //navigate('/ExcessPRegisteration', {state: passData})
    }

    
    

    const handleEditState = (row: any) => {
        dispatch(setUser({userId: searchParams.userId}));
        navigate(`${RoutesConstants.UserCreate}?newUser=0`, {state: row})
    }
    
    const goToNewUser = () => {
        navigate(`${RoutesConstants.UserCreate}?newUser=1`)
    }

    function handleModelClose(){
       
        setIsOpen(false)
        setDeletedMessage('')
        
    }
    
    
    return (
        <div className='page-container type-filter'>
            <div className='container main-container'>
                <div className='page-content '>
                    <div className='desc-container mb-20'>
                        <div className="title-wrapper">
                            <MainTitle text={"Usuarios"} />
                        </div>
                        <div className="text-center">
                            <span onClick={() => goToNewUser()}> <Image name='new-user.png' /></span>
                        </div>
                       
                    </div>
                    <div className='filter-form-container'>
                        <div className='row'>
                            <div className='col s12 m6'>
                                <div>
                                    <label htmlFor='format' className="input-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="input-text"
                                        //placeholder={placeholder}
                                        value={searchParams.name}
                                        onChange={(e) => handleInputChange(e, 'name')} 
                                    />
                                    
                                </div>  
                                
                            </div>

                            <div className='col s12 m6'>
                                <div>
                                    <label htmlFor='format' className="input-label">User ID</label>
                                    <input
                                        type="text"
                                        className="input-text"
                                        //placeholder={placeholder}
                                        value={searchParams.userId}
                                        onChange={(e) => handleInputChange(e, 'userId')} 
                                    />
                                    
                                </div>  
                                
                            </div>
                        </div>
                        
                        <div className='row'>
                            <div className='col s12 m6'>
                                <div>
                                    <label htmlFor='format' className="input-label">Correo electrónico</label>
                                    <input
                                        type="text"
                                        className="input-text"
                                        //placeholder={placeholder}
                                        value={searchParams.email}
                                        onChange={(e) => handleInputChange(e, 'email')} 
                                    />
                                    
                                </div>  
                                
                            </div>

                            <div className='col s12 m6'>
                                 <div>
                                    <label htmlFor='format' className="input-label">Estatus de Usuario</label>
                                    <Select  
                                        classNamePrefix='input-select-react'
                                        id='tienda' 
                                        className='input-select-react' 
                                        options={statusOptions} 
                                        onChange={(e) => handleInputChange(e, 'status')} 
                                        getOptionLabel={(option:any) => option[config.statusLabel]}
                                        getOptionValue={(option:any) => option[config.statusValue]}
                                        isSearchable={false}
                                        
                                    />
                                </div>  
                                
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col s12 m6'>
                                <div>
                                    <label htmlFor='format' className="input-label">Rol</label>
                                    <input
                                        type="text"
                                        className="input-text"
                                        //placeholder={placeholder}
                                        value={searchParams.role}
                                        onChange={(e) => handleInputChange(e, 'role')} 
                                    />
                                    
                                </div>  
                                
                            </div>

                            <div className='col s12 m6'>
                                 <div>
                                    <label htmlFor='format' className="input-label">Sección</label>
                                    <Select  
                                        classNamePrefix='input-select-react'
                                        id='tienda' 
                                        className='input-select-react' 
                                        options={sectionOptions} 
                                        onChange={(e) => handleInputChange(e, 'section')} 
                                        getOptionLabel={(option:any) => option[config.sectionLabel]}
                                        getOptionValue={(option:any) => option[config.sectionValue]}
                                        isSearchable={false}
                                        
                                    />
                                </div>  
                                
                            </div>
                        </div>

                       
                        
                        <div className='row'>
                            <div className='col s12 m4 offset-m4'>
                                <PrimaryButton onClick={handleFilterClick}>Buscar</PrimaryButton>
                            </div>
                        </div>
                    </div>

                    <div className='excel-export-container'>
                        <div className='row'>
                            <div className='col s12 text-right'>
                                <div>
                                    <Image name='excel-export.png' />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='datatable-container'>
                        <DataTable2 
                            columns={config.gridColumns} 
                            rows={tableRows} 
                            totalRows={tableTotalRows} 
                            getSelectedRows={() => void 0}
                            callbackClickRow={() => void 0}
                            callbackRefreshRows={() => void 0}
                            callbackDeleteRow={(row: any) => handleDeleteState(row)}
                            callbackEditRow={(row: any) => handleEditState(row)}
                            sort={true}
                        />
                    </div>
                </div>
           </div>

           <PopupModel  hideCloseIcon={true}  isOpen={modalIsOpen} closePopup={handleModelClose} height='260px' width='30%'>
                <PopupContentCustom closePopup={handleModelClose} type={popupType} message={deletedMessage}/>
            </PopupModel>
            <PopupModel  hideCloseIcon={true}  isOpen={modelConfirm} closePopup={handleDeleteConfirm} height='300px' width='30%'>
                <PopupContentUserDeleteConfirmation closePopup={handleDeleteConfirm} />
            </PopupModel>

        </div>
    )
  }
  