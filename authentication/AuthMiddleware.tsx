import  {useEffect} from "react"
import { Navigate } from "react-router-dom"
import { getLoginStatus,  getLoginAccess} from '../store/authReducer' 
import {useAppSelector} from '../store/hooks'

export const AuthMiddleware = (props:any) => { 
    
    const loginStatus = useAppSelector(getLoginStatus);
    
    const userAccess = useAppSelector(getLoginAccess);

    //const nav = useNavigate()
    const { children, redirect = '/', path } = props; 

    const hasAccess = () => {
        //let status = false;
        let temppath = path.substring(1)
        
        if(!loginStatus)
        {

          
          return false
        }
        else
        {
          let accesspath = temppath
          if(props.relativePage)
            accesspath = props.relativePage.substring(1)
          if(userAccess.findIndex((x:any) => x.url === accesspath) > -1)
            return true
          else
            return false
        }

        // return status
    }

    

    // const test = () => {
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve (<Navigate to={redirect} replace />)
    //     }, 2000);
    //   });
    // }
    

    useEffect(() => {
     
    }, [loginStatus])

    if(loginStatus === undefined)
    {
      return ""
    }
   
    if(!loginStatus)
    {
      return (<Navigate to={redirect} replace />)
    }
    else if (!hasAccess()) {
      //alert('2')
      
      return (<Navigate to={redirect} replace />)
    }
    else {
      //alert('3')
      
      return children;
    }
    //return children;
 };