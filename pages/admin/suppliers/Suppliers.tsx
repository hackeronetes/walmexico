import React, { useState, useEffect } from 'react'
import { MainTitle } from '../../../components/common/Titles'
import DataTable2 from '../../../components/datatable/DataTable2'

import { getSuppliersList, deleteSupplier, saveSupplier } from '../../../services/adminContent/adminContentService'
import RoutesConstants from '../../../resources/route-constants'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../store/hooks'
import { setLoader } from '../../../store/loaderReducer'
import PopupModel from '../../../components/popups/PopupModel'
import PopupContentCustom from '../../../components/popups/PopupContentCustom'
import { POPUP_TYPE_ERROR, POPUP_TYPE_SUCCESS } from '../../../resources/project-constants'






const config: any = {
    sectionLabel: 'sectionName',
    sectionValue: 'id',
    storeLabel: 'storeName',
    storeValue: 'id',
    gridColumns: [
        { 'label': 'POSICIÓN', 'key': 'orderNbr', 'type': 'text', 'inputType':"text" },
        { 'label': 'TITULO', 'key': 'title', 'type': 'text', 'inputType':"text" },
        { 'label': 'DESCRIPCIÓN', 'key': 'provider', 'type': 'text', 'inputType':"text" },
        { 'label': 'IMAGEN', 'key': 'imageName', 'type': 'text', 'inputType':"file" },
        { 'label': '', 'key': '', 'type': 'rowEdit' },
        { 'label': '', 'key': '', 'type': 'rowDelete' },
    ]
}

export const Suppliers: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
   


    

    const [tableRows, setTableRows] = useState<any>([])
    const [tableTotalRows] = useState(0)


    const [editedRow, setEditedRow] = useState<any>({})

    const [modelOpen, setModelOpen] = useState(false);
    const [popupType, setPopupType] = useState<any>('')


   
    function openModel(type:any){
        setPopupType(type)
        setModelOpen(true)
       
    }


    const getTableRows = () => {
        
       dispatch(setLoader(true));


        getSuppliersList().then((res: any) => {
             if (res.data){
                let tempData = res.data
                if(res.data.length > 0 )
                {
                    let temp:any = {
                        emptyRecord: true
                    }
                    for (var prop in res.data[0]) {
                        temp[prop] = ''
                    }
                    tempData.push(temp)
                }
                setTableRows(tempData)
                
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
            console.log('getStateList error', error);
            dispatch(setLoader(false));
        })


    }

    function deleteItem(id:any) {
        
        deleteSupplier(id).then(() => {
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



    

    const handleDeleteState = (deletedRow: any) => {
        deleteItem(deletedRow.id)
    }

    const handleEditState = (row: any) => {
        let passData = {
            item: row
        }
        navigate(RoutesConstants.NoteForm, { state: passData })
    }

   

    const saveEditRow = (title:any, value:any) => {
        setEditedRow((prevState:any) => {
            return {
                ...prevState,
                [title]: value
            }
        })
    }

    const handleSaveRowClick = (row:any) => {
        
       Object.keys(editedRow).forEach(function(key) {
            row[key] = editedRow[key]
            // key: the name of the object key
            // index: the ordinal position of the key within the object 
        });

        

       

        let tempData:any = {
            title: row.title,
            description: row.provider,
        }
       
        if(editedRow.imageName)
        {
            tempData.image =  editedRow.imageName
        }

        if(row.id)
        {
            tempData.id =  row.id
        }


       saveSupplier(tempData).then(() => {
           openModel(POPUP_TYPE_SUCCESS)
            //navigate(RoutesConstants.Suppliers)
            getTableRows()
        })
        .catch((error: any) => {
             //alert('Something went wrong')
            //setSelectStateOptions([])
            openModel(POPUP_TYPE_ERROR)
            console.log('getStateList error', error)
            getTableRows()
        })
    }

    function handleModelClose(){
        setModelOpen(false)
        navigate(RoutesConstants.Suppliers)
    }

    return (
        <div className='page-container type-filter'>
            <div className='container main-container'>
                <div className='page-content '>
                    <div className='desc-container mb-20'>
                        <div className="title-wrapper">
                            <MainTitle text={"Administración de Proveedores"} />
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
                            isEditable={true}
                            saveEditRow={saveEditRow}
                            handleSaveRowClick={handleSaveRowClick}
                        />
                    </div>
                </div>
            </div>

            <PopupModel  isOpen={modelOpen} closePopup={handleModelClose} height='260px' width='30%'>
                <PopupContentCustom closePopup={handleModelClose} type={popupType}  />
            </PopupModel>
            
        </div>
    )
}
