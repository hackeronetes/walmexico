import React, { useState, useEffect } from 'react'
import { MainTitle } from '../components/common/Titles'
import Select from 'react-select'
import { PrimaryButton } from '../components/common/Buttons'
import DataTable2 from '../components/datatable/DataTable2'
 import { getRoleOptions, getSectionOptions, getReportUserList, ReportUserTableSearchParams, getUserExportData  } from '../services/report/reportService'
//import Image from '../components/common/Image'
import ExportExcel from '../components/common/ExcelExport'
import { useAppDispatch } from '../store/hooks';
import { setLoader } from '../store/loaderReducer'


const config:any = {
    roleLabel: 'name',
    roleValue: 'id',
    sectionLabel: 'sectionName',
    sectionValue: 'id',
    exportExcelName: 'sheet-user-report',
    gridColumns : [
        {'label': 'ESTADO', 'key' : 'state', 'type' : 'text', 'className':'text-break-word' },
        {'label': 'MUNICIPIO / DELEGACIÓN', 'key' : 'town', 'type' : 'text'},
        {'label': 'FORMATO', 'key' : 'format', 'type' : 'text'},
        {'label': 'SECCION', 'key' : 'section', 'type' : 'text'},
        {'label': 'ROL', 'key' : 'role', 'type' : 'text'},
        {'label': 'USUARIO', 'key' : 'user', 'type' : 'text'},
        
    ]
}

export const ReportUser: React.FC = () => {
    const dispatch = useAppDispatch();
    const [roleOptions, setRoleOptions] = useState<any>([])
    const [sectionOptions, setSectionOptions] = useState<any>([])
    const [roleSelect, setRoleSelect] = useState<any>('')
    
    
    const [searchParams, setSearchParams] = useState<ReportUserTableSearchParams>({
        role: '',
        section: '',
        user: '',
    } );

    const [tableRows, setTableRows] = useState<any>([])
    const [tableTotalRows] = useState(0)

    function getDropdownRole(){

        getRoleOptions(searchParams.section).then((res:any) => {
            if(res.data)
                {
                   const tempStore ={
                       id: '',
                       [config.roleLabel]: "Seleccione"
                   }
   
                   setRoleOptions([tempStore, ...res.data]);
                }
                   
            else
                setRoleOptions([])
            
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
                setRoleOptions([])
            console.log('getStateList error', error)
        })
    }   

    function getDropdownSection(){

        getSectionOptions().then((res:any) => {
            const firstObject = {
                "id": 0,
                "sectionName": "seleccione",
                "active": "1"
            }
            if(res.data)
                setSectionOptions([firstObject, ...res.data])
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

    


    const getTableRows = (section: string= '') => { 
        dispatch(setLoader(true))
        if(section === 'noData'){
            searchParams.section = '';
        }
        getReportUserList(searchParams).then((res:any) => {
            if(res.data){
                setTableRows(res.data)

                dispatch(setLoader(false))
            }
            else{
                setTableRows([])
                dispatch(setLoader(false));
            }
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
                setTableRows([])
                dispatch(setLoader(false));
            console.log('getStateList error', error)
        })


    } 


    function resetRole(){
        setSearchParams((prevState:any) => {
            return {
                ...prevState,
                role: ''
            }
        })
        setRoleOptions([])
    }
   

    useEffect(() => {
        getDropdownSection()
        getTableRows()
    }, [])

    useEffect(() => {
        if(searchParams.section)
            getDropdownRole()
        else
            resetRole()
    }, [searchParams.section])


    
    

    

    const handleDropdownChange = (selected:any, type: 'role' | 'section' | 'user') => {

        let value = ''

        if(type == 'role')
        {
            if(selected)
            {
                value = selected[config.roleValue]
            }
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    role: value
                }
            })
            setRoleSelect(selected)
        }

        if(type == 'section')
        {
            if(selected)
            {
                value = selected[config.sectionValue]
            }
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    section: value,
                    role: ''
                }
            })
            getTableRows('noData')
            setRoleSelect('')
        }

        if(type == 'user')
        {
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    user: selected.target.value
                }
            })
        }

    }

    function handleFilterClick(){
        getTableRows()
    }
    
    
    
    const { exportToExcel, } = ExportExcel({}) 
        const startExcel = () => {
            
            let params:any = searchParams
            params.export = true
            dispatch(setLoader(true));
            getUserExportData(params).then((response:any) => {
                if(response.data){
                    dispatch(setLoader(false));
                    exportToExcel(response.data, config.exportExcelName)
                    
                }
            })
            .catch((error:any) => {
               console.log(error)
               dispatch(setLoader(false));
               //setModalErrorIsOpen(true)
            })
    
        }
    const {renderExcelButton } = ExportExcel({exportExcel: startExcel}) 

    
    return (
        <div className='page-container type-filter'>
            <div className='container main-container'>
                <div className='page-content '>
                    <div className='desc-container'>
                        <div className="title-wrapper">
                            <MainTitle text={"Usuarios"} />
                        </div>
                       
                    </div>
                    <div className='filter-form-container'>
                        <div className='row'>
                           <div className='col s12 m6'>
                            <div className="input-container">   
                                    <label htmlFor='format' className="input-label">sección</label>
                                    <Select  
                                        classNamePrefix='input-select-react'
                                        id='tienda' 
                                        className='input-select-react' 
                                        options={sectionOptions} 
                                        onChange={(e) => handleDropdownChange(e, 'section')} 
                                        getOptionLabel={(option:any) => option[config.sectionLabel]}
                                        getOptionValue={(option:any) => option[config.sectionValue]}
                                        isSearchable={false}
                                        isClearable
                                        
                                    />
                                </div>  
                            </div>
                            <div className='col s12 m6'>
                                <div className="input-container">       
                                    <label htmlFor='format' className="input-label">Rol</label>
                                    <Select  
                                        classNamePrefix='input-select-react'
                                        id='tienda' 
                                        className='input-select-react' 
                                        options={roleOptions} 
                                        onChange={(e) => handleDropdownChange(e, 'role')} 
                                        getOptionLabel={(option:any) => option[config.roleLabel]}
                                        getOptionValue={(option:any) => option[config.roleValue]}
                                        value={roleSelect}
                                        isSearchable={false}
                                        isClearable
                                    />
                                </div>  
                            </div>
                            </div>
                            <div className='row'>

                            <div className='col s12 m6'>
                                <div className="input-container">   
                                    <label htmlFor='format' className="input-label">Usuario</label>
                                    <input
                                        type="text"
                                        className="input-text"
                                        //placeholder={placeholder}
                                        value={searchParams.user}
                                        onChange={(e) => handleDropdownChange(e, 'user')} 
                                    />
                                </div>  
                            </div>
                        </div>
                        
                        <div className='row'>
                            <div className='col s12 m6 offset-m3'>
                                <PrimaryButton onClick={handleFilterClick}>Filtrar</PrimaryButton>
                            </div>
                        </div>
                    </div>

                    <div className='excel-export-container'>
                        <div className='row'>
                            <div className='col s12 text-right'>
                                <div>
                                    {renderExcelButton()}
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
                            sort={true}
                        />
                    </div>
                </div>
           </div>
        </div>
    )
  }
  