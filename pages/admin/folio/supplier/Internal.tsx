// @ts-ignore
import React, { useState, useEffect } from 'react'
import { MainTitle } from '../../../../components/common/Titles'
import { TextP } from '../../../../components/common/TextP'
// import { StateDropdown } from '../../../../components/dataComponents/StateDropdown'
import Select from 'react-select'
import { PrimaryButton } from '../../../../components/common/Buttons'
import DataTable2 from '../../../../components/datatable/DataTable2'
import { getStatusOptions, FolioSupplierTableSearchParams, getFolioSupplierList 
    } from '../../../../services/folioTracking/folioTrackingService'
import DatePickerInput from '../../../../components/common/DatePickerInput';
import { useNavigate } from "react-router-dom";
import ExportExcel from '../../../../components/common/ExcelExport'
import PopupModel from '../../../../components/popups/PopupModel'
import PopupContentErrorMessage from '../../../../components/popups/PopupContentErrorMessage'
// import {ExcelFile, ExcelSheet} from "react-export-excel";
// import ReactExport from "react-export-excel";
// import XLSX from 'xlsx';
import RoutesConstants from '../../../../resources/route-constants';
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

const formTypeOptions = [
    //{id: 0, label: 'Seleccione'},
    {id: 1, label: 'Construcciónes'},
    {id: 2, label: 'Materiales'},
]

const renderTableActiveColumn = (row:any) => {
    return (
        <span>
            {row.activeCd == 1 ? 'Si' : 'No'}
        </span>
    )
}

const config:any = {
    formTypeLabel: 'label',
    formTypeValue: 'id',
    statusLabel: 'statusName',
    statusValue: 'statusId',
    exportExcelName: 'sheet-folio',
    gridColumns : [
        {'label': 'FOLIO', 'key' : 'folioCd', 'type' : 'text' },
        {'label': 'RAZÓN SOCIAL', 'key' : 'businessName', 'type' : 'text'},
       // {'label': 'ESTADO', 'key' : 'state', 'type' : 'text'},
        {'label': 'FECHA DE RECEPCIÓN', 'key' : 'createDate', 'type' : 'text'},
        {'label': 'ÚLTIMA ACTUALIZACIÓN', 'key' : 'requestModDate', 'type' : 'text'},
        {'label': 'ESTATUS', 'key' : 'dxRequestStatusDs', 'type' : 'text'},
        {'label': 'ACTIVO', 'key' : 'activeCd', 'type' : 'cellRenderer', 'cellRenderer': renderTableActiveColumn},
        // {'label': 'DIRECCION', 'key' : 'addressDs', 'type' : 'cellRenderer', 'cellRenderer': eventButton},
        {'label': '', 'key' : '', 'type' : 'rowClick'},
    ]
}



export const Internal: React.FC = () => {
    

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    

    const [modalErrorIsOpen, setModalErrorIsOpen] = React.useState(false);

    // const [selectedValues, setSelectedValues] = useState<any>({
    //     Estatus: '',
    //     TipoDe: ''
    // });
    const [statusList, setStatusList] = useState<any>()
    //const loginUser = useAppSelector(getLoginUser);
    
    const [formDates, setFormDates] = useState<any>({
        recieptStartDate: '',
        recieptEndDate: '',
        updateStartDate: '',
        updateEndDate: '',
    });
    const [searchParams, setSearchParams] = useState<FolioSupplierTableSearchParams>({
        form: 1,
        status: '',
        recieptStartDate: '',
        recieptEndDate: '',
        updateStartDate: '',
        updateEndDate: '',
        export: false,
        //userId: !loginUser.boss ? loginUser.id : ''
    } );

    const [tableRows, setTableRows] = useState<any>([])
    const [tableTotalRows] = useState(0)



    /* Excel Export functions   */

    const { exportToExcel, } = ExportExcel({}) 


    const startExcel = () => {
        
        let params:any = searchParams
        params.export = true;
        let result:any[] = [];
         
        getFolioSupplierList(params).then((response:any) => {
              
            if(response.data){
                response?.data?.map((itemObj:any) => {

                  if(params.form == 2){

                    
                    let newObjOrder = {
                        'FOLIO':itemObj.folio,
                        'NOMBRE DE EMPRESA':itemObj.nombre_DE_EMPRESA,
                        'FECHA DE RECEPCIÓN':itemObj.fECHA_DE_RECEPCIÓN,
                        'ÚLTIMA ACTUALIZACIÓN':itemObj.última_ACTUALIZACIÓN,
                        'ESTATUS':itemObj.eSTATUS,
                        'ACTIVO':itemObj.aCTIVO,
                        //'RFC': itemObj.rfc,
                        //'TIPO DE PERSONA':itemObj.tIPO_DE_PERSONA,
                        'NOMBRE DEL CONTACTO':itemObj.nOMBRE_DEL_CONTACTO,
                        'TELÉFONO':itemObj.tELÉFONO,
                        'NÚMERO CELULAR':itemObj.nÚMERO_CELULAR,
                        'CORREO ELECTRÓNICO':itemObj.cORREO_ELECTRÓNICO,
                        'NOMBRE DEL PRODUCTO    ':itemObj.nombre_DEL_PRODUCTO,
                        '¿FABRICANTE O DISTRIBUIDOR?':itemObj.fabricante_O_DISTRIBUIDOR,
                        'EXCLUSIVIDAD DE VENTA':itemObj.exclusividad_DE_VENTA,
                        'CARTA DE PRESENTACIÓN':itemObj.carta_DE_PRESENTACIÓN,
                        'ESPECIFICACIONES TÉCNICAS DEL PRODUCTO':itemObj.especificaciones_TÉCNICAS_DEL_PRODUCTO,
                        'COMENTARIOS':itemObj.comments,
                        // 'ESPECIFIQUE LABORATORIO':itemObj.especifique_LABORATORIO,
                        // 'PROYECTISTA':itemObj.proyectista,
                        // 'ESPECIFIQUE PROYECTISTA':itemObj.especifique_PROYECTISTA,
                        // 'ACOMETIDA ELÉCTRICA': itemObj.acometida_ELÉCTRICA,
                        // 'ESPECIFIQUE ACOMETIDA ELÉCTRICA':itemObj.especifique_ACOMETIDA_ELÉCTRICA,
                        // 'ESPECIALISTA':itemObj.especialista,
                        // 'ESPECIFIQUE ESPECIALISTA':itemObj.especifique_ESPECIALISTA,
                        // 'FECHA INICIO DE OPERACIONES':itemObj.fecha_INICIO_DE_OPERACIONES,
                        // 'SUPERFICIE DE LAS INSTALACIONES DE SU OFICINA (M2)':itemObj.superficie_DE_LAS_INSTALACIONES_DE_SU_OFICINA_M2,
                        // 'NÚMERO DE PERSONAS QUE FORMAN PARTE DE SU PLANTILLA FIJA EN OFICINAS':itemObj.número_DE_PERSONAS_QUE_FORMAN_PARTE_DE_SU_PLANTILLA_FIJA_EN_OFICINAS,
                        // 'EXPERIENCIA CURRICULAR':itemObj.experiencia_CURRICULAR,
                        // 'INGRESOS FACTURADOS EN EL AÑO INMEDIATO INTERIOR':itemObj.ingresos_FACTURADOS_EN_EL_AÑO_INMEDIATO_INTERIOR,
                        // 'DECLARACIÓN ANUAL DEL EJERCICIO INMEDIATO ANTERIOR':itemObj.declaración_ANUAL_DEL_EJERCICIO_INMEDIATO_ANTERIOR,
                        // 'CAPITAL DE TRABAJO':itemObj.capital_DE_TRABAJO,
                        // 'ESTADOS FINANCIEROS BASE PARA EL CÁLCULO DEL CAPITAL DE TRABAJO':itemObj.estados_FINANCIEROS_BASE_PARA_EL_CÁLCULO_DEL_CAPITAL_DE_TRABAJO,
                        // 'ANTERIORMENTE FORMÓ PARTE DEL PADRÓN DE WALMART':itemObj.ANTERIORMENTE_FORMÓ_PARTE_DEL_PADRÓN_DE_WALMART,
                        // 'ESPECIFIQUE ANTERIORMENTE FORMÓ PARTE DEL PADRÓN DE WALMART':itemObj.especifique_ANTERIORMENTE_FORMÓ_PARTE_DEL_PADRÓN_DE_WALMART,
                        // 'ANTERIORMENTE ALGUNA DE SUS FILAS FORMÓ PARTE DEL PADRÓN DE WALMART':itemObj.anteriormente_ALGUNA_DE_SUS_FILAS_FORMÓ_PARTE_DEL_PADRÓN_DE_WALMART,
                        // 'ESPECIFIQUE ANTERIORMENTE ALGUNA DE SUS FILAS FORMÓ PARTE DEL PADRÓN DE WALMART':itemObj.especifique_ANTERIORMENTE_ALGUNA_DE_SUS_FILAS_FORMÓ_PARTE_DEL_PADRÓN_DE_WALMART,
                        // 'CUENTA CON ALGUNA FILIAL TRABAJANDO PARA WALMART DE MÉXICO':itemObj.cuenta_CON_ALGUNA_FILIAL_TRABAJANDO_PARA_WALMART_DE_MÉXICO,
                        // 'ESPECIFIQUE CUENTA CON ALGUNA FILIAL TRABAJANDO PARA WALMART DE MÉXICO':itemObj.especifique_CUENTA_CON_ALGUNA_FILIAL_TRABAJANDO_PARA_WALMART_DE_MÉXICO,
                     }
                     result.push(newObjOrder)
                    }else{

                        let newObjOrder = {
                            'FOLIO':itemObj.folio,
                            'RAZÓN SOCIAL':itemObj.rAZÓN_SOCIAL,
                            'FECHA DE RECEPCIÓN':itemObj.fECHA_DE_RECEPCIÓN,
                            'ÚLTIMA ACTUALIZACIÓN':itemObj.última_ACTUALIZACIÓN,
                            'ESTATUS':itemObj.eSTATUS,
                            'ACTIVO':itemObj.aCTIVO,
                            'RFC': itemObj.rfc,
                            'TIPO DE PERSONA':itemObj.tIPO_DE_PERSONA,
                            'NOMBRE DEL CONTACTO':itemObj.nOMBRE_DEL_CONTACTO,
                            'TELÉFONO':itemObj.tELÉFONO,
                            'NÚMERO CELULAR':itemObj.nÚMERO_CELULAR,
                            'CORREO ELECTRÓNICO':itemObj.cORREO_ELECTRÓNICO,
                            'CONSTRUCTOR DE OBRA':itemObj.constructor_DE_OBRA,
                            'ESPECIFIQUE':itemObj.especifique_CONSTRUCTOR_DE_OBRA,
                            'SUPERVISOR DE OBRA':itemObj.supervisor_DE_OBRA,
                            'ESPECIFIQUE SUPERVISOR':itemObj.especifique_SUPERVISOR_DE_OBRA,
                            'LABORATORIO':itemObj.laboratorio,
                            'ESPECIFIQUE LABORATORIO':itemObj.especifique_LABORATORIO, 
                            'PROYECTISTA':itemObj.proyectista,
                            'ESPECIFIQUE PROYECTISTA':itemObj.especifique_PROYECTISTA,
                            'ACOMETIDA ELÉCTRICA': itemObj.acometida_ELÉCTRICA,
                            'ESPECIFIQUE ACOMETIDA':itemObj.especifique_ESPECIALISTA,
                            'ESPECIALISTA':itemObj.especialista,
                            'ESPECIFIQUE ESPECIALISTA':itemObj.especifique_ESPECIALISTA,
                            'FECHA INICIO DE OPERACIONES':itemObj.fecha_INICIO_DE_OPERACIONES,
                            'SUPERFICIE DE LAS INSTALACIONES DE SU OFICINA (M2)':itemObj.superficie_DE_LAS_INSTALACIONES_DE_SU_OFICINA_M2,
                            'NÚMERO DE PERSONAS QUE FORMAN PARTE DE SU PLANTILLA FIJA EN OFICINAS':itemObj.número_DE_PERSONAS_QUE_FORMAN_PARTE_DE_SU_PLANTILLA_FIJA_EN_OFICINAS,
                            'EXPERIENCIA CURRICULAR':itemObj.experiencia_CURRICULAR, 
                            'INGRESOS FACTURADOS EN EL AÑO INMEDIATO INTERIOR': itemObj.ingresos_FACTURADOS_EN_EL_AÑO_INMEDIATO_INTERIOR,
                            'DECLARACIÓN ANUAL DEL EJERCICIO INMEDIATO ANTERIOR':itemObj.declaración_ANUAL_DEL_EJERCICIO_INMEDIATO_ANTERIOR,
                            'CAPITAL DE TRABAJO':itemObj.capital_DE_TRABAJO,
                            'ESTADOS FINANCIEROS BASE PARA EL CÁLCULO DEL CAPITAL DE TRABAJO':itemObj.estados_FINANCIEROS_BASE_PARA_EL_CÁLCULO_DEL_CAPITAL_DE_TRABAJO,
                            '¿ANTERIORMENTE FORMÓ PARTE DEL PADRÓN DE WALMART?':itemObj.anteriormente_FORMÓ_PARTE_DEL_PADRÓN_DE_WALMART,
                            'ESPECIFIQUE PADRÓN DE WALMART':itemObj.especifique_ANTERIORMENTE_FORMÓ_PARTE_DEL_PADRÓN_DE_WALMART,
                            '¿CUENTA CON ALGUNA FILIAL TRABAJANDO PARA WALMART DE MÉXICO?':itemObj.cuenta_CON_ALGUNA_FILIAL_TRABAJANDO_PARA_WALMART_DE_MÉXICO,
                            'ESPECIFIQUE CUENTA CON ALGUNA FILIAL':itemObj.especifique_CUENTA_CON_ALGUNA_FILIAL_TRABAJANDO_PARA_WALMART_DE_MÉXICO
                            
                            
                            // 'ESPECIFIQUE LABORATORIO':itemObj.especifique_LABORATORIO,
                            // 'PROYECTISTA':itemObj.proyectista,
                            // 'ESPECIFIQUE PROYECTISTA':itemObj.especifique_PROYECTISTA,
                            // 'ACOMETIDA ELÉCTRICA': itemObj.acometida_ELÉCTRICA,
                            // 'ESPECIFIQUE ACOMETIDA ELÉCTRICA':itemObj.especifique_ACOMETIDA_ELÉCTRICA,
                            // 'ESPECIALISTA':itemObj.especialista,
                            // 'ESPECIFIQUE ESPECIALISTA':itemObj.especifique_ESPECIALISTA,
                            // 'FECHA INICIO DE OPERACIONES':itemObj.fecha_INICIO_DE_OPERACIONES,
                            // 'SUPERFICIE DE LAS INSTALACIONES DE SU OFICINA (M2)':itemObj.superficie_DE_LAS_INSTALACIONES_DE_SU_OFICINA_M2,
                            // 'NÚMERO DE PERSONAS QUE FORMAN PARTE DE SU PLANTILLA FIJA EN OFICINAS':itemObj.número_DE_PERSONAS_QUE_FORMAN_PARTE_DE_SU_PLANTILLA_FIJA_EN_OFICINAS,
                            // 'EXPERIENCIA CURRICULAR':itemObj.experiencia_CURRICULAR,
                            // 'INGRESOS FACTURADOS EN EL AÑO INMEDIATO INTERIOR':itemObj.ingresos_FACTURADOS_EN_EL_AÑO_INMEDIATO_INTERIOR,
                            // 'DECLARACIÓN ANUAL DEL EJERCICIO INMEDIATO ANTERIOR':itemObj.declaración_ANUAL_DEL_EJERCICIO_INMEDIATO_ANTERIOR,
                            // 'CAPITAL DE TRABAJO':itemObj.capital_DE_TRABAJO,
                            // 'ESTADOS FINANCIEROS BASE PARA EL CÁLCULO DEL CAPITAL DE TRABAJO':itemObj.estados_FINANCIEROS_BASE_PARA_EL_CÁLCULO_DEL_CAPITAL_DE_TRABAJO,
                            // 'ANTERIORMENTE FORMÓ PARTE DEL PADRÓN DE WALMART':itemObj.ANTERIORMENTE_FORMÓ_PARTE_DEL_PADRÓN_DE_WALMART,
                            // 'ESPECIFIQUE ANTERIORMENTE FORMÓ PARTE DEL PADRÓN DE WALMART':itemObj.especifique_ANTERIORMENTE_FORMÓ_PARTE_DEL_PADRÓN_DE_WALMART,
                            // 'ANTERIORMENTE ALGUNA DE SUS FILAS FORMÓ PARTE DEL PADRÓN DE WALMART':itemObj.anteriormente_ALGUNA_DE_SUS_FILAS_FORMÓ_PARTE_DEL_PADRÓN_DE_WALMART,
                            // 'ESPECIFIQUE ANTERIORMENTE ALGUNA DE SUS FILAS FORMÓ PARTE DEL PADRÓN DE WALMART':itemObj.especifique_ANTERIORMENTE_ALGUNA_DE_SUS_FILAS_FORMÓ_PARTE_DEL_PADRÓN_DE_WALMART,
                            // 'CUENTA CON ALGUNA FILIAL TRABAJANDO PARA WALMART DE MÉXICO':itemObj.cuenta_CON_ALGUNA_FILIAL_TRABAJANDO_PARA_WALMART_DE_MÉXICO,
                            // 'ESPECIFIQUE CUENTA CON ALGUNA FILIAL TRABAJANDO PARA WALMART DE MÉXICO':itemObj.especifique_CUENTA_CON_ALGUNA_FILIAL_TRABAJANDO_PARA_WALMART_DE_MÉXICO,
                         }
                         result.push(newObjOrder)
                       

                    }
        
        
        
                    
                    
                });   
    
               
                exportToExcel(result, config.exportExcelName)
            }    
        })
        .catch((error:any) => {
           console.log(error)
           setModalErrorIsOpen(true)
        })

        
    }
    const {renderExcelButton } = ExportExcel({exportExcel: startExcel}) 

   
    
    const getTableRows = () => {

        let params:any = searchParams
        dispatch(setLoader(true));
       
        params.recieptStartDate = formatDateHyphen(searchParams.recieptStartDate)
        params.recieptEndDate = formatDateHyphen(searchParams.recieptEndDate)
        params.updateStartDate = formatDateHyphen(searchParams.updateStartDate)
        params.updateEndDate = formatDateHyphen(searchParams.updateEndDate)

        // this will not work as we removed the clear filter functionality
        
        params.export = false;
        //params.form= 1;
        // params.recieptEndDate = "";
        // params.recieptStartDate = "";
        // params.status = "";
        // params.updateEndDate = "";
        // params.updateStartDate = "";
        // params.userId = "";
        // if(params?.folio)
        //     params.folio = ""
        

        getFolioSupplierList(params).then((response:any) => {
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
        let value = ''
        // let name = ''
        console.log(selected);
        if(selected)
        {
            value = selected[config.statusValue]
            // name = selected[config.statusName]
        }

        // commenting for clear button functionality
        // setSelectedValues((prev: any)=>{
        //     return{
        //         ...prev,
        //         Estatus: name
        //     }
        // });
        if(!selected.statusId){
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    status: ""
                }
            });
            
           // getTableRows();
        }else{
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    status: value
                }
            })
        }
    }
    
    const getStatusDropdowns = () => {

        getStatusOptions().then((response:any) => {
            const firstOption = {
                "statusId": 0,
                "statusName": "Seleccione",
                "active": true
            }
            setStatusList([firstOption, ...response.data])
        })
        .catch((error:any) => {
            console.log('getStateList error', error)
            setModalErrorIsOpen(true)
        })

    }
   

    useEffect(() => {
        //getTableTotalRows()
        getStatusDropdowns()
        getTableRows()
    }, [])

    const handleFormTypeChange = (selected:any) => {
        let name = '';
        if(selected){
            name = selected[config.formTypeValue]
        }
        setFormDates(()=>{
                     return {
                         recieptStartDate: '',
                         recieptEndDate: '',
                         updateStartDate: '',
                         updateEndDate: '',
                     }
                 });
                          

                                 

                 
                

        
        if(!selected[config.formTypeValue]){
            setSearchParams((prevState:any) => {
                return {
                    ...prevState,
                    form: name
                }
            });
            //getTableRows();
        }else{
            setSearchParams({form: name,
                status: searchParams.status,
                folio:'',
                recieptStartDate: '',
                recieptEndDate: '',
                updateStartDate: '',
                updateEndDate: '',
                export: false})
        }
    }


    // useEffect(() => {
    //     //getTableTotalRows()
    //     if(searchParams.form == '' )
    //         getTableRows()
    // }, [searchParams])
    

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
        navigate(RoutesConstants.FolioSupplierDetail, {state: data})

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
    //     handleStatusChange('');
    //     handleFormTypeChange('');
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
                            <MainTitle text={"Seguimiento de Proveedores"} />
                        </div>
                        <div className="page-desc-wrapper">
                            <TextP >Para poder visualizar los folios el tipo de formulario que busca; Construcciones o Materiales para la Construcción. Importante: No se debe ingresar a un módulo (Construcciones o Materiales) que no es responsable. Seleccione los tres puntos que se encuentran a la derecha del estatus para dar seguimiento al folio.</TextP>
                        </div>
                    </div>
                    <div className='filter-form-container'>
                        <div className='row'>
                            <div className='col offset-m4 s12 m4'>
                                {/* <StateDropdown onChange={handleStateChange} /> */}
                                <div className="input-container">  
                                    <label htmlFor='format' className="input-label">Tipo de Formulario</label>
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

                                        //commenting for removing clear button functionality
                                        // value={selectedValues.TipoDe}
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
                                  
                                        

                                        //commenting for removing clear button functionality
                                        // value={selectedValues.Estatus}
                                        //isClearable
                                    />
                                </div>  
                            </div>
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
                            {/* <div className='col s3'>
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
  