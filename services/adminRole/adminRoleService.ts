import CustomAxios from "../../utility/customAxios"
import {
    getAllMenusApi, getSectionsApi, getRolesApi, getRolePermissionsApi, getPostRoleFormApi,
    getInternalUserAuthApi, getExternalUserAuthApi, getAuthorizeDbUserApi, getLoginWithUsernameApi,
    getAccessTokenWithRefreshTokenApi, getInternalUserTokenApi, logOutUserApi
    
} from "../../resources/api-constants";
import CustomAxios2 from "../../utility/CustomAxios2";




export function getAllMenu() {
    return new Promise((resolve, reject) => {
        CustomAxios2.get((getAllMenusApi())).then((response) => {
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}


export function getSections() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getSectionsApi())).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}


export function getRoles(sectionId :string | number) {
    return new Promise((resolve, reject) => {
        CustomAxios.get(getRolesApi(),  { params: {sectionId: sectionId }  }).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}


export function getRolePermissions(roleId:string | number) {
    return new Promise((resolve, reject) => {
        CustomAxios.get(getRolePermissionsApi(),  { params: {role: roleId } }).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}


export interface RolePostForm {
    section?: string | number,
    roleId?: string | number,
    roleName?: string | number,
    menu: any,
    active?: any,
    
    
    
}

export function postRoleForm(formValues: RolePostForm) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(getPostRoleFormApi(), 
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



/*********************************** Login serice start here  ********************************************************* */

export function getInternalUserAccessToken(token:string) {

    let data = {
        tokenData: token
    }

    return new Promise((resolve, reject) => {
        CustomAxios2.post(getInternalUserTokenApi(), 
            data,
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
    
    })
}
export function getInternalUserAuth() {

    // let data = {
    //     tokenData: token
    // }

    return new Promise((resolve, reject) => {
        CustomAxios.post(getInternalUserAuthApi(), 
            // data,
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
    
    })
}


export function getAccessTokenWithRefreshToken(token:string) {

    let data = {
        refreshToken: token
    }

    return new Promise((resolve, reject) => {
        CustomAxios.post(getAccessTokenWithRefreshTokenApi(), 
            data,
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
    
    })
}



export function getExternalUserAuth(token:string) {

    let data = {
        tokenData: token
    }

    return new Promise((resolve, reject) => {
        CustomAxios2.post(getExternalUserAuthApi(), 
            data,
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
    
    })
}



export function loginWithUsernamePassword(username:string, secCheck: string) {

    let data = {
        userName: username,
        secCheck: secCheck
    }

    return new Promise((resolve, reject) => {
        CustomAxios.post(getLoginWithUsernameApi(), 
            data,
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
    
    })
}



export function authorizeDbUserByUsername() {
    
       
        return new Promise((resolve, reject) => {
            CustomAxios.post(getAuthorizeDbUserApi(), {}, 
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
        
        })
    }

    
export function postlogOutUser() {

    // let data = {
    //     refreshToken: token
    // }

    return new Promise((resolve, reject) => {
        CustomAxios.post(logOutUserApi(), 
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
    
    })
}
