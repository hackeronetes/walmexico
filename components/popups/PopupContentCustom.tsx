import React, {} from "react"
import Image from "../common/Image"


interface Props {
  closePopup: any
  type: 'success' | 'error'
  message?: String
}

// 
const TYPE_SUCCESS = 'success'
const TYPE_ERROR = 'error'

const PopupContentCustom: React.FC<Props> = (props) => {

  
  let errorMessage = ' Please try again later'
  let message = props.message  ? props.message  : props.type == TYPE_SUCCESS ? '' : errorMessage
    
  const getHeader = () => {
    if(props.type == TYPE_SUCCESS)
    {
      return (
        // <MainTitle text={"Exito"} className="success" />
        <Image name="alert-success.png" />
      )
    }
    if(props.type == TYPE_ERROR)
    {
      return (
      <Image name="alert-error.png" />
      //  <MainTitle text={"ERROR"} className="error" />
      )
    }
   
  }

  // const getImage = () => {
  //   if(props.type == TYPE_SUCCESS)
  //   {
  //     return (
          
  //     )
  //   }
    
  // }
 
  
  
    return (
        
        <>
              <div className='row m-0'>
                <div className='col s12 text-center'>
                  {getHeader()}
                </div>
              </div>
              <div className='row m-0'>
                <div className='col s12 text-center'>
                  {message}
                </div>
              </div>
              
              
              <div className='row m-0'>
                <div className='col offset-m3 s12 m6 '>
                  <button type="button" className="submit-btn full-width" value="Close" onClick={props.closePopup} >
                    Enterado
                  </button>
                </div>
              </div>





           
        </>
         
                                        
    )
}


export default PopupContentCustom