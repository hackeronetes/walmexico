import React, { useState } from 'react'
import Image from './Image';
import { css } from 'goober';
import { getLoginStatus, getLoginAccess} from '../../store/authReducer'
import { useNavigate } from 'react-router-dom'
import RoutesConstants from './../../resources/route-constants';
import {useAppSelector} from '../../store/hooks'
import PopupModel from '../popups/PopupModel'
import PopupContentFolioLogin from '../popups/PopupContentFolioLogin'

const SearchBtn = css`
    background: transparent;
    border: none;
`



const FolioTracking: React.FC = () => {

    const navigate = useNavigate()

    const loginStatus = useAppSelector(getLoginStatus);
    const userAccess = useAppSelector(getLoginAccess);

    const [modalLoginIsOpen, setModalLoginIsOpen] = React.useState(false);
    const [value, setValue] = useState<any>('');

    const handlechange = (e:any) => {
        setValue(e.target.value);
    }

    function handleModelClose(){
        setModalLoginIsOpen(false)
    }

    const getPathFromValue = () => {

        let path = ''
        switch(value)
        {
            case "1":
                path =  RoutesConstants.FolioLocalCommercial;
                break;
            case "2":
                path =  RoutesConstants.FolioExcessProperty;
                break;
            case "3":
                path =  RoutesConstants.FolioLand;
                break;
            case "4":
                path =  RoutesConstants.FolioSupplier;
                break;
        }

        return path
    }

    const hasAccess = () => {
        let tempPath = getPathFromValue()
        let accesspath = tempPath.substring(1)
        
        if(userAccess.findIndex((x:any) => x.url === accesspath) > -1)
          return true
        else
          return false

    }

    
    
    const navigateFolio = () => {
        navigate(getPathFromValue())
       
    }

    const goToFolio = () => {
        if(loginStatus)
        {
            if(hasAccess())
                navigateFolio()  
            else    
                navigate('/')
        }
        else
        {
            setModalLoginIsOpen(true)
        }
    }

    const getSelectedFolioLabel = () => {
        let label = ''
        switch(value)
        {
            case "1":
                label =  'Locales Comerciales';
                break;
            case "2":
                label =  'Excess Property';
                break;
            case "3":
                label = 'Terrenos';
                break;
            case "4":
                label = 'Proveedores'
                break;
        }

        return label;
    }



    return (
        <div className="folio-tracking-container">
            <span>Seguimiento de folios</span>
            <select className='folio-tracking-select' value={value} onChange={handlechange}>
                <option value="">Seleccione</option>
                <option value="1">Locales Comerciales</option>
                <option value="2">Excess Property</option>
                <option value="3">Terrenos</option>
                <option value="4">Proveedores</option>
            </select>
            <button type="button" className={SearchBtn} onClick={goToFolio} >
                <Image name="search_btn.png" />
            </button>

            <PopupModel  isOpen={modalLoginIsOpen} closePopup={() => handleModelClose()} width='40%' height='500px'>
                <PopupContentFolioLogin selectedFolio={getSelectedFolioLabel()}  closePopup={() => handleModelClose()} />
            </PopupModel>

        </div>
    )
}

export default FolioTracking