import React, { useState, useEffect } from 'react'
import { MainTitle } from '../components/common/Titles'
import Select from 'react-select'
import { PrimaryButton } from '../components/common/Buttons'
import DataTable2 from '../components/datatable/DataTable2'
 import { getRoleOptions, getSectionOptions, getReportRoleList, getRoleExportData  } from '../services/report/reportService'
import ExportExcel from '../components/common/ExcelExport';
import { useAppDispatch } from '../store/hooks';
import { setLoader } from '../store/loaderReducer'


const config:any = {
    roleLabel: 'name',
    roleValue: 'id',
    sectionLabel: 'sectionName',
    sectionValue: 'id',
    exportExcelName: 'sheet-roles-report',
    gridColumns : [
        {'label': 'SECCION', 'key' : 'section', 'type' : 'text'},
        {'label': 'ROL', 'key' : 'role', 'type' : 'text'},
        {'label': 'PERMISOS', 'key' : 'permision', 'type' : 'text', 'className':'text-break-word'},
        
    ]
}

export const ReportRole: React.FC = () => {
    
    const [roleOptions, setRoleOptions] = useState<any>([])
    const [sectionOptions, setSectionOptions] = useState<any>([])
    const [roleSelect, setRoleSelect] = useState<any>('')
    const dispatch = useAppDispatch();
    
    
    const [searchParams, setSearchParams] = useState({
        section: '',
        store: '',
        guy: '',
        format: '',
    } );

    const [tableRows, setTableRows] = useState<any>([])
    const [tableTotalRows] = useState(0)


    function getDropdownRole(sectionId:any){

        getRoleOptions(sectionId).then((res:any) => {
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

    


    const getTableRows = () => { 
        dispatch(setLoader(true));
        getReportRoleList(searchParams).then((res:any) => {
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


   

    useEffect(() => {
        //getDropdownRole()
        getDropdownSection()
        getTableRows()
    }, [])

    
    

    

    const handleDropdownChange = (selected:any, type: 'role' | 'section') => {

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
                getDropdownRole(selected[config.sectionValue])
            }
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    section: value,
                    role: ''
                }
            })
            setRoleSelect('')
            
        }

    }

    function handleFilterClick(){
        getTableRows()
    }

    const { exportToExcel, } = ExportExcel({}) 
    
    
        const startExcel = () => {
            
            let params:any = searchParams
            params.export = true
    
            getRoleExportData(params).then((response:any) => {
                if(response.data)
                    exportToExcel(response.data, config.exportExcelName)
            })
            .catch((error:any) => {
               console.log(error)
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
                            <MainTitle text={"Roles"} />
                        </div>
                       
                    </div>
                    <div className='filter-form-container'>
                        <div className='row'>
                           <div className='col s12 m6'>
                                <div className="input-container">   
                                    <label htmlFor='format' className="input-label">Sección</label>
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
                            <div className='col s12 m6 offset-m4'>
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
  