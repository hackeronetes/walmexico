import React, { useState, useEffect } from 'react'
import { MainTitle } from '../../../components/common/Titles'
import Select from 'react-select'
import { PrimaryButton } from '../../../components/common/Buttons'
import DataTable2 from '../../../components/datatable/DataTable2'
import { getSectionOptions } from '../../../services/userRole/userRoleService'
import { getDescriptionList, deleteDescription } from '../../../services/adminContent/adminContentService'
import RoutesConstants from '../../../resources/route-constants'
import { useNavigate } from 'react-router-dom'
import Image from '../../../components/common/Image';
import { useAppDispatch } from '../../../store/hooks';
import { setLoader } from '../../../store/loaderReducer'

const renderTableActiveColumn = (row: any) => {
    return (
        <span>
            {row.active ? 'Si' : 'No'}
        </span>
    )
}


const activeOptions = [
    {value: '2', label: 'Seleccione'},
    { value: '1', label: 'Si' },
    { value: '0', label: 'No' },
]

const config: any = {
    sectionLabel: 'sectionName',
    sectionValue: 'id',
    storeLabel: 'storeName',
    storeValue: 'id',
    gridColumns: [
        { 'label': 'TÍTULO', 'key': 'descriptionTitle', 'type': 'text' },
        { 'label': 'DESCRIPCIÓN', 'key': 'description', 'type': 'text' },
        { 'label': 'SECCIÓN', 'key': 'sectionDescription', 'type': 'text' },
        { 'label': 'ACTIVO', 'key': 'activeDescription', 'type': 'cellRenderer', 'cellRenderer': renderTableActiveColumn },
        { 'label': '', 'key': '', 'type': 'rowEdit' },
        { 'label': '', 'key': '', 'type': 'rowDelete' },
    ]
}

export const Descriptions: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [sectionOptions, setSectionOptions] = useState<any>([])



    const [searchParams, setSearchParams] = useState<any>({
        name: '',
        active: '',
        section: '',
    });

    const [tableRows, setTableRows] = useState<any>([])
    const [tableTotalRows] = useState(0)



    function getDropdownSection() {
        let tempparams:any = {page: 0}
        getSectionOptions(tempparams).then((res: any) => {
           const firstObject = {
                "id": 0,
                "sectionName": "Seleccione",
                "active": "1"
            };
            if (res.data){
                setSectionOptions([firstObject, ...res.data]);
            }
            else
                setSectionOptions(res.data)
        })
            .catch((error: any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
                setSectionOptions([])
                console.log('getStateList error', error)
            })
    }

   



    const getTableRows = (section:string = '', active: string = '') => {

        
        let paramsTemp = {
            name: searchParams.name,
            active: active === 'noData' ? '' : searchParams.active,
            section: section === 'noData' ? '' : searchParams.section,
        }
        dispatch(setLoader(true));
        getDescriptionList(paramsTemp).then((res: any) => {
            
            if (res.data){
                setTableRows(res.data);
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
                dispatch(setLoader(false));
                console.log('getStateList error', error)
            })


    }

    function deleteItem(id:any) {
        
        deleteDescription(id).then(() => {
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

        if (type === 'name') {
            setSearchParams((prevState: any) => {
                return {
                    ...prevState,
                    name: selected.target.value
                }
            })
        }




        if (type === 'active') {
            if(selected.value === "2"){
                setSearchParams((prevState: any) => {
                    return {
                        ...prevState,
                        active: ""
                    }
                })
                getTableRows('', 'noData');
                return;
            }else{
                setSearchParams((prevState: any) => {
                    return {
                        ...prevState,
                        active: selected.value
                    }
                })
            }

        }
        if (type === 'section') {
            if(!selected.id){
                setSearchParams((prevState: any) => {
                    return {
                        ...prevState,
                        section: ""
                    }
                })
                getTableRows('noData', '');
                return;
            }
            else{
                setSearchParams((prevState: any) => {
                    return {
                        ...prevState,
                        section: selected[config.sectionValue]
                    }
                })
            }
            
        }

    }



    function handleFilterClick() {
        getTableRows()
    }

    function goToNewUser() {
        navigate(`${RoutesConstants.DescriptionsForm}?newDescription=1`)
    }

    const handleDeleteState = (deletedRow: any) => {
        deleteItem(deletedRow.id)
    }

    const handleEditState = (row: any) => {
        let passData = {
            description: row
        }
        navigate(`${RoutesConstants.DescriptionsForm}?newDescription=0`, { state: passData })
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
                            <MainTitle text={"Descripciones"} />
                        </div>


                    </div>
                    <div className='filter-form-container'>

                        <div className='row mbl-mb-0'>
                            <div className='col s12  m4'>
                                <div className="text-center">
                                    <span onClick={() => goToNewUser()}> <Image name='new-user.png' /></span>
                                </div>
                            </div>

                            <div className='col s12  m4'>
                                <div className="input-container">  

                                    <input
                                        type="text"
                                        className="input-text"
                                        //placeholder={placeholder}
                                        value={searchParams.name}
                                        onChange={(e) => handleInputChange(e, 'name')}
                                    />

                                </div>

                            </div>
                        </div>

                        <div className='row'>
                           

                            <div className='col s12  m3'>
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

                            <div className='col s12  m3'>
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
