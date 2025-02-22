

import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { PrimaryButton } from '../../../components/common/Buttons'
import DataTable2 from '../../../components/datatable/DataTable2'
import { getNegotiationOptions, getComboOptions, getReportExcessList, ReportExcessTableSearchParams, getExcessExportData  } from '../../../services/report/reportService'
//import Image from '../../../components/common/Image'
import { StateDropdown2 } from '../../../components/dataComponents/StateDropdown2'
import ExportExcel from '../../../components/common/ExcelExport'
import { useAppDispatch } from '../../../store/hooks';
import { setLoader } from '../../../store/loaderReducer'
import { formatNumberToCurrency } from '../../../utility/commonFunctions'



interface Props {
    readOnly: Boolean,
    handleEditRow?: any,
    handleDeleteRow?: any,
}

const activeOptions = [
    {value: '', label: 'Seleccione'},
    { value: '1', label: 'Si' },
    { value: '0', label: 'No' },
]

const renderTableActiveColumn = (row:any) => {
        return (
            <span>
                {row.active == 1 ? 'Si' : 'No'}
            </span>
        )
    }


    const renderTableM2Column = (row:any) => {
        return (
            <span>
                {formatNumberToCurrency(row.squareMeter, true)}
            </span>
        )
    }


    const renderComboCol = (row:any) => {


        //let names = ''
        
        
        var nameArray = row.combo.map((item:any) => {
            return item.name;
        });
        return (
            <span>
               { nameArray.toString()}
            </span>
        )
    } 

const config = {
    comboLabel: 'name',
    comboValue: 'id',
    negotiationLabel: 'negotiation',
    negotiationValue: 'id',
    assetLabel: 'label',
    assetValue: 'value',
    exportExcelName: 'sheet-excess-report',
    gridColumns : [
        {'label': 'CLAVE', 'key' : 'department', 'type' : 'text' },
        {'label': 'NOMBRE', 'key' : 'name', 'type' : 'text'},
        {'label': 'ESTADO', 'key' : 'state', 'type' : 'text'},
        {'label': 'DIRECCIÓN', 'key' : 'address', 'type' : 'text'},
        {'label': 'M²', 'key' : 'squareMeter', 'type' : 'cellRenderer', 'cellRenderer': renderTableM2Column},
        {'label': 'COMBO', 'key' : 'combo', 'type' : 'cellRenderer', 'cellRenderer': renderComboCol},
        {'label': 'NEGOCIACIÓN', 'key' : 'transaction', 'type' : 'text'},
        {'label': 'ACTIVO', 'key' : 'active', 'type' : 'cellRenderer', 'cellRenderer': renderTableActiveColumn},
        // {'label': '', 'key' : '', 'type' : 'rowEdit'},
        // {'label': '', 'key' : '', 'type' : 'rowDelete'},
       
    ]
}

export const ExcessPropertyTable: React.FC<Props> = (props) => {
    const dispatch = useAppDispatch();
    const [comboOptions, setComboOptions] = useState<any>([])
    const [negotiationOptions, setNegotiationOptions] = useState<any>([])
    

    
    
    
    /* show edit and delete button */

    const handleEditRow = (row:any) => {
        if(props.handleEditRow)
            props.handleEditRow(row)
    }

    const handleDeleteRow = (row:any) => {
        if(props.handleDeleteRow)
            props.handleDeleteRow(row)
    }

    
    

    const [searchParams, setSearchParams] = useState<ReportExcessTableSearchParams>({
        state: '',
        asset: '',
        negotiation: '',
        combo: '',
    } );

    const [tableRows, setTableRows] = useState<any>([])
    const [tableTotalRows] = useState(0)

    function getDropdownNegotiation(){

        getNegotiationOptions().then((res:any) => {
            if(res.data)
                {
                   const tempStore ={
                       id: '',
                       [config.negotiationLabel]: "Seleccione"
                   }
   
                   setNegotiationOptions([tempStore, ...res.data]);
                }
            else
                setNegotiationOptions([])
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            setNegotiationOptions([])
            console.log('getStateList error', error)
        })
    }   

    function getDropdownCombo(){

        getComboOptions().then((res:any) => {
            if(res.data)
                {
                   const tempStore ={
                       id: '',
                       [config.comboLabel]: "Seleccione"
                   }
   
                   setComboOptions([tempStore, ...res.data]);
                }
            else
                setComboOptions([])
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            setComboOptions([])
            console.log('getStateList error', error)
        })
    }   

    


    const getTableRows = () => { 
        dispatch(setLoader(true));
        getReportExcessList(searchParams).then((res:any) => {
            if(res.data){
                setTableRows(res.data)
                dispatch(setLoader(false));

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
            console.log('getStateList error', error)
            dispatch(setLoader(false));

        })


    } 


   

    useEffect(() => {
        getDropdownCombo()
        getDropdownNegotiation()
        getTableRows()
    }, [])

    
    
    const handleDropdownChange = (selected:any, type: 'state' | 'combo' | 'negotiation' | 'active') => {

        if(type == 'state')
        {
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    state: selected
                }
            })
        }

        if(type == 'combo')
        {
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    combo: selected[config.comboValue]
                }
            })
        }
        if(type == 'negotiation')
        {
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    negotiation: selected[config.negotiationValue]
                }
            })
        }
        if(type == 'active')
        {
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    asset: selected[config.assetValue]
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
            getExcessExportData(params).then((response:any) => {
                if(response.data){
                    exportToExcel(response.data, config.exportExcelName)
                    dispatch(setLoader(false));
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
        
            
        <>
                    
            <div className='filter-form-container'>
                <div className='row'>
                    <div className='col s12 m6 l3'>
                        {/* <StateDropdown onChange={handleStateChange} /> */}
                        <div className="input-container">   
                            <div className="input-select-react-wrapper">
                                <StateDropdown2 onChange={(stateId: string | number) => handleDropdownChange(stateId, 'state')}/>
                            </div>
                        </div>
                    </div>
                    
                    <div className='col s12 m6 l3'>
                        <div className="input-container">   
                            <label htmlFor='format' className="input-label">Combo</label>
                            <Select  
                                classNamePrefix='input-select-react'
                                id='tipo' 
                                className='input-select-react' 
                                options={comboOptions} 
                                onChange={(e) => handleDropdownChange(e, 'combo')} 
                                getOptionLabel={(option:any) => option[config.comboLabel]}
                                getOptionValue={(option:any) => option[config.comboValue]}
                                isSearchable={false}
                                
                            />
                        </div>  
                        
                    </div>
                    <div className='col s12 m6 l3'>
                        <div className="input-container">   
                            <label htmlFor='format' className="input-label">Negociación</label>
                            <Select  
                                classNamePrefix='input-select-react'
                                id='tienda' 
                                className='input-select-react' 
                                options={negotiationOptions} 
                                onChange={(e) => handleDropdownChange(e, 'negotiation')} 
                                getOptionLabel={(option:any) => option[config.negotiationLabel]}
                                getOptionValue={(option:any) => option[config.negotiationValue]}
                                isSearchable={false}
                                
                            />
                        </div>  
                    </div>
                    <div className='col s12 m6 l3'>
                        <div className="input-container">   
                            <label htmlFor='format' className="input-label">Activo</label>
                            <Select  
                                classNamePrefix='input-select-react'
                                id='format' 
                                className='input-select-react' 
                                options={activeOptions} 
                                onChange={(e) => handleDropdownChange(e, 'active')} 
                                //getOptionLabel={(option:any) => option[config.formatLabel]}
                                //getOptionValue={(option:any) => option[config.formatValue]}
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
                    callbackEditRow={(row:any) => handleEditRow(row)}
                    callbackDeleteRow={(row:any) => handleDeleteRow(row)}
                    sort={true}
                />
            </div>
                
        </>
    )
  }
  