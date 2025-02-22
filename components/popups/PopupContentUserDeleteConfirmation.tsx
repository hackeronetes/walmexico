import React, {} from "react"
import { MainTitle } from "../common/Titles"
import Image from "../common/Image"
import { SecondryButton } from "../common/Buttons"



interface Props {
  closePopup: any
}

// 

const PopupContentUserDeleteConfirmation: React.FC<Props> = (props) => {

    const handleClose = (action: Number) => {
      props.closePopup(action)
    }
  
    return (
        
        <>
              <div className='row m-0'>
                <div className='col s12 text-center'>
                  <Image name="alert-error.png" />
                  <MainTitle text={"Un momento..."} className="popup-title error-text" />
                </div>
              </div>
              <div className='row m-0'>
                <div className='col s12 text-center error-text'>
                ¿Seguro de eliminar esta registro?
                </div>
              </div>
              
              
              <div className='row m-0'>
                <div className='col  s6 '>
                  <SecondryButton onClick={() => handleClose(0)} className='submit-btn'>No</SecondryButton>
                  </div>
                  <div className='col  s6 '>
                  <button type="button" className="submit-btn full-width" value="Close" onClick={() => handleClose(1)} >
                    Si  
                  </button>
                </div>
              </div>





           
        </>
         
                                        
    )
}


export default PopupContentUserDeleteConfirmation