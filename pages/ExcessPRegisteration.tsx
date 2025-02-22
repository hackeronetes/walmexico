import React, {    } from 'react'
import {MainTitle} from '../components/common/Titles'
import {TextP} from '../components/common/TextP'
import {useNavigate, useLocation} from "react-router-dom"
import RoutesConstants from '../resources/route-constants'


export const ExcessPRegisteration: React.FC = () => {

   
    const location = useLocation();
    const navigate = useNavigate();
    
    let selectedStore:any = {}

    const checkRequiredParams = () => {
        let status = true
        
        if(location.hasOwnProperty('state'))
        {
            if(!location.state)
                status = false
            else
                selectedStore = location.state

            
        }


        return status
    }

    const paramStatus = checkRequiredParams()

    if(!paramStatus)
    {
        return (
            <>Not Found</>
        )
    }


    function handleChange(type:string){
        if(type === "naturalPerson")
            navigate(RoutesConstants.NaturalPerson, {state: selectedStore})
        else
            navigate(RoutesConstants.LegalEntity, {state: selectedStore})

    }


    return (
        <div className='page-container'>
           
            <div className='container main-container'>
                <div className='page-content'>
                    <div className='desc-container'>
                        <div className="title-wrapper">
                            <MainTitle text={"Excess Property - Registro"} />
                        </div>
                        <div className="page-desc-wrapper">
                            <div className='row'>
                                <div className='col s12 text-left'>
                                    <TextP>Indique sus datos para poder considerarlo como posible comprador o arrendatario de un area en una tienda.</TextP>
                                </div>
                               
                            </div>
                           
                        </div>

                       

                        <div className='map-select-container'>
                            <div className='row'>
                                <div className='col s6'>
                                    
                                        <div className="input-select-react-wrapper text-center">
                                            <label htmlFor='naturalPerson' className="input-label">
                                                <input
                                                    type="radio"
                                                    value="naturalPerson"
                                                    id="naturalPerson"
                                                    name="registrationType"
                                                    onChange={() => handleChange("naturalPerson")}
                                                />
                                                Persona Física
                                            </label>
                                        </div>
                                </div>
                                <div className='col s6 '>
                                        <div className="input-select-react-wrapper text-center">
                                            <label htmlFor='legal' className="input-label">
                                                <input
                                                    type="radio"
                                                    value="legal"
                                                    id="legal"
                                                    name="registrationType"
                                                    onChange={() => handleChange("legal")}
                                                />
                                                Persona Moral
                                            </label>
                                           
                                        </div>
                                        
                                        
                                    
                                </div>
                               
                            </div>
                        </div>

                        
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
  }
  