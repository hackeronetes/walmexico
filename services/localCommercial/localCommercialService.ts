import CustomAxios from "../../utility/customAxios"
import { getStates, errorApi, getTownsByState, 
    getStores, getStoresByState, postOfferYourLandForm,
     getProfiles, getPropertyTypes, getLandUse, getBusinessLine, postRequestPremises, postEventRequest, getStoresByStateFormat,
     getStateReportsListApi, getStatusListApi, getReportsTableApi, getLcFormatOptionsApi
} from "../../resources/api-constants";


export function getStateList() {
    
    return new Promise((resolve, reject) => {
        CustomAxios.get((getStates())).then((response) => {
            
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}


export function getTownsList(stateId:number) {
    
    return new Promise((resolve, reject) => {
        CustomAxios.get((getTownsByState(stateId))).then((response) => {
            
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

export function getProfileList() {
    
    return new Promise((resolve, reject) => {
        CustomAxios.get((getProfiles())).then((response) => {
            
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

export function getPropertyType() {
    
    return new Promise((resolve, reject) => {
        CustomAxios.get((getPropertyTypes())).then((response) => {
            
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

export function getLandUseList() {
    
    return new Promise((resolve, reject) => {
        CustomAxios.get((getLandUse())).then((response) => {
            
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}




export function getStoreList() {

    
    return new Promise((resolve, reject) => {

       
        CustomAxios.get((getStores())).then((response) => {
            
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}


export function getStoreByStateList(stateId: string | number) {
    return new Promise((resolve, reject) => {

        
        
        CustomAxios.get((getStoresByState(stateId))).then((response) => {
            
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

export function getStoreByStateFormatList(stateId: string | number, format: string) {
    return new Promise((resolve, reject) => {

        CustomAxios.get((getStoresByStateFormat(stateId, format))).then((response) => {
            
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}


export function postOfferLandForm(formValues:any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(postOfferYourLandForm(), 
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

export function getBusinessLineOptions() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getBusinessLine())).then((response) => {
            
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

export function errorApiTest() {
    
    return new Promise((resolve, reject) => {
        CustomAxios.get((errorApi())).then((response) => {
            
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        })
    });
}


export function postRequestPremisesForm(formValues:any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(postRequestPremises(), 
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

export function postEventRequestForm(formValues:any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(postEventRequest(), 
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



export interface GetFolioLcStoreListParams {
    sortColoumn?: string,
    sortOrder?: string,
    state?: string,
    status?: string,
    recieptStartDate?: string,
    recieptEndDate?: string,
    updateStartDate?: string,
    updateEndDate?: string,
    folio?: string,
    
}

export function getFolioLcTableList(params:GetFolioLcStoreListParams) {
    
    console.log('getFolioLcTableList', params);
    
    return new Promise((resolve, reject) => {


        CustomAxios.get((getReportsTableApi())).then((response) => {
            
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

export function getFolioLcTableRowsCount(params:GetFolioLcStoreListParams) {
    
    console.log('getFolioLcTableList', params);
    
    return new Promise((resolve, reject) => {

        console.log('getStoresByState', reject)

        let res = {
            data: {
                count: 5,
            }
        }
        resolve(res)

       

    });
}

export function getStatusList() {
    
    return new Promise((resolve, reject) => {
       

        CustomAxios.get((getStatusListApi())).then((response) => {
            
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}


export function getStateReportsList() {
    
   
    return new Promise((resolve, reject) => {
       

        CustomAxios.get((getStateReportsListApi())).then((response) => {
            
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
        CustomAxios.get((getLcFormatOptionsApi())).then((response) => {
            
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}