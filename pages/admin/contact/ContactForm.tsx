import React, {useState, useEffect  } from 'react'

import FolioTracking from '../../../components/common/FolioTracking'
import {MainTitle} from '../../../components/common/Titles'
// import { postContactsEditApi } from '../../services/adminGeneral/adminGeneralService'
import { useLocation } from 'react-router-dom'
import { SecondryButton } from '../../../components/common/Buttons'
import { postContactForm } from './../../../services/adminGeneral/adminGeneralService'
import { useNavigate } from 'react-router-dom'
import RoutesConstants from '../../../resources/route-constants'
import { PrimaryButton } from './../../../components/common/Buttons';


export const ContactForm: React.FC = () => {

  const location = useLocation()
  const navigate = useNavigate();
 
  const [contact, setContact] = useState<any>()
  const [paramStatus, setParamStatus] = useState<any>()
  const [email, setEmail] = useState('');
  const [section, setSection] = useState('');

 
  const checkRequiredParams = () => {
    let status = true
    if(location.hasOwnProperty('state'))
    {
        if(!location.state)
            status = false
        else
        {
            
            setContact(location.state)
            setEmail(location.state.mail)
            setSection(location.state.section)
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
    
},[])

if(!paramStatus)
{
    return (
        <>Not Found</>
    )
}


  const postForm = () => { 

    let data:any = {
        id: contact.id,
        section: section,
        mail: email,
        active: contact.active
    }
    postContactForm(data).then(() => {
           navigate(RoutesConstants.ContactIndex)
      })
      .catch((error:any) => {
          //alert('Something went wrong')
          //setSelectStateOptions([])
              
          console.log('getStateList error', error)
      })
  } 





const handleSubmitClick = () => {
   postForm()
}

const handleCancelClick = () => {
    navigate(RoutesConstants.ContactIndex)
}


  return (
    <div className='page-container page-suppliers'>
      <FolioTracking />
      
      <div className='container main-container  mb-20'>
          <div className='page-content'>
              <section>
                  <div className="title-wrapper  mb-20">
                      <MainTitle text='Contact Assignment' />
                  </div>
                  
              </section>

              <section>
                  <div className="form-input">
                        <div className="row">
                            <div className="col s6">
                                <div className="">
                                    <label  className="input-lable" >
                                        Correo electrónico
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    className="input-text"
                                    onChange={(e:any) => setEmail(e.target.value) } value={email}
                                />
                            </div>
                            <div className="col s6">
                                <div className="">
                                    <label  className="input-lable" >
                                        Sección
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    className="input-text"
                                    onChange={(e:any) => setSection(e.target.value) } value={section}
                                />

                            </div>
                           
                        </div>
                        
                       
                    </div>
                    

                  <div className='row'>
                    <div className='col offset-s2 s4'>
                        <SecondryButton onClick={handleCancelClick} className='submit-btn'>Regresar</SecondryButton>
                    </div>
                    <div className='col s4'>
                        <PrimaryButton 
                            className='submit-btn'
                            onClick={handleSubmitClick}
                        >
                            Enviar
                        </PrimaryButton>
                    </div>
                </div>

              </section>
              
              
          </div>
      </div>


    </div>
  )
}
