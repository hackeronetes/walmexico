import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
// import {  getLcFolioDetail } from '../../../../services/folioTracking/folioTrackingService'
import {  deleteDeterminantData } from '../../../../services/adminGeneral/adminGeneralService'
import {  POPUP_TYPE_ERROR, POPUP_TYPE_SUCCESS } from './../../../../resources/project-constants';
import DataTable2 from '../../../../components/datatable/DataTable2'
import RoutesConstants from '../../../../resources/route-constants'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../../store/hooks';
import { setLoader } from '../../../../store/loaderReducer';
import { MainTitle } from '../../../../components/common/Titles';
import PopupModel from '../../../../components/popups/PopupModel'
import PopupContentCustom from '../../../../components/popups/PopupContentCustom'
import { formatNumberToCurrency } from '../../../../utility/commonFunctions';



const renderTableM2ColumnFront = (row:any) => {
    return (
        <span>
            {formatNumberToCurrency(row.sqftFront, true)}
        </span>
    )
}
const renderTableM2Column = (row:any) => {
    return (
        <span>
            {formatNumberToCurrency(row.sqftBackground, true)}
        </span>
    )
}


const config: any = {
    gridColumns: [
        { 'label': 'NOMENCLATURA', 'key': 'nomenclature', 'type': 'text' },
        { 'label': 'TIPO', 'key': 'tipo', 'type': 'text' },
        { 'label': 'm²', 'key': 'sqmtr', 'type': 'text' },
        { 'label': 'M FRENTE', 'key': 'sqftFront', 'type' : 'cellRenderer', 'cellRenderer': renderTableM2ColumnFront },
        { 'label': 'M FONDO', 'key': 'sqftBackground', 'type' : 'cellRenderer', 'cellRenderer': renderTableM2Column },
        { 'label': 'EDITAR', 'key': '', 'type': 'rowEdit' },
        { 'label': 'ELIMINAR', 'key': '', 'type': 'rowDelete' },
    ]
}

export const CatalogLcDetail: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [modelOpen, setModelOpen] = useState(false);
    const [popupType, setPopupType] = useState<any>('')

    const [item, setItem] = useState<any>({})
    const [paramStatus, setParamStatus] = useState<any>()


    function openModel(type: any) {
        setPopupType(type)
        setModelOpen(true)
        dispatch(setLoader(false));
    }



    const checkRequiredParams = () => {
        let status = true
        if (location.hasOwnProperty('state')) {
            if (!location.state)
                status = false
            else {
                setItem(location.state)

            }

        }

        if (!status) {
            console.log('Error, Params not send ')
        }

        setParamStatus(status)
    }




    useEffect(() => {
        checkRequiredParams()


    }, [])



    //const paramStatus = checkRequiredParams()

    if (!paramStatus) {
        return (
            <>Not Found</>
        )
    }

    

    const handleEditState = (row: any) => {

        let passData = {
            item: item,
            row: row,
            type: 'detailForm'
        }
        navigate(RoutesConstants.CatalogueLcForm, { state: passData })
        
    }

    function handleModelClose() {

        setModelOpen(false)
        navigate(RoutesConstants.CatalogueLC)
    }
    const handleDeleteState = (row: any) => {
        dispatch(setLoader(true))
        deleteDeterminantData(row.commercialId).then(() => {
            dispatch(setLoader(false))
            openModel(POPUP_TYPE_SUCCESS)
            
          
           
        }).catch((error:any)=> {
            console.log(error);
            dispatch(setLoader(false))
            openModel(POPUP_TYPE_ERROR)
        })
  
    }



    return (
        <>
            <div className='page-container'>
                <div className='container main-container'>
                    <div className='page-content'>
                        <div className='desc-container mb-20'>
                            <div className="title-wrapper">
                                <MainTitle text={"Propiedades por Tienda"} />
                            </div>
                           


                        </div>

                        <div className='row'>
                            <div className='col s12'>
                                <div className="cat-lc-detail-row">
                                    <div className='cat-lc-detail-column'>
                                        <div className='cat-lc-title'>DETERMINANTE</div>
                                        <div>{item.department}</div>
                                    </div>
                                    <div className='cat-lc-detail-column'>
                                        <div className='cat-lc-title'>FORMATO</div>
                                        <div>{item.format}</div>
                                    </div>
                                    <div className='cat-lc-detail-column'>
                                        <div className='cat-lc-title'>TIENDA</div>
                                        <div>{item.store}</div>
                                    </div>
                                    <div className='cat-lc-detail-column'>
                                        <div className='cat-lc-title'> ESTADO</div>
                                        <div>{item.state}</div>
                                    </div>
                                    <div className='cat-lc-detail-column'>
                                        <div className='cat-lc-title'> DIRECCIÓN</div>
                                        <div>{item.address}</div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className='datatable-container'>
                            <DataTable2
                                columns={config.gridColumns}
                                rows={item.commercialResponses}
                                totalRows={item.commercialResponses.length}
                                getSelectedRows={() => void 0}
                                callbackRefreshRows={() => void 0}
                                callbackDeleteRow={(row: any) => handleDeleteState(row)}
                                callbackEditRow={(row: any) => handleEditState(row)}
                                sort={true}
                            />
                        </div>
                        <PopupModel isOpen={modelOpen} closePopup={handleModelClose} height='260px' width='30%'>
            <PopupContentCustom closePopup={handleModelClose} type={popupType} />
        </PopupModel>

                    </div>
                </div>
            </div>
        </>
    )
}
