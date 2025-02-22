import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {  getLcFolioDetail } from '../../../../services/folioTracking/folioTrackingService'

import { FolioLcPremisesDetail } from './FolioLcPremisesDetail';
import {FolioLcEventDetail } from './FolioLcEventDetail';
import PopupModel from '../../../../components/popups/PopupModel'
import PopupContentErrorMessage from '../../../../components/popups/PopupContentErrorMessage'




export const FolioLcDetail: React.FC = () => {
 const location = useLocation()

    const [params, setParams] = useState<any>()
    const [modalErrorIsOpen, setModalErrorIsOpen] = React.useState(false);
    const [lcData, setLcData] = useState<any>()
    const [paramStatus, setParamStatus] = useState<any>()
   
    


    const checkRequiredParams = () => {
        let status = true
        if (location.hasOwnProperty('state')) {
            if (!location.state)
                status = false
            else {
                setParams(location.state)
                setLcData(location.state)
                
            }

        }

        if (!status) {
            console.log('Error, Params not send ')
        }

        setParamStatus(status)
    }

    function handleModelClose(){
        setModalErrorIsOpen(false)
    }
   

    const getFolioDetails = () => {
        
        getLcFolioDetail(params.folio).then((response:any) => {
            if(response.data.length > 0){
                setLcData(response.data[0])
            }else {
                
            }
        })
        .catch((error:any) => {
            console.log('getStateList error', error)
            setModalErrorIsOpen(true)
        })

    }

   



    useEffect(() => {
        checkRequiredParams()


    }, [])

    useEffect(() => {
        if(params)
            getFolioDetails()
    }, [params])

    //const paramStatus = checkRequiredParams()

    if (!paramStatus) {
        return (
            <>Not Found</>
        )
    }

    
const isEventRequest = () => {
    //alert(params.isLocal)
    if(params.isLocal == "NO")
        return true
    else
        return false
}
 


return (
    <>
   { isEventRequest() && 
    (
    <FolioLcEventDetail lcData={lcData} /> 
    )
   }
   { !isEventRequest() && 
    (
    <FolioLcPremisesDetail lcData={lcData} /> 
    )
   }
    <PopupModel  isOpen={modalErrorIsOpen} closePopup={() => handleModelClose()} width='40%' height='250px'>
                <PopupContentErrorMessage  closePopup={() => handleModelClose()} />
            </PopupModel>
    </>
)
  }
