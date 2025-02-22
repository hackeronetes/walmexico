import React, { useState, useEffect, memo } from 'react'
import { getLcHistoryExportData, getOfferLandHistoryExportData, getLandSaleHistoryExportData, getSupplierHistoryExportData,
    postChangeFolioActive } from '../../../services/folioTracking/folioTrackingService'
import Image from '../../../components/common/Image'
import DataTable2 from '../../../components/datatable/DataTable2'
import ToggleButton from '../../../components/common/ToggleButton'
import FileDownload from '../../../components/common/FileDownload'
import RoutesConstants from '../../../resources/route-constants'
import { useNavigate } from 'react-router-dom'
import {  getLoginType } from '../../../store/authReducer'
import { useAppSelector } from '../../../store/hooks'
import { canChangeFolioActiveStatus } from '../../../utility/commonFunctions'
import {TYPE_LC, TYPE_SUPP, TYPE_EP, TYPE_TERR, SUBTYPE_CON} from "./constants"



const STATUS_TERR = 'Offerusland'
const STATUS_SUPP_CON = 'Construction'
const STATUS_SUPP_MAT = 'Material'
const STATUS_EP = 'ExcessProperty'
const STATUS_LC = 'LocalCommercials'

interface Props {
    type: String,
    folioId: any,
    activeStatus: any
    subType?:String
    folioCd?:String
}





const FolioHistory: React.FC<Props> = (props) => {

    const [tableRows, setTableRows] = useState<any>([])
    //const [activeStatus, setActiveStatus] = useState<any>(false)
    const [historyStatus, setHistoryStatus] = useState<Boolean>(false)
    const navigate = useNavigate();
    // const loginUser = useAppSelector(getLoginUser);
    const loginType = useAppSelector(getLoginType);

  
    const navigatIndexPage = () => {

        

        switch(props.type)
        {
            case TYPE_LC: 
                navigate(RoutesConstants.FolioLocalCommercial)
                break;
            case TYPE_SUPP: 
                navigate(RoutesConstants.FolioSupplier)
                break;
            case TYPE_EP: 
                navigate(RoutesConstants.FolioExcessProperty)
                break;
            case TYPE_TERR: 
                navigate(RoutesConstants.FolioLand)
                break;
        }
    }

    const getModuleForChangeStatus= () => {
        switch(props.type)
        {
            case TYPE_LC: 
                return STATUS_LC
                break;
            case TYPE_SUPP: 
                return props.subType == SUBTYPE_CON ?  STATUS_SUPP_CON : STATUS_SUPP_MAT
                break;
            case TYPE_EP: 
                return STATUS_EP
                
                break;
            case TYPE_TERR: 
                return STATUS_TERR
                break;
        }
    }
    
    const handleToggleChange = (status:Boolean) => {
       // alert('chjange status')
        // setActiveStatus(status)
        
        let dataTemp: any = {
            _id: props.folioId,
            requestStatus: getModuleForChangeStatus(),
            active: status,
        }
    
        postChangeFolioActive(dataTemp).then(() => {
            navigatIndexPage()
        })
            .catch((error: any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
    
                console.log('getStateList error', error)
            })
    }

    const renderToggleColumn = (row: any) => {
        if (row.showToggle) {
            if(canChangeFolioActiveStatus(loginType))
            {
                return (
                    <ToggleButton callbackToggle={(status: any) => handleToggleChange(status)}   checked={props.activeStatus} />
                )
            }
            else
            {
                return ('')
            }
            
        }
        else {
            return ''
        }



    }
    const renderTableActiveColumn = () => {
        return (
            <Image name="folio-status-history.png" />
        )
    }
    const renderTableComment = (row:any) => {
        return (
            <span>{row.comment ? row.comment : 'Sin Comentario'}</span>
        )
    }
    const renderDocumentColumn = (row:any) => {
        let files:any = []
        
        //if(row.docName && row.document)
        //{
        if(props.type == TYPE_SUPP)
        {
            //if(row.documents && row.documents.length > 0)
                files  = row.documents.map((item:any) => {
                    return  {
                        requestDocumentName: item.docName,
                        documentData: item.document,
                    }
                })
               
        }
        else
        {
            if(row.docName && row.document)
            {
                files.push(
                    {
                        requestDocumentName: row.docName,
                        documentData: row.document,
                    }
                )
            }
        }
            
            
            
       // }

        // switch(props.type)
        // {
        //     case TYPE_LC: 
        //         if(row.docName && row.document)
        //         {
        //             files.push(
        //                 {
        //                     requestDocumentName: row.docName,
        //                     documentData: row.document,
        //                 }
        //             )
        //         }
        //         break;
        //     case TYPE_SUPP: 
        //         break;
        //     case TYPE_EP: 
        //         break;
        //     case TYPE_TERR: 
        //         break;
        // }

        return (
            <FileDownload files={files}/>
        )
    }

    const getActiveToggleClass = () => {
        return canChangeFolioActiveStatus(loginType) ? '' : 'hide'
    }

    const showDocumentsColumn = () => {
        return props.type == TYPE_EP ? 'hide' : ''
    }

    const gridColumns = [
        { 'label': 'ACTIVO', 'key': 'active', 'type': 'cellRenderer', 'cellRenderer': renderToggleColumn,  'className':   getActiveToggleClass() },
        { 'label': '', 'key': 'active', 'type': 'cellRenderer', 'cellRenderer': renderTableActiveColumn },
        { 'label': 'ESTATUS', 'key': 'status', 'type': 'text' },
        { 'label': 'FECHA MODIFICACIÓN ', 'key': 'reqModDate', 'type': 'text' },
        { 'label': 'COMENTARIO', 'key': 'comment', 'type': 'cellRenderer', 'cellRenderer': renderTableComment },
        { 'label': 'ADJUNTOS', 'key': 'active', 'type': 'cellRenderer', 'cellRenderer': renderDocumentColumn,  'className':   showDocumentsColumn()},

    ]

    


    const updateTableRows = (data: any) => {
        if (data) {
            let temp = data
            if (temp.length > 0) {
                temp[0].showToggle = true
            }

            
            setTableRows(temp);
            setHistoryStatus(true)
        }
    }

    const getHistoryLc = () => {
        let params: any = {
            folioId: props.folioId,
            export: 0,
            test: true
        }

        getLcHistoryExportData(params).then((response: any) => {
            if (response.data) {
                updateTableRows(response.data)
            }
        })
            .catch((error: any) => {
                console.log(error)
                setTableRows([]);
                //setModalErrorIsOpen(true)
            })
    }
    const getHistoryLEp= () => {
        let params: any = {
            folioId: props.folioId,
            export: 0,
            test: true
        }

        getLandSaleHistoryExportData(params).then((response: any) => {
            if (response.data) {
                updateTableRows(response.data)
            }
        })
            .catch((error: any) => {
                console.log(error)
                setTableRows([]);
                //setModalErrorIsOpen(true)
            })
    }
    const getHistorySupp= () => {
        let params: any = {
            folioId: props.folioId,
            export: 0,
            test: 222
        }

        if(props.subType == SUBTYPE_CON)
            params.form = 1
        else
            params.form = 2

        getSupplierHistoryExportData(params).then((response: any) => {
            if (response.data) {
                updateTableRows(response.data)
            }
        })
            .catch((error: any) => {
                console.log(error)
                setTableRows([]);
                //setModalErrorIsOpen(true)
            })
    }
    const getHistoryTer= () => {
        let params: any = {
            folioId: props.folioId,
            export: 0,
            test: true
        }

        getOfferLandHistoryExportData(params).then((response: any) => {
            if (response.data) {
                updateTableRows(response.data)
            }
        })
            .catch((error: any) => {
                console.log(error)
                setTableRows([]);
                //setModalErrorIsOpen(true)
            })
    }

    const getFolioHistory = () => {
            switch(props.type) {
                case TYPE_LC: 
                    getHistoryLc()
                    break;
                case TYPE_SUPP: 
                    getHistorySupp()
                    break;
                case TYPE_EP: 
                    getHistoryLEp()
                    break;
                case TYPE_TERR: 
                    getHistoryTer()
                    break;
            }

    }

    useEffect(() => {
        if(props.folioId && !historyStatus)
            {
                getFolioHistory()
                
            }
            // setActiveStatus(props.activeStatus)
    }, [props])

    return (
        <div className="folio-hostiry-container">
            <div className='datatable-container'>
                <DataTable2
                    columns={gridColumns}
                    rows={tableRows}
                    getSelectedRows={() => void 0}
                    //callbackClickRow={handleClickRow}
                    callbackRefreshRows={() => void 0}
                    sort={true}
                />
            </div>
        </div>
    )

}


export default memo(FolioHistory, (prevProps, nextProps) => {
    return (prevProps.folioCd == nextProps.folioCd && prevProps.activeStatus == nextProps.activeStatus)
    // this will never re-render
  
    // or do your custom logic to determine when it should re-render
  });