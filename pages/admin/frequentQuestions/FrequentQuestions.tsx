import React, { useState, useEffect } from 'react'
import { MainTitle } from '../../../components/common/Titles'
import { PrimaryButton } from '../../../components/common/Buttons'
import DataTable2 from '../../../components/datatable/DataTable2'
import { getQuestionsList, deleteQuestion } from '../../../services/adminContent/adminContentService'
import RoutesConstants from '../../../resources/route-constants'
import { useNavigate } from 'react-router-dom'
import Image from '../../../components/common/Image';
import { setLoader } from '../../../store/loaderReducer';
import { useAppDispatch } from '../../../store/hooks'

const renderTableActiveColumn = (row: any) => {
    return (
        <span>
            {row.active ? 'Si' : 'No'}
        </span>
    )
}


const config: any = {
    sectionLabel: 'sectionName',
    sectionValue: 'id',
    storeLabel: 'storeName',
    storeValue: 'id',
    gridColumns: [
        { 'label': 'PREGUNTA', 'key': 'questionText', 'type': 'text' },
        { 'label': 'CALIFICACIÓN', 'key': 'score', 'type': 'text' },
        { 'label': 'SECCIÓN', 'key': 'section', 'type': 'text' },
        { 'label': 'ACTIVO', 'key': 'activeDescription', 'type': 'cellRenderer', 'cellRenderer': renderTableActiveColumn },
        { 'label': '', 'key': '', 'type': 'rowEdit' },
        { 'label': '', 'key': '', 'type': 'rowDelete' },
    ]
}

export const FrequentQuestions: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
   

    const [searchParams, setSearchParams] = useState<any>({
        question: '',
     });

    const [tableRows, setTableRows] = useState<any>([])
    

    const getTableRows = () => {
        dispatch(setLoader(true));
        let paramsTemp = {
            question: searchParams.question,
        }

        getQuestionsList(paramsTemp).then((res: any) => {
            dispatch(setLoader(false));

            if (res.data)
                setTableRows(res.data)
            else
                setTableRows([])
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
        
        deleteQuestion(id).then(() => {
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
        getTableRows()
    }, [])



    const handleInputChange = (selected: any, type: any) => {

         if (type == 'question') {
            setSearchParams((prevState: any) => {
                return {
                    ...prevState,
                    question: selected.target.value
                }
            })
        }




    }



    function handleFilterClick() {
        getTableRows()
    }

    function goToNewUser() {
        navigate(`${RoutesConstants.FrequentQuestionsFormAdmin}?newQue=1`)
    }

    const handleDeleteState = (deletedRow: any) => {
        deleteItem(deletedRow.id)
    }

    const handleEditState = (row: any) => {
        let passData = {
            question: row
        }
        navigate(`${RoutesConstants.FrequentQuestionsFormAdmin}?newQue=0`, { state: passData })
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
                            <MainTitle text={"Preguntas frecuentes"} />
                        </div>


                    </div>
                    <div className='filter-form-container'>

                        <div className='row'>
                            <div className='col s12  m4'>
                                <div className="text-center">
                                    <span onClick={() => goToNewUser()}> <Image name='new-user.png' /></span>
                                </div>
                            </div>

                            <div className='col s12  m4 ofset-m3'>
                                <div className="input-container">  

                                    <input
                                        type="text"
                                        className="input-text"
                                        //placeholder={placeholder}
                                        value={searchParams.name}
                                        onChange={(e) => handleInputChange(e, 'question')}
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
                            totalRows={0}
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
