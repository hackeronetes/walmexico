import React, {} from "react"
import { MainTitle } from "../common/Titles"
import Image from "../common/Image"



interface Props {
  closePopup: any
  type: any
}

// 


const PopupContentDeterminantError: React.FC<Props> = (props) => {

    
  
    return (
        
        <>
              <div className='row m-0'>
                <div className='col s12 text-center'>
                  <Image name="alert-error.png" />
                  <MainTitle text={"Validación determinante"} className="popup-title" />
                </div>
              </div>
              <div className='row m-0'>
                <div className='col s12 text-center'>
                  { props.type == 'DETERMINANT_EMPTY' ? 'Favor de capturar una determinante valida.' : 'La determinante no existe, favor de validar la referencia ' }
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


export default PopupContentDeterminantError