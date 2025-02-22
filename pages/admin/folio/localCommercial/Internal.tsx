// @ts-ignore
import React, { useState, useEffect } from 'react'
import { MainTitle } from '../../../../components/common/Titles'
import { TextP } from '../../../../components/common/TextP'
import Select from 'react-select'
import { PrimaryButton } from '../../../../components/common/Buttons'
import DataTable2 from '../../../../components/datatable/DataTable2'
import {
    getStatusOptions, getStateOptions, FolioLocalComerTableSearchParams, getFolioLocalComercialList
} from '../../../../services/folioTracking/folioTrackingService'
import DatePickerInput from '../../../../components/common/DatePickerInput';
import { useNavigate } from "react-router-dom";
import ExportExcel from '../../../../components/common/ExcelExport'
import PopupModel from '../../../../components/popups/PopupModel'
import PopupContentErrorMessage from '../../../../components/popups/PopupContentErrorMessage'
import { formatDateHyphen } from './../../../../utility/commonFunctions';
// import { getLoginUser } from '../../../../store/authReducer'
// import { useAppSelector } from '../../../../store/hooks'
import { useAppDispatch } from '../../../../store/hooks'
import { setLoader } from '../../../../store/loaderReducer'


const dateTypes = {
    recieptStartDate: 'recieptStartDate',
    recieptEndDate: 'recieptEndDate',
    updateStartDate: 'updateStartDate',
    updateEndDate: 'updateEndDate',
}


const config: any = {
    stateLabel: 'stateName',
    stateValue: 'stateId',
    statusLabel: 'statusName',
    statusValue: 'statusId',
    exportExcelName: 'sheet-folio',
    gridColumns: [
        { 'label': 'FOLIO', 'key': 'folioCd', 'type': 'text' },
        { 'label': 'NOMENCLATURA', 'key': 'nomenclature', 'type': 'text' },
        { 'label': 'DETERMINANTE', 'key': 'determinanat', 'type': 'text' },
        { 'label': 'TIENDA', 'key': 'store', 'type': 'text' },
        { 'label': 'ESTADO', 'key': 'states', 'type': 'text' },
        { 'label': 'NOMBRE COMERCIAL', 'key': 'tradeName', 'type': 'text' },
        { 'label': 'FECHA RECEPCIÓN', 'key': 'receptionDate', 'type': 'text' },
        { 'label': 'ÚLTIMA ACTUALIZACIÓN', 'key': 'lastUpdate', 'type': 'text' },
        { 'label': 'ESTATUS', 'key': 'statuss', 'type': 'text' },
        { 'label': '', 'key': '', 'type': 'rowClick' },
    ]
}



export const Internal: React.FC = () => {

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [modalErrorIsOpen, setModalErrorIsOpen] = React.useState(false);

    const [states, setStates] = useState<any>()
    const [statusList, setStatusList] = useState<any>()
    // const loginUser = useAppSelector(getLoginUser);
    const [apiError,setApiError] = useState<any>();

    const [formDates, setFormDates] = useState<any>({
        recieptStartDate: '',
        recieptEndDate: '',
        updateStartDate: '',
        updateEndDate: '',
    });

   
    const [searchParams, setSearchParams] = useState<FolioLocalComerTableSearchParams>({
        state: '',
        status: '',
        recieptStartDate: '',
        recieptEndDate: '',
        updateStartDate: '',
        updateEndDate: '',
        export: false,
        //userId: !loginUser.boss ? loginUser.id : ''
    });

    const [tableRows, setTableRows] = useState<any>([])
    const [tableTotalRows] = useState(0)



    /* Excel Export functions   */

    const { exportToExcel, } = ExportExcel({})


    const startExcel = () => {

        let params: any = searchParams
        params.export = true
       let result:any[] = [];
        getFolioLocalComercialList(params).then((response: any) => {
           if (response.data){
            
            
           response?.data?.forEach((itemObj:any) => {
            let newObjectOrder = {
                'folio':itemObj.folio,
                'nomenclatura':itemObj.nomenclatura,
                'determinante':itemObj.determinante,
                'tienda':itemObj.tienda,
                'estado':itemObj.estado,
                'nombre_COMERCIAL':itemObj.nombre_COMERCIAL,
                'fecha_RECEPCIÓN':itemObj.fecha_RECEPCIÓN,
                'última_ACTUALIZACIÓN':itemObj.última_ACTUALIZACIÓN,
                'estatus':itemObj.estatus,
                'nombre_S':itemObj.nombre_S,
                'apellido_PATERNO':itemObj.apellido_PATERNO,
                'apellido_MATERNO':itemObj.apellido_MATERNO,
                'razón_SOCIAL':itemObj.razón_SOCIAL,
                'teléfono':itemObj.teléfono,
                'número_CELULAR':itemObj.número_CELULAR,
                'correo_ELECTRÓNICO':itemObj.correo_ELECTRÓNICO,
                'giro_O_NEGOCIO':itemObj.giro_O_NEGOCIO,
                'especifique':itemObj.especifique,
                'm2_O_NÚMERO_DE_CAJONES_REQUERIDOS':itemObj.m2_O_NÚMERO_DE_CAJONES_REQUERIDOS,
                'fecha_INICIO':itemObj.fecha_INICIO,
                'fecha_FINAL':itemObj.fecha_FINAL,
                'sucursales_DE_INTERÉS':itemObj.sucursales_DE_INTERÉS,
                'descripción_DEL_EVENTO':itemObj.descripción_DEL_EVENTO,
                'carga_DE_DOCUMENTOS':itemObj.carga_DE_DOCUMENTOS,
                'nombre_DE_LA_COMPAÑÍA':itemObj.nombre_DE_LA_COMPAÑÍA,
                'm2_DESDE':itemObj.m2_DESDE,
                'm2_HASTA':itemObj.m2_HASTA,
                'giro_DE_LA_EMPRESA':itemObj.giro_DE_LA_EMPRESA,
                'descripción_DEL_GIRO':itemObj.descripción_DEL_GIRO,
                'requerimientos_ESPECIALES':itemObj.requerimientos_ESPECIALES,
                'documentos_ADICIONALES':itemObj.documentos_ADICIONALES,
                'tiendas_DE_INTERÉS':null,
                'es_INQUILINO_DE_UN_LOCAL_DE_WALMART':null,
                'nombre_DE_LA_UNIDAD':itemObj.nombre_DE_LA_UNIDAD,
                'dirección':itemObj.dirección,
                'antecedentes_O_EXPERIENCIA_COMERCIAL':itemObj.antecedentes_O_EXPERIENCIA_COMERCIAL,
                'especifique_ANTECEDENTES_O_EXPERIENCIA_COMERCIAL':itemObj.especifique_ANTECEDENTES_O_EXPERIENCIA_COMERCIAL,
                'comentarios':itemObj.comentarios,
                'especifique_GIRO_DE_LA_EMPRESA':itemObj.especifique_GIRO_DE_LA_EMPRESA,
       
            }
           
            result.push(newObjectOrder);
           
        });
           
            exportToExcel(result, config.exportExcelName)
           }
        })
            .catch((error: any) => {
                console.log(error)
                setModalErrorIsOpen(true)
            })

          
              
    }
    const { renderExcelButton } = ExportExcel({ exportExcel: startExcel })



    const getTableRows = () => {
        dispatch(setLoader(true));
        let params: any = searchParams

        params.recieptStartDate = formatDateHyphen(searchParams.recieptStartDate)
        params.recieptEndDate = formatDateHyphen(searchParams.recieptEndDate)
        params.updateStartDate = formatDateHyphen(searchParams.updateStartDate)
        params.updateEndDate = formatDateHyphen(searchParams.updateEndDate)
        params.export = false
        

        getFolioLocalComercialList(params).then((response: any) => {
            //response.data= null

            dispatch(setLoader(false));
            if (response.data) {
                setTableRows(response.data)

            }
            else
                setTableRows([])
        }).catch((error: any) => {
                setApiError(error?.message);
                setTableRows([])
                setModalErrorIsOpen(true)
                dispatch(setLoader(false));
            })
    }

    const getStatusDropdowns = () => {

        getStatusOptions().then((response: any) => {
            const firstObject = {
                "statusId": 0,
                "statusName": "Seleccione",
                "active": true
            }
            setStatusList([firstObject, ...response.data]);
        })
            .catch((error: any) => {
                console.log(error);
                setModalErrorIsOpen(true)
            })

    }
    const getStateDropDown = () => {

        let temp = {
            //userId: loginUser.boss ? 0 : loginUser.id
        }

        getStateOptions(temp).then((response: any) => {
            const firstObject = {
                "stateId": 0,
                "stateName": "Seleccione",
                "stateCode": "",
                "countryId": 0,
                "active": true
            }
            setStates([firstObject, ...response.data]);
        })
            .catch((error: any) => {
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

    const handleStateChange = (selected: any) => {
        let value = '';
        // let name = '';
        if (selected) {
            value = selected[config.stateValue];
            // name = selected[config.stateName];
        }

        // setSelectValues((prev : any)=>{
        //     return {
        //         ...prev,
        //         Estado: name
        //     }
        // });

        if (!selected.stateId) {
            setSearchParams((prevState: any) => {
                return {
                    ...prevState,
                    state: ""
                }
            });
            
        } else {
            setSearchParams((prevState: any) => {
                return {
                    ...prevState,
                    state: value
                }
            })
        }
    }

    const handleStatusChange = (selected: any) => {
        let value = '';
        // let name = '';
        if (selected) {
            value = selected[config.statusValue]
            // name = selected[config.statusName]
        }

       

        if (!selected.statusId) {
            setSearchParams((prevState: any) => {
                return {
                    ...prevState,
                    status: ""
                }
            });

        } else {
            setSearchParams((prevState: any) => {
                return {
                    ...prevState,
                    status: value
                }
            })
        }
    }

    const handleFolioInputChange = (selected: any) => {
        setSearchParams((prevState: any) => {
            return {
                ...prevState,
                folio: selected.target.value
            }
        })
    }



    const handleDateChange = (date: any, dateType: string) => {
        switch (dateType) {
            case dateTypes.recieptStartDate:
                setSearchParams((prevState: any) => {
                    return {
                        ...prevState,
                        recieptStartDate: date
                    }
                });
                setFormDates((prevState: any) => {
                    return {
                        ...prevState,
                        recieptStartDate: date
                    }
                });
                break
            case dateTypes.recieptEndDate:
                setSearchParams((prevState: any) => {
                    return {
                        ...prevState,
                        recieptEndDate: date
                    }
                });
                setFormDates((prevState: any) => {
                    return {
                        ...prevState,
                        recieptEndDate: date
                    }
                });
                break
            case dateTypes.updateStartDate:
                setSearchParams((prevState: any) => {
                    return {
                        ...prevState,
                        updateStartDate: date
                    }
                });
                setFormDates((prevState: any) => {
                    return {
                        ...prevState,
                        updateStartDate: date
                    }
                });
                break
            case dateTypes.updateEndDate:
                setSearchParams((prevState: any) => {
                    return {
                        ...prevState,
                        updateEndDate: date
                    }
                });
                setFormDates((prevState: any) => {
                    return {
                        ...prevState,
                        updateEndDate: date
                    }
                });
                break
        }

    }


    function handleModelClose() {
        setModalErrorIsOpen(false)
    }


    const handleFilterClick = () => {
        
        // getFolioValue()
        getTableRows()
    }



    const handleClickRow = (item: any) => {
        navigate('/LcDetailAdmin', { state: item })

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
                                        getOptionLabel={(option: any) => option[config.stateLabel]}
                                        getOptionValue={(option: any) => option[config.stateValue]}
                                        isSearchable={false}
                                    // isClearable
                                    // value={selectValues.Estado}
                                    />
                                </div>
                            </div>
                            <div className='col s12 m6'>
                                <div className="input-container">
                                    <label htmlFor='format' className="input-label">Estatus</label>
                                    <Select
                                        classNamePrefix='input-select-react'
                                        id='status'
                                        className='input-select-react'
                                        options={statusList}
                                        onChange={(e) => handleStatusChange(e)}
                                        getOptionLabel={(option: any) => option[config.statusLabel]}
                                        getOptionValue={(option: any) => option[config.statusValue]}
                                        isSearchable={false}
                                    // isClearable
                                    // value={selectValues.Estatus}
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
                                        handleDateChange={(date: any) => handleDateChange(date, dateTypes.recieptStartDate)}
                                    />
                                </div>
                            </div>
                            <div className='col s12 m6'>
                                <div className="input-container">
                                    <DatePickerInput
                                        label={'Hasta'}
                                        minDate={formDates.recieptStartDate}
                                        value={formDates.recieptEndDate}
                                        handleDateChange={(date: any) => handleDateChange(date, dateTypes.recieptEndDate)}
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
                                        handleDateChange={(date: any) => handleDateChange(date, dateTypes.updateStartDate)}
                                    />
                                </div>
                            </div>
                            <div className='col s12 m6'>
                                <div className="input-container">
                                    <DatePickerInput
                                        label={'Hasta'}
                                        minDate={formDates.updateStartDate}
                                        value={formDates.updateEndDate}
                                        handleDateChange={(date: any) => handleDateChange(date, dateTypes.updateEndDate)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col s12 m6'>
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

            <PopupModel isOpen={modalErrorIsOpen} closePopup={() => handleModelClose()} width='40%' height='250px'>
                <PopupContentErrorMessage message={apiError} closePopup={() => handleModelClose()} />
            </PopupModel>

        </div>
    )
}
