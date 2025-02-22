// @ts-ignore
import React, { useState, useEffect } from 'react'
import { MainTitle } from '../../../../components/common/Titles'
import { TextP } from '../../../../components/common/TextP'
// import { StateDropdown } from '../../../../components/dataComponents/StateDropdown'
import Select from 'react-select'
import { PrimaryButton } from '../../../../components/common/Buttons'
import DataTable2 from '../../../../components/datatable/DataTable2'
import { getStatusOptions,getMunicipilatyOptions, getStateOptions, FolioLandSearchParams, getFolioTerrenosList 
    } from '../../../../services/folioTracking/folioTrackingService'
import DatePickerInput from '../../../../components/common/DatePickerInput';
import { useNavigate } from "react-router-dom";
import ExportExcel from '../../../../components/common/ExcelExport'
import PopupModel from '../../../../components/popups/PopupModel'
import PopupContentErrorMessage from '../../../../components/popups/PopupContentErrorMessage'
// import {ExcelFile, ExcelSheet} from "react-export-excel";
// import ReactExport from "react-export-excel";
// import XLSX from 'xlsx';
import RoutesConstants from './../../../../resources/route-constants';
import { formatDateHyphen } from './../../../../utility/commonFunctions';
//import {  getLoginUser } from '../../../../store/authReducer'
//import { useAppSelector } from '../../../../store/hooks'
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
    municipilatyLabel: 'description',
    municipilatyValue: 'townId',
    exportExcelName: 'sheet-folio',
    gridColumns : [
        {'label': 'FOLIO', 'key' : 'folioCd', 'type' : 'text' },
        {'label': 'NOMBRE(S)', 'key' : 'name', 'type' : 'text'},
        {'label': 'ESTADO', 'key' : 'state', 'type' : 'text'},
        {'label': 'FECHA RECEPCIÓN', 'key' : 'date', 'type' : 'text'},
        {'label': 'ÚLTIMA ACTUALIZACIÓN', 'key' : 'requestModDate', 'type' : 'text'},
        {'label': 'ESTATUS', 'key' : 'statuss', 'type' : 'text'},
        // {'label': 'DIRECCION', 'key' : 'addressDs', 'type' : 'cellRenderer', 'cellRenderer': eventButton},
        {'label': '', 'key' : '', 'type' : 'rowClick'},
    ]
}


export const Internal: React.FC = () => {
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [modalErrorIsOpen, setModalErrorIsOpen] = React.useState(false);

    // const [dropDownValues, setDropDownValues] = useState<any>({
    //     estado: undefined,
    //     municip: undefined,
    //     eStatus: undefined
    // });
    const [states, setStates] = useState<any>()
    const [municipilatyOptions, setMunicipilatyOptions] = useState<any>()
    const [statusList, setStatusList] = useState<any>()
    const [municipilatySelect, setMunicipilatySelect] = useState<any>()
    //const loginUser = useAppSelector(getLoginUser);
    
    const [formDates, setFormDates] = useState<any>({
        recieptStartDate: '',
        recieptEndDate: '',
        updateStartDate: '',
        updateEndDate: '',
    });
    const [searchParams, setSearchParams] = useState<FolioLandSearchParams>({
        state: '',
        municipilaty: '',
        status: '',
        recieptStartDate: '',
        recieptEndDate: '',
        updateStartDate: '',
        updateEndDate: '',
        export: false,
        //userId: !loginUser.boss ? loginUser.id : ''
    } );

    const [tableRows, setTableRows] = useState<any>([]);
    const [tableTotalRows] = useState(0);
    
    // removed clear filter
    // const [selectedValues, setSelectedValues] = useState<any>({
    //     Estatus: '',
    //     Estado: ''
    // })



    /* Excel Export functions   */

    const { exportToExcel, } = ExportExcel({}) 


    const startExcel = () => {
        
        let params:any = searchParams
        params.export = true

        getFolioTerrenosList(params).then((response:any) => {
            if(response.data){
                let newArry:any[] = [];
                response.data.forEach((item:any) => {
                    let newObjOrder = {
                        'FOLIO':item.folio,
                        'NOMBRE(S)':item.nombre_S,
                        'ESTADO':item.estado,
                        'SUPERFICIE (M²)':item.superficie,
                        'FECHA RECEPCIÓN':item.fecha_RECEPCIÓN,
                        'ESTATUS':item.estatus,
                        'ULTIMA ACTUALIZACIÓN':item.ultima_ACTUALIZACIÓN,
                        'APELLIDO PATERNO':item.apellido_PATERNO,
                        'APELLIDO MATERNO':item.apellido_MATERNO,
                        'RAZÓN SOCIAL':item.razón_SOCIAL,
                        'PERFIL':item.perfil,
                        'TELÉFONO':item.teléfono,
                        'NÚMERO CELULAR':item.número_CELULAR,
                        'CORREO ELECTRÓNICO':item.correo_ELECTRÓNICO,
                        'TIPO':item.tipo,
                        'ESTADO_TIPO':item.estado,
                        'CIUDAD':item.ciudad,
                        'CALLE':item.calle,
                        'NÚMERO':item.número,
                        'COLONIA':item.colonia,
                        'DELEGACIÓN O MUNICIPIO':item.delegación_O_MUNICIPIO,
                        'CÓDIGO POSTAL':item.código_POSTAL,
                        'UBICACIÓN':item.ubicación,
                        'ENTRE CALLES':item.entre_CALLES,
                        'Y':item.y,
                        'USO DEL SUELO':item.uso_DEL_SUELO,
                        'DESCRIPCIÓN':item.descripción,
                        'TIPO DE OPERACIÓN':item.tipo_DE_OPERACIÓN,
                        'PRECIO':item.precio,
                        'DOCUMENTOS CARGADOS':item.documentos_CARGADOS
                    }
        
                      newArry.push(newObjOrder);
        
                  })

                exportToExcel(newArry, config.exportExcelName)
                
            }})
        .catch((error:any) => {
           console.log(error)
           setModalErrorIsOpen(true)
        })

        
    }
    const {renderExcelButton } = ExportExcel({exportExcel: startExcel}) 

   
    const getTableRows = () => {
        dispatch(setLoader(true));

        let params:any = searchParams
        
        params.recieptStartDate = formatDateHyphen(searchParams.recieptStartDate)
        params.recieptEndDate = formatDateHyphen(searchParams.recieptEndDate)
        params.updateStartDate = formatDateHyphen(searchParams.updateStartDate)
        params.updateEndDate = formatDateHyphen(searchParams.updateEndDate)
        params.export = false
       

        getFolioTerrenosList(params).then((response:any) => {
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

    const handleStatusChange = (selected:any) => {

        // remove clear filter
        // let name = '';
        // if(selected){
        //     name = selected[config.statusName];
        // }
        if(!selected.statusId){
            // remvoved clar filter
            // setSelectedValues((prevState:any) => {
            //     return {
            //         ...prevState,
            //         Estatus: ""
            //     }
            // })

            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    status: ""
                }
            })

           
        }
        else{
            // removed clear filter
            // setSelectedValues((prevState:any) => {
            //     return {
            //         ...prevState,
            //         Estatus: name
            //     }
            // })

            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    status: selected[config.statusValue]
                }
            })
        }
    }

    
    
    const getStatusDropdowns = () => {

        getStatusOptions().then((response:any) => {
            const firstObject = {
                "statusId": 0,
                "statusName": "Seleccione",
                "active": true
            }
            setStatusList([firstObject, ...response.data]);
        })
        .catch((error:any) => {
            console.log('getStateList error', error)
            setModalErrorIsOpen(true)
        })

    }
    const getStateDropDown = () => {
        let temp = {
            //userId: loginUser.boss ? 0 :   loginUser.id
        }

        getStateOptions(temp).then((response:any) => {
            const firstObject = {
                "stateId": 0,
                "stateName": "Seleccione",
                "stateCode": "",
                "countryId": 0,
                "active": true
            }
            setStates([firstObject, ...response.data]);
        })
        .catch((error:any) => {
            console.log('getStateList error', error)
            setModalErrorIsOpen(true)
        })

    }
    const getMunicipilatyeDropDown = (state:any) => {

        
        getMunicipilatyOptions(state).then((response:any) => {
             const firstObject = {
                "townId": 0,
                "stateId": 0,
                "description": "Seleccione",
                "municipioCode": "",
                "active": true
            };
            setMunicipilatyOptions([firstObject, ...response.data]);
        })
        .catch((error:any) => {
            console.log('getStateList error', error)
            setModalErrorIsOpen(true)
        })

    }

    useEffect(() => {
        //getTableTotalRows()
        getStateDropDown()
        getStatusDropdowns()
        getTableRows()
    }, [])

    const handleStateChange = (selected:any) => {
        let value = '';
        // let nameState = '';
        if(selected)
        {
            value = selected[config.stateValue];
            // nameState = selected[config.stateName];
        }
        
        // removed clear filter
        // setSelectedValues((prev: any)=>{
        //     return {
        //         ...prev,
        //         Estado: nameState
        //     }
        // })

        if(!selected.stateId){
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    state:""
                }
            })
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    municipilaty: ''
                }
            })

           
        }else{
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    state:value
                }
            })
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    municipilaty: ''
                }
            })
        }
        
        setMunicipilatySelect('')
        if(selected && selected.stateId)
            getMunicipilatyeDropDown(selected[config.stateValue])
    }

    const handleMunicipilatyChange = (selected:any) => {
        let value = '';

        if(selected)
        {
            value = selected[config.municipilatyValue]
        }

        if(!selected.townId){
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    municipilaty: ""
                }
            });
           
        }else{
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    municipilaty: value
                }
            })
        }
        setMunicipilatySelect(selected)
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
        navigate(RoutesConstants.FolioLandDetail, {state: item})

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
    
    // removed clear filter
    // const clearFilter = ()=>{
    //     setFormDates(()=>{
    //         return {
    //             recieptStartDate: '',
    //             recieptEndDate: '',
    //             updateStartDate: '',
    //             updateEndDate: '',
    //         }
    //     });
    //     setSearchParams((prevState: any)=>{
    //         return {
    //             ...prevState,
    //             form: 1,
    //             status: ''
    //         }
    //     });

    //     // setDropDownValues(()=> {
    //     //     return{
    //     //         municip: 'new',
    //     //         estado: 'new',
    //     //         eStatus: 'new'
    //     //     }
    //     // })
    //     handleStatusChange('');
    //     handleStateChange('');
    //     handleMunicipilatyChange(null);
    //     //call the list after clearing the filters.
    //     getTableRows(true);
    // }
    

    return (
        <div className='page-container type-filter'>
            <div className='container main-container'>
                <div className='page-content '>
                    {/* <ExcelFile>
                        <ExcelSheet dataSet={excelData} name="Organization"/>
                    </ExcelFile> */}

                    <div className='desc-container'>
                        <div className="title-wrapper">
                            <MainTitle text={"Seguimiento de Folios de Terrenos"} />
                        </div>
                        <div className="page-desc-wrapper">
                            <TextP >En esta seccion podrá administrar las solicitudes realizando las siguientes acciones; habilitar/desahabilitar un folio, eliminar documentos adjuntos, cambiar a los usuarios asignados y dar seguimiento a los folios.</TextP>
                        </div>
                    </div>
                    <div className='filter-form-container'>
                        <div className='row'>
                            <div className='col s12 m6'>
                                {/* <StateDropdown onChange={handleStateChange} /> */}
                                <div className="input-container">  
                                    <label htmlFor='format' className="input-label">Estado</label>
                                    <Select  
                                        classNamePrefix='input-select-react'
                                        id='state' 
                                        className='input-select-react' 
                                        options={states} 
                                        onChange={(e) => handleStateChange(e)} 
                                        getOptionLabel={(option:any) => option[config.stateLabel]}
                                        getOptionValue={(option:any) => option[config.stateValue]}
                                        isSearchable={false}
                                        // rmoved clear filter
                                        // isClearable
                                        // value={selectedValues.Estado}
                                    />
                                </div>
                            </div>
                            <div className='col s12 m6'>
                                <div className="input-container">  
                                    <label htmlFor='format' className="input-label">Municipio</label>
                                    <Select  
                                        classNamePrefix='input-select-react'
                                        id='municipio' 
                                        className='input-select-react' 
                                        options={municipilatyOptions} 
                                        onChange={(e) => handleMunicipilatyChange(e)} 
                                        getOptionLabel={(option:any) => option[config.municipilatyLabel]}
                                        getOptionValue={(option:any) => option[config.municipilatyValue]}
                                        isSearchable={false}
                                        value={municipilatySelect}

                                        // removed clear filter
                                        //isClearable
                                        
                                    />
                                </div>  
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col s12 m6'>
                            <div className="input-container">  
                                <DatePickerInput 
                                    label={'Fecha de recepción desde'}
                                    value={formDates.recieptStartDate}
                                    handleDateChange={(date:any) => handleDateChange( date, dateTypes.recieptStartDate)}
                                />
                            </div>
                            </div>
                            <div className='col s12 m6'>
                            <div className="input-container">  
                                <DatePickerInput 
                                    label={'Hasta'}
                                    minDate={formDates.recieptStartDate}
                                    value={formDates.recieptEndDate}
                                    handleDateChange={(date:any) => handleDateChange( date, dateTypes.recieptEndDate)}
                                />
                            </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col s12 m6'>
                            <div className="input-container">  
                                <DatePickerInput 
                                    label={'Fecha de ultima actualización desde'}
                                    value={formDates.updateStartDate}
                                    handleDateChange={(date:any) => handleDateChange( date, dateTypes.updateStartDate)}
                                />
                            </div>
                            </div>
                            <div className='col s12 m6'>
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
                            <div className='col s12 m4'>
                                <div className="input-container">  
                                    <label htmlFor='format' className="input-label">Estatus</label>
                                    <Select  
                                        classNamePrefix='input-select-react'
                                        id='status' 
                                        className='input-select-react' 
                                        options={statusList} 
                                        onChange={(e) => handleStatusChange(e)} 
                                        getOptionLabel={(option:any) => option[config.statusLabel]}
                                        getOptionValue={(option:any) => option[config.statusValue]}
                                        isSearchable={false}  
                                        // removed clear filter 
                                        //value={selectedValues.Estatus}  
                                    />
                                </div>  
                            </div>
                            <div className='col s12 m4'>
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
                            {/* removed clear filter */}
                            {/* <div className='col s4'>
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
  