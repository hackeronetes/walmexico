import { getExternalUserAuth, authorizeDbUserByUsername, loginWithUsernamePassword, getInternalUserAuth, getAccessTokenWithRefreshToken, getInternalUserAccessToken, postlogOutUser } from '../services/adminRole/adminRoleService';
import {useAppSelector, useAppDispatch} from '../store/hooks'
import { selectCount, setLoginStatus, setLoginType,  setUser, setAccess, setError, logOut, getLoginType, setErrorType, getLoginStatus} from '../store/authReducer'
//import { loginWithUsernamePassword } from '../services/adminRole/adminRoleService';
import useAuthenticate from './useAuthenticate'
import {USER_EXTERNAL, USER_INTERNAL, USER_DB, redirectUrl} from '../resources/project-constants'
import { internalLogoutUrl } from '../resources/project-constants';
import { setLoader } from '../store/loaderReducer'
import { lsKeys } from './constants';
import { useEffect, useRef } from 'react';

const authService = () => {

    let userDetails = {
        userId: '',
        firstName: '',
        lastName: '',
        userName: '',
        fullName: '',
        name: '',
        accountId: '',
        //phoneNo: '',
       // cellNo: '',
    }

    const dispatch = useAppDispatch();
    const loginTypeRedux = useAppSelector(getLoginType);
    const loginStatus = useAppSelector(getLoginStatus);
    const { getAccessToken } = useAuthenticate(setLoginStatus);
    const loginStatusRef = useRef(loginStatus)

    useEffect(() => { loginStatusRef.current = loginStatus })

    const afterLogin = () => {
        dispatch(setLoginStatus(true))
    }
    const afterLogout = () => {
        dispatch(setLoginStatus(false))
        localStorage.removeItem(lsKeys.accessToken)
        localStorage.removeItem(lsKeys.refreshToken)
        localStorage.removeItem(lsKeys.userType)
        localStorage.setItem('isLogout', '1');

        if(loginTypeRedux === USER_INTERNAL){
            window.location.assign(internalLogoutUrl);
        }
        else if(loginTypeRedux == USER_DB) {

        }
        else{
            const newWindow = window.open('https://mail.google.com/mail/u/0/?logout&hl=en', '_blank', "width=1,height=1,left=-1000,top=-1000");
            setTimeout(()=>{
                if(newWindow) {
                    newWindow.close();
                    window.location.assign(redirectUrl);
                }
            }, 4000);
        }
        
    }

    const mapUserDetails = (user:any, loginType:any) => {
        if(loginType == USER_DB )
        {
            userDetails.userId = user.id ? user.id : ''; 
            userDetails.accountId = user.accNo ? user.accNo : ''; 
            userDetails.firstName = user.firstName?  user.firstName : ''; 
            userDetails.lastName = user.lastName ? user.lastName : ''; 
            userDetails.name = user.name ? user.name : ''; 
            userDetails.fullName = userDetails.firstName + ' ' + userDetails.lastName; 
        }
        if(loginType == USER_EXTERNAL )
        {
            userDetails.userId = user.id ? user.id : ''; 
            userDetails.firstName = user.firstName?  user.firstName : ''; 
            userDetails.lastName = user.lastName ? user.lastName : ''; 
            userDetails.name = user.name ? user.name : ''; 
            userDetails.fullName = userDetails.firstName + ' ' + userDetails.lastName; 
        }

        return userDetails;
    }

    // const getAccessTokenFromStorage = () => {
    //     const accessToken = localStorage.getItem(lsKeys.accessToken);
        
    //     return accessToken
    // }
    
   

    
    const authorizeInternalUser = () => {
        
        //let token = getAccessTokenFromStorage();
        
        getInternalUserAuth().then((res:any) => {
            dispatch(setLoader(false));
            if(res.data)
            {
                //dispatch(setLoginStatus(true))
                dispatch(setLoginType(USER_INTERNAL))
                dispatch(setUser(res.data.user))
                dispatch(setAccess(res.data.access))
                afterLogin()
                
            }
            else
            {
                dispatch(setLoginStatus(false))
            }
            
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
                // setTableRows([])
            console.log('getStateList error', error)
            dispatch(setLoginStatus(false))
            dispatch(setLoader(false));
        })
           
    }


    const authorizeDbUser = () => {
        authorizeDbUserByUsername().then((res:any) => {
            dispatch(setLoader(false));
           
            if(res.data)
            {
                let mappedUser =  mapUserDetails(res.data.user, USER_DB)

                dispatch(setLoginStatus(true))
                dispatch(setLoginType(USER_DB))
                dispatch(setUser(mappedUser))
                dispatch(setAccess(res.data.access))

              
            }
            else{
                dispatch(setLoginStatus(false))
            }
            
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
                // setTableRows([])
            //dispatch(setError(true))
            dispatch(setLoginStatus(false))
            console.log('getStateList error', error)
            dispatch(setLoader(false));
        })
    }


    const authorizeExternalUser =  (token:string) => {
        
        
        getExternalUserAuth(token).then((response:any) => {
            dispatch(setLoader(false));
            if(response.data )
            {

                // let mappedUser =  mapUserDetails(response.data.user, USER_EXTERNAL)

                // dispatch(setLoginStatus(true))
                // dispatch(setLoginType(USER_EXTERNAL))
                // dispatch(setUser(mappedUser))
                // dispatch(setAccess(response.data.access))
                localStorage.setItem(lsKeys.accessToken, response.data.token);
                localStorage.setItem(lsKeys.refreshToken, response.data.refreshToken);
                localStorage.setItem(lsKeys.userType,USER_EXTERNAL);
                //saveTokenToStorage(token)
               // saveLoggedInUser(response.data.user)

               authorizeDbUser()
            }
            else
            {
                dispatch(setLoginStatus(false))
            }
                
        })
        .catch((error:any) => {
           console.log(error)
           //setModalErrorIsOpen(true)
           dispatch(setLoginStatus(false))
           dispatch(setLoader(false));
        })
    }
   




    const count = useAppSelector(selectCount);
    

    const getCount = () => {
        return count;
    }


    // const getToken = () => {
    //     const accessToken = await localStorage.getItem('access_token');
    //     return accessToken;
    // }


    

    // const setTokenExpiryDate = () => {
    //     const currentTime = new Date();
    //     const endTime = new Date(currentTime);
    //     endTime.setSeconds(endTime.getSeconds() + data.expires_in);
    //     localStorage.setItem('end_time', endTime.toString());
    // }

    


    
    
    
    const authorizeUser = (token:string, userType: 'internal' | 'external' | 'db') => {
       
        dispatch(setLoader(true));
        
        if(userType == USER_EXTERNAL)
        {
            authorizeDbUser()   
        }
        else if(userType == USER_INTERNAL)
        {
            authorizeInternalUser()   
        }
        else if(userType == USER_DB)
        {
             authorizeDbUser()   
        }
    }

    const saveToken = (token:string, userType: 'internal' | 'external' | 'db') => {
        //alert('fdsfds')
        if(token && token != '')
            localStorage.setItem('access_token', token);
        
        localStorage.setItem(lsKeys.userType, userType);
        // setTokenExpiryDate();
        
        
        authorizeUser(token, userType)
    }

    const validateTokenFromStorage =  () => {
        const accessToken = localStorage.getItem(lsKeys.accessToken);
        const userType:any = localStorage.getItem(lsKeys.userType);
        
        if(accessToken && userType)
            authorizeUser(accessToken, userType)
        else
            dispatch(setLoginStatus(false))
        
    }

    
    const loginDb = (username:any, passInput:any) => { 
       
        loginWithUsernamePassword(username, passInput).then((res:any) => {
            if(res.status == 200)
            {
                saveToken(res.data.id, USER_DB);
                localStorage.setItem(lsKeys.accessToken, res.data.accessToken);
                localStorage.setItem(lsKeys.refreshToken, res.data.refreshToken);
                //authorizeDbUser(username)
               
                //props.setDbUsername(username)
                return true
            }
            else if(res.status == 401)
            {
                dispatch(setLoginStatus(false))
                dispatch(setError(true))
                
                dispatch(setErrorType(2))  
            }
            else {
                dispatch(setError(true))
                dispatch(setLoginStatus(false))
                return false
                
            }
            
        })
        .catch((error:any) => {
            //alert('111')
            dispatch(setLoginStatus(false))
            //props.setEmailErrorIsOpen(true)
          
            //alert('Something went wrong')
            //setSelectStateOptions([])
                // setTableRows([])
            dispatch(setError(true))
            // if(error.code && error.code == 401)
            //     dispatch(setErrorType(2))  
            console.log('getStateList error', error)
        })
    } 

 

    const getInterAccessToken = (pingfedToken:any) => {

        getInternalUserAccessToken(pingfedToken).then((response:any) => {
         if(response.data)
            {
                localStorage.setItem(lsKeys.accessToken, response.data.token);
                localStorage.setItem(lsKeys.refreshToken, response.data.refreshToken);
                localStorage.setItem(lsKeys.userType,USER_INTERNAL);
                localStorage.setItem(lsKeys.pfToken,pingfedToken);
                authorizeInternalUser()

            }
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
                // setTableRows([])
            console.log('getStateList error', error)
            dispatch(setLoginStatus(false))
            dispatch(setLoader(false));
        })

    }





    


    const initInternalUserAuth =  (pingfedToken:string) => {

        // get pingfed access token from code
       getAccessToken(pingfedToken).then((data:any) => {
            if(data)
            {
                
                // saveToken( data.access_token, USER_INTERNAL)
                // localStorage.setItem('refresh_token', data.refresh_token);
                // setExpirydate(data)
                getInterAccessToken(data.access_token)
            }
                
        })
        .catch((error:any) => {
           console.log(error)
           //setModalErrorIsOpen(true)
        })


       
    }


    const logOutUser = async() => {
            
            localStorage.removeItem('access_token');
            // localStorage.removeItem(lsKeys.userType);
            // localStorage.removeItem(lsKeys.accessToken);
            // localStorage.removeItem(lsKeys.refreshToken);

            postlogOutUser().then(() => {
                dispatch(setLoader(false));
                dispatch(setLoginStatus(false))
                afterLogout()
                
            })
            .catch((error:any) => {
                //alert('Something went wrong')
                //setSelectStateOptions([])
                    // setTableRows([])
                console.log('getStateList error', error)
                dispatch(setLoginStatus(false))
                afterLogout()
                // dispatch(setLoader(false));
            })



            
        dispatch(logOut())
    }

     
    const getRefreshAccessToken = () => {

       
        
        if(!loginStatusRef.current)
            return false;
        
        let token:any = localStorage.getItem(lsKeys.refreshToken)
        getAccessTokenWithRefreshToken(token).then((res:any) => {
            dispatch(setLoader(false));
            if(res.data)
            {
                // dispatch(setLoginStatus(true))
                // dispatch(setLoginType(USER_INTERNAL))
                // dispatch(setUser(res.data.user))
                // dispatch(setAccess(res.data.access))
                localStorage.setItem(lsKeys.accessToken, res.data.data.token);
                localStorage.setItem(lsKeys.refreshToken, res.data.data.refreshToken);
            }
            else
            {
                dispatch(setLoginStatus(false))
                afterLogout()
            }
            
        })
        .catch((error:any) => {
            //alert('Something went wrong')
            //setSelectStateOptions([])
                // setTableRows([])
            console.log('getStateList error', error)
            dispatch(setLoginStatus(false))
            afterLogout()
            // dispatch(setLoader(false));
        })
    }

    
    
    return {
        //getExternalUser,
        getCount,
        loginDb,
        authorizeInternalUser,
        authorizeExternalUser,
        saveToken,
        validateTokenFromStorage,
        initInternalUserAuth,
        logOutUser,
        getRefreshAccessToken,
        afterLogout,
       
    }
}


export default authService
