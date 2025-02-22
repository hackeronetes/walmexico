import CustomAxios from "../../utility/customAxios"
import {
    getImagesListApi,getEachImageApi, getImagePostApi, getDeleteImageApi,getImageSectionApi,getImageBySectionApi,
    getDeleteDescriptionApi, getDescriptionListApi, getDescriptionCreateApi, getPageOptionsApi, 
    getNewsListHomeApi,getNewsListApi, getNewsCreateApi, getDeleteNewsApi,
    getNoteListApi, postNoteFormApi, deleteNoteApi,
    getSuppliersListApi,getImagePutApi,getDeleteSupplierApi, getSaveSupplierApi,
    getQuestionsListApi, postQuestionApi, deleteQuestionApi
} from "../../resources/api-constants";
import { removeEmptyKeys } from "../../utility/commonFunctions";
import moment from 'moment'



/* Images */ 
export function getImagesList(searchParams:any) {

    let params:any = removeEmptyKeys(searchParams)

    return new Promise((resolve, reject) => {
        CustomAxios.get(getImagesListApi(),   { params: params  }).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
           
            reject(error)
        });

    });
}
export function getImagesListFromSearch(searchParams:any) {

    let params:any = removeEmptyKeys(searchParams)

    return new Promise((resolve, reject) => {
        CustomAxios.get(getEachImageApi(),   { params: params  }).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
           
            reject(error)
        });

    });
}

export function getImageBySection(searchParams:any) {
    
    let params:any = removeEmptyKeys(searchParams)

    return new Promise((resolve, reject) => {
        CustomAxios.get(getImageBySectionApi(),   { params: params  }).then((response) => {
            
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            
            reject(error)
        });

    });
}

export function getImageSection() {

    
    return new Promise((resolve, reject) => {
        CustomAxios.get(getImageSectionApi()).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
           
            reject(error)
        });

    });
}

export function putImageForm(formValues: any) {
    
    const today:any = moment(formValues.startDate);
    const today2:any = moment(formValues.endDate);

    const loginFormData = new FormData();
    if(formValues.id)
        loginFormData.append("imageId", formValues.id)

    loginFormData.append("imageDescription", formValues.name)
    loginFormData.append("url", formValues.url)
    loginFormData.append("sectionId", formValues.section)
    loginFormData.append("orderNumber", formValues.position)
    loginFormData.append("publicationStartDate", today.format('YYYY-MM-DDThh:mm:ss'))
    loginFormData.append("publicationEndDate", today2.format('YYYY-MM-DDThh:mm:ss'))
    loginFormData.append("image", formValues.image[0])
    loginFormData.append("isActive", formValues.active? "true":"false")
    loginFormData.append("isPriority", "false")

    return new Promise((resolve, reject) => {
        CustomAxios.put(getImagePutApi(), 
            loginFormData,
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
            
            reject(error)
        });

    });
}


export function postImageForm(formValues: any) {
   

    


    const today:any = moment(formValues.startDate);
    const today2:any = moment(formValues.endDate);

    const loginFormData = new FormData();
    if(formValues.imageId)
        loginFormData.append("imageId", formValues.imageId)

    loginFormData.append("imageDescription", formValues.name)
    loginFormData.append("url", formValues.url)
    loginFormData.append("sectionId", formValues.section)
    loginFormData.append("orderNumber", formValues.position)
    loginFormData.append("publicationStartDate", today.format('YYYY-MM-DDThh:mm:ss'))
    loginFormData.append("publicationEndDate", today2.format('YYYY-MM-DDThh:mm:ss'))
    loginFormData.append("image", formValues.image[0])
    loginFormData.append("isActive", formValues.active? "true":"false")
    loginFormData.append("isPriority", "false")

    return new Promise((resolve, reject) => {
        CustomAxios.post(getImagePostApi(), 
            loginFormData,
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
           
            reject(error)
        });

    });
}




export function deleteImage(id:any) {

    //let params:any = removeEmptyKeys(searchParams)

    return new Promise((resolve, reject) => {
        CustomAxios.delete(getDeleteImageApi() + id).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
           
            reject(error)
        });

    });
}



/*  Descriptions Api */
export function getDescriptionList(searchParams:any) {
    
        let params:any = removeEmptyKeys(searchParams)
    
        return new Promise((resolve, reject) => {
            CustomAxios.get(getDescriptionListApi(),   { params: params  }).then((response) => {
                
                resolve(response)
                 //setPost(response.data);
            })
            .catch((error) => {
                
                reject(error)
            });
    
        });
    }
    
    
    export function postDescriptionCreate(formValues: any) {
       
       
       
    
        return new Promise((resolve, reject) => {
            CustomAxios.post(getDescriptionCreateApi(), 
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
               
                reject(error)
            });
    
        });
    }

    export function postDescriptionUpdate(formValues: any) {
       
    
       
       
    
        return new Promise((resolve, reject) => {
            CustomAxios.put(getDescriptionCreateApi(), 
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
                
                reject(error)
            });
    
        });
    }
    
    
    
    
    export function deleteDescription(id:any) {
    
        //let params:any = removeEmptyKeys(searchParams)
    
        return new Promise((resolve, reject) => {
            CustomAxios.get(getDeleteDescriptionApi()  ,   { params: {id:id}  }).then((response) => {
                
                resolve(response)
                 //setPost(response.data);
            })
            .catch((error) => {
                
                reject(error)
            });
    
        });
    }

    export function getPageOptions(params:any) {
        
           
            return new Promise((resolve, reject) => {
                CustomAxios.get(getPageOptionsApi(),   { params: params }).then((response) => {
                   
                    resolve(response)
                     //setPost(response.data);
                })
                .catch((error) => {
                  
                    reject(error)
                });
        
            });
        }




        
/*  News Api */
export function getNewsHomeList(searchParams:any) {
    
        let params:any = removeEmptyKeys(searchParams)
    
        return new Promise((resolve, reject) => {
            CustomAxios.get(getNewsListHomeApi(),   { params: params  }).then((response) => {
                
                resolve(response)
                 //setPost(response.data);
            })
            .catch((error) => {
                
                reject(error)
            });
    
        });
    }
    export function getNewsList(searchParams:any) {
    
        let params:any = removeEmptyKeys(searchParams)
    
        return new Promise((resolve, reject) => {
            CustomAxios.get(getNewsListApi(),   { params: params  }).then((response) => {
                
                resolve(response)
                 //setPost(response.data);
            })
            .catch((error) => {
                
                reject(error)
            });
    
        });
    }
    export function postExtUserCommentAttachement(formValues: any) {
       
    
       
       
    
        return new Promise((resolve, reject) => {
            CustomAxios.put(getNewsCreateApi(), 
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
                
                reject(error)
            });
    
        });
    }
    
    export function postNewsUpdate(formValues: any) {
       
    
       
    
        return new Promise((resolve, reject) => {
            CustomAxios.post(getNewsCreateApi(), 
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
               
                reject(error)
            });
    
        });
    }

    export function postNewsCreate(formValues: any) {
       
    
       
       
    
        return new Promise((resolve, reject) => {
            CustomAxios.post(getNewsCreateApi(), 
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
                
                reject(error)
            });
    
        });
    }
    
    
    
    
    export function deleteNews(id:any) {
    
        //let params:any = removeEmptyKeys(searchParams)
    
        return new Promise((resolve, reject) => {
            CustomAxios.delete(getDeleteNewsApi() + id).then((response) => {
                
                resolve(response)
                 //setPost(response.data);
            })
            .catch((error) => {
               
                reject(error)
            });
    
        });
    }

      
    
    
/*  News Api */
export function getNoteList(searchParams:any) {
    
        let params:any = removeEmptyKeys(searchParams)
    
        return new Promise((resolve, reject) => {
            CustomAxios.get(getNoteListApi(),   { params: params  }).then((response) => {
                
                resolve(response)
                 //setPost(response.data);
            })
            .catch((error) => {
               
                reject(error)
            });
    
        });
    }
    
    
    export function postNoteForm(formValues: any) {
       
    
       
       
    
        return new Promise((resolve, reject) => {
            CustomAxios.post(postNoteFormApi(), 
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
               
                reject(error)
            });
    
        });
    }

    
    
    
    
    
    export function deleteNote(id:number) {
    
        //let params:any = removeEmptyKeys(searchParams)
    
        return new Promise((resolve, reject) => {
            CustomAxios.get(deleteNoteApi(id)).then((response) => {
               
                resolve(response)
                 //setPost(response.data);
            })
            .catch((error) => {
                
                reject(error)
            });
    
        });
    }




    export function getSuppliersList() {
        
            
            return new Promise((resolve, reject) => {
                CustomAxios.get(getSuppliersListApi()).then((response) => {
                   
                    resolve(response)
                     //setPost(response.data);
                })
                .catch((error) => {
                    
                    reject(error)
                });
        
            });
    }

    export function saveSupplier(formValues:any) {
        
            
            return new Promise((resolve, reject) => {
               
                CustomAxios.post(getSaveSupplierApi(), 
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
                   
                    reject(error)
                });
        
            });
    }
    export function deleteSupplier(id:any) {
        
        //let params:any = removeEmptyKeys(searchParams)
    
        return new Promise((resolve, reject) => {
            CustomAxios.delete(getDeleteSupplierApi() , { params: {id:id}  }).then((response) => {
               
                resolve(response)
                 //setPost(response.data);
            })
            .catch((error) => {
               
                reject(error)
            });
    
        });
    }



/* Frequent Questions Api */

export function getQuestionsList(searchParams:any) {
    
        let params:any = removeEmptyKeys(searchParams)
    
        return new Promise((resolve, reject) => {
            CustomAxios.get(getQuestionsListApi(),   { params: params  }).then((response) => {
                
                resolve(response)
                 //setPost(response.data);
            })
            .catch((error) => {
              
                reject(error)
            });
    
        });
    }
    
    
    export function postQuestion(formValues: any) {
       
       
       
    
        return new Promise((resolve, reject) => {
            CustomAxios.post(postQuestionApi(), 
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
              
                reject(error)
            });
    
        });
    }
    export function deleteQuestion(id:any) {
        
            //let params:any = removeEmptyKeys(searchParams)
        
            return new Promise((resolve, reject) => {
                CustomAxios.get(deleteQuestionApi() ,   { params: {id:id}  }).then((response) => {
                    
                    resolve(response)
                     //setPost(response.data);
                })
                .catch((error) => {
                   
                    reject(error)
                });
        
            });
        }
    