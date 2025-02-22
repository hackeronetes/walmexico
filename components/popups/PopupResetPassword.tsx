import React, {useState} from "react"
import { MainTitle } from "../common/Titles"
import {resetPassURL} from "../../resources/api-constants"
import PopupModel from '../popups/PopupModel';
import EmailConfirmationPopup from "./PopupEmailSent";
// import { env } from "../../resources/project-constants";
import CustomAxios2 from "../../utility/CustomAxios2";


const PopupResetPass: React.FC<any> = (props) => {
  
    const [userName, setUserName] = useState('');
    const [modalErrorIsOpen, setErrorIsOpen] = React.useState(false);
    const [modalInvalidPopupIsOpen, setmodalInvalidPopupIsOpen] = useState(false);


    const handelEnviarClick = async()=>{
        const url: string = resetPassURL(userName);
        CustomAxios2.post(url,
            {
                headers:{
                    'Content-Type': 'application/json'
                }
            }
            ).then((response:any) => {
               
            if(response.data && response.responseStatus.code === 200){
                setErrorIsOpen(true);
            }
            else if(response.data && response.responseStatus.code === 500){
                setmodalInvalidPopupIsOpen(true);
                //error popup there will be a description in the data.responseStatus.description 
                // show same description in the popup.
            }
        })
        .catch(error=>{
            console.log(error);
        });
    }

    function handleModelErrorClose(){
        setErrorIsOpen(false);
        props.closePopup(false);
    }

    function handelInvalidEmailPopup(){
        setmodalInvalidPopupIsOpen(false);
    }
    return (
        
       
              <div className=''>
                <div className='row m-0'>
                    <div className='col s12'>
                        <MainTitle text={"Recuperación de contraseña"} className="" />
                    </div>
                </div>
                <div className='row m-0'>
                    <div className='col s12 text-center'>
                        Para recuperar su contraseña, por favor ingrese su correo electrónico
                    </div>
                </div>
                 <div className="login-form">
                 <div className='row m-0'>
                    <div className="col s4">
                        <div className='login-labels'>Correo electrónico</div>
                        <div className="">
                            <label className={'input-label'} >
                                Correo electrónico
                            </label>
                        </div>
                    </div>
                    <div className="col s8">
                        <input type="text" onChange={(e:any) => setUserName(e.target.value) } />
                    </div>
                 </div>
                      <button style={{display: 'flex', width: '40%', justifyContent: 'center'}} type='button' className='login-button' onClick={handelEnviarClick}>Enviar</button>
                      {/* <a onClick={() => { walmartUserHandler() }} className='walmart-user'>¿Eres empleado Walmart?</a> */}
                  </div>
                
                  <PopupModel  isOpen={modalErrorIsOpen} closePopup={handleModelErrorClose} height='350px' width='40%'>
                        <EmailConfirmationPopup closePopup={handleModelErrorClose} content={'Email sent successfully please check your inbox..'}/>
                  </PopupModel>

                  <PopupModel  isOpen={modalInvalidPopupIsOpen} closePopup={handelInvalidEmailPopup} height='350px' width='40%'>
                        <EmailConfirmationPopup closePopup={handelInvalidEmailPopup} content={'Invalid email entered please enter valid email'}/>
                  </PopupModel>
              </div>
                                    
    )
}


export default PopupResetPass;