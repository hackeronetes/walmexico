import CustomAxios from "../../utility/customAxios"

import {
    getUserListApi, getSectionOptionsApi, getStateOptionsApi, getFormatOptionsApi, getMunicipilatyApi,
    getRoleOptionsApi, getStatusOptionsApi, postUserFormApi, deleteUserApi
} from "../../resources/api-constants";
import { removeEmptyKeys } from "../../utility/commonFunctions";



/* User start here */
export function getStatusOptions() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getStatusOptionsApi())).then((response) => {
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}
export function getRoleOptions(searchParams:any) {
    let params:UserSearchParams = removeEmptyKeys(searchParams)
    return new Promise((resolve, reject) => {
        CustomAxios.get(getRoleOptionsApi(),   { params: params  }).then((response) => {
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}
export function getSectionOptions(searchParams: any) {
    return new Promise((resolve, reject) => {
        CustomAxios.get(getSectionOptionsApi(),  { params: searchParams  }).then((response) => {
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
        CustomAxios.get((getFormatOptionsApi())).then((response) => {
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

export function getStateOptions() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getStateOptionsApi())).then((response) => {
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}
export function getMunicipilaty(id:any) {
    
    return new Promise((resolve, reject) => {
        CustomAxios.get(getMunicipilatyApi(),  { params: {stateId: id}  }).then((response) => {
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

export interface UserSearchParams {
    name?: string,
    userId?: string,
    email?: string,
    status?: string,
    role?: string,
    section?: string,
    
    
}
export function getUserList(searchParams: UserSearchParams) {

    let params:UserSearchParams = removeEmptyKeys(searchParams)

        return new Promise((resolve, reject) => {
        CustomAxios.get(getUserListApi(),  { params: params  }).then((response) => {
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
    
    

}
export function deleteUser(id:any) {
    

        return new Promise((resolve, reject) => {
        CustomAxios.post(deleteUserApi() + '?id=' + id).then((response) => {
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
    
    

}



export function postUserForm(formValues: any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(postUserFormApi(), 
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