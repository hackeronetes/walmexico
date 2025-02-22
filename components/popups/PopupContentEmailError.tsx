import React, {} from "react"
import { MainTitle } from "../common/Titles"
import { PrimaryButton } from "../common/Buttons"



interface Props {
  errorType: any
  closePopup: any
  closePopupWithReset: any
}

// 

const PopupContentEmailError: React.FC<Props> = (props) => {

  
    
  const goToResetPass = () => {
      // navigate(RoutesConstants.ResetPass)
      props.closePopupWithReset()
  }

  const getMessage = () => {
    let message = ''
    if(props.errorType == 2 )
    {
      message = 'Please reset  the password'
    }
    else{
      message = 'Favor de verificar el correo y la contraseña.'
    }
    return message
  }
  
    return (

        
        <>
              <div className='row m-0'>
                <div className='col s12'>
                  <MainTitle text={"Error"} className="success" />
                </div>
              </div>
              <div className='row m-0'>
                <div className='col s12 text-center'>
                  {getMessage()}
                </div>
              </div>
              <div className='row m-0'>
                <div className='col offset-m4 s12 m4'>
                  {props.errorType == 2 && (
                    <PrimaryButton onClick={goToResetPass}>Reset Password</PrimaryButton>
                  )}
                </div>
              </div>
              
              
              <div className='row m-0'>
                <div className='col offset-s4 s4'>
                  <button type="button" className="submit-btn full-width" value="Close" onClick={props.closePopup} >
                    Close
                    </button>
                </div>
              </div>





           
        </>
         
                                        
    )
}


export default PopupContentEmailError