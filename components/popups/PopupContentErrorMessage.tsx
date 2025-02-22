import React, {} from "react"
import Image from "../common/Image"



interface Props {
  closePopup: any
  message?: String
}

// 

const PopupContentErrorMessage: React.FC<Props> = (props) => {

    const defaultError = "Something went wrong"
    const message = props.message ? props.message : defaultError
  
    return (
        
        <>
              <div className='row m-0'>
                <div className='col s12 text-center'>
                  <Image name="alert-error.png" />
                </div>
              </div>
              <div className='row m-0'>
                <div className='col s12 text-center'>
                {message}
                </div>
              </div>
              
              
              <div className='row m-0'>
                <div className='col offset-s4 s4'>
                  <button type="button" className="submit-btn full-width" value="Close" onClick={props.closePopup} >
                    Enterado
                  </button>
                </div>
              </div>





           
        </>
         
                                        
    )
}


export default PopupContentErrorMessage