import React, {useState} from "react"
import { MainTitle } from "../common/Titles"
import { changePassword } from "../../resources/api-constants"
import PopupModel from "./PopupModel"
import EmailConfirmationPopup from "./PopupEmailSent"
import { useAppSelector } from "../../store/hooks";
import { getLoginUser } from "../../store/authReducer"
import PopupContentCustom from "../popups/PopupContentCustom";
import { POPUP_TYPE_ERROR} from '../../resources/project-constants';
import CustomAxios from "../../utility/customAxios";


const PopupChangePassword: React.FC<any> = (props) => {
    const loginUser = useAppSelector(getLoginUser);
    

    const [modelOpen, setModelOpen] = useState(false);
    const [popupType, setPopupType] = useState<any>('')
    const [errorMessage, setErrorMessage] = useState('');

    const [actualPSD, setactualPSD] = useState('')
    const [newPSD, setnewPSD] = useState('')
    const [confirmNewPSD, setConfirmNewPSD] = useState('')
    const [modalInvalidPopupIsOpen, setmodalInvalidPopupIsOpen] = useState(false);
    
    

    function openModel(type:any){
        setPopupType(type)
        setModelOpen(true)
       
    }

    function handleModelClose(){
        setModelOpen(false)
    }

    const updatePassword = async() => {

        const params = JSON.stringify({
            id: loginUser.accountId,
            psd:newPSD
        })       
        CustomAxios.post(changePassword(), 
            params,
            {
                 headers: {
                        'Content-Type': 'application/json'
                    },
            }
        ).then((response:any) => {
            if(response.data && response.status === 200){
                    props.closePopupSuccess()
                }
                else if(response.data && response.status === 500){
                    
                    openModel(POPUP_TYPE_ERROR)
                }
            })
            .catch(error=>{
                   console.log(error);
                   openModel(POPUP_TYPE_ERROR)
            });
        
    }

   

    const handleChangePsd = async() => {
        // check what is the use of actualPSD we added in the codition so that 
        // it should not be null before hiting endpoint.
        setErrorMessage('')
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,15}$/;
        if (regex.test(newPSD)) {
            if(newPSD === confirmNewPSD && actualPSD){
                updatePassword();
            }
            else {
                setErrorMessage('Las contraseñas no coinciden. Favor de verifica')
                openModel(POPUP_TYPE_ERROR)
            }
        } else {
            setErrorMessage('Longitud mínima de 7 caracteres y máxima de 15. Debe incluir al menos un número, mayúscula, minúscula y caracter especial ($@¡%*?&).')
            openModel(POPUP_TYPE_ERROR)
            return;
        }
        

        
    };

    const handelInvalidEmailToken = ()=>{
        setmodalInvalidPopupIsOpen(false);
    };

   


    return (
              <div className=''>
                <div className='row m-0'>
                    <div className='col s12'>
                        <MainTitle text={"Cambio de Contraseña"} className="" />
                    </div>
                </div>
                <div className='row m-0'>
                    <div className='col s12 text-center'>
                        Para cambiar su contraseña, por favor ingrese los siguientes datos:
                    </div>
                </div>
                 <div className="login-form">
                 <div className='row m-0'>
                    <div className="col s4">
                        <div className='login-labels'>Correo electrónico</div>
                        <div className="">
                            <label className={'input-label'} >
                                Contraseña actual
                            </label>
                        </div>
                    </div>
                    <div className="col s8">
                        <input type="text" onChange={(e:any) => setactualPSD(e.target.value) } />
                    </div>
                 </div>
                 <div className='row m-0'>
                    <div className="col s4">
                        <div className='login-labels'>Correo electrónico</div>
                        <label className={'input-label'} >
                            Contraseña nueva
                        </label>
                    </div>
                    <div className="col s8">
                      <input type="password" onChange={(e:any) => setnewPSD(e.target.value) } />
                    </div>
                 </div>
                 <div className='row m-0'>
                    <div className="col s4">
                        <div className='login-labels'>Correo electrónico</div>
                        <label className={'input-label'} >
                            Confirmar contraseña
                        </label>
                    </div>
                    <div className="col s8">
                      <input type="password" onChange={(e:any) => setConfirmNewPSD(e.target.value) } />
                    </div>
                 </div>
                      {/* <div style={{ color: 'white' }}>¿Olvidaste tu contraseña?</div> */}
                      <button style={{display: 'flex', width: '40%', justifyContent: 'center'}} type='button' className='login-button' onClick={handleChangePsd}>Combiar</button>
                  </div>

                <PopupModel  isOpen={modalInvalidPopupIsOpen} closePopup={handelInvalidEmailToken} height='350px' width='40%'>
                    <EmailConfirmationPopup closePopup={handelInvalidEmailToken} content={'Invalid Password details added.'}/>
                </PopupModel>

                {/* <PopupModel  isOpen={modalSuccessPsdChange} closePopup={handelSuccessPsdChange} height='350px' width='40%'>
                    <EmailConfirmationPopup closePopup={handelSuccessPsdChange} content={'Passwod changed successfully please login again.'}/>
                </PopupModel> */}
                <PopupModel  isOpen={modelOpen} closePopup={handleModelClose} height='260px' width='30%'>
                    <PopupContentCustom closePopup={handleModelClose} type={popupType} message={errorMessage} />
                </PopupModel>
                
                
              </div>
                                    
    )
}


export default PopupChangePassword
