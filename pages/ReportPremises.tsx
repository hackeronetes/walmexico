import React, { useState, useEffect } from 'react'
import { MainTitle } from '../components/common/Titles'
import Select from 'react-select'
import { PrimaryButton } from '../components/common/Buttons'
import DataTable2 from '../components/datatable/DataTable2'
import { getStoreOptions, getFormatOptions, getGuyOptions, getReportComercialList, ReportComercialTableSearchParams, getLocaCommercialExportData } from '../services/report/reportService'
import { StateDropdown } from '../components/dataComponents/StateDropdown'
import ExportExcel from '../components/common/ExcelExport';
import { setLoader } from '../store/loaderReducer';
import { useAppDispatch } from '../store/hooks';
// import { useNavigate } from 'react-router-dom'
// import RoutesConstants from '../resources/route-constants';

const config:any = {
    formatLabel: 'format',
    formatValue: 'id',
    guyLabel: 'guyName',
    guyValue: 'id',
    storeLabel: 'storeName',
    storeValue: 'id',
    exportExcelName: 'sheet-local-report',
    gridColumns : [
        {'label': 'DETERMINANTE', 'key' : 'department', 'type' : 'text' },
        {'label': 'FORMATO', 'key' : 'format', 'type' : 'text'},
        {'label': 'TIENDA', 'key' : 'storeName', 'type' : 'text'},
        {'label': 'ESTADO', 'key' : 'state', 'type' : 'text'},
        {'label': 'DIRECCIÓN', 'key' : 'addressName', 'type' : 'text'},
        {'label': 'TIPO', 'key' : 'guy', 'type' : 'text'},
        {'label': 'M²', 'key' : 'm2', 'type' : 'text'},
        {'label': 'M² FRENTE', 'key' : 'm2Font', 'type' : 'text'},
        {'label': 'M² FONDO', 'key' : 'm2Depth', 'type' : 'text'},
    ]
}

export const ReportPremises: React.FC = () => {
    
    const [formatOptions, setFormatOptions] = useState<any>([])
    const [storeOptions, setStoreOptions] = useState<any>([])
    const [guyOptions, setGuyOptions] = useState<any>([])
    const dispatch = useAppDispatch();
    
    // const navigate = useNavigate()
    
    const [searchParams, setSearchParams] = useState<ReportComercialTableSearchParams>({
        state: '',
        store: '',
        guy: '',
        format: '',
    } );

    const [tableRows, setTableRows] = useState<any>([])
    const [tableTotalRows] = useState(0)

    function getDropdownStores(){
        getStoreOptions().then((res:any) => {
             if(res.data)
             {
                const tempStore ={
                    id: '',
                    [config.storeLabel]: "Seleccione"
                }

                setStoreOptions([tempStore, ...res.data]);
             }
                
            else
                setStoreOptions([])
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            setStoreOptions([])
            dispatch(setLoader(false));

            console.log('getStateList error', error)
        })
    }   

    function getDropdownFormat(){

        getFormatOptions().then((res:any) => {
            if(res.data)
            {
                const tempStore ={
                    id: '',
                    [config.formatLabel]: "Seleccione"
                }

                setFormatOptions([tempStore, ...res.data]);
            }
            else
                setFormatOptions([])
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            setFormatOptions([])
            dispatch(setLoader(false));

            console.log('getStateList error', error)
        })
    }   

    function getDropdownGuy(){
        getGuyOptions().then((res:any) => {
            
            if(res.data)
            {
                const tempStore ={
                    id: '',
                    [config.guyLabel]: "Seleccione"
                }

                setGuyOptions([tempStore, ...res.data]);
            }
            else
                setGuyOptions([])
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            dispatch(setLoader(false));

            setGuyOptions([])
            console.log('getStateList error', error)
        })
    }   


    const getTableRows = () => { 
        dispatch(setLoader(true));
        getReportComercialList(searchParams).then((res:any) => {
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
        getDropdownStores()
        getDropdownGuy()
        getDropdownFormat()
        getTableRows()
    }, [])

    
    
    const handleDropdownChange = (selected:any, type: 'state' | 'store' | 'guy' | 'format') => {

        if(type == 'state')
        {
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    state: selected
                }
            })
        }

        if(type == 'store')
        {
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    store: selected[config.storeValue]
                }
            })
        }
        if(type == 'guy')
        {
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    guy: selected[config.guyValue]
                }
            })
        }
        if(type == 'format')
        {
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    format: selected[config.formatValue]
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
    
            getLocaCommercialExportData(params).then((response:any) => {
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
                            <MainTitle text={"Reporte de Locales"} />
                        </div>
                       
                    </div>
                    <div className='filter-form-container'>
                        <div className='row'>
                            <div className='col s12 m6 l3'>
                                {/* <StateDropdown onChange={handleStateChange} /> */}
                                <div className="input-container">
                                    <div className="input-select-react-wrapper">
                                        <StateDropdown onChange={(stateId: string | number) => handleDropdownChange(stateId, 'state')}/>
                                    </div>
                                </div>
                            </div>
                            <div className='col s12 m6 l3'>
                                <div className="input-container">
                                    <label htmlFor='format' className="input-label">Tienda</label>
                                    <Select  
                                        classNamePrefix='input-select-react'
                                        id='tienda' 
                                        className='input-select-react' 
                                        options={storeOptions} 
                                        onChange={(e) => handleDropdownChange(e, 'store')} 
                                        getOptionLabel={(option:any) => option[config.storeLabel]}
                                        getOptionValue={(option:any) => option[config.storeValue]}
                                        isSearchable={false}
                                        
                                    />
                                </div>  
                            </div>
                            <div className='col s12 m6 l3'>
                                <div className="input-container">
                                    <label htmlFor='format' className="input-label">Tipo</label>
                                    <Select  
                                        classNamePrefix='input-select-react'
                                        id='tipo' 
                                        className='input-select-react' 
                                        options={guyOptions} 
                                        onChange={(e) => handleDropdownChange(e, 'guy')} 
                                        getOptionLabel={(option:any) => option[config.guyLabel]}
                                        getOptionValue={(option:any) => option[config.guyValue]}
                                        isSearchable={false}
                                        
                                    />
                                </div>  
                                
                            </div>
                            <div className='col s12 m6 l3'>
                                <div className="input-container">   
                                    <label htmlFor='format' className="input-label">Formato</label>
                                    <Select  
                                        classNamePrefix='input-select-react'
                                        id='format' 
                                        className='input-select-react' 
                                        options={formatOptions} 
                                        onChange={(e) => handleDropdownChange(e, 'format')} 
                                        getOptionLabel={(option:any) => option[config.formatLabel]}
                                        getOptionValue={(option:any) => option[config.formatValue]}
                                        isSearchable={false}
                                        
                                    />
                                </div>  
                            </div>
                            
                        </div>
                        
                        <div className='row'>
                            <div className='col s12 m4 offset-m4'>
                                <PrimaryButton onClick={handleFilterClick}>Filtrar</PrimaryButton>
                            </div>
                        </div>
                        {/* <div className='row'>
                            <div className='col s2 offset-s10'>
                                <PrimaryButton onClick={handleBulkUpload}>carga masivo</PrimaryButton>
                            </div>
                        </div> */}
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
  