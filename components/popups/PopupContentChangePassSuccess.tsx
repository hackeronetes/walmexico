import React, {} from "react"
import Image from "../common/Image"


interface Props {
  closePopup: any
}


const PopupContentChangePassSuccess: React.FC<Props> = (props) => {

  
 
    
  const getHeader = () => {
    return (
      // <MainTitle text={"Exito"} className="success" />
      <Image name="alert-success.png" />
    )
   
  }

  
  
    return (
        
        <div className="change-pass-success-container">
              <div className='row m-0'>
                <div className='col s12 text-center'>
                  {getHeader()}
                </div>
              </div>
              <div className='row m-0'>
                <div className='col s12 text-center'>
                  <h5>¡El cambio de tu contraseña ha sido exitoso!</h5>
                  <p>Por motivos de seguridad cerraremos tu sesión, por favor vuelve a ingresar con tu nueva contraseña.</p>
                </div>
              </div>
              
              
              <div className='row m-0'>
                <div className='col offset-m3 s12 m6 '>
                  <button type="button" className="submit-btn full-width" value="Close" onClick={props.closePopup} >
                    Aceptar
                  </button>
                </div>
              </div>





           
        </div>
         
                                        
    )
}


export default PopupContentChangePassSuccess