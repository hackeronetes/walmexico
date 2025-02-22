import CustomAxios from "../../utility/customAxios"
import {
    getContactsListApi, getContactPostApi, getMenuListApi, getMenuSearchListApi, getPublicOptionsApi, getMenuStatusOptionsApi,
    getCatalogLcStateOptionsApi, getCatalogLcFormatOptionsApi, getCatalogLcListApi, getReportGuyOptions,
    postCatalogLcUpdateApi , getDeterminantDataApi,getDeterminantDeleteApi,
    getMenuOrderNumberApi, getMenuParentApi, getMenuUpdateApi, getMenuCreateApi, getMenuDeleteApi,
    uploadFilesCatalog
} from "../../resources/api-constants";
import { removeEmptyKeys } from "../../utility/commonFunctions";
// import { getDeleteDescriptionApi } from './../../resources/api-constants';



export function getContactsList() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getContactsListApi())).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}


export function postContactForm(formValues: any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(getContactPostApi(), 
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



/* Menu start here */


export function getMenuList(searchParams:any) {

    let params:any = removeEmptyKeys(searchParams)

    return new Promise((resolve, reject) => {
        CustomAxios.get(getMenuListApi(),   { params: params  }).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

export function getMenuSearchApi(searchParams:any) {

    let params:any = removeEmptyKeys(searchParams)

    return new Promise((resolve, reject) => {
        CustomAxios.get(getMenuSearchListApi(),   { params: params  }).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

export function getStatusOptions() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getMenuStatusOptionsApi())).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

export function getPublicOptions() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getPublicOptionsApi())).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

export function getMenuParentOptions() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getMenuParentApi())).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

export function getMenuOrderNoOptions(params:any) {
    return new Promise((resolve, reject) => {
        CustomAxios.get(getMenuOrderNumberApi(),   { params: params  }).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

export function deleteMenu(params:any) {
    return new Promise((resolve, reject) => {
        CustomAxios.delete(getMenuDeleteApi(),   { params: params  }).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

export function deleteDeterminantData(params:any){
    return new Promise((resolve, reject) => {
        CustomAxios.delete(getDeterminantDeleteApi(params)).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });  
}


export function postContactFormCreate(formValues: any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(getMenuCreateApi(), 
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
export function postContactFormUpdate(formValues: any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(getMenuUpdateApi(), 
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




/* Catalog Local Commercial */

export function getStateOptions() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getCatalogLcStateOptionsApi())).then((response) => {
           
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
        CustomAxios.get((getCatalogLcFormatOptionsApi())).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

export function getCatalogLcList(searchParams:any) {
    let params:any = removeEmptyKeys(searchParams)
    
        return new Promise((resolve, reject) => {
            CustomAxios.get(getCatalogLcListApi(),   { params: params  }).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

export function getDeterminantData(determinant:any) {
   
        return new Promise((resolve, reject) => {
            CustomAxios.get(getDeterminantDataApi(),   { params: {determinantId: determinant }  }).then((response) => {
           
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
            CustomAxios.get(getReportGuyOptions()).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}




export function postCatalogLcApi(formValues: any) {
   
    return new Promise((resolve, reject) => {
        CustomAxios.post(postCatalogLcUpdateApi(), 
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



export function postCatalogLcImage(formValues: any) {
    
    return new Promise((resolve, reject) => {
        CustomAxios.post(uploadFilesCatalog(), 
            formValues,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
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