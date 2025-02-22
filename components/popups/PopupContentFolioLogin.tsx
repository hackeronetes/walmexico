import React, {useState} from "react"
import { MainTitle } from "../common/Titles"
import { getDomainFromEmail } from '../../utility/commonFunctions';
import { allowdDomains, b2cLoginUrl } from '../../resources/project-constants';
import authService from '../../authentication/authService'
import PopupModel from "./PopupModel";
import PopupResetPass from "./PopupResetPassword";



// 

const PopupContentFolioLogin: React.FC<any> = (props) => {

    const {loginDb} = authService()

    const [modalResetIsOpen, setModalResetIsOpen] = React.useState(false);

    //const defaultError = "Something went wrong"
    //const message = props.message ? props.message : defaultError
  
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const isEmailDomainAllowed = () => {
        let domain = getDomainFromEmail(username)

        if(domain && allowdDomains.indexOf(domain) > -1 )
        {
            return true
        }
        return false
        
    }

    const navigateToB2c = () => {
        window.location.assign(b2cLoginUrl)
    }

    const loginFromDb = () => {
      loginDb(username, password);
    }

   

    const handleExternalUserLogin = () => {

      if(!isEmailDomainAllowed())
      {
          //loginUsername()
         // props.setShowLogin(false)
          loginFromDb()
          props.closePopup()

          //alert('loginDb result' +  result)
        
      }
      else
      {
          navigateToB2c();
      }

      
     

  };

  const handleClosePopup = () => {
    setModalResetIsOpen(false)
    props.closePopup()
  }

//   const getSelectedFolioLabel = () => {
    
//   }


    return (
        
       
              <div className=''>
                <div className='row m-0'>
                    <div className='col s12'>
                        <MainTitle text={"Seguimiento de folio - " + props.selectedFolio} className="" />
                    </div>
                </div>
                <div className='row m-0 mb-20'>
                    <div className='col s12 text-center'>
                    Para dar seguimiento a sus folios , por favor ingrese la información requerida.
                    </div>
                </div>
                 <div className="login-form">
                      <div className="">
                        <label className={'input-label'} >
                            Correo electrónico
                        </label>
                      </div>
                      <div className="mb-10">
                          <input  type="text" onChange={(e:any) => setUsername(e.target.value) } />
                      </div>
                      <div className="">
                        <label className={'input-label'} >
                         Contraseña
                        </label>
                      </div>
                      <div>
                      <input style={{margin: 0}} type="password" onChange={(e:any) => setPassword(e.target.value) } />
                      </div>
                      <button style={{margin: '10px auto', backgroundColor: '#fdbb30', color: 'white'}} type='button' className='login-button' onClick={handleExternalUserLogin}>Iniciar sesión</button>
                      <button style={{margin: '10px auto', backgroundColor: '#fdbb30', color: 'white'}} type='button' className='login-button-enter-via-gmail' onClick={()=>navigateToB2c()}>Ingresa a través de Gmail</button>
                      <span className='folio-login-reset-pass-link' onClick={()=>setModalResetIsOpen(true)}>¿Olvidaste tu contraseña?</span>
                  </div>

                <PopupModel  isOpen={modalResetIsOpen} closePopup={() => setModalResetIsOpen(false)} width='40%' height='500px'>
                    <PopupResetPass  closePopup={() => handleClosePopup()} setModalLoginIsOpen={modalResetIsOpen}/>
                </PopupModel>
                
              </div>





       
         
                                        
    )
}


export default PopupContentFolioLogin