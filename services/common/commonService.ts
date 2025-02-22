import CustomAxios from "../../utility/customAxios"
import {
    getAllMenusApi, getPostContactFormApi, getInterestSectionOptionsApi,
    getFrequentQuestionsApi, postFrequentQuestionScoreApi, getContactSectionOptionsApi
    
} from "../../resources/api-constants";



export function getAllMenu() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getAllMenusApi())).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}


export function getInterestSectionOptions() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getInterestSectionOptionsApi())).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

export function getContactSectionOptions() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getContactSectionOptionsApi())).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}


export interface ContactForm {
    name: string,
    email: string | number,
    telephone: string | number,
    contactArea?: Boolean,
    comment?: string,
    
}

export function postContactForm(formValues: ContactForm) {

   
    return new Promise((resolve, reject) => {
        CustomAxios.post(getPostContactFormApi(), 
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
    
    })
}



/* Frequent Questions STart here */

export function getFrequentQuestions() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getFrequentQuestionsApi())).then((response) => {
           
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}

export function postFrequentQuestionScore(formValues: any) {
    
       
        return new Promise((resolve, reject) => {
            CustomAxios.post(postFrequentQuestionScoreApi(), 
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
        
        })
}
    