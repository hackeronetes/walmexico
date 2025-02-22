import React, { useState, useEffect } from 'react'
import { MainTitle } from '../../components/common/Titles'
import Select from 'react-select'
import { PrimaryButton } from '../../components/common/Buttons'
import DataTable2 from '../../components/datatable/DataTable2'
import { getImagesList,getImagesListFromSearch, deleteImage, getImageSection } from '../../services/adminContent/adminContentService'
import RoutesConstants from '../../resources/route-constants'
import { useNavigate } from 'react-router-dom'
import DatePickerInput from './../../components/common/DatePickerInput';
import Image from './../../components/common/Image';
import {formatDateNotesImages, formatDateImages} from '../../utility/commonFunctions';
import { useAppDispatch } from '../../store/hooks';
import { setLoader } from '../../store/loaderReducer';
import { FaSearch } from "react-icons/fa";


const renderTableActiveColumn = (row: any) => {
    return (
        <span>
            {row.active ? 'Si' : 'No'}
        </span>
    )
}


const activeOptions = [
    {value: '', label: 'Seleccione'},
    { value: '1', label: 'Si' },
    { value: '0', label: 'No' },
]

const config: any = {
    sectionLabel: 'sectionDescription',
    sectionValue: 'sectionId',
    storeLabel: 'storeName',
    storeValue: 'id',
    gridColumns: [
        { 'label': '', 'key': 'imageUrl', 'type': 'image' },
        { 'label': 'NOMBRE', 'key': 'imageDescription', 'type': 'text' },
        { 'label': 'INICIO DE PUBLICACIÓN', 'key': 'publicationStartDateShow', 'type': 'text' },
        { 'label': 'FIN DE PUBLICACIÓN', 'key': 'publicationEndDateShow', 'type': 'text' },
        { 'label': 'SECCIÓN', 'key': 'sectionDescription', 'type': 'text' },
        { 'label': 'POSICIÓN', 'key': 'orderNumber', 'type': 'text' },
        { 'label': 'ACTIVO', 'key': 'active', 'type': 'cellRenderer', 'cellRenderer': renderTableActiveColumn },
        { 'label': '', 'key': '', 'type': 'rowEdit' },
        { 'label': '', 'key': '', 'type': 'rowDelete' },
    ]
}

export const ImagesIndex: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [sectionOptions, setSectionOptions] = useState<any>([])

    const [endDate, setEndDate] = useState<any>('')
    const [startDate, setStartDate] = useState<any>('')


    const [searchParams, setSearchParams] = useState<any>({
        name: '',
        startDate: '',
        endDate: '',
        active: '',
        section: '',
    });

    const [tableRows, setTableRows] = useState<any>([])
    const [tableTotalRows] = useState(0)



    function getDropdownSection() {

        getImageSection().then((res: any) => {
            const firstObject = {
                "sectionId": 0,
                "sectionDescription": "Seleccione",
                "active": "1"
            };
            if (res.data){
                setSectionOptions([firstObject, ...res.data]);
            }else
                setSectionOptions(res.data)
        })
            .catch((error: any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
                setSectionOptions([])
                console.log('getStateList error', error)
            })
    }

   const getTableRowSearchClick = () => {
    if(searchParams?.name){
    let paramsTemp = {
        imageName: searchParams.name,
    }
    dispatch(setLoader(true));
    getImagesListFromSearch(paramsTemp).then((res: any) => {
        if (res.data){
            
        let modifiedArry =  res.data.map((item:any) => {
               item.publicationEndDateShow = formatDateImages(item.publicationEndDate);
               item.publicationStartDateShow = formatDateImages(item.publicationStartDate);
               return item;


            });
            
            
            setTableRows(modifiedArry)
            dispatch(setLoader(false));
        }
        else{
            setTableRows([]);
            dispatch(setLoader(false));
        }
    })
        .catch((error: any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
            setTableRows([]);
            dispatch(setLoader(false));
            console.log('getStateList error', error)
        })

    }

   }



    const getTableRows = () => {

        
        let paramsTemp = {
            //name: searchParams.name,
            startDate: startDate && formatDateNotesImages(startDate),
            endDate: endDate && formatDateNotesImages(endDate),
            active: searchParams.active,
            section: searchParams.section,
        }
        dispatch(setLoader(true));
        getImagesList(paramsTemp).then((res: any) => {
            if (res.data){
                
            let modifiedArry =  res.data.map((item:any) => {
                   item.publicationEndDateShow = formatDateImages(item.publicationEndDate);
                   item.publicationStartDateShow = formatDateImages(item.publicationStartDate);
                   return item;


                });
                
                
                setTableRows(modifiedArry)
                dispatch(setLoader(false));
            }
            else{
                setTableRows([]);
                dispatch(setLoader(false));
            }
        })
            .catch((error: any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
                setTableRows([]);
                dispatch(setLoader(false));
                console.log('getStateList error', error)
            })


    }

    function deleteItem(id:any) {
        
        deleteImage(id).then(() => {
            getTableRows()
        })
            .catch((error: any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
                //setSectionOptions([])
                console.log('getStateList error', error)
            })
    }




    useEffect(() => {
        getDropdownSection()
        getTableRows()
    }, [])



    const handleInputChange = (selected: any, type: any) => {

        if (type == 'name') {
            setSearchParams((prevState: any) => {
                return {
                    ...prevState,
                    name: selected.target.value
                }
            })
        }




        if (type == 'active') {
            setSearchParams((prevState: any) => {
                return {
                    ...prevState,
                    active: selected.value
                }
            })
        }
        if (type == 'section') {
            setSearchParams((prevState: any) => {
                return {
                    ...prevState,
                    section: selected[config.sectionValue]
                }
            })
            
        }

    }

    function handleSearchClick(){
        getTableRowSearchClick()
    } 

    function handleFilterClick() {
        getTableRows()
    }

    function goToNewUser() {
        navigate(`${RoutesConstants.ImageForm}?newImage=1`)
    }

    const handleDeleteState = (deletedRow: any) => {
        deleteItem(deletedRow.imageId)
    }

    const handleEditState = (row: any) => {
        let passData = {
            image: row
        }
        navigate(`${RoutesConstants.ImageForm}?newImage=0`, { state: passData })
    }

    //const goToNewUser = () => {
    //   navigate(RoutesConstants.UserCreate)
    //}


    return (
        <div className='page-container type-filter'>
            <div className='container main-container'>
                <div className='page-content '>
                    <div className='desc-container mb-20'>
                        <div className="title-wrapper">
                            <MainTitle text={"Imagery"} />
                        </div>


                    </div>
                    <div className='filter-form-container'>

                        <div className='row mbl-mb-0'>
                            <div className='col s12  m4'>
                                <div className="text-center">
                                    <span onClick={() => goToNewUser()}> <Image name='new-user.png' /></span>
                                </div>
                            </div>

                            <div className='col s12  m6'>
                                <div style={{display: "flex", marginBottom: "20px"}}>

                                    <input
                                        type="text"
                                        className="input-text"
                                        placeholder="Buscar..."
                                        value={searchParams.name}
                                        onChange={(e) => handleInputChange(e, 'name')}
                                    /><FaSearch onClick={handleSearchClick} style={{marginTop: "23px", color: "#9e9e9e", cursor: "pointer"}} />

                                </div>

                            </div>
                        </div>

                        <div className='row'>
                            <div className='col s12  m6 l3'>
                                <div className="input-container">
                                    <DatePickerInput
                                        label={'Fecha de recepción desde'}
                                        value={startDate}
                                        handleDateChange={(date: any) => setStartDate(date)}
                                    />

                                </div>

                            </div>

                            <div className='col s12  m6 l3'>
                                <div className="input-container">
                                    <DatePickerInput
                                        label={'Fecha de recepción desde'}
                                        value={endDate}
                                        handleDateChange={(date: any) => setEndDate(date)}
                                    />
                                </div>

                            </div>

                            <div className='col s12  m6 l3'>
                                <div className="input-container">
                                    <label htmlFor='format' className="input-label">Sección</label>
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

                            <div className='col s12  m6 l3'>
                                <div className="input-container">
                                    <label htmlFor='format' className="input-label">Activo</label>
                                    <Select
                                        classNamePrefix='input-select-react'
                                        id='tienda'
                                        className='input-select-react'
                                        options={activeOptions}
                                        onChange={(e) => handleInputChange(e, 'active')}
                                        //getOptionLabel={(option: any) => option.label}
                                        // getOptionValue={(option: any) => option.value}
                                        isSearchable={false}

                                    />
                                </div>

                            </div>

                        </div>



                        <div className='row'>
                            <div className='col s12  m4 offset-m4'>
                                <PrimaryButton onClick={handleFilterClick}>Buscar</PrimaryButton>
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
                            callbackDeleteRow={(row: any) => handleDeleteState(row)}
                            callbackEditRow={(row: any) => handleEditState(row)}
                            sort={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
