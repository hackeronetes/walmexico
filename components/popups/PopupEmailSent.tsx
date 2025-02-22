import React, {} from "react"

const EmailConfirmationPopup: React.FC<any> = (props) => {

    const handelOkClick = async()=>{
        props.closePopup();
    }
    return (
        
       
              <div>
                <div className='row m-0'>
                    <div className='col s12 text-center'>
                        {props?.content}
                    </div>
                </div>
                 <div className="login-form">
                      <button style={{display: 'flex', width: '40%', justifyContent: 'center'}} type='button' className='login-button' onClick={handelOkClick}>OK</button>
                  </div>
                
              </div>
                                    
    )
}


export default EmailConfirmationPopup;