
import axios from 'axios'
import {API_STATUS_SUCCESS, API_STATUS_ERROR} from '../resources/project-constants'
import { lsKeys } from '../authentication/constants'


const CustomAxios = axios.create()



CustomAxios.interceptors.response.use(
    

    (response) => {
        let result:any  = {
            data: '',
            status: API_STATUS_ERROR,
            message: ''
        };

        if(response.data && response.data.responseStatus)
        {

            if(response.data.responseStatus.code === API_STATUS_SUCCESS && response.data.responseStatus.data){
                //alert('hahaha')
                result = {
                    data: response.data.responseStatus.data,
                    status: response.data.responseStatus.code,
                    message: response.data.responseStatus.description
                }
                return result;
            }

            else if(response.data.responseStatus.code === API_STATUS_SUCCESS)
            {
                result = {
                    data: response.data.data,
                    status: response.data.responseStatus.code,
                    message: response.data.responseStatus.description
                }
                return result
            }
            else if(response.data.responseStatus.code === API_STATUS_ERROR)
            {
                result = {
                    data: response.data.data,
                    status: response.data.responseStatus.code,
                    message: response.data.responseStatus.description
                }
                return Promise.reject(result)
            }
            else if(response.data.responseStatus.code === 401) // email reset password error
            {
                // alert('')
                result = {
                    data: response.data.responseStatus,
                    status: response.data.responseStatus.code,
                    // message: response.data.responseStatus.description
                }
                return Promise.resolve(result)
            }
            else if(response.data.responseStatus.code === 503) // User id exists error
            {
                // alert('')
                result = {
                    data: response.data.responseStatus,
                    status: response.data.responseStatus.code,
                    // message: response.data.responseStatus.description
                }
                return Promise.reject(result)
            }

        }
        else {
            
            result.data = response.data
            result.status = API_STATUS_SUCCESS

            return result
        }
       
        
        //return Promise.reject(result)

    },
    (error) => {
        let result: any;
        // alert('22222')
        result = {
            data: '',
            status: error.code,
            message: error.message,
            code:''
        }
        if(error.response )
        {
            if(error.response.status)
                result.code = 401
        }
        return Promise.reject(result)
    }
)




CustomAxios.interceptors.request.use(
    config => {

        const token = localStorage.getItem(lsKeys.accessToken)
        const pfToken = localStorage.getItem(lsKeys.pfToken)
        config.headers.Authorization = (token != null && token != '' &&  token != undefined && token )? 'Bearer ' + token : '';
        config.headers.pfToken = (pfToken != null && pfToken != '' &&  pfToken != undefined && pfToken )? '' + pfToken : '';

        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default CustomAxios
