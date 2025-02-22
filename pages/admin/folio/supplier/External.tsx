// @ts-ignore
import React, { useState, useEffect } from 'react'
import { MainTitle } from '../../../../components/common/Titles'
import { TextP } from '../../../../components/common/TextP'
// import { StateDropdown } from '../../../../components/dataComponents/StateDropdown'
import Select from 'react-select'
import { PrimaryButton } from '../../../../components/common/Buttons'
import DataTable2 from '../../../../components/datatable/DataTable2'
import {  getFolioSupplierListExternal 
    } from '../../../../services/folioTracking/folioTrackingService'
import DatePickerInput from '../../../../components/common/DatePickerInput';
import { useNavigate } from "react-router-dom";
//import ExportExcel from '../../../../components/common/ExcelExport'
import PopupModel from '../../../../components/popups/PopupModel'
import PopupContentErrorMessage from '../../../../components/popups/PopupContentErrorMessage'
// import {ExcelFile, ExcelSheet} from "react-export-excel";
// import ReactExport from "react-export-excel";
// import XLSX from 'xlsx';
import RoutesConstants from '../../../../resources/route-constants';
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

const formTypeOptions = [
    {id: 1, label: 'Construcciónes'},
    {id: 2, label: 'Materiales'},
]

// const renderTableActiveColumn = (row:any) => {
//     return (
//         <span>
//             {row.activeCd == 1  ? 'Si' : 'No'}
//         </span>
//     )
// }

const config:any = {
    formTypeLabel: 'label',
    formTypeValue: 'id',
    exportExcelName: 'sheet-folio',
    gridColumns : [
        {'label': 'FOLIO', 'key' : 'folioCd', 'type' : 'text' },
        {'label': 'RAZÓN SOCIAL', 'key' : 'businessName', 'type' : 'text'},
       // {'label': 'ESTADO', 'key' : 'states', 'type' : 'text'},
        {'label': 'FECHA DE RECEPCIÓN', 'key' : 'createDate', 'type' : 'text'},
        {'label': 'ÚLTIMA ACTUALIZACIÓN', 'key' : 'requestModDate', 'type' : 'text'},
        {'label': 'ESTATUS', 'key' : 'dxRequestStatusDs', 'type' : 'text'},
        //{'label': 'ACTIVO', 'key' : 'activeCd', 'type' : 'cellRenderer', 'cellRenderer': renderTableActiveColumn}, // Removed as not in prod.
        // {'label': 'DIRECCION', 'key' : 'addressDs', 'type' : 'cellRenderer', 'cellRenderer': eventButton},
        {'label': '', 'key' : '', 'type' : 'rowClick'},
    ]
}



export const External: React.FC = () => {
    

    const navigate = useNavigate();

    const [modalErrorIsOpen, setModalErrorIsOpen] = React.useState(false);
    const loginUser = useAppSelector(getLoginUser);
    const dispatch = useAppDispatch();
   
    
    
    const [formDates, setFormDates] = useState<any>({
        recieptStartDate: '',
        recieptEndDate: '',
        updateStartDate: '',
        updateEndDate: '',
    });
    const [searchParams, setSearchParams] = useState<any>({
        form: 1,
        status: '',
        recieptStartDate: '',
        recieptEndDate: '',
        updateStartDate: '',
        updateEndDate: '',
        export: false,
        userId: '',
        userType: 'externo',
    } );

    const [tableRows, setTableRows] = useState<any>([])
    const [tableTotalRows] = useState(0)



    /* Excel Export functions   */

    //const { exportToExcel, } = ExportExcel({}) 


    /*const startExcel = () => {
        
        let params:any = searchParams
        params.export = true
        params.userId = loginUser.userId;

       

        getFolioSupplierListExternal(params).then((response:any) => {
            if(response.data)
                exportToExcel(response.data, config.exportExcelName)
        })
        .catch((error:any) => {
           console.log(error)
           setModalErrorIsOpen(true)
        })

        
    }*/
    //const {renderExcelButton } = ExportExcel({exportExcel: startExcel}) 

   
    
    const getTableRows = () => {
       // alert('dfdfsfd')
       let params:any = searchParams
        // params.userId = loginUser.userId;
        //params.userId = 121024;
        dispatch(setLoader(true));

        params.recieptStartDate = formatDateHyphen(searchParams.recieptStartDate)
        params.recieptEndDate = formatDateHyphen(searchParams.recieptEndDate)
        params.updateStartDate = formatDateHyphen(searchParams.updateStartDate)
        params.updateEndDate = formatDateHyphen(searchParams.updateEndDate)
        params.export = false
        

        getFolioSupplierListExternal(params).then((response:any) => {
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

   
    
    

    useEffect(() => {
        //getTableTotalRows()
        // if(loginUser.userId)9uiuiii
            getTableRows()
    }, [])

    useEffect(() => {
        // if(loginUser.userId)
           // getTableRows()
    }, [loginUser])


    const handleFormTypeChange = (selected:any) => {
        setSearchParams((prevState:any) => {
            return {
                ...prevState,
                form: selected[config.formTypeValue]
            }
        })
    }

   
    const handleFolioInputChange = (selected:any) => {
        setSearchParams((prevState:any) => {
            return {
                ...prevState,
                folio: selected.target.value
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
            case dateTypes.recieptEndDate: 
                setSearchParams((prevState:any) => {
                    return {
                        ...prevState,
                        recieptEndDate : date
                    }
                });
                setFormDates((prevState:any) => {
                    return {
                        ...prevState,
                        recieptEndDate : date
                    }
                });
                break
            case dateTypes.updateStartDate: 
                setSearchParams((prevState:any) => {
                    return {
                        ...prevState,
                        updateStartDate : date
                    }
                });
                setFormDates((prevState:any) => {
                    return {
                        ...prevState,
                        updateStartDate : date
                    }
                });
                break
            case dateTypes.updateEndDate: 
                setSearchParams((prevState:any) => {
                    return {
                        ...prevState,
                        updateEndDate : date
                    }
                });
                setFormDates((prevState:any) => {
                    return {
                        ...prevState,
                        updateEndDate : date
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
        let data = {
            folio: item, 
            type:searchParams.form
        }
        navigate(RoutesConstants.FolioSupplierDetail, {state: data })
        

    }

    

    
    //  const ExcelFile = ReactExport.ExcelFile;
    //  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    //const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
    // const  testDownload = (data:any, fileName:any) => {
    //     // create a new blank workbook
    //     const workBook = XLSX.utils.book_new();
    
    //     // convert from json to worksheet
    //     const workSheet = XLSX.utils.json_to_sheet(data);
    
    //     // insert worksheet into workbook
    //     XLSX.utils.book_append_sheet(workBook, workSheet, ['test']);
    
    //     // download file
    //     XLSX.writeFile(workBook, `${fileName}.xlsx`);
    // };
    // testDownload(excelData, 'hahaha')
    
    

    return (
        <div className='page-container type-filter'>
            <div className='container main-container'>
                <div className='page-content '>
                    {/* <ExcelFile>
                        <ExcelSheet dataSet={excelData} name="Organization"/>
                    </ExcelFile> */}

                    <div className='desc-container'>
                        <div className="title-wrapper">
                            <MainTitle text={"Seguimiento de Proveedores"} />
                        </div>
                        <div className="page-desc-wrapper">
                            <TextP >En esta sección podrá ver todos sus folios con los datos clave de cada solicitud y así dar seguimiento a los mismos. Seleccione los tres puntos que se encuentra a la derecha del status para ver más información del mismo.</TextP>
                        </div>
                    </div>
                    <div className='filter-form-container'>
                        <div className='row'>
                            <div className='col offset-m4 s12 m4'>
                                {/* <StateDropdown onChange={handleStateChange} /> */}
                                <div className="input-container">  
                                    <label htmlFor='format' className="input-label">Tipo de Formulario</label>
                                    {/* <Select  classNamePrefix='input-select-react' id='state' className='input-select-react' options={states} onChange={(e) => handleStateChange(e)} value={state} /> */}
                                    <Select  
                                        classNamePrefix='input-select-react'
                                        id='state' 
                                        className='input-select-react' 
                                        options={formTypeOptions} 
                                        onChange={(e) => handleFormTypeChange(e)} 
                                        getOptionLabel={(option:any) => option[config.formTypeLabel]}
                                        getOptionValue={(option:any) => option[config.formTypeValue]}
                                        isSearchable={false}
                                        defaultValue={formTypeOptions[0]}
                                    />
                                </div>
                            </div>
                            
                        </div>
                        <div className='row'>
                            <div className='col s12 m6 l3'>
                            <div className="input-container">  
                                <DatePickerInput 
                                    label={'Fecha de recepción desde'}
                                    value={formDates.recieptStartDate}
                                    handleDateChange={(date:any) => handleDateChange( date, dateTypes.recieptStartDate)}
                                />
                            </div>
                            </div>
                            <div className='col s12 m6 l3'>
                            <div className="input-container">  
                                <DatePickerInput 
                                    label={'Hasta'}
                                    minDate={formDates.recieptStartDate}
                                    value={formDates.recieptEndDate}
                                    handleDateChange={(date:any) => handleDateChange( date, dateTypes.recieptEndDate)}
                                />
                            </div>
                            </div>
                            <div className='col s12 m6 l3'>
                            <div className="input-container">  
                                <DatePickerInput 
                                    label={'Fecha actualización desde'}
                                    value={formDates.updateStartDate}
                                    handleDateChange={(date:any) => handleDateChange( date, dateTypes.updateStartDate)}
                                />
                            </div>
                            </div>
                            <div className='col s12 m6 l3'>
                            <div className="input-container">  
                                <DatePickerInput 
                                    label={'Hasta'}
                                    minDate={formDates.updateStartDate}
                                    value={formDates.updateEndDate}
                                    handleDateChange={(date:any) => handleDateChange( date, dateTypes.updateEndDate)}
                                />
                            </div>
                            </div>
                        </div>
                        
                        <div className='row'>
                           
                            <div className='col s12 m6 l3'>
                                <div className=''>
                                    <div className="input-container">  
                                        <label htmlFor='format' className="input-label">Folio</label>
                                        <input
                                            type="text"
                                            className="input-text"
                                            //placeholder={placeholder}
                                            value={searchParams.folio}
                                            onChange={(e) => handleFolioInputChange(e)} 
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* <div className='col s12 m6 l3'>
                                <button onClick={()=>{
                                    clearFilter()
                                }}>Clear filter</button>
                            </div> */}
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
  
