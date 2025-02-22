import axios from 'axios'
import {API_STATUS_SUCCESS} from '../resources/project-constants'



const CustomAxios2 = axios.create()

CustomAxios2.interceptors.response.use(
    (response) => {
        let result:any = {}
        if(response.data?.data){
            result.data = response.data.data ;
            result.responseStatus = response.data.responseStatus ;
           
        }else{
            result.data = response.data
        }

       
        result.status = API_STATUS_SUCCESS
        return result

    },
    (error) => {
        let result: any;

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


export default CustomAxios2