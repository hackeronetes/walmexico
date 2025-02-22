import CustomAxios from "../../utility/customAxios"
import {

    getFolioComercialsListApi, getFolioLcStatusOptionsApi, getFolioLcStateOptionsApi, getFolioUsersApi, getFolioComercialsListExternalApi,
    getFolioExcessPropertyListApi, getMunicipilatyListApi, getFolioTerrenosListApi,postFormDataApi, validateUserDetails,
    getFolioSupplierListApi, getFolioTerrenosListExternalApi, getFolioSupplierListExternalApi, getFolioExcessPropertyListExternalApi,
    getLcFolioDetailApi, getTerrenoFolioDetailApi, getSupplierFolioDetailApi, getLsFolioDetailApi, 
    getLcFolioFilesApi, getOfferLandFolioFilesApi, getSupplierConstructionFolioFilesApi,
    getFolioUsersExcessApi, getFolioUsersLocalCommercialApi, getFolioUsersSupplierApi, getFolioUsersOfferLandApi,
    postAssignUserLcApi,postAssignUserSupplierMaterialApi, 
    postchangeFolioStatusApi, postchangeFolioStatusMaterialApi,postchangeFolioStatusExcessPropertyApi, postchangeFolioStatusOfferLandApi, 
    getLcHistoryExportDataApi, getLandSaleHistoryExportDataApi, getOfferLandHistoryExportDataApi, getSupplierHistoryExportDataApi,
    postChangeFolioActiveApi

} from "../../resources/api-constants";
import { removeEmptyKeys } from "../../utility/commonFunctions";


/* Folio Tracking Local Comercial Premises start here */

export function getStatusOptions() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getFolioLcStatusOptionsApi())).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}
export function getLcFolioDetail(folioId:any) {
    return new Promise((resolve, reject) => {

        CustomAxios.post(getLcFolioDetailApi(), 
            {folioId: folioId}  ,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then((response) => {
           
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });
        

    });
}


export function getFolioUsers() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getFolioUsersApi())).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}


export function     postFormData(formValues: any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(postFormDataApi(), 
            formValues,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

export function getStateOptions(params:any) {
    return new Promise((resolve, reject) => {
        CustomAxios.get(getFolioLcStateOptionsApi(), {params:params}).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}


export interface FolioLocalComerTableSearchParams {
    state?: any,
    status?: any,
    recieptStartDate?: any,
    recieptEndDate?: any,
    updateStartDate?: any,
    updateEndDate?: any,
    folio?: any,
    export?: boolean,
    userId?: any
    
    
}
export function getFolioLocalComercialList(searchParams: FolioLocalComerTableSearchParams) {
    
    let params:FolioLocalComerTableSearchParams = removeEmptyKeys(searchParams)

        return new Promise((resolve, reject) => {
        CustomAxios.get(getFolioComercialsListApi(),  { params: params  }).then((response) => {
           
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
 
}


export function getFolioLocalComercialListExternal(searchParams: any) {
   
    let params:any = removeEmptyKeys(searchParams)
    

        return new Promise((resolve, reject) => {
        CustomAxios.get(getFolioComercialsListExternalApi(),  { params: params  }).then((response) => {
           
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
 
}



/***************  Folio Tracking Excess Property start here  ************************************* */


export interface FolioExcessPropertySearchParams {
    state?: string,
    status?: string,
    recieptStartDate?: string,
    recieptEndDate?: string,
    updateStartDate?: string,
    updateEndDate?: string,
    folio?: string,
    export?: boolean
    
    
}

export function getFolioExcessPropertyList(searchParams: FolioExcessPropertySearchParams) {
   
    let params:FolioExcessPropertySearchParams = removeEmptyKeys(searchParams)

        return new Promise((resolve, reject) => {
        CustomAxios.get(getFolioExcessPropertyListApi(),  { params: params  }).then((response) => {
           
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
    
    

}

export function getFolioExcessPropertyExternalList(searchParams: FolioExcessPropertySearchParams) {
   

    let params:FolioExcessPropertySearchParams = removeEmptyKeys(searchParams)

        return new Promise((resolve, reject) => {
        CustomAxios.get(getFolioExcessPropertyListExternalApi(),  { params: params  }).then((response) => {
           
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
    
    

}


/***************  Folio Tracking Terrenos Land start here  ************************************* */

export function getMunicipilatyOptions(state: string | number) {
   
    return new Promise((resolve, reject) => {
        CustomAxios.get(getMunicipilatyListApi(),  { params: {stateId: state}  }).then((response) => {
           
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
    
    

}


export function getLsFolioDetail(folioId:any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(getLsFolioDetailApi(), 
        {folioId: folioId}  ,
        {
            headers: {
                "Content-Type": "application/json"
            }
            }
        ).then((response) => {
           
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

       

    });
}



export interface FolioLandSearchParams {
    state?: string,
    municipilaty?: string,
    status?: string,
    recieptStartDate?: any,
    recieptEndDate?: any,
    updateStartDate?: any,
    updateEndDate?: any,
    folio?: string,
    export?: boolean
    userId?: any
    
}

export function getFolioTerrenosList(searchParams: FolioLandSearchParams) {
   
    let params:FolioLandSearchParams = removeEmptyKeys(searchParams)

        return new Promise((resolve, reject) => {
        CustomAxios.get(getFolioTerrenosListApi(),  { params: params  }).then((response) => {
           
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
    
    

}

export function getFolioLandSaleListExternal(searchParams: any) {
    
    let params:FolioLandSearchParams = removeEmptyKeys(searchParams)

        return new Promise((resolve, reject) => {
        CustomAxios.get(getFolioTerrenosListExternalApi(),  { params: params  }).then((response) => {
           
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
    
    

}






/***************  Folio Tracking Supplier Provvedores start here  ************************************* */


export interface FolioSupplierTableSearchParams {
    form?: string | number,
    status?: string,
    recieptStartDate?: any,
    recieptEndDate?: any,
    updateStartDate?: any,
    updateEndDate?: any,
    folio?: string,
    export?: boolean,
    userId? : any
    
    
}
export function getFolioSupplierList(searchParams: FolioSupplierTableSearchParams) {
    
    let params:FolioSupplierTableSearchParams = removeEmptyKeys(searchParams)

        return new Promise((resolve, reject) => {
        CustomAxios.get(getFolioSupplierListApi(),  { params: params  }).then((response) => {
           
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
    
    

}


export function getFolioSupplierListExternal(searchParams: FolioSupplierTableSearchParams) {
    
    let params:FolioSupplierTableSearchParams = removeEmptyKeys(searchParams)

        return new Promise((resolve, reject) => {
        CustomAxios.get(getFolioSupplierListExternalApi(),  { params: params  }).then((response) => {
           
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
    
    

}

export function getSupplierFolioDetail(params:any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(getSupplierFolioDetailApi(), 
        params ,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then((response) => {
           
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });
        

    });
}


export function getTerrenoFolioDetail(folioId:any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(getTerrenoFolioDetailApi(), 
            {folioId: folioId}  ,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

//getting valid user details

export function getValidUserDetails(userName: string){
    return new Promise((resolve, reject)=>{
        CustomAxios.get(validateUserDetails(userName)).then((response)=>{
            resolve(response);
        })
        .catch((error)=>{
            reject(error)
        })
    })
}




/* file download */

export function getLcFolioFiles(folioId:any) {
    return new Promise((resolve, reject) => {
        CustomAxios.get(getLcFolioFilesApi(),  { params: {requestId: folioId}  }).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}
export function getOfferLandFolioFiles(folioId:any) {
    return new Promise((resolve, reject) => {
        CustomAxios.get(getOfferLandFolioFilesApi(),  { params: {requestId: folioId}  }).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}
export function getSupplierConstructionFolioFiles(folioId:any) {
    return new Promise((resolve, reject) => {
        CustomAxios.get(getSupplierConstructionFolioFilesApi(),  { params: {requestId: folioId}  }).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}


/* get users */
export function getFolioUsersExcess(params:any) {
    return new Promise((resolve, reject) => {

        CustomAxios.post(getFolioUsersExcessApi(), 
            params  ,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then((response) => {
           
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });
        
    });
}
export function getFolioUsersLocalCommercial(params:any) {
    return new Promise((resolve, reject) => {

        CustomAxios.post(getFolioUsersLocalCommercialApi(), 
            params ,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then((response) => {
           
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });
       

    });
}
export function getFolioUsersSupplier(params:any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(getFolioUsersSupplierApi(), 
            params,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then((response) => {
           
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });
       

    });
}
export function getFolioUsersOfferLand(params:any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(getFolioUsersOfferLandApi(), 
            params  ,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then((response) => {
           
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}




/* assign folio user */

export function postAssignUserLc(formValues: any) {
   return new Promise((resolve, reject) => {
        CustomAxios.post(postAssignUserLcApi(), 
            formValues,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

export function postAssignUserSupplierMaterial(formValues: any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(postAssignUserSupplierMaterialApi(), 
            formValues,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}





/*   change status  */
export function postchangeFolioStatus(formValues: any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(postchangeFolioStatusApi(), 
            formValues,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}
export function postchangeFolioStatusExcessProperty(formValues: any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(postchangeFolioStatusExcessPropertyApi(), 
            formValues,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}
export function postchangeFolioStatusOfferLand(formValues: any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(postchangeFolioStatusOfferLandApi(), 
            formValues,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}
export function postchangeFolioStatusMaterial(formValues: any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(postchangeFolioStatusMaterialApi(), 
            formValues,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}



/* Export Folio Status History */
export function getLcHistoryExportData(params:any) {
    return new Promise((resolve, reject) => {

        CustomAxios.post(getLcHistoryExportDataApi(), 
            params,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then((response) => {
           
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });
       

    });
}
export function getOfferLandHistoryExportData(params:any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(getOfferLandHistoryExportDataApi(), 
            params ,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then((response) => {
           
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });
        
       
    });
}
export function getLandSaleHistoryExportData(params:any) {
    return new Promise((resolve, reject) => {

        CustomAxios.post(getLandSaleHistoryExportDataApi(), 
            params ,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then((response) => {
           
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });
       

    });
}
export function getSupplierHistoryExportData(params:any) {
    return new Promise((resolve, reject) => {

        CustomAxios.post(getSupplierHistoryExportDataApi(), 
            params  ,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then((response) => {
           
            resolve(response)
                //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}



export function postChangeFolioActive(formValues: any) {
    return new Promise((resolve, reject) => {
        CustomAxios.put(postChangeFolioActiveApi() + '/' + formValues._id, 
            formValues,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}