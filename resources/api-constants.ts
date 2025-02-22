import {apiBaseUrl} from './project-constants'
import {env} from './project-constants'


export const getData = (userId: number): string => {
    return apiBaseUrl + 'states/' + userId
}
export const getStates = (): string => {
    return `${apiBaseUrl}/state`
    // return 'https://mxbraddressservice.' + env + '.cloud.wal-mart.com/state'
}

export const resetPassURL = (email:string): string=>{
    return `${apiBaseUrl}/api/auth/resetPassword?email=${email}`
    // return `https://mxbrUserAuthorization.${env}.cloud.wal-mart.com/api/auth/resetPassword?email=${email}`;
}

export const validateResetPassToken = (token: string): string=>{
    return `${apiBaseUrl}/api/auth/validateToken?token=${token}`
    // return `https://mxbruserauthorization.${env}.cloud.wal-mart.com/api/auth/validateToken?token=${token}`;
}

export const portalBaseURL = (): string=>{
    // return `${apiBaseUrl}/state`
    return `https://mxbrfrontend.${env}.cloud.wal-mart.com`;
}

export const resetPassWtihToken = (): string=>{
    return `${apiBaseUrl}/api/auth/updatePasswordWithToken`
    // return `https://mxbruserauthorization.${env}.cloud.wal-mart.com/api/auth/updatePasswordWithToken`;
}

export const changePassword = (): string=>{
    return `${apiBaseUrl}/api/auth/updatePassword`
    // return `https://mxbruserauthorization.${env}.cloud.wal-mart.com/api/auth/updatePassword`;
}




export const getTownsByState = (stateId: number): string => {
    return `${apiBaseUrl}/town?stateId=${stateId}`
    // return 'https://mxbraddressservice.' + env + '.cloud.wal-mart.com/town?stateId=' + stateId
}


export const getProfiles = (): string => {
    return `${apiBaseUrl}/propertyGet/profile`
    // return 'https://mxbrwpproperty.' + env + '.cloud.wal-mart.com/propertyGet/profile'
}

export const getPropertyTypes = (): string => {
    return `${apiBaseUrl}/propertyGet/propertyType`
    // return 'https://mxbrwpproperty.' + env + '.cloud.wal-mart.com/propertyGet/propertyType'
}

export const getLandUse = (): string => {
    return `${apiBaseUrl}/propertyGet/useFloor`
    // return 'https://mxbrwpproperty.' + env + '.cloud.wal-mart.com/propertyGet/useFloor'
}

export const errorApi = (): string => {
    return apiBaseUrl + 'errorrr'
}

export const getStores = (): string => {
    return `${apiBaseUrl}/propertyGet/storeAndCommercial`
    // return 'https://mxbrlocalcommercial.' + env + '.cloud.wal-mart.com/propertyGet/storeAndCommercial'
}


export const getStoresByState = (stateId:string | number): string => {
    return `${apiBaseUrl}/propertyGet/storeAndCommercial?stateId=${stateId}`
    // return 'https://mxbrlocalcommercial.' + env + '.cloud.wal-mart.com/propertyGet/storeAndCommercial?stateId=' + stateId
}

export const getStoresByStateFormat = (stateId:string | number, format:string): string => {
    return `${apiBaseUrl}/propertyGet/storeAndCommercial?stateId=${stateId}&format=${format}`
    // return 'https://mxbrlocalcommercial.' + env + '.cloud.wal-mart.com/propertyGet/storeAndCommercial?stateId=' + stateId + '&format=' + format
}


export const postOfferYourLandForm = (): string => {
    return `${apiBaseUrl}/property`
    // return 'https://mxbrofferusland.' + env + '.cloud.wal-mart.com/property'
}



export const getBusinessLine = (): string => {
    return `${apiBaseUrl}/propertyGet/LineBusiness`
    // return 'https://mxbrlocalcommercial.' + env + '.cloud.wal-mart.com/propertyGet/LineBusiness'
}

export const getLcFormatOptionsApi = (): string => {
    return `${apiBaseUrl}/propertyGet/formato`
    // return 'https://mxbrlocalcommercial.' + env + '.cloud.wal-mart.com/propertyGet/formato'
}

export const postRequestPremises = (): string => {
    return `${apiBaseUrl}/premises/savePremises`
    // return 'https://mxbrrequestforpremise.' + env + '.cloud.wal-mart.com/premises/savePremises'
}

export const postEventRequest = (): string => {
    return `${apiBaseUrl}/commercial-premises`
    return 'https://mxbrcommercialpremises.' + env + '.cloud.wal-mart.com/commercial-premises'
}

export const getStatusListApi = (): string => {
    return `${apiBaseUrl}/status`
    // return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/status'
}

export const getStateReportsListApi = (): string => {
    return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/states'
}


export const getReportsTableApi = (): string => {
    return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/status-filter'
}

export const getLCPropertyImage = (): string => {
    return `${apiBaseUrl}/propertyGet/commercial-image`
    // return 'https://mxbrlocalcommercial.' + env + '.cloud.wal-mart.com/propertyGet/commercial-image'
}





/* Suppliers Module Starts here */

export const postConstruction = (): string => {
    return `${apiBaseUrl}/construction`
    // return 'https://mxbrconstruction.' + env + '.cloud.wal-mart.com/construction'
}
export const postMaterials = (): string => {
    return `${apiBaseUrl}/material/save` 
    // return 'https://mxbrmaterialsreq.' + env + '.cloud.wal-mart.com/material/save'
}





/* Land Sale Module Starts here */

export const postNaturalPerson = (): string => {
    return `${apiBaseUrl}/store-registration-legal`
    // return 'https://mxbrlandsale.' + env + '.cloud.wal-mart.com/store-registration-natural'
}
export const postLegalEntity = (): string => {
    return `${apiBaseUrl}/store-registration-legal`
    // return 'https://mxbrexcessproperty.' + env + '.cloud.wal-mart.com/store-registration-legal'
}
export const putExcessPropURL = (): string=>{
    return 'https://mxbrcatalogue.'+ env +'.cloud.wal-mart.com/ExcessProperty'
}
// export const getTurnBusiness = (): string => {
//     return 'https://mxbrlandsale.' + env + '.cloud.wal-mart.com/line-business-person'
// }



export const getMeterSquares = (): string => {
    return `${apiBaseUrl}/landSales/MeterSquare`
    // return 'https://mxbrlandsalesorg.' + env + '.cloud.wal-mart.com/landSales/MeterSquare'
}

export const getNegotiations = (): string => {
    return `${apiBaseUrl}/landSales/Negotiation`
    // return 'https://mxbrlandsalesorg.' + env + '.cloud.wal-mart.com/landSales/Negotiation'
}
export const getLandSales = (): string => {
    return `${apiBaseUrl}/landSales/filter`
    // return 'https://mxbrlandsalesorg.' + env + '.cloud.wal-mart.com/landSales/filter'
}
export const getLandSalesRowsCount = (): string => {
    return apiBaseUrl + 'land-sale/get-table-rows-count'
}








/* ReportsModule Starts here */

/* Comercial */

export const getReportStoreOptions = (): string => {
    return 'https://mxbrreportcommercial.' + env + '.cloud.wal-mart.com/store'
}
export const getReportFormatOptions = (): string => {
    return 'https://mxbrreportcommercial.' + env + '.cloud.wal-mart.com/format'
}
export const getReportGuyOptions = (): string => {
    return 'https://mxbrreportcommercial.' + env + '.cloud.wal-mart.com/guy'
}
export const getReportComercials = (): string => {
    return 'https://mxbrreportcommercial.' + env + '.cloud.wal-mart.com/FilterData'
}
export const getLocaCommercialExportDataApi = (): string => {
    return 'https://mxbrreportcommercial.' + env + '.cloud.wal-mart.com/ExportData'
}



/* User */

export const getReportRoleOptions = (): string => {
    return 'https://mxbrreportusers.' + env + '.cloud.wal-mart.com/Role'
}
export const getReportSectionOptions = (): string => {
    return 'https://mxbrreportusers.' + env + '.cloud.wal-mart.com/Section'
}
export const getReportUser = (): string => {
    return 'https://mxbrreportusers.' + env + '.cloud.wal-mart.com/FilterData'
}
export const getUserExportApi = (): string => {
    return 'https://mxbrreportusers.' + env + '.cloud.wal-mart.com/ExportUserData'
}


/* Excess Property */

export const getReportNegotiationOptions = (): string => {
    return 'https://mxbrreportexcess.' + env + '.cloud.wal-mart.com/Negotiation'
}
export const getReportComboOptions = (): string => {
    return 'https://mxbrcatalogue.' + env + '.cloud.wal-mart.com/Combo'
}
export const getReportExcess = (): string => {
    return 'https://mxbrreportexcess.' + env + '.cloud.wal-mart.com/FilterData'
}
export const getExcessExportApi = (): string => {
    return 'https://mxbrreportexcess.' + env + '.cloud.wal-mart.com/ExportData'
}



/* Role */


export const getReportRole = (): string => {
    return 'https://mxbrreportroles.' + env + '.cloud.wal-mart.com/FilterData'
   
}

export const getRoleExportDataApi = (): string => {
    return 'https://mxbrreportroles.' + env + '.cloud.wal-mart.com/ExportData'
   
}






/* User Module  start here */
export const getUserListApi = (): string => {
    return 'https://mxbradminuser.' + env +'.cloud.wal-mart.com/api/FilterData'
}
export const getRoleOptionsApi = (): string => {
    return 'https://mxbradminuser.' + env + '.cloud.wal-mart.com/api/Role'
}
export const getStatusOptionsApi = (): string => {
    return 'https://mxbradminuser.' + env + '.cloud.wal-mart.com/api/Role'
}
export const getSectionOptionsApi = (): string => {
    return 'https://mxbradminuser.' + env + '.cloud.wal-mart.com/api/Section'
}
export const getFormatOptionsApi = (): string => {
    return 'https://mxbrreportcommercial.' + env + '.cloud.wal-mart.com/formatTerreno'
}
export const getStateOptionsApi = (): string => {
    return 'https://mxbraddressservice.' + env + '.cloud.wal-mart.com/state'
}

export const getMunicipilatyApi = (): string => {
    return `${apiBaseUrl}/town`
    // return  'https://mxbraddressservice.' + env + '.cloud.wal-mart.com/town'
}
export const postUserFormApi = (): string => {
    return 'https://mxbradminuser.' + env + '.cloud.wal-mart.com/api/createAndUpdate'
}

export const deleteUserApi = (): string => {
    return 'https://mxbradminuser.' + env + '.cloud.wal-mart.com/api/deleteInternalUser'
}





/******************************************* * Folio Tracking start here************************************* */


/* Local Comercial start here */
export const getFolioComercialsListApi = (): string => {
    return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/status-filter'
}
export const getFolioComercialsListExternalApi = (): string => {
    return `${apiBaseUrl}/external-status-terrano-boss-filter`
    // return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/external-status-terrano-boss-filter'
}
export const getFolioLcStatusOptionsApi = (): string => {
    return `${apiBaseUrl}/status`
    // return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/status'
}
export const getFolioLcStateOptionsApi = (): string => {
     return `${apiBaseUrl}/states`
    // return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/states'
}
export const getFolioUsersApi = (): string => {
    return ''
}
export const postFormDataApi = (): string => {
    return `${apiBaseUrl}/status`
    // return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/status'
}

/* Details Page Apis */
export const getLcFolioDetailApi = (): string => {
    return `${apiBaseUrl}/external-get-lc-byfolio`
    // return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/external-get-lc-byfolio'
}
export const getTerrenoFolioDetailApi = (): string => {
    return `${apiBaseUrl}/external-get-rp-byfolio`
    // return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/external-get-rp-byfolio'
}
export const getSupplierFolioDetailApi = (): string => {
    return `${apiBaseUrl}/external-get-supl-byfolio`
    // return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/external-get-supl-byfolio'
}

export const getLsFolioDetailApi = (): string => {
    return `${apiBaseUrl}/external-get-ep-byfolio`
    // return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/external-get-ep-byfolio'
}

/* Folio file download */
export const getLcFolioFilesApi = (): string => {
    return 'https://mxbrcommercialpremises.' + env + '.cloud.wal-mart.com/documentDownload'
}
export const getOfferLandFolioFilesApi = (): string => {
    return 'https://mxbrofferusland.' + env + '.cloud.wal-mart.com/documentDownload'
}
export const getSupplierConstructionFolioFilesApi = (): string => {
    return 'https://mxbrconstruction.' + env + '.cloud.wal-mart.com/documentDownload'
}
export const getLandSaleFolioFilesApi = (): string => {
    return 'https://mxbrlandsale.' + env + '.cloud.wal-mart.com/documentDownload'
}

/* Folio Details page users */ 

export const getFolioUsersExcessApi = (): string => {
    return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/getInternalUsersExcessProperty'
}
export const getFolioUsersLocalCommercialApi = (): string => {
    return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/getInternalUsersComm'
}
export const getFolioUsersSupplierApi = (): string => {
    return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/getInternalUsersSuppliers'
}
export const getFolioUsersOfferLandApi = (): string => {
    return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/getInternalUsersTerreno'
}

/* Folio assign user */
export const postAssignUserLcApi = (): string => {
    return 'https://mxbrcommercialpremises.' + env + '.cloud.wal-mart.com/updateUserIdByBoss'
}
export const postAssignUserSupplierMaterialApi = (): string => {
    return 'https://mxbrmaterialsreq.' + env + '.cloud.wal-mart.com/material/updateUserIdByBoss'
}

/* Folio change status */ 
export const postchangeFolioStatusApi = (): string => {
    return `${apiBaseUrl}/updateRecordStatusLocalCommercial`
    // return 'https://mxbrcommercialpremises.' + env + '.cloud.wal-mart.com/updateRecordStatus'
}
export const postchangeFolioStatusExcessPropertyApi = (): string => {
    return `${apiBaseUrl}/updateRecordStatusLandSale`
    // return 'https://mxbrlandsale.' + env + '.cloud.wal-mart.com/updateRecordStatus'
}
export const postchangeFolioStatusOfferLandApi = (): string => {
    return `${apiBaseUrl}/updateRecordStatusOfferLand`
    // return 'https://mxbrofferusland.' + env + '.cloud.wal-mart.com/updateRecordStatus'
}
export const postchangeFolioStatusMaterialApi = (): string => {
    return `${apiBaseUrl}/updateRecordStatusMaterial`
    // return 'https://mxbrmaterialsreq.' + env + '.cloud.wal-mart.com/material/updateRecordStatus'
}


/* FolioExport History */ 
export const getLcHistoryExportDataApi = (): string => {
    return `${apiBaseUrl}/exportHistoryLocalCommercials`
    // return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/exportHistoryLocalCommercials'
}
export const getLandSaleHistoryExportDataApi = (): string => {
    return `${apiBaseUrl}/exportHistoryExcessProperty`
    // return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/exportHistoryExcessProperty'
}
export const getOfferLandHistoryExportDataApi = (): string => {
    return `${apiBaseUrl}/exportHistoryTerreno`
    // return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/exportHistoryTerreno'
}
export const getSupplierHistoryExportDataApi = (): string => {
    return `${apiBaseUrl}/exportHistoryProviders`
    // return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/exportHistoryProviders'
}




/* Folio update status user */

/* Exess Property */

export const getFolioExcessPropertyListApi = (): string => {
    return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/excess-property-filter'
}
export const getFolioExcessPropertyListExternalApi = (): string => {
    return `${apiBaseUrl}/external-excess-property-terrano-boss-filter`
    // return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/external-excess-property-terrano-boss-filter'
}

/* Terrenos Land */
export const getMunicipilatyListApi = (): string => {
    return 'https://mxbrwpproperty.' + env + '.cloud.wal-mart.com/propertyGet/townByState'
}
export const getFolioTerrenosListApi = (): string => {
    return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/request-property-filter'
}
export const getFolioTerrenosListExternalApi = (): string => {
    return `${apiBaseUrl}/external-request-property-terrano-boss-filter`
    // return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/external-request-property-terrano-boss-filter'
}

export const validateUserDetails = (userName: string): any =>{
    return `https://mxbruserauthorization.` + env + `.cloud.wal-mart.com/validateEmail?username=${userName}`
}

/* Suppliers */
export const getFolioSupplierListApi = (): string => {
    return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/request-provider-filter'
}
export const getFolioSupplierListExternalApi = (): string => {
    return `${apiBaseUrl}/external-request-provider-terrano-boss-filter`
    // return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/external-request-provider-terrano-boss-filter'
}


export const postChangeFolioActiveApi = (): string => {
    return 'https://mxbrfoliotracking.' + env + '.cloud.wal-mart.com/update-active-status'
}


/******************************************* Admin Roles CRUD ************************************* */
export const getAllMenusApi = (): string => {
    return `${apiBaseUrl}/allMenu`
    // return 'https://mxbradminroles.' + env + '.cloud.wal-mart.com/allMenu'
}

export const getSectionsApi = (): string => {
    return 'https://mxbradminroles.' + env + '.cloud.wal-mart.com/Section'
}
export const getRolesApi = (): string => {
    return 'https://mxbradminroles.' + env + '.cloud.wal-mart.com/Role'
}

export const getRolePermissionsApi = (): string => {
    return 'https://mxbradminroles.' + env + '.cloud.wal-mart.com/FilterData'
}
export const getPostRoleFormApi = (): string => {
    return 'https://mxbradminroles.' + env + '.cloud.wal-mart.com/createAndUpdate'
}








/******************************************* Login and authorization ************************************* */
export const getInternalUserTokenApi = (): string => {
    return 'https://mxbrUserAuthorization.' + env + '.cloud.wal-mart.com/api/auth/internal-login'
}
export const getInternalUserAuthApi = (): string => {
    return 'https://mxbrUserAuthorization.' + env + '.cloud.wal-mart.com/api/getAutho'
}
export const getAccessTokenWithRefreshTokenApi = (): string => {
    return `${apiBaseUrl}/api/auth/refreshToken`
    // return 'https://mxbrUserAuthorization.' + env + '.cloud.wal-mart.com/api/auth/refreshToken'
}
export const getExternalUserAuthApi = (): string => {
    return `${apiBaseUrl}/api/auth/external-login`
    return 'https://mxbrUserAuthorization.' + env + '.cloud.wal-mart.com/api/auth/external-login'
}

export const getLoginWithUsernameApi = (): string => {
    return `${apiBaseUrl}/api/auth/loginAuth`
    // return 'https://mxbrUserAuthorization.' + env + '.cloud.wal-mart.com/api/auth/loginAuth'
}
export const getAuthorizeDbUserApi = (): string => {
    return `${apiBaseUrl}/api/getEnternalAutho`
    // return 'https://mxbruserauthorization.' + env + '.cloud.wal-mart.com/api/getEnternalAutho'
}
export const logOutUserApi = (): string => {
    return `${apiBaseUrl}/api/logout-user`
    return 'https://mxbruserauthorization.' + env + '.cloud.wal-mart.com/api/logout-user'
}



/******************************************* COntact us************************************* */


export const getPostContactFormApi = (): string => {
    return `${apiBaseUrl}/send`
    // return 'https://mxbrinterestcontact.' + env + '.cloud.wal-mart.com/send'
}
export const getInterestSectionOptionsApi = (): string => {
    return 'https://mxbrinterestcontact.' + env + '.cloud.wal-mart.com/Section'
}
export const getContactSectionOptionsApi = (): string => {
    return `${apiBaseUrl}/Contact`
    // return 'https://mxbrinterestcontact.' + env + '.cloud.wal-mart.com/Contact'
}




/*******************************************  Admin General Contact************************************* */

export const getContactsListApi = (): string => {
    return 'https://mxbrcontacts.' + env + '.cloud.wal-mart.com/contact/getContacts'
}
export const getContactPostApi= (): string => {
    return 'https://mxbrcontacts.' + env + '.cloud.wal-mart.com/contact/updateContact'
}

export const getMenuSearchListApi = (): string => {
    return 'https://mxbradminmenu.' + env + '.cloud.wal-mart.com/menu/search'    
}
export const getMenuListApi= (): string => {
    return 'https://mxbradminmenu.' + env + '.cloud.wal-mart.com/menu/getMenus'
}
export const getMenuStatusOptionsApi= (): string => {
    return 'https://mxbradminmenu.' + env + '.cloud.wal-mart.com/menu/getMenus'
}
export const getPublicOptionsApi= (): string => {
    return 'https://mxbradminmenu.' + env + '.cloud.wal-mart.com/menu/getMenus'
}


export const getMenuParentApi= (): string => {
    return 'https://mxbradminmenu.' + env + '.cloud.wal-mart.com/menu/getParentMenus'
}
export const getMenuOrderNumberApi= (): string => {
    return 'https://mxbradminmenu.' + env + '.cloud.wal-mart.com/menu/getMenuOrderNumber'
}
export const getMenuDeleteApi= (): string => {
    return 'https://mxbradminmenu.' + env + '.cloud.wal-mart.com/menu/deleteMenu'
}
export const getMenuCreateApi= (): string => {
    return 'https://mxbradminmenu.' + env + '.cloud.wal-mart.com/menu/addMenu'
}
export const getMenuUpdateApi= (): string => {
    return 'https://mxbradminmenu.' + env + '.cloud.wal-mart.com/menu/updateMenu'
}






/*******************************************  Admin Content ************************************* */

export const getEachImageApi = (): string => {
    return 'https://mxbrimages.' + env + '.cloud.wal-mart.com/getEachImage'
}
export const getImagesListApi = (): string => {
    return 'https://mxbrimages.' + env + '.cloud.wal-mart.com/image'
}
export const getImagePutApi = (): string => {
    return 'https://mxbrimages.' + env + '.cloud.wal-mart.com/article'
}
export const getImagePostApi = (): string => {
    return 'https://mxbrimages.' + env + '.cloud.wal-mart.com/image'
}
export const getDeleteImageApi = (): string => {
    return 'https://mxbrimages.' + env + '.cloud.wal-mart.com/image/'
}
export const getImageSectionApi = (): string => {
    return 'https://mxbrimages.' + env + '.cloud.wal-mart.com/sections'
}
export const getImageBySectionApi = (): string => {
    return `${apiBaseUrl}/imageBySection`
    // return 'https://mxbrimages.' + env + '.cloud.wal-mart.com/imageBySection'
}


/* Description */ 
export const getDescriptionCreateApi = (): string => {
    return 'https://mxbrdescription.' + env + '.cloud.wal-mart.com/description'
}
export const getDescriptionListApi = (): string => {
    return `${apiBaseUrl}/FilterDatadescription`
    // return 'https://mxbrdescription.' + env + '.cloud.wal-mart.com/FilterData'
}
export const getDeleteDescriptionApi = (): string => {
    return 'https://mxbrdescription.' + env + '.cloud.wal-mart.com/deleteDescription'
}
export const getPageOptionsApi = (): string => {
    return 'https://mxbrdescription.' + env + '.cloud.wal-mart.com/descriptionAssignedPages'
}

/* Frequent Questions */ 
export const getQuestionsListApi = (): string => {
    return 'https://mxbrinterestfaq.' + env + '.cloud.wal-mart.com/filterQuestions'
}
export const postQuestionApi = (): string => {
    return `${apiBaseUrl}/questions`
    // return 'https://mxbrinterestfaq.' + env + '.cloud.wal-mart.com/questions'
}
export const deleteQuestionApi = (): string => {
    return 'https://mxbrinterestfaq.' + env + '.cloud.wal-mart.com/deleteQuestions'
}






/* News */ 
export const getNewsCreateApi = (): string => {
    return 'https://mxbrnews.' + env + '.cloud.wal-mart.com/article'
}
export const getNewsListApi = (): string => {
    return `${apiBaseUrl}/getArticle`
    // return 'https://mxbrnews.' + env + '.cloud.wal-mart.com/getArticle'
}
export const getDeleteNewsApi = (): string => {
    return 'https://mxbrnews.' + env + '.cloud.wal-mart.com/article/'
}
/*HomePage NoAuthToken Required*/
export const getNewsListHomeApi = ():string => {
    return `${apiBaseUrl}/getArticle`
    // return 'https://mxbrnews.' + env + '.cloud.wal-mart.com/getArticle'
}


/* Notes */ 
export const getNoteListApi = (): string => {
    return `${apiBaseUrl}/FilterDataadminnote`
    // if(env == 'devtest'){
    //     return 'https://mxbradminnote.devtest1.cloud.wal-mart.com/FilterData'  
    // }
    // return 'https://mxbradminnote.' + env + '.cloud.wal-mart.com/FilterData'
}
export const postNoteFormApi = (): string => {
    if(env == 'devtest'){
        return 'https://mxbradminnote.devtest1.cloud.wal-mart.com/Create'  
    }
    return 'https://mxbradminnote.' + env + '.cloud.wal-mart.com/Create'
}
export const deleteNoteApi = (id: number): string => {
    if(env == 'devtest'){
        return `https://mxbradminnote.devtest1.cloud.wal-mart.com/deleteNote?id=${id}`  
    }
    return `https://mxbradminnote.${env}.cloud.wal-mart.com/deleteNote?id=${id}`;
}




/* Suppliers */ 
export const getSuppliersListApi = (): string => {
    return 'https://mxbradminsupplier.' + env + '.cloud.wal-mart.com/Supplier'
} 
export const getSaveSupplierApi = (): string => {
    return 'https://mxbradminsupplier.' + env + '.cloud.wal-mart.com/CreateUpdate'
} 
export const getDeleteSupplierApi = (): string => {
    return 'https://mxbradminsupplier.' + env + '.cloud.wal-mart.com/delete'
} 


/* Catalog Local Commercial*/


export const getCatalogLcListApi = (): string => {
    return 'https://mxbrcataloguewarehouse.' + env + '.cloud.wal-mart.com/FilterData'
} 
export const getCatalogLcStateOptionsApi = (): string => {
    return 'https://mxbrcataloguewarehouse.' + env + '.cloud.wal-mart.com/State'
} 
export const getCatalogLcFormatOptionsApi = (): string => {
    return 'https://mxbrcataloguewarehouse.' + env + '.cloud.wal-mart.com/format'
} 
export const postCatalogLcUpdateApi = (): string => {
    return 'https://mxbrcataloguewarehouse.' + env + '.cloud.wal-mart.com/createAndUpdate' 
} 
export const getDeterminantDataApi = (): string => {
    return 'https://mxbrcataloguewarehouse.' + env + '.cloud.wal-mart.com/Determinant'
    //return 'https://mxbrcataloguewarehouse.dev.cloud.wal-mart.com/Determinant' 
} 
export const getDeterminantDeleteApi = (id:number): string => {
    //return 'https://mxbrcataloguewarehouse.' + env + '.cloud.wal-mart.com/deleteStore?storeId=${id}'
    //return 'https://mxbrcataloguewarehouse.dev.cloud.wal-mart.com/deleteStore' 

    return `https://mxbrcataloguewarehouse.${env}.cloud.wal-mart.com/deleteStore?storeId=${id}`;
} 


// dev url chagnes making them dynamic

export const externalUserDocUpload = (): string => {
    return 'https://mxbrcatalogupload.' + env + '.cloud.wal-mart.com/externaluserdoc/upload'; 
} 

export const catalogUpload = (): string => {
    return 'https://mxbrcatalogupload.' + env + '.cloud.wal-mart.com/catalog/upload'; 
} 

export const uploadFilesOfferUsLand = (): string =>{
    return `${apiBaseUrl}/uploadofferusland`
    // return 'https://mxbrofferusland.' + env + '.cloud.wal-mart.com/upload'; 
}

export const uploadFiles = (): string => {
    return `${apiBaseUrl}/uploadfileupload`
    // return 'https://mxbrfileupload.' + env + '.cloud.wal-mart.com/upload'; 
} 

export const uploadFilesCatalog = (): string => {
    return 'https://mxbrCatalogueWarehouse.' + env + '.cloud.wal-mart.com/uploadLcImage'; 
} 

export const uploadFiles1 = (): string => {
    return `${apiBaseUrl}/uploadcommercialpremises`
    // return 'https://mxbrcommercialpremises.' + env + '.cloud.wal-mart.com/upload'; 
} 

export const uploadFilesExePCatlogPdf = (): string => {
    return 'https://mxbrcatalogue.' + env + '.cloud.wal-mart.com/upload-pdf'; 
} 

export const uploadFilesExePCatlogImgs = (): string => {
    return 'https://mxbrcatalogue.' + env + '.cloud.wal-mart.com/upload-images'; 
} 

export const uploadFilesLocalComercial = (): string => {
    return `${apiBaseUrl}/uploadcommercialpremises`
    // return 'https://mxbrcommercialpremises.' + env + '.cloud.wal-mart.com/upload'; 
} 

export const uploadFilesMaterial = (): string => {
    return `${apiBaseUrl}/uploadmaterial`
    // return 'https://mxbrmaterialsreq.' + env + '.cloud.wal-mart.com/upload'; 
} 

export const deleteExcessProperty= (id: number)=>{
    return `https://mxbrcatalogue.${env}.cloud.wal-mart.com/ExcessProperty/${id}`;
}

 /* Frequent Questions api */

 
 export const getFrequentQuestionsApi = (): string => {
    return `${apiBaseUrl}/questions`
    // return 'https://mxbrinterestfaq.' + env + '.cloud.wal-mart.com/questions'; 
} 
 export const postFrequentQuestionScoreApi = (): string => {
     return `${apiBaseUrl}/insertScore`
    // return 'https://mxbrinterestfaq.' + env + '.cloud.wal-mart.com/insertScore'; 
} 
