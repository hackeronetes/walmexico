import React, {useEffect, useState} from "react";
import './styles.css';
import { validateResetPassToken, resetPassWtihToken } from "../../resources/api-constants";
import PopupModel from '../popups/PopupModel';
import EmailConfirmationPopup from "../popups/PopupEmailSent";
import PopupContentCustom from "../popups/PopupContentCustom";
import {POPUP_TYPE_SUCCESS, POPUP_TYPE_ERROR} from '../../resources/project-constants'
import { useNavigate } from "react-router-dom";
import CustomAxios2 from "../../utility/CustomAxios2";

const ResetPasswordContent: React.FC = () => {

    const navigate = useNavigate();

    // const [modalInvalidPopupIsOpen, setmodalInvalidPopupIsOpen] = useState('');
    const [modelOpen, setModelOpen] = useState(false);
    const [popupType, setPopupType] = useState<any>('')
    const [modalWrongPsdChange, setmodalWrongPsdChange] = useState(false);
    const inputStyle = {
        border: '1px solid black',
        padding: 0,
        margin: 0,
        height: '22px',
        borderRadius: '2px'
    }

    const paragraphStyle = {
        margin: 0
    }

    const alignBtnInCenter = {
        display: 'flex'
    }

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfimPass] = useState('');
    const [resetPsdToken, setResetPsdToken] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    function openModel(type:any){
        setPopupType(type)
        setModelOpen(true)
       
    }

    const validateToken = async(token: string)=>{
        const validateTokenURL = validateResetPassToken(token);
        CustomAxios2.get(validateTokenURL,
        {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        )
        .then((response:any) => {
            if(response.data && response.responseStatus.code === 200){
                // success popup
                // get the email details from the response and add this details to the resetpass page.
                if(response.data.message === "Invalid Token"){
                    //error popupp and then redirect to base url
                    //setmodalInvalidPopupIsOpen('Invalid access token redirecting to landing page.');
                    openModel(POPUP_TYPE_ERROR);
                }else{
                    setEmail(response.data.email);  
                }
            }
            else if(response.data && response.data.responseStatus.code === 500){
                //error popup and then rederit it to base portal.
                openModel(POPUP_TYPE_ERROR);
                // window.location.assign(portalBaseURL());
            }
        })
        .catch(error=>{
            console.log(error);
        });
    };

    useEffect(()=>{
        const Url = new URL(window.location.href);
        const urlParams = new URLSearchParams(Url.search);
        const resetToken = urlParams.get('token');
        setResetPsdToken(resetToken||'');
        validateToken(resetToken||'');
    },[]);

    const hitResetPassEndpoint = async()=>{
      
        const params = JSON.stringify({
            token: resetPsdToken,
            psd:pass
        })   
        CustomAxios2.post(resetPassWtihToken(), 
            params,
            {
                 headers: {
                        'Content-Type': 'application/json'
                    },
            }
        )
       
        .then((response:any) => {
            if(response.data && response.responseStatus.code === 200){
                openModel(POPUP_TYPE_SUCCESS);
            }
            else if(response.data && response.responseStatus.code === 500){
                //error popup
                openModel(POPUP_TYPE_ERROR);
                
                //window.location.assign(portalBaseURL());
            }
        })
        .catch(error=>{
            console.log(error);
        });
    }

    const  handelResetPassword = ()=>{
        // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@;%*78])[a-zA-Z\d$@;%*78]{7,15}$/;
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,15}$/;
        setErrorMessage('')
        if (regex.test(pass)) {
            
            if(pass === confirmPass){
                hitResetPassEndpoint();
            }
            else {
                setErrorMessage('Las contraseñas no coinciden. Favor de verifica')
            }
        } else {
            
            setmodalWrongPsdChange(true);
            return;
        }
        
    }

    function handleModelClose(){
        
        setModelOpen(false)
        navigate('/')
    }

    

    function handelWrongPsdChange(){
        setmodalWrongPsdChange(false);
    }
    return(
        <div className="reset-pass-container">
            <div className='row m-0'>
                Recuperación de contraseña para {email}
            </div>
            <div className='row m-0'>
                Longitud mínima de 7 caracteres y máxima de 15. Debe incluir al menos un número, mayúscula, minúscula y caracter especial #?!@$%^&*-
            </div>
            <div className='row m-0'>
                <p style={paragraphStyle} className="col s2 para-margin-0">Nuevo Password</p>
                <input style={inputStyle} className="col s3 input-reset-pass" type="password" onChange={(e)=>setPass(e.target.value)}></input>
            </div>
            <div className='row m-0'>
                <p style={paragraphStyle} className="col s2 para-margin-0">Confirmar Password</p>
                <input style={inputStyle} className="col s3" type="password" onChange={(e)=>setConfimPass(e.target.value)}></input>
            </div>
            <div className="input-error">{errorMessage}</div>
            <div style={alignBtnInCenter} className='row m-0'>
                <button type='button' className='login-button-reset-psd' onClick={handelResetPassword}>Cambiar contraseña</button>
            </div>
            {/* <PopupModel  isOpen={modalInvalidPopupIsOpen} closePopup={handelInvalidAccessToken} height='350px' width='40%'>
                <EmailConfirmationPopup closePopup={handelInvalidAccessToken} content={'Invalid access token redirecting to landing page.'}/>
            </PopupModel> */}
             <PopupModel  isOpen={modelOpen} closePopup={handleModelClose} height='260px' width='30%'>
                <PopupContentCustom closePopup={handleModelClose} type={popupType} />
            </PopupModel>

            {/* <PopupModel  isOpen={modelOpen} closePopup={handelSuccessPsdChange} height='350px' width='40%'>
                <EmailConfirmationPopup closePopup={handelSuccessPsdChange} content={'Password changed successfully redirecting to landing page.'}/>
            </PopupModel> */}

            <PopupModel  isOpen={modalWrongPsdChange} closePopup={handelWrongPsdChange} height='250px' width='40%'>
                <EmailConfirmationPopup closePopup={handelWrongPsdChange} content={"Longitud mínima de 7 caracteres y máxima de 15. Debe incluir al menos un número, mayúscula, minúscula y caracter especial ($@¡%*?&)."}/>
            </PopupModel>
        </div>
    )
};

export default ResetPasswordContent
