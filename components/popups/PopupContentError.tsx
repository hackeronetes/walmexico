import React, {} from "react"
import { MainTitle } from "../common/Titles"



interface Props {
  closePopup: any
}

// 

const PopupContentError: React.FC<Props> = (props) => {

    
  
    return (
        
        <>
              <div className='row m-0'>
                <div className='col s12'>
                  <MainTitle text={"Error"} className="success" />
                </div>
              </div>
              <div className='row m-0'>
                <div className='col s12 text-center'>
                  Ningún municipio para el estado seleccionado
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


export default PopupContentError