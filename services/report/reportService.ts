import CustomAxios from "../../utility/customAxios"
import {
    getReportStoreOptions, getReportFormatOptions, getReportGuyOptions, getReportComercials,
    getReportRoleOptions, getReportSectionOptions, getReportUser, getUserExportApi,
    getReportNegotiationOptions, getReportComboOptions, getReportExcess, getExcessExportApi, getLocaCommercialExportDataApi,
    getReportRole , getRoleExportDataApi, deleteExcessProperty
} from "../../resources/api-constants";
import { removeEmptyKeys } from "../../utility/commonFunctions";


/* Report Local Comercial Premises start here */

export function getStoreOptions() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getReportStoreOptions())).then((response) => {
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}


export function getFormatOptions() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getReportFormatOptions())).then((response) => {
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}
export function getGuyOptions() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getReportGuyOptions())).then((response) => {
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}


export interface ReportComercialTableSearchParams {
    state?: string,
    store?: string,
    format?: string,
    guy?: string,
    
    
}
export function getReportComercialList(searchParams: ReportComercialTableSearchParams) {
    
    

    let params:ReportComercialTableSearchParams = removeEmptyKeys(searchParams)

        return new Promise((resolve, reject) => {
        CustomAxios.get(getReportComercials() , {params: params}
            
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


export function getLocaCommercialExportData(searchParams: ReportExcessTableSearchParams) {
  
    let params:ReportExcessTableSearchParams = removeEmptyKeys(searchParams)

        return new Promise((resolve, reject) => {
        CustomAxios.get(getLocaCommercialExportDataApi(),  { params: params  }).then((response) => {
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
    
    

}






/* Report User Premises start here */

export function getRoleOptions(sectionId: any) {
    let params = removeEmptyKeys({sectionId: sectionId})
    
        return new Promise((resolve, reject) => {
            CustomAxios.get(getReportRoleOptions(), {params: params}).then((response) => {
                resolve(response)
                 //setPost(response.data);
            })
            .catch((error) => {
                console.log('errorApiTest', error)
                reject(error)
            });
    
        });
}


export function getSectionOptions() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getReportSectionOptions())).then((response) => {
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}



export interface ReportUserTableSearchParams {
    role?: string,
    section?: string,
    user?: string,
    
    
}
export function getReportUserList(searchParams: ReportUserTableSearchParams) {
    

    let params:ReportUserTableSearchParams = removeEmptyKeys(searchParams)

        return new Promise((resolve, reject) => {
        CustomAxios.get(getReportUser(),  { params: params  }).then((response) => {
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });

}


export function getUserExportData(searchParams: ReportExcessTableSearchParams) {
    
    let params:ReportExcessTableSearchParams = removeEmptyKeys(searchParams)

        return new Promise((resolve, reject) => {
        CustomAxios.get(getUserExportApi(),  { params: params  }).then((response) => {
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
    
    

}









export function deleteExcessPropertyRow(id:any) {

    return new Promise((resolve, reject) => {
        CustomAxios.get(deleteExcessProperty(id)).then((response) => {
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

/* Report Excess Property Premises start here */

export function getNegotiationOptions() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getReportNegotiationOptions())).then((response) => {
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}


export function getComboOptions() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getReportComboOptions())).then((response) => {
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}



export interface ReportExcessTableSearchParams {
    state?: string,
    asset?: string,
    negotiation?: string,
    combo?: string,
    
    
}

export function getReportExcessList(searchParams: ReportExcessTableSearchParams) {
   

    let params:ReportExcessTableSearchParams = removeEmptyKeys(searchParams)

        return new Promise((resolve, reject) => {
        CustomAxios.get(getReportExcess(),  { params: params  }).then((response) => {
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
    
    

}

export function getExcessExportData(searchParams: ReportExcessTableSearchParams) {
   
    

    let params:ReportExcessTableSearchParams = removeEmptyKeys(searchParams)

        return new Promise((resolve, reject) => {
        CustomAxios.get(getExcessExportApi(),  { params: params  }).then((response) => {
             resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
    
    

}



/* Report Role start here */

export interface ReportRoleTableSearchParams {
    state?: string,
    store?: string,
    format?: string,
    fuy?: string,
    
    
}
export function getReportRoleList(searchParams: ReportRoleTableSearchParams) {
    

    let params:ReportRoleTableSearchParams = removeEmptyKeys(searchParams)

        return new Promise((resolve, reject) => {
        CustomAxios.get(getReportRole(),  { params: params  }).then((response) => {
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
    
    

}




export function getRoleExportData(searchParams: ReportExcessTableSearchParams) {
    

    let params:ReportExcessTableSearchParams = removeEmptyKeys(searchParams)

        return new Promise((resolve, reject) => {
        CustomAxios.get(getRoleExportDataApi(),  { params: params  }).then((response) => {
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
    
    

}

