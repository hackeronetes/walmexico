import CustomAxios from "../../utility/customAxios"
import {
    postNaturalPerson, postLegalEntity, getMeterSquares, getNegotiations, getLandSales, getLandSalesRowsCount
} from "../../resources/api-constants";
import { removeEmptyKeys } from "../../utility/commonFunctions";


export function postNaturalPersonForm(formValues:any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(postNaturalPerson(), 
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

export function postLegalEntityForm(formValues:any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(postLegalEntity(), 
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



export function getMeterSquare() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getMeterSquares())).then((response) => {
            
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}
export function getNegotiation() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getNegotiations())).then((response) => {
            
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}


export interface LandSaleTableSearchParams {
    stateId?: string,
    transactionId?: string,
    sqmtrId?: string,
    
    
}
export function getLandSalesList(searchParams: LandSaleTableSearchParams) {

    let params:LandSaleTableSearchParams = removeEmptyKeys(searchParams)

        return new Promise((resolve, reject) => {
        CustomAxios.get(getLandSales(),  { params: params  }).then((response) => {
            
            resolve(response)
            //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
    
    
}
export function getLandSaleTableRowsCount() {
    return new Promise((resolve, reject) => {
        CustomAxios.get((getLandSalesRowsCount())).then((response) => {
            
            resolve(response)
             //setPost(response.data);
        })
        .catch((error) => {
            console.log('errorApiTest', error)
            reject(error)
        });

    });
}