import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import  Navbar  from './components/headerMenu/Navbar'
import { Footer } from './components/Footer'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Terreno } from './pages/Terreno'
import { Proveedores } from './pages/Proveedores'
import { LocalesComerciales } from './pages/LocalesComerciales'
import { LocalescomercialesEvent } from './pages/LocalescomercialesEvent'
import { Materials } from './pages/Materials'
import { ExcessP } from './pages/ExcessP'
import { ExcessPRegisteration } from './pages/ExcessPRegisteration'
import { RoleForm } from './pages/RoleForm'
import { Commercial } from './pages/Commercial'
import { Construction } from './pages/Construction'
import { FolioOfferLand } from './pages/admin/folio/offerLand/FolioOfferLand'
import { FolioLocalCommercial } from './pages/admin/folio/localCommercial/FolioLocalCommercial'
import { FolioExcessProperty } from './pages/admin/folio/excessProperty/FolioExcessProperty'
import { FolioLcDetail } from './pages/admin/folio/localCommercial/FolioLcDetail'
import { ExcessPropertyDetail } from './pages/admin/folio/excessProperty/ExcessPropertyDetail'
import { FolioOfferLandDetail } from './pages/admin/folio/offerLand/FolioOfferLandDetail'
import { FolioSupplier } from './pages/admin/folio/supplier/FolioSupplier'
import { FolioSupplierDetail } from './pages/admin/folio/supplier/FolioSupplierDetail'
import { Terrenos } from './pages/Terrenos'
import { ReportUser } from './pages/ReportUser'
import { ReportPremises } from './pages/ReportPremises'
import { ReportExcessProperty } from './pages/ExcessProperty/ReportExcessProperty'
import { ReportRole } from './pages/ReportRole'
import { NaturalPerson } from './pages/NaturalPerson'
import { LegalEntity } from './pages/LegalEntity'
import { UserIndex } from './pages/user/UserIndex'
import { UserCreate } from './pages/user/UserCreate'
//import { UserEdit } from './pages/UserEdit'
import { Test } from './pages/Test'
import RoutesConstants from './resources/route-constants'

// import useAuthenticate from './authentication/useAuthenticate'
import { pollingTime } from './authentication/constants'
import { CatalogueExcessProperty } from './pages/admin/catalogue/excessProperty/CatalogueExcessProperty'
import { CatalogueLC } from './pages/admin/catalogue/localCommercial/CatalogueLC'
import { CatalogueLcForm } from './pages/admin/catalogue/localCommercial/CatalogueLcForm'
import { CatalogLcDetail } from './pages/admin/catalogue/localCommercial/CatalogLcDetail'
//import authentication from './authentication/authentication'
import { ParkingLots } from './pages/ParkingLots'
import { Promotions } from './pages/Promotions'
import { Contact } from './pages/Contact'

import { ImagesIndex } from './pages/Images/ImagesIndex'
import { ImageForm } from './pages/Images/ImageForm'

import { Descriptions } from './pages/admin/description/Descriptions'
import { DescriptionForm } from './pages/admin/description/DescriptionForm'

import { FrequentQuestions } from './pages/admin/frequentQuestions/FrequentQuestions'
import { FrequentQuestionsForm } from './pages/admin/frequentQuestions/FrequentQuestionsForm'

import { NewsIndex } from './pages/admin/news/NewsIndex'
import { NewsForm } from './pages/admin/news/NewsForm'

import { NoteIndex } from './pages/admin/notes/NoteIndex'
import { NoteForm } from './pages/admin/notes/NoteForm'

import { Suppliers } from './pages/admin/suppliers/Suppliers'

import { ContactIndex } from './pages/admin/contact/ContactIndex'
import { ContactForm } from './pages/admin/contact/ContactForm'
import authService from './authentication/authService'
//import { useSearchParams } from 'react-router-dom'
// import { getInternalUserAuth } from './services/adminRole/adminRoleService'
import { AuthMiddleware } from './authentication/AuthMiddleware';
import { MenuIndex } from './pages/admin/menu/MenuIndex';

import { FrequentQues } from './pages/FrequentQues';
import ScrollToTop from './components/ScrollToTop';
import { MenuForm } from './pages/admin/menu/MenuForm';
import {BulkUpload} from './components/bulkUpload/BulkUpload';
import ResetPasswordContent from './components/resetPassword/ResetPassword';

import { ExcessPropertyCatalog } from './pages/ExcessProperty/components/ExcessPropertyCatalog'
import { getLoader } from './store/loaderReducer';
import { useAppSelector } from './store/hooks'

 
const App: React.FC = () => {
  const loader = useAppSelector(getLoader);
  //const [searchParams, setSearchParams] = useSearchParams();

  const [showHomePage] = useState(true);
  //const [userType] = useState('');
  // const [loginStatus, setLoginStatus] = useState(false);

  //const { getExternalUser } = authentication();
  // const { /*getAccessToken,*/ getRefreshAccessToken } = useAuthenticate(setLoginStatus);
  // const { /*getAccessToken,*/ getRefreshAccessToken } = useAuthenticate(setLoginStatus);



  const { validateTokenFromStorage, initInternalUserAuth, getRefreshAccessToken, authorizeExternalUser} = authService()

  //let authCode: any = "";

  const internalTokenAvailable = () => {

    let authCode1: any = "";
    const Url = new URL(window.location.href);
    const urlParams = new URLSearchParams(Url.search);
    authCode1 = urlParams.get('code');
    // urlParams.delete('code'); // XXX
    if(authCode1)
      window.history.pushState({}, document.title, window.location.pathname);
    //searchParams.delete('code')

    //setSearchParams(searchParams);

    if(authCode1)
      return authCode1
    else
      return false
    

  }

  const externalTokenAvailable = () => {

    const myUrl = new URL(window.location.href);
    const hash = new URLSearchParams(myUrl.hash.substring(1))
    let externalAuthToken = hash.get('id_token'); // XXX
    if(externalAuthToken)
      window.history.pushState({}, document.title, window.location.pathname);
    
    
    if(externalAuthToken)
    {
      return externalAuthToken
      // getExternalUser(externalAuthToken)
      
    }
    else
      return false

    
    
  }

  useEffect(() => {
    
    let internalToken: any = '';
    internalToken = internalTokenAvailable();
    
    
    let externalToken = externalTokenAvailable();
    if(internalToken)
    {
      initInternalUserAuth(internalToken)
      
    }
    else if(externalToken)
    {
      authorizeExternalUser(externalToken)
    }
    else{
      validateTokenFromStorage()
    }


      
   
    
    

  }, [])

 

  

  
  

  // setInterval(() => getRefreshAccessToken(), pollingTime)
  // const ref:any = useRef(null)

useEffect(() => {
  setInterval(() => getRefreshAccessToken(), pollingTime);
  


  // return () => {
  //   if(ref.current){
  //     clearInterval(ref.current)
  //   }
  // }
}, [])


  if (showHomePage || localStorage.getItem('access_token')) {

    return (

      <BrowserRouter>
        <ScrollToTop />
        <Navbar  />
        
        {
          //loader? 
            <div className={ loader  ? 'loader-app-container ' : 'loader-app-container hide'} >
              <div className='loader-app'></div>
            </div> 
          //:
           // ''
          }
        <div style={{opacity: loader? '30%' : '100%', pointerEvents: loader? 'none': 'unset'}} className="body-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />


             {/* Public Routes  */}
            <Route path={RoutesConstants.Terreno} element={<Terreno />} />
            <Route path={RoutesConstants.Terrenos} element={<Terrenos />} />

            <Route path={RoutesConstants.LocalesComerciales} element={<LocalesComerciales />} />
            <Route path={RoutesConstants.LocalescomercialesEvent} element={<LocalescomercialesEvent />} />
            <Route path={RoutesConstants.Commercial} element={<Commercial />} />

            <Route path={RoutesConstants.Proveedores} element={<Proveedores />} />
            <Route path={RoutesConstants.Materials} element={<Materials />} />
            <Route path={RoutesConstants.Construction} element={<Construction />} />

            <Route path={RoutesConstants.ExcessP} element={<ExcessP />} />
            <Route path={RoutesConstants.ExcessPRegisteration} element={<ExcessPRegisteration />} />
            <Route path={RoutesConstants.NaturalPerson} element={<NaturalPerson />} />
            <Route path={RoutesConstants.LegalEntity} element={<LegalEntity />} />

            <Route path={RoutesConstants.FrequentQues} element={<FrequentQues />} />
            <Route path={RoutesConstants.ParkingLots} element={ <ParkingLots /> } />
            <Route path={RoutesConstants.Promotions} element={ <Promotions />} />
            <Route path={RoutesConstants.Contacto} element={<Contact />}  />

            

            {/* Private Routes  */}


            <Route path={RoutesConstants.FolioLocalCommercial} element={<AuthMiddleware path={RoutesConstants.FolioLocalCommercial}> <FolioLocalCommercial /> </AuthMiddleware>}  />
            <Route path={RoutesConstants.FolioExcessProperty} element={<AuthMiddleware path={RoutesConstants.FolioExcessProperty}> <FolioExcessProperty /> </AuthMiddleware>}  />
            <Route path={RoutesConstants.FolioLand} element={<AuthMiddleware path={RoutesConstants.FolioLand}> <FolioOfferLand /> </AuthMiddleware>}  />
            <Route path={RoutesConstants.FolioSupplier} element={<AuthMiddleware path={RoutesConstants.FolioSupplier}> <FolioSupplier /> </AuthMiddleware>}  />
            
           
            <Route path={RoutesConstants.LcDetailAdmin} element={<AuthMiddleware path={RoutesConstants.LcDetailAdmin} relativePage={RoutesConstants.FolioLocalCommercial}> <FolioLcDetail /> </AuthMiddleware>}  />
            <Route path={RoutesConstants.ExcessPropertyDetail} element={<AuthMiddleware path={RoutesConstants.ExcessPropertyDetail} relativePage={RoutesConstants.FolioExcessProperty}> <ExcessPropertyDetail /> </AuthMiddleware>}  />
            <Route path={RoutesConstants.FolioLandDetail} element={<AuthMiddleware path={RoutesConstants.FolioLandDetail} relativePage={RoutesConstants.FolioLand}> <FolioOfferLandDetail /> </AuthMiddleware>}  />
            <Route path={RoutesConstants.FolioSupplierDetail} element={<AuthMiddleware path={RoutesConstants.FolioSupplierDetail} relativePage={RoutesConstants.FolioSupplier}> <FolioSupplierDetail /> </AuthMiddleware>}  />




            {/* <Route path={RoutesConstants.ReporteExcess} element={<ReportExcessProperty />} /> */}
            
            
            
            <Route path={RoutesConstants.ReportRole} element={<AuthMiddleware path={RoutesConstants.ReportRole}> <ReportRole /> </AuthMiddleware>}  />
            <Route path={RoutesConstants.ReporteExcess} element={<AuthMiddleware path={RoutesConstants.ReporteExcess}> <ReportExcessProperty /> </AuthMiddleware>}  />
            <Route path={RoutesConstants.ReporteLocales} element={<AuthMiddleware path={RoutesConstants.ReporteLocales}> <ReportPremises /> </AuthMiddleware>}  />
            <Route path={RoutesConstants.ReporteUsuarios} element={<AuthMiddleware path={RoutesConstants.ReporteUsuarios}> <ReportUser /> </AuthMiddleware>}  />
            
            <Route path={RoutesConstants.CatalogueEP} element={<AuthMiddleware path={RoutesConstants.CatalogueEP}> <CatalogueExcessProperty /> </AuthMiddleware>}  />
            <Route path={RoutesConstants.ExcessPropCatalog} element={<AuthMiddleware path={RoutesConstants.ExcessPropCatalog} relativePage={RoutesConstants.CatalogueEP}> <ExcessPropertyCatalog /> </AuthMiddleware>}  />

            <Route path={RoutesConstants.CatalogueLC} element={<AuthMiddleware path={RoutesConstants.CatalogueLC}> <CatalogueLC /> </AuthMiddleware>}  />
            <Route path={RoutesConstants.CatalogueLcForm} element={<AuthMiddleware path={RoutesConstants.CatalogueLcForm}  relativePage={RoutesConstants.CatalogueLC}> <CatalogueLcForm /> </AuthMiddleware>}  />
            <Route path={RoutesConstants.CatalogLcDetail} element={<AuthMiddleware path={RoutesConstants.CatalogLcDetail}  relativePage={RoutesConstants.CatalogueLC}> <CatalogLcDetail /> </AuthMiddleware>}  />
            {/* <Route path={RoutesConstants.CatalogueEPEdit} element={<CatalogueExcessPropertyEdit/>} /> */}
            <Route path={RoutesConstants.BulkUpload} element={<AuthMiddleware path={RoutesConstants.BulkUpload} relativePage={RoutesConstants.CatalogueLC}> <BulkUpload /> </AuthMiddleware>}  />

            <Route path={RoutesConstants.UserIndex} element={<AuthMiddleware path={RoutesConstants.UserIndex}> <UserIndex /> </AuthMiddleware>}  />
            <Route path={RoutesConstants.UserCreate} element={<AuthMiddleware path={RoutesConstants.UserCreate}  relativePage={RoutesConstants.UserIndex}> <UserCreate /> </AuthMiddleware>}  />

            <Route path={RoutesConstants.RoleForm} element={<AuthMiddleware path={RoutesConstants.RoleForm}> <RoleForm /> </AuthMiddleware>}  />

            {/* <Route path={RoutesConstants.UserEdit} element={<UserEdit />} /> */}
            <Route path="/Test" element={<Test />} />

            
            

            
            <Route path={RoutesConstants.Images} element={<AuthMiddleware path={RoutesConstants.Images}> <ImagesIndex /> </AuthMiddleware>}  />
            <Route path={RoutesConstants.ImageForm} element={<AuthMiddleware path={RoutesConstants.ImageForm} relativePage={RoutesConstants.Images}> <ImageForm /> </AuthMiddleware>}  />
            
            <Route path={RoutesConstants.Descriptions} element={<AuthMiddleware path={RoutesConstants.Descriptions}> <Descriptions /> </AuthMiddleware>}  />
            <Route path={RoutesConstants.DescriptionsForm} element={<AuthMiddleware path={RoutesConstants.DescriptionsForm} relativePage={RoutesConstants.Descriptions}> <DescriptionForm /> </AuthMiddleware>}  />

            <Route path={RoutesConstants.FrequentQuestionsAdmin} element={<AuthMiddleware path={RoutesConstants.FrequentQuestionsAdmin}> <FrequentQuestions /> </AuthMiddleware>}  />
            <Route path={RoutesConstants.FrequentQuestionsFormAdmin} element={<AuthMiddleware path={RoutesConstants.FrequentQuestionsFormAdmin} relativePage={RoutesConstants.FrequentQuestionsAdmin}> <FrequentQuestionsForm /> </AuthMiddleware>}  />
            
            <Route path={RoutesConstants.NewsIndex} element={<AuthMiddleware path={RoutesConstants.NewsIndex}> <NewsIndex /> </AuthMiddleware>}  />
            <Route path={RoutesConstants.NewsForm} element={<AuthMiddleware path={RoutesConstants.NewsForm} relativePage={RoutesConstants.NewsIndex}> <NewsForm /> </AuthMiddleware>}  />
            
            <Route path={RoutesConstants.NoteIndex} element={<AuthMiddleware path={RoutesConstants.NoteIndex}> <NoteIndex /> </AuthMiddleware>}  />
            <Route path={RoutesConstants.NoteForm} element={<AuthMiddleware path={RoutesConstants.NoteForm} relativePage={RoutesConstants.NoteIndex}> <NoteForm /> </AuthMiddleware>}  />
            
            <Route path={RoutesConstants.Suppliers} element={<AuthMiddleware path={RoutesConstants.Suppliers}> <Suppliers /> </AuthMiddleware>}  />

            <Route path={RoutesConstants.ContactIndex} element={<AuthMiddleware path={RoutesConstants.ContactIndex}> <ContactIndex /> </AuthMiddleware>}  />
            <Route path={RoutesConstants.ContactForm} element={<AuthMiddleware path={RoutesConstants.ContactForm} relativePage={RoutesConstants.ContactIndex}> <ContactForm /> </AuthMiddleware>}  />
            
            
            <Route path={RoutesConstants.MenuIndex} element={<AuthMiddleware path={RoutesConstants.MenuIndex}> <MenuIndex /> </AuthMiddleware>}  />
            <Route path={RoutesConstants.MenuForm} element={<AuthMiddleware path={RoutesConstants.MenuForm} relativePage={RoutesConstants.MenuIndex}> <MenuForm /> </AuthMiddleware>}  />
            {/* <Route path={RoutesConstants.ContactIndex} element={<ContactIndex />} /> */}

           

           

            <Route path={RoutesConstants.ResetPass} element={<ResetPasswordContent />} />
            
            {/* for excess property catalog form */}
            
            
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>


    )
  }
  else {
    return <></>
  }
}

export default App
