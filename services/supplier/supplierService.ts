import CustomAxios from "../../utility/customAxios"
import { postConstruction, postMaterials 
} from "../../resources/api-constants";

export function postConstructionForm(formValues:any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(postConstruction(), 
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

export function postMaterialsForm(formValues:any) {
    return new Promise((resolve, reject) => {
        CustomAxios.post(postMaterials(), 
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