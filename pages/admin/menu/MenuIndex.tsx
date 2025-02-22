import React, { useState, useEffect } from 'react'
import { MainTitle } from '../../../components/common/Titles'
import Select from 'react-select'
import { PrimaryButton } from '../../../components/common/Buttons'
import DataTable2 from '../../../components/datatable/DataTable2'
import {   getMenuSearchApi , deleteMenu } from '../../../services/adminGeneral/adminGeneralService'
import Image from '../../../components/common/Image'
import RoutesConstants from '../../../resources/route-constants'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../store/hooks';
import { setLoader } from '../../../store/loaderReducer'



const activeOptions = [
    {value: '2', label: 'Seleccione'},
    { value: '1', label: 'Si' },
    { value: '0', label: 'No' },
]



const renderTableActiveColumn = (row:any) => {
    return (
        <span>
            {row.dnActive == 1 ? 'Si' : 'No'}
        </span>
    )
}
const renderTablePublicAccessColumn = (row:any) => {
    return (
        <span>
            {row.publicAccess == 1 ? 'Si' : 'No'}
        </span>
    )
}

const config:any = {
    statusLabel: 'label',
    statusValue: 'value',
    publicLabel: 'label',
    publicValue: 'value',
    gridColumns : [
        {'label': 'id', 'key' : 'id', 'type' : 'text' },
        {'label': 'NOMBRE', 'key' : 'description', 'type' : 'text' },
        {'label': 'OPCION SUPERIOR', 'key' : 'knMenuDesc', 'type' : 'text'},
        {'label': 'ORDEN', 'key' : 'orderNumber', 'type' : 'text'},
        {'label': 'ACCESO PUBLICO', 'key' : 'publicAccess', 'type' : 'cellRenderer', 'cellRenderer': renderTablePublicAccessColumn},
        {'label': 'ACTIVO', 'key' : 'active', 'type' : 'cellRenderer', 'cellRenderer': renderTableActiveColumn},
        {'label': '', 'key' : '', 'type' : 'rowEdit'},
        {'label': '', 'key' : '', 'type' : 'rowDelete'},
        
    ]
}

export const MenuIndex: React.FC = () => {
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    //const [publicOptions, setPublicOptions] = useState<any>([])
    //const [statusOptions, setStatusOptions] = useState<any>([])
   
    
    
    const [searchParams, setSearchParams] = useState<any>({
        name: '',
        userId: '',
        email: '',
        status: '',
        role: '',
        public: '',
    } );

    const [tableRows, setTableRows] = useState<any>([])
    const [tableTotalRows] = useState(0)

    
    

    const getTableRows = () => { 
        let newAPIRequest = {
            'publicAccess':searchParams?.public,
            'active':searchParams?.status,
            'description':searchParams?.name
          }
        dispatch(setLoader(true));
        getMenuSearchApi(newAPIRequest).then((res:any) => {
            dispatch(setLoader(false));
             if(res.data)
                setTableRows(res.data)
            else
                setTableRows([])
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
                setTableRows([])
            dispatch(setLoader(false));

            console.log('getStateList error', error)
        })

    } 

    const deleteRow = (id:any) => { 
        deleteMenu({id:id}).then(() => {
            getTableRows()
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            //setTableRows([])
            console.log('getStateList error', error)
        })

    } 


   

    useEffect(() => {
       
        getTableRows()
    }, [])

    
    
    const handleInputChange = (selected:any, type: any) => {

        if(selected.value === '2'){
            setSearchParams({
                name: '',
                userId: '',
                email: '',
                status: '',
                role: '',
                public: '',
            });
            getTableRows();
            return;
        }

        if(type == 'name')
        {
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    name: selected.target.value
                }
            })
        }
        

        if(type == 'status'  && selected.value !== '2')
        {
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    status: selected[config.statusValue]
                }
            })
        }
        if(type == 'public' && selected.value !== '2')
        {
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    public: selected[config.publicValue]
                }
            })
        }

        

    }


    function handleFilterClick(){
        getTableRows()
    }
    
    const handleDeleteState = (deletedRow: any) => {
       deleteRow(deletedRow.id)

        //navigate('/ExcessPRegisteration', {state: passData})
    }

    const handleEditState = (row: any) => {
        let passData = { 
            item: row
        }
        navigate(`${RoutesConstants.MenuForm}?newMenu=0`, {state: passData})
    }
    
    const goToNewUser = () => {
        navigate(`${RoutesConstants.MenuForm}?newMenu=1`)
    }
    
    
    return (
        <div className='page-container type-filter '>
            <div className='container main-container'>
                <div className='page-content '>
                    <div className='desc-container mb-20'>
                        <div className="title-wrapper">
                            <MainTitle text={"Menu"} />
                        </div>
                       
                       
                    </div>
                    <div className='filter-form-container'>
                        <div className='row mbl-mb-0'>
                            <div className='col s12  m4'>
                                <div className="text-center">
                                    <span onClick={() => goToNewUser()}> <Image name='new-user.png' /></span>
                                </div>        
                            </div>
                            <div className='col s12  m4'>
                                <div className="input-container">   
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

                            
                        </div>
                        
                        <div className='row'>
                            <div className='col s12  m4'>
                                <div className="input-container">  
                                    <label htmlFor='format' className="input-label">Acceso Publico</label>
                                    <Select  
                                        classNamePrefix='input-select-react'
                                        id='tienda' 
                                        className='input-select-react' 
                                        options={activeOptions} 
                                        onChange={(e) => handleInputChange(e, 'public')} 
                                        getOptionLabel={(option:any) => option.label}
                                        getOptionValue={(option:any) => option.value}
                                        isSearchable={false}
                                        
                                    />
                                </div>  
                                
                            </div>

                            <div className='col s12  m4'>
                                <div className="input-container">   
                                    <label htmlFor='format' className="input-label">Activo</label>
                                    <Select  
                                        classNamePrefix='input-select-react'
                                        id='tienda' 
                                        className='input-select-react' 
                                        options={activeOptions} 
                                        onChange={(e) => handleInputChange(e, 'status')} 
                                        getOptionLabel={(option:any) => option.label}
                                        getOptionValue={(option:any) => option.value}
                                        isSearchable={false}
                                        
                                    />
                                </div>  
                                
                            </div>

                            <div className='col s12  m4'>
                                <PrimaryButton onClick={handleFilterClick}>Buscar</PrimaryButton>
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
        </div>
    )
  }
  