import { refetchTimeDifference} from './constants';
import {redirectUrl,authenticateUrl, refetchTokenUrl, pingfedClientId} from '../resources/project-constants';
import CustomAxios2 from "../utility/CustomAxios2";




const useAuthenticate = (showLandingage :any)=>{
 

    
    const getAccessToken = (code = '')=>{
         return new Promise((resolve, reject) => {

           
            const url = authenticateUrl;

            const params = new URLSearchParams();

            const codeVerifier = localStorage.getItem('code_verifier');
            // we have to hide client_id and client_secret think on this//
            params.append('client_id', pingfedClientId);
            params.append('grant_type', 'authorization_code');
            params.append('redirect_uri', redirectUrl);
            
            //for testing internal user authentication uncomment below line.
            // params.append('redirect_uri', 'http://localhost:3000/');

            params.append('code_verifier', codeVerifier? codeVerifier : '');
            params.append('code', code);
            // const accessToken = localStorage.getItem('access_token');

           

            // if (accessToken === null || accessToken === '' || accessToken === undefined) {

               
            //  'Access-Control-Allow-Origin': '*' put this in headers if encountered any issues.
              
            CustomAxios2.post(url, 
                params,
                {
                     headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                }
            ).then((response) => {
                 if(response){
                                
                                const currentTime = new Date();
                                const endTime = new Date(currentTime);
                                
                                endTime.setSeconds(endTime.getSeconds() + response.data.expires_in);
                               
                                localStorage.setItem('code_verifier', '');
                                showLandingage(true);
                resolve(response.data)
                //setPost(response.data);
            }})
            .catch((error) => {
                console.log('errorApiTest', error)
                reject(error)
                showLandingage(true);
            });

        })
}

    
    const getRefreshAccessToken = ()=>{
        const currentTimeRefresh = new Date();
        
        const endTimeRefresh = new Date(localStorage.getItem('end_time')|| '').getTime();
        const timeDifference = Math.abs(endTimeRefresh - currentTimeRefresh.getTime());
       
        if(timeDifference <= refetchTimeDifference)
        {
           


            const formData = new URLSearchParams();

            // see how you can hide these details
            formData.append('client_id', pingfedClientId);
            formData.append('grant_type', 'refresh_token');
            formData.append('refresh_token', localStorage.getItem('refresh_token') || '');

            
            CustomAxios2.post(refetchTokenUrl, 
                formData,
                {
                     headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                }
            )
            .then(response => {
                // localStorage.setItem('access_token', data.access_token);
                // localStorage.setItem('refresh_token', data.refresh_token);

                // get current time and set start and end time of a token
                const currentTime = new Date();
                const endTime = new Date(currentTime);
                
                endTime.setSeconds(endTime.getSeconds() + response.data.expires_in);
                localStorage.setItem('end_time', endTime.toString());
                
                showLandingage(true);
            })
            .catch(error => {
                console.error('Error:', error);
                showLandingage(false);
            });
        }
        
    }
    return {
        getAccessToken,
        getRefreshAccessToken
    }
}

export default useAuthenticate;
