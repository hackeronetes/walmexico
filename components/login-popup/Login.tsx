import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

//import  authService  from '../../authentication/authService';
import { getDomainFromEmail } from '../../utility/commonFunctions';
import { allowdDomains, b2cLoginUrl, ssoUrl } from '../../resources/project-constants';
import usePKCE from '../../authentication/utils';
import { getLoginStatus, getLoginType} from '../../store/authReducer' 
import {useAppSelector} from '../../store/hooks'
import authService from '../../authentication/authService'
import PopupModel from '../popups/PopupModel';
import EmailConfirmationPopup from '../popups/PopupEmailSent';
import { BsPersonCircle, BsUnlockFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import RoutesConstants from '../../resources/route-constants'
// import RoutesConstants from './../../resources/route-constants';
// const config = {
//     allowedDomains : [
//         'gmail'
//     ]
// }




export const Login: React.FC<any> = (props: any) => {

    const navigate = useNavigate()
    const { codeChallenge } = usePKCE();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const popupCloseRef = useRef(false);

    const [openPopup, setOpenPopup] = useState(false);
    const [closeLoginWindow, setCloseLoginWindow] = useState(false);

    const loginStatus = useAppSelector(getLoginStatus);
    const loginType = useAppSelector(getLoginType);
    // const loginUser = useAppSelector(getLoginUser);

    const {logOutUser} = authService()

    //const {loginDb} = authService();
    const ref = useRef<any>(null);


    useEffect(() => {
        // THIS IS THE MAGIC PART
        popupCloseRef.current = closeLoginWindow;
      }, [closeLoginWindow]);

   
    const handleClickOutside = (event:any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setTimeout(() => {
                if(!popupCloseRef.current)
                    props.setShowLogin(false);

                setCloseLoginWindow(false)
                
            }, 100);
            // if(!openPopup)
            //     props.setShowLogin(false);
            //setIsComponentVisible(false);
        }
        else {
            setCloseLoginWindow(false)
        }
    };
    

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);


    const walmartUserHandler = () => {
        localStorage.setItem('isLogout', '0');
        window.location.assign(ssoUrl + `&code_challenge=${codeChallenge}` + `&code_challenge_method=S256`);
    };


    const isEmailDomainAllowed = () => {
        let domain = getDomainFromEmail(username)

        if(domain && allowdDomains.indexOf(domain) > -1 )
        {
            return true
        }
        return false
        
    }

    const navigateToB2c = () => {
        localStorage.setItem('isLogout', '0');
        window.location.assign(b2cLoginUrl)
    }

    const handleLogOut = () => {
        logOutUser()
        props.setShowLogin(false)
        navigate(RoutesConstants.Home);
    }

    const handleClosePopup = ()=>{
        setCloseLoginWindow(true)
        setOpenPopup(false);
    }
    const handleExternalUserLogin = () => {
        

        if(username.split("@")[1]?.includes('gmail')){
            setOpenPopup(true);
            setCloseLoginWindow(true)
            return;
        }

        localStorage.setItem('isLogout', '0');
        if(!isEmailDomainAllowed())
        {
            //loginUsername()
            props.setShowLogin(false)
            props.loginFromDb(username, password)

            //alert('loginDb result' +  result)
            
          
        }
        // else
        // {
        //     navigateToB2c();
        // }

        
       

    };

    const openReserPassPopup = ()=>{
        props.setModalLoginIsOpen(true);
    }


    const renderLoginContent = () => {
        let iconStyles = { color: "white", marginTop:"21px", fontSize: "1.3em" };

     
        return (
            
                  <div>  
                    <span className="popup-heading">INICIAR SESIÓN</span>
                    <div className="login-form">
                    
                        <span className='login-labels'>Correo electrónico</span>
                        <span style={{display:'flex'}}>
                            <input type="text" onChange={(e:any) => setUsername(e.target.value) } />
                        <span ><BsPersonCircle style={iconStyles} /></span></span>
                        <span className='login-labels'>Contraseña</span>
                        <span style={{display:'flex'}}>
                        <input type="password" onChange={(e:any) => setPassword(e.target.value) } />
                        <span><BsUnlockFill style={iconStyles} /></span></span>
                        <span style={{ color: 'white', cursor: 'pointer' }} onClick={()=>navigateToB2c()}><u>Ingresa a través de Gmail</u></span>
                        <span style={{ color: 'white' }} onClick={openReserPassPopup}>¿Olvidaste tu contraseña?</span>
                        <button style={{margin: '10px auto', backgroundColor: '#fdbb30', color: 'white'}} type='button' className='login-button' onClick={handleExternalUserLogin}>Iniciar sesión</button>
                        <a onClick={() => { walmartUserHandler() }} className='walmart-user'>¿Eres empleado Walmart?</a>
                    </div>
                    <PopupModel  isOpen={openPopup} closePopup={handleClosePopup} height='200px' width='40%'>
                        <EmailConfirmationPopup closePopup={handleClosePopup} content={'Utilice el enlace "Ingresa a través de Gmail" para acceder a su cuenta a través de la autenticación de Gmail.'}/>
                    </PopupModel>
               </div>
        )
    }

    const openChangePasswordPopup = ()=>{
        props.openChangePasdPopup();

    }

    const canChangePassword = () => {
        if(loginType == 'db')
            return true;
        else
            return false
    }

    const returnLogOutContent = () => {

        // let fullName = ''
        // if(loginType == 'db')
        // fullName = loginUser.firstName + loginUser.lastName
        // else  
        // fullName = loginUser.userName

        return (
            <div>
                {/* <span className="popup-heading">{fullName}</span> */}
                <div>
                    <button type='button' className='login-button' onClick={handleLogOut}>Cerrar sesión</button>
                    {canChangePassword() && ( 
                        <span className='cursor-ptr' style={{ color: 'white' }} onClick={openChangePasswordPopup}>Cambiar contraseña</span>
                    )}
                </div>
            </div>
            
            
            
        )
    }

    const renderLogoutButtonOrName = () => {

        
        if(!loginStatus)
        {
           return renderLoginContent()
        }
        else
        {
            return returnLogOutContent()
         
          
        }
         
      }


    

    return (
        <>
        <div ref={ref} className='login-parent'>
            <div className='container-login'>
                {renderLogoutButtonOrName()}
            </div>
        </div>
        
         
        </>
    )
    
}