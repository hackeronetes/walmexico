import React, { useState, useEffect } from 'react'
import { MainTitle } from '../../../../components/common/Titles'
import { TextP } from '../../../../components/common/TextP'
import Select from 'react-select'
import { PrimaryButton } from '../../../../components/common/Buttons'
import DataTable2 from '../../../../components/datatable/DataTable2'
import { getStateOptions, getFormatOptions, getCatalogLcList } from '../../../../services/adminGeneral/adminGeneralService'
import RoutesConstants from '../../../../resources/route-constants'
import { useNavigate } from 'react-router-dom'
import Image from '../../../../components/common/Image';
import { useAppDispatch } from '../../../../store/hooks';
import { setLoader } from '../../../../store/loaderReducer'
import { formatNumberToCurrency } from '../../../../utility/commonFunctions'


const renderTableM2Column = (row:any) => {
    if(!row.meterSqure)
        return ''

    let m2Array = row.meterSqure.split('-')
    let m2Front = m2Array[0] ? formatNumberToCurrency(m2Array[0], true) : ''
    let m2Back = m2Array[1] ? formatNumberToCurrency(m2Array[1], true) : ''
    return (
        <span>
            {m2Front + '-' + m2Back}
        </span>
    )
}



const config: any = {
    sectionLabel: 'state',
    sectionValue: 'stateCode',
    formatLabel: 'name',
    formatValue: 'id',
    gridColumns: [
        { 'label': 'DETERMINANTE', 'key': 'department', 'type': 'text' },
        { 'label': 'FORMATO', 'key': 'format', 'type': 'text' },
        { 'label': 'TIENDA', 'key': 'store', 'type': 'text' },
        { 'label': 'ESTADO', 'key': 'state', 'type': 'text'},
        { 'label': 'DIRECCIÓN', 'key': 'address', 'type': 'text'},
        { 'label': 'm²', 'key': 'meterSqure',  'type' : 'cellRenderer', 'cellRenderer': renderTableM2Column},

        { 'label': 'LOCAL', 'key': '', 'type': 'imageCallback', 'image': 'plus.png' },
        { 'label': 'VER LOCALES', 'key': '', 'type': 'rowClick' },
    ]
}

export const CatalogueLC: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [sectionOptions, setSectionOptions] = useState<any>([])
    const [formatOptions, setFormatOptions] = useState<any>([])



    const [searchParams, setSearchParams] = useState<any>({
        stateId: '',
        section: '',
    });

    const [tableRows, setTableRows] = useState<any>([])
    const [tableTotalRows] = useState(0)



    function getDropdownSection() {

        getStateOptions().then((res: any) => {
            
            if (res.data){
                const firstObject ={
                    id: 0,
                    state: "Seleccione"
                }
                setSectionOptions([firstObject, ...res.data]);
            }
            else
                setSectionOptions(res.data)
        })
            .catch((error: any) => {
                
                setSectionOptions([])
                console.log('getStateList error', error)
            })
    }

    function getDropdownFormat() {

        getFormatOptions().then((res: any) => {
            
            if (res.data){
                const firstObject = {
                    id:0,
                    name: "Seleccione"
                }
                setFormatOptions([firstObject, ...res.data]);
            }
            else
                setFormatOptions(res.data)
        })
            .catch((error: any) => {
               
                setFormatOptions([])
                console.log('getStateList error', error)
            })
    }

   



    const getTableRows = () => {

        
        let paramsTemp = {
            stateCode: searchParams.stateId,
            section: searchParams.section,
        }
        dispatch(setLoader(true));
        
        getCatalogLcList(paramsTemp).then((res: any) => {
            if (res.data){
                res.data.sort((a:any,b:any) =>  parseInt(a.determinant) > parseInt(b.determinant) ? 1 : -1)
                setTableRows(res.data)
                
                
                dispatch(setLoader(false));
            }
            else{
                setTableRows([])
                dispatch(setLoader(false));
            }
        })
        .catch((error: any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            setTableRows([])
            console.log(error);
            dispatch(setLoader(false));

        })


    }

    




    useEffect(() => {
        getDropdownSection()
        getDropdownFormat()
        getTableRows()
    }, [])



    const handleInputChange = (selected: any, type: any) => {

               
        if (type == 'section') {
            if(!selected.id){
                setSearchParams((prevState: any) => {
                    return {
                        ...prevState,
                        stateId: ""
                    }
                })
                //getTableRows();
            }else{
                setSearchParams((prevState: any) => {
                    return {
                        ...prevState,
                        stateId: selected[config.sectionValue]
                    }
                })
            }
        }
       
        if (type == 'format') {
            if(!selected.id){
                setSearchParams((prevState: any) => {
                    return {
                        ...prevState,
                        section: ""
                    }
                })
               // getTableRows();
            }else{
                setSearchParams((prevState: any) => {
                    return {
                        ...prevState,
                        section: selected[config.formatValue]
                    }
                })
            }
        }

    }



    function handleClickRow(item:any) {
        navigate(RoutesConstants.CatalogLcDetail,  {state: item})
    }

    function handleFilterClick() {
        getTableRows()
    }

    function goToNewUser() {
        navigate(RoutesConstants.CatalogueLcForm)
    }

   

    const handleEditState = (row: any) => {
        let passData = {
            item: row
        }
        navigate(RoutesConstants.CatalogueLcForm, { state: passData })
    }

    //const goToNewUser = () => {
    //   navigate(RoutesConstants.UserCreate)
    //}
    const handleBulkUpload = ()=>{
        navigate(RoutesConstants.BulkUpload);
    }


    return (
        <div className='page-container type-filter'>
            <div className='container main-container'>
                <div className='page-content '>
                    <div className='desc-container mb-20'>
                        <div className="title-wrapper">
                            <MainTitle text={"Carga por Lote"} />
                        </div>
                        <div className="title-wrapper text-center">
                            <TextP>En esta sección puedes administrar los locales disponibles; añadir (+), editar (lápiz), eliminar (bote de basura) y realizar una carga masiva de los mismos. Todos los campos, exceptuando m² frente y m² fondo son obligatorios.</TextP>
                            <br/>
                            <TextP>Importante: Te recordamos que la carga masiva reemplaza todos los locales del sistema.</TextP>
                        </div>


                    </div>
                    <div className='filter-form-container'>

                        <div className='row'>
                            <div className='col s12 m4 offset-m4 '>
                                <div className="text-center">
                                    Nueva Tienda / Local<span onClick={() => goToNewUser()}> <Image name='new-user.png' /></span>
                                </div>
                            </div>

                            
                        </div>

                        <div className='row'>
                           

                            <div className='col s12 m6 '>
                                <div className="input-container">   
                                    <label htmlFor='format' className="input-label">Estado</label>
                                    <Select
                                        classNamePrefix='input-select-react'
                                        id='tienda'
                                        className='input-select-react'
                                        options={sectionOptions}
                                        onChange={(e) => handleInputChange(e, 'section')}
                                        getOptionLabel={(option: any) => option[config.sectionLabel]}
                                        getOptionValue={(option: any) => option[config.sectionValue]}
                                        isSearchable={false}

                                    />
                                </div>

                            </div>

                            <div className='col s12 m6 '>
                                <div className="input-container">   
                                    <label htmlFor='format' className="input-label">Formato</label>
                                    <Select
                                        classNamePrefix='input-select-react'
                                        id='tienda'
                                        className='input-select-react'
                                        options={formatOptions}
                                        onChange={(e) => handleInputChange(e, 'format')}
                                        getOptionLabel={(option: any) => option[config.formatLabel]}
                                        getOptionValue={(option: any) => option[config.formatValue]}
                                        isSearchable={false}

                                    />
                                </div>

                            </div>

                        </div>



                        <div className='row'>
                            <div className='col s12 m4 offset-m4'>
                                <PrimaryButton onClick={handleFilterClick}>Buscar</PrimaryButton>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col s12'>
                                <div className="text-right">
                                    <div  onClick={handleBulkUpload}>Carga masiva <Image name="bulk.png" className='vertical-middle' /></div>
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
                            //callbackDeleteRow={(row: any) => handleDeleteState(row)}
                            //callbackEditRow={(row: any) => handleEditState(row)}
                            callbackImageCallback={(row: any) => handleEditState(row)}
                            sort={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
