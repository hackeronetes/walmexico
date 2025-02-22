// @ts-ignore
import React, { useState, useEffect } from 'react'
import { MainTitle } from '../../../../components/common/Titles'
import { TextP } from '../../../../components/common/TextP'
// import { StateDropdown } from '../components/dataComponents/StateDropdown'
import Select from 'react-select'
import { PrimaryButton } from '../../../../components/common/Buttons'
import DataTable2 from '../../../../components/datatable/DataTable2'
import { getStatusOptions,   getFolioLocalComercialListExternal 
    } from '../../../../services/folioTracking/folioTrackingService'
import DatePickerInput from '../../../../components/common/DatePickerInput';
import { useNavigate } from "react-router-dom";
import PopupModel from '../../../../components/popups/PopupModel'
import PopupContentErrorMessage from '../../../../components/popups/PopupContentErrorMessage'
// import {ExcelFile, ExcelSheet} from "react-export-excel";
// import ReactExport from "react-export-excel";
// import XLSX from 'xlsx';
import {getLoginUser} from '../../../../store/authReducer' 
import {useAppSelector} from '../../../../store/hooks'

import { formatDateHyphen } from './../../../../utility/commonFunctions';
import { useAppDispatch } from '../../../../store/hooks'
import { setLoader } from '../../../../store/loaderReducer'

const dateTypes = {
    recieptStartDate: 'recieptStartDate',
    recieptEndDate: 'recieptEndDate',
    updateStartDate: 'updateStartDate',
    updateEndDate: 'updateEndDate',
}


const config:any = {
    stateLabel: 'stateName',
    stateValue: 'stateId',
    statusLabel: 'statusName',
    statusValue: 'statusId',
    exportExcelName: 'sheet-folio',
    gridColumns : [
        {'label': 'FOLIO', 'key' : 'folioCd', 'type' : 'text' },
        {'label': 'TIENDA', 'key' : 'store', 'type' : 'text'},
        {'label': 'LOCAL', 'key' : 'isLocal', 'type' : 'text'},
        {'label': 'DIRECCIÓN', 'key' : 'direction', 'type' : 'text'},
        {'label': 'ESTADO', 'key' : 'states', 'type' : 'text'},
        {'label': 'FECHA', 'key' : 'date', 'type' : 'text'},
        {'label': 'ESTATUS', 'key' : 'statuss', 'type' : 'text'},
        // {'label': 'DIRECCION', 'key' : 'addressDs', 'type' : 'cellRenderer', 'cellRenderer': eventButton},
        {'label': '', 'key' : '', 'type' : 'rowClick'},
    ]
}

export const External: React.FC = () => {
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [modalErrorIsOpen, setModalErrorIsOpen] = React.useState(false);

    
    const [statusList, setStatusList] = useState<any>()
    const loginUser = useAppSelector(getLoginUser);
    
    const [formDates, setFormDates] = useState<any>({
        recieptStartDate: '',
        
    });
    const [searchParams, setSearchParams] = useState<any>({
        status: '',
        recieptStartDate: '',
        export: false,
        userType: 'externo',
        userId: ''
    } );

    const [tableRows, setTableRows] = useState<any>([])
    const [tableTotalRows] = useState(0)


   
    
    const getTableRows = () => {

        dispatch(setLoader(true));

        let params:any = searchParams
        params.recieptStartDate = formatDateHyphen(searchParams.recieptStartDate)
        // params.userId = loginUser.userId;
        //params.userId = 121024;

        getFolioLocalComercialListExternal(searchParams).then((response:any) => {
            dispatch(setLoader(false));
            if(response.data){
                setTableRows(response.data);
                
            }
            else
                setTableRows([])
        })
        .catch((error:any) => {
            setTableRows([])
            console.log('getStateList error', error)
            setModalErrorIsOpen(true)
            dispatch(setLoader(false));
        })
    }
    
    const getStatusDropdowns = () => {

        getStatusOptions().then((response:any) => {
            setStatusList(response.data)
        })
        .catch((error:any) => {
            console.log('getStateList error', error)
            setModalErrorIsOpen(true)
        })

    }
   
    useEffect(() => {
        //getTableTotalRows()
        getStatusDropdowns()

        // if(loginUser.userId)
            getTableRows()
    }, [])

    useEffect(() => {
        // if(loginUser.userId)
            // getTableRows()
    }, [loginUser])

    // const getDropdownValue = (selected) => {
    //     return selected[config.statusValue]
    // }

   

    const handleStatusChange = (selected:any) => {
        
        let value = ''
        if(selected)
        {
            value = selected[config.statusValue]
        }
        
        setSearchParams((prevState:any) => {
            return {
                ...prevState,
                status: value
            }
        })
        
    }

  


    const handleDateChange = ( date:any, dateType:string) => {
        switch(dateType)
        {
            case dateTypes.recieptStartDate: 
                setSearchParams((prevState:any) => {
                    return {
                        ...prevState,
                        recieptStartDate : date
                    }
                });
                setFormDates((prevState:any) => {
                    return {
                        ...prevState,
                        recieptStartDate : date
                    }
                });
                break
            
        }
        
    }

    
    function handleModelClose(){
        setModalErrorIsOpen(false)
    }
    
    
    const handleFilterClick = () => {
        getTableRows()
    }

    
    
    const handleClickRow = (item:any) => {
       navigate('/LcDetailAdmin', {state: item})

    }

    

    return (
        <div className='page-container type-filter'>
            <div className='container main-container'>
                <div className='page-content '>
                    {/* <ExcelFile>
                        <ExcelSheet dataSet={excelData} name="Organization"/>
                    </ExcelFile> */}

                    <div className='desc-container'>
                        <div className="title-wrapper">
                            <MainTitle text={"Folio de Locales Comerciales"} />
                        </div>
                        <div className="page-desc-wrapper">
                            <TextP >En esta sección podrá ver todos sus folios con los datos clave de cada solicitud y así dar seguimiento a los mismos. Seleccione los tres puntos que se encuentra a la derecha del status para ver más información del mismo.</TextP>
                        </div>
                    </div>
                    <div className='filter-form-container'>
                        <div className='row'>
                            
                           
                            <div className='col s12 m6'>
                                <div className="input-container">  
                                    <label htmlFor='format' className="input-label">Estatus</label>
                                    {/* <Select  classNamePrefix='input-select-react' id='status' className='input-select-react' options={statusList} onChange={(e) => handleStatusChange(e)} value={status} /> */}
                                    <Select  
                                        classNamePrefix='input-select-react'
                                        id='status' 
                                        className='input-select-react' 
                                        options={statusList} 
                                        onChange={(e) => handleStatusChange(e)} 
                                        getOptionLabel={(option:any) => option[config.statusLabel]}
                                        getOptionValue={(option:any) => option[config.statusValue]}
                                        isSearchable={false}
                                        defaultInputValue={''}
                                        isClearable
                                    />
                                </div>  
                            </div>

                            <div className='col s12 m6'>
                            <div className="input-container">  
                                <DatePickerInput 
                                    label={'Fecha'}
                                    value={formDates.recieptStartDate}
                                    handleDateChange={(date:any) => handleDateChange( date, dateTypes.recieptStartDate)}
                                />
                            </div>
                            </div>


                        </div>
                        
                        <div className='row'>
                            <div className='col s4 offset-s4'>
                                <PrimaryButton onClick={handleFilterClick}>Filtrar</PrimaryButton>
                            </div>
                        </div>
                    </div>

                  

                    <div className='datatable-container'>
                        <DataTable2 
                            columns={config.gridColumns} 
                            rows={tableRows} 
                            totalRows={tableTotalRows} 
                            getSelectedRows={() => void 0}
                            callbackClickRow={handleClickRow}
                            callbackRefreshRows={() => void 0}
                            sort={true}
                        />
                    </div>
                </div>
           </div>

             <PopupModel  isOpen={modalErrorIsOpen} closePopup={() => handleModelClose()} width='40%' height='250px'>
                <PopupContentErrorMessage  closePopup={() => handleModelClose()} />
            </PopupModel>

        </div>
    )
  }
  