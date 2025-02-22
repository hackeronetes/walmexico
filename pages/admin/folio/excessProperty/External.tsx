// @ts-ignore
import React, { useState, useEffect } from 'react'
import { MainTitle } from '../../../../components/common/Titles'
import { TextP } from '../../../../components/common/TextP'
// import { StateDropdown } from '../../../../components/dataComponents/StateDropdown'
import DataTable2 from '../../../../components/datatable/DataTable2'
import { getFolioExcessPropertyExternalList 
    } from '../../../../services/folioTracking/folioTrackingService'
import { useNavigate } from "react-router-dom";
import PopupModel from '../../../../components/popups/PopupModel'
import PopupContentErrorMessage from '../../../../components/popups/PopupContentErrorMessage'
// import {ExcelFile, ExcelSheet} from "react-export-excel";
// import ReactExport from "react-export-excel";
// import XLSX from 'xlsx';
import RoutesConstants from './../../../../resources/route-constants';
import {getLoginUser} from '../../../../store/authReducer' 
import {useAppSelector} from '../../../../store/hooks'
import { useAppDispatch } from '../../../../store/hooks'
import { setLoader } from '../../../../store/loaderReducer'



const config:any = {
    gridColumns : [
        {'label': 'FOLIO', 'key' : 'folioCd', 'type' : 'text' },
        {'label': 'DIRECCIÓN', 'key' : 'direction', 'type' : 'text'},
        {'label': 'FECHA', 'key' : 'date', 'type' : 'text'},
        {'label': 'ESTATUS', 'key' : 'statuss', 'type' : 'text'},
        // {'label': 'DIRECCION', 'key' : 'addressDs', 'type' : 'cellRenderer', 'cellRenderer': eventButton},
        {'label': '', 'key' : '', 'type' : 'rowClick'},
    ]
}


export const External: React.FC = () => {
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [modalErrorIsOpen, setModalErrorIsOpen] = React.useState(false);

    const loginUser = useAppSelector(getLoginUser);
   

    const [tableRows, setTableRows] = useState<any>([])
    const [tableTotalRows] = useState(0)



   
    
    const getTableRows = () => {
        let searchParams:any = {}
        dispatch(setLoader(true));

        searchParams.userType= 'externo'
        // searchParams.userId =  loginUser.userId
       // searchParams.userId = 121024;
        
        getFolioExcessPropertyExternalList(searchParams).then((response:any) => {
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
    
   

    useEffect(() => {
        //getTableTotalRows()
        
        // if( loginUser.userId)
            getTableRows()
    }, [])

    useEffect(() => {
        // if( loginUser.userId)
          //  getTableRows()
    }, [loginUser])

   
    
    function handleModelClose(){
        setModalErrorIsOpen(false)
    }
    
    
   
    
    const handleClickRow = (item:any) => {
        navigate(RoutesConstants.ExcessPropertyDetail, {state: item})

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
                            <MainTitle text={"Folios de Excess Property"} />
                        </div>
                        <div className="page-desc-wrapper">
                            <TextP >En esta sección podrá ver todos sus folios con los datos clave de cada solicitud y así dar seguimiento a los mismos. Seleccione los tres puntos que se encuentra a la derecha del status para ver más información del mismo.</TextP>
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
  