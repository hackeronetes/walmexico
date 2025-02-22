import React, { useState, useEffect } from 'react'
//import Select from 'react-select'
import { useLocation } from 'react-router-dom'

//import FolioSupplierDetailConstruction from './FolioSupplierDetailConstruction'
import {FolioSupplierDetailMaterial} from './FolioSupplierDetailMaterial'
import {FolioSupplierDetailConstruction} from './FolioSupplierDetailConstruction'




export const FolioSupplierDetail: React.FC = () => {

    const location = useLocation()

    
    const [paramStatus, setParamStatus] = useState<any>()
    const [folio, setFolio] = useState<any>()
    const [pageType, setPageType] = useState<any>()
   
    
   
    
    const checkRequiredParams = () => {
        let status = true
        if(location.hasOwnProperty('state'))
        {
            if(!location.state)
                status = false
            else
            {
                if(location.state.folio)
                {
                    setFolio(location.state.folio)
                    setPageType(location.state.folio.form)
                }
                //setActiveToggle(location.state.activeCd)
                
            }
                
        }

        if(!status)
        {
            console.log('Error, Params not send ')
        }

        setParamStatus(status)
    }


    
  
    useEffect(() => {
        checkRequiredParams()

        

    }, [])

    const isConstruction = () => {
        //alert(params.isLocal)
        if(pageType == 1)
            return true
        else
            return false
    }
    
    //const paramStatus = checkRequiredParams()
    
    if(!paramStatus)
    {
        return (
            <>Not Found</>
        )
    }

    
    
    
    
    return (
        <>
       { isConstruction() && 
        (
        <FolioSupplierDetailConstruction folio={folio} /> 
      
        )
       }
       { !isConstruction() && 
        (
        <FolioSupplierDetailMaterial folio={folio} /> 
       // <div>Meterial</div>
      
        )
       }
    
        </>
    )

  }
  