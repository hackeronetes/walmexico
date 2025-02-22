import React, {} from "react"
import { MainTitle } from "../common/Titles"
import Image from "../common/Image"



interface Props {
  closePopup: any
  extension: string
}

// 

const PopupContentFileError: React.FC<Props> = (props) => {

    
  
    return (
        
        <>
              <div className='row m-0'>
                <div className='col s12 text-center'>
                  <Image name="alert-error.png" />
                  <MainTitle text={"Carga de archivo"} className="popup-title" />
                </div>
              </div>
              <div className='row m-0'>
                <div className='col s12 text-center'>
                  No puede seleccionar un archivo de extensión {props.extension}. Intente nuevamente...
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


export default PopupContentFileError