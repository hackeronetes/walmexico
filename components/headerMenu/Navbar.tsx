



import React, { useState, useEffect, memo  } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../HeaderFooter.css';
import Image from '../common/Image'
import {  useLocation } from "react-router-dom"
import Routes from '../../resources/route-constants';
import { getAllMenu } from '../../services/adminRole/adminRoleService';
import { Login } from '../login-popup/Login';
import PopupContentEmailError from '../popups/PopupContentEmailError'
import PopupModel from '../popups/PopupModel'
import { getLoginStatus, getLoginType, getLoginUser, getLoginAccess, getError, getErrorType, setError} from '../../store/authReducer' 
import {useAppSelector, useAppDispatch} from '../../store/hooks'
import authService from '../../authentication/authService'
import PopupResetPass from '../popups/PopupResetPassword';
import PopupChangePassword from '../popups/PopupChangePassword';
import { BsPersonCircle } from "react-icons/bs";
import PopupContentChangePassSuccess from '../popups/PopupContentChangePassSuccess';


const moduleRoutes:any = {
  LocalesComerciales : [Routes.LocalesComerciales, Routes.Commercial, Routes.LocalescomercialesEvent], 
  Terrenos : [Routes.Terreno, Routes.Terrenos], 
  Proveedores : [Routes.Proveedores, Routes.Construction, Routes.Materials], 
  ExcessP : [Routes.ExcessP, Routes.ExcessPRegisteration], 
}





 const Navbar: React.FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {loginDb, logOutUser} = authService()

  let iconStyles = { color: "#0b59a1",marginBottom: "-4px", fontSize: "1.2em" };
  
  const [modalLoginIsOpen, setModalLoginIsOpen] = useState(false);
  const [modalSuccessPsdChange, setmodalSuccessPsdChange] = useState(false);
  const loginStatus = useAppSelector(getLoginStatus);
  const loginType = useAppSelector(getLoginType);
  const loginUser = useAppSelector(getLoginUser);
  const userAccess = useAppSelector(getLoginAccess);
  const errorStatus = useAppSelector(getError);
  const loginDbErrorType = useAppSelector(getErrorType);




  const [menuStructure, setMenuStructure] = useState([]);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  
  const [modalErrorIsOpen, setErrorIsOpen] = React.useState(false);

  
  const location = useLocation();
  const [showLogin, setShowLogin] = useState<Boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<any>(false);
  // const [childMobileOpen, setChildMobileOpen] = useState<any>('');
  const [activeParent, setActiveParent] = useState<any>('');
  let currentRoute = '/'

  const [visible, setVisible] = useState<any>('');

  
  Object.keys(moduleRoutes).forEach((key:any) =>  {

    if(moduleRoutes[key].indexOf(location.pathname) > -1)
    {
      currentRoute  = key
    }
    
  });


  const getAllMenuStructure = () => { 
    getAllMenu().then((res:any) => {
        
        if(res.data)
          setMenuStructure(res.data)
        
    })
    .catch(() => {
        //alert('Something went wrong')
        //setSelectStateOptions([])
            // setTableRows([])
        
    })
  } 
  const handleChangePsdModelClose = ()=>{
    setIsChangePasswordOpen(false);
}


  
 

  const loginFromDb = (username:any, password:any) => { 
       
      loginDb(username, password);

  }
      

useEffect(() => {
    getAllMenuStructure()
    
}, [])


   
  
// }, [loginStatus])

useEffect(() => {
  //alert('errorstatus ' + errorStatus)
  if(errorStatus)
  setErrorIsOpen(true)
  
})

// useEffect(() => {

//   authorizeDbUser()
    
  const getModuleName = (path:any) => {
    
    let result = ''

  Object.keys(moduleRoutes).forEach((key:any) =>  {


      if(moduleRoutes[key].indexOf(path) > -1)
      {
        result = key
      }
      
  });

  
  return result

}


   

 const validateCurrentUserAccess = (item: any) => {

    if(!loginStatus)
    {
      return item.publicAccess ? true : false
    }
    else
    {
     if(userAccess.findIndex((x:any) => x.id === item.value) > -1)
        return true
      else
        return false
    }
 }

 const hanldeNavUlClick = () => {
  setVisible('none')
    setTimeout(()=> {
      //divRef.current.style.display = '';
      setVisible('')
    }, 100)

    setMobileMenuOpen(!mobileMenuOpen)
    setActiveParent('')

 }

 const hideNavChildContainer = () => {
  setVisible('none')
  setActiveParent('')
    setTimeout(()=> {
      //divRef.current.style.display = '';
      setVisible('')
    }, 1000)

 }

 const openMobileMenu = () => {
  setMobileMenuOpen(!mobileMenuOpen)
  setActiveParent('')
}

  const renderNavLiItems = (liItems: any) => {
    let list = liItems?.map((item:any) => {
      if(validateCurrentUserAccess(item))
      {
        return (
          <li>
            <NavLink to={item.url} onClick={() => hanldeNavUlClick()}> {item.label}</NavLink>
            
          </li>
        )
      }
      else
      {
        return <></>
      }
      

    })

    return list


  }

  const renderNavUl = (ulItems: any) => {
    let list = ulItems?.map((item:any) => {
      
      if(validateCurrentUserAccess(item))
      {
        return (
          <ul className="nav-inner-ul">
            <li>
              <h3>
                {item.label}
              </h3>
            </li>
           
            {renderNavLiItems(item.children)}
          </ul>
        )
      }
      else
      {
        return <></>
      }
      

    })

    return list


  }

  const renderNavMEnuItems = menuStructure.map((item:any) => {

   
    
    if(item.children != null &&  item.children.length > 0 )
    {
      if(validateCurrentUserAccess(item))
      {
        //subMenuCount++
        return (
          <div className={currentRoute == 'reports' ? 'menu-item active-nav nav-dropdown-label' : 'menu-item nav-dropdown-label'} >
            <NavLink to="#" className={`parent-item ${activeParent == item && "opened"}`} onClick={() => setActiveParent(item)} >{item.label}</NavLink>
            <div className={"nav-drop-container " } style={{display : visible}} >
              <div className="child-back mobile-only" ><span  onClick={() => hideNavChildContainer()}> <span className="back-icon-menu">{"<"}</span>Regresar </span></div>
              <div className="nav-drop-inner">
                <div className="nav-inner-list-wrapper">
                  {renderNavUl(item.children)}
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
    else{

      if(validateCurrentUserAccess(item))
      {
        return (
          <div onClick={() => openMobileMenu()} className={currentRoute == getModuleName('/' + item.url) ? 'menu-item active-nav' : 'menu-item'}  cy-data="home-nav-link">
            <NavLink to={item.url} >{item.label}</NavLink>
          </div>
        )
      }
      

      
    }

    return <></>
    
  })

  const showLoginPopup = (): void => {
    setShowLogin(true)
  }

  const renderLoginButtonOrName = () => {
    if(!loginStatus)
    {
      return (
        <><span ><BsPersonCircle style={iconStyles} /></span><span> <a onClick={() => showLoginPopup()} href="#">LOGIN</a></span></>
      )
    }
    else
    {
      let fullName = ''
        if(loginType == 'db')
          fullName = (loginUser.name && loginUser.name != '' ) ? loginUser.name : loginUser.firstName + loginUser.lastName
        else if(loginType == 'external')
          fullName = (loginUser.name && loginUser.name != '' ) ? loginUser.name : loginUser.firstName + loginUser.lastName
        else  
          fullName = loginUser.userName
        return (
          <><span ><BsPersonCircle style={iconStyles} /></span> <span onClick={() => showLoginPopup()}>{fullName}</span></>
        )
      
      
    }
     
      
    
  }

  function handleModelClose(){
    setModalLoginIsOpen(false)
  }

  function handleModelErrorClose(){
      setErrorIsOpen(false)
      dispatch(setError(false))
      // setModalLoginIsOpen(true)
  }
  function handleModelClosewithReset(){
      setErrorIsOpen(false)
      dispatch(setError(false))
      setModalLoginIsOpen(true)
  }
  function handelSuccess(){
    setIsChangePasswordOpen(false)
    setmodalSuccessPsdChange(true);
  }

  const handelSuccessPsdChange = ()=>{
    setmodalSuccessPsdChange(false);
    logOutUser()
    navigate('/')
};

const handleChangePassOpen = () => {
  setShowLogin(false)
  setIsChangePasswordOpen(true)
}

 

  return (
    <>
    <header className="header">
      <div className="container main-container first">
        <div className="inner-container ">
          <div className="left-container">
              <div className="logo">
              <NavLink to="/" >
                <Image name="logo.png" alt="Walmart Mexico"/>
              </NavLink>
              </div>
              <div className="main-menu-toggle mobile-only ">
                <span onClick={() => openMobileMenu()}><Image name="mobile-menu-icon.png" className='mbl-menu-icon' /></span>
              </div>
          </div>
          
          <div className="right-container">
            <div className='item login'>
              <a href="mailto:Ethics@wal-mart.com">LÍNEA ÉTICA</a>
            </div>
            <div className='item'>
              {renderLoginButtonOrName()}
              
            </div>
          </div>
        </div>
          
      </div>
      
      {/* className={`multistep-progress-bar ${directionType === 'column' ? ColumnDirection : RowDirection}`} */}
      <div className={`nav-container ${ mobileMenuOpen == true ? 'open' : ''}`}>
        <div className="container main-container nav-wrapper ">
          <div className="nav-parent-container">
            <div className="main-menu-close mobile-only ">
              <span>Menú</span><span className="float-right" onClick={() => openMobileMenu()}>X</span>
            </div>
            {renderNavMEnuItems} 
              
          </div>
        </div>
       
      </div>


    </header>

        <PopupModel  className={"height-auto"} isOpen={modalErrorIsOpen} closePopup={handleModelErrorClose} height='260px' width='30%'>
            <PopupContentEmailError errorType={loginDbErrorType}  closePopup={handleModelErrorClose} closePopupWithReset = {handleModelClosewithReset}/>
        </PopupModel>

        <PopupModel  isOpen={modalLoginIsOpen} closePopup={() => handleModelClose()} width='40%' height='400px'>
            <PopupResetPass  closePopup={() => handleModelClose()} setModalLoginIsOpen={setModalLoginIsOpen}/>
        </PopupModel>
        <PopupModel className={"height-auto"}  isOpen={isChangePasswordOpen} closePopup={() => handleChangePsdModelClose()} width='40%' >
            <PopupChangePassword  closePopupSuccess={handelSuccess} closePopup={() => handleChangePsdModelClose()} setModalLoginIsOpen={isChangePasswordOpen}/>
        </PopupModel>
        <PopupModel className={"height-auto"}  isOpen={modalSuccessPsdChange} closePopup={handelSuccessPsdChange}  width='30%'>
            <PopupContentChangePassSuccess  closePopup={handelSuccessPsdChange} />
        </PopupModel>
      { showLogin ? <Login loginFromDb={loginFromDb} setShowLogin={setShowLogin} setModalLoginIsOpen={setModalLoginIsOpen} openChangePasdPopup={handleChangePassOpen}/> : '' }
    </>
  )
}



export default memo(Navbar);