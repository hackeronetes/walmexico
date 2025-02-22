import { envConstant } from './../env-constant';



function getApiBaseUrl() {
   
    if(envConstant == 'stg')
        return 'https://bienesraices-qa.walmartmexico.com.mx';
    if(envConstant == 'prod')
        return 'https://bienesraices.walmartmexico.com.mx';

    return ''
}



// export const apiBaseUrl = window.location.origin
// export const apiBaseUrl = 'https://bienesraices-qa.walmartmexico.com.mx'
// export const apiBaseUrl = 'https://bienesraices.walmartmexico.com.mx'
export const apiBaseUrl = getApiBaseUrl()




function getPingfedCLientId () {

    

    if(envConstant == 'dev')
        return 'mxbr_dev_frontend_oauth';
    if(envConstant == 'devtest')
        return 'mxbr_dev_frontend_oauth';
    if(envConstant == 'stg')
        return 'mxbr_stg_frontend_oauth';
    if(envConstant == 'prod')
        return 'mxbr_prod_frontend_oauth';

    return ''
}

function getAppBaseUrl () {
    
   
    // return window.location.origin

    if(envConstant == 'dev')
        return 'https://mxbrfrontend.dev.cloud.wal-mart.com'
    if(envConstant == 'devtest')
        return 'https://mxbrfrontend.devtest.cloud.wal-mart.com'
    if(envConstant == 'stg')
        return  'https://bienesraices-qa.walmartmexico.com.mx'
    if(envConstant == 'prod')
    {
        return  'https://bienesraices.walmartmexico.com.mx'
        // return 'https://mxbrfrontend.prod.cloud.wal-mart.com'
    }
        

    return ''
}

export const redirectUrl = getAppBaseUrl()

function getPingfedSsoUrl () {
    if(envConstant == 'dev')
        return 'https://pfeddev.wal-mart.com/as/authorization.oauth2?client_id=' +  getPingfedCLientId() + '&redirect_uri=' + getAppBaseUrl() + '&response_type=code&state=1&scope=openid';
    if(envConstant == 'devtest')
        return 'https://pfeddev.wal-mart.com/as/authorization.oauth2?client_id=' +  getPingfedCLientId() + '&redirect_uri=' + getAppBaseUrl() + '&response_type=code&state=1&scope=openid';
    if(envConstant == 'stg')
        return  'https://pfedcert.wal-mart.com/as/authorization.oauth2?client_id=' +  getPingfedCLientId() + '&redirect_uri=' + getAppBaseUrl() + '&response_type=code&state=1&scope=openid';
    if(envConstant == 'prod')
        return  'https://pfedprod.wal-mart.com/as/authorization.oauth2?client_id=' +  getPingfedCLientId() + '&redirect_uri=' + getAppBaseUrl() + '&response_type=code&state=1&scope=openid';
}
function getPingfedRefreshUrl () {
    if(envConstant == 'dev')
        return 'https://pfeddev.wal-mart.com/as/token.oauth2';
    if(envConstant == 'devtest')
        return 'https://pfeddev.wal-mart.com/as/token.oauth2';
    if(envConstant == 'stg')
        return  'https://pfedcert.wal-mart.com/as/token.oauth2'
    if(envConstant == 'prod')
        return  'https://pfedprod.wal-mart.com/as/token.oauth2'

    return ''
}


function getB2nLogoutUrl () {
    if(envConstant == 'dev')
        return `https://wmtmanagedb2c-identity-qa.walmart.com/wmtmanagedb2c-identity-qa.walmart.com/B2C_1A_Identity_Google/oauth2/v2.0/logout?redirect_uri=${redirectUrl}`;
    if(envConstant == 'devtest')
        return `https://wmtmanagedb2c-identity-qa.walmart.com/wmtmanagedb2c-identity-qa.walmart.com/B2C_1A_Identity_Google/oauth2/v2.0/logout?redirect_uri=${redirectUrl}`;
    if(envConstant == 'stg')
        return `https://wmtmanagedb2c-identity-stg.walmart.com/wmtmanagedb2c-identity-stg.walmart.com/B2C_1A_Identity_Google/oauth2/v2.0/logout?redirect_uri=${redirectUrl}`
    if(envConstant == 'prod')
        return `https://wmtmanagedb2c-identity.walmart.com/wmtmanagedb2c-identity.walmart.com/B2C_1A_Identity_Google/oauth2/v2.0/logout?redirect_uri=${redirectUrl}` ;

    return ''
}

function getB2nLoginUrl () {
    if(envConstant == 'dev')
        return 'https://wmtmanagedb2c-identity-qa.walmart.com/wmtmanagedb2c-identity-qa.walmart.com/oauth2/v2.0/authorize?p=B2C_1A_Identity_Google&client_id=a3c1ab3f-df52-4926-89a0-aeb3a23ae4e6&nonce=defaultNonce&redirect_uri=' + redirectUrl + '&scope=openid&response_type=id_token&prompt=login'
    if(envConstant == 'devtest')
        return 'https://wmtmanagedb2c-identity-qa.walmart.com/wmtmanagedb2c-identity-qa.walmart.com/oauth2/v2.0/authorize?p=B2C_1A_Identity_Google&client_id=a3c1ab3f-df52-4926-89a0-aeb3a23ae4e6&nonce=defaultNonce&redirect_uri=' + redirectUrl + '&scope=openid&response_type=id_token&prompt=login'
    if(envConstant == 'stg')
        return  'https://wmtmanagedb2c-identity-stg.walmart.com/wmtmanagedb2c-identity-stg.walmart.com/oauth2/v2.0/authorize?p=B2C_1A_Identity_Google&client_id=60e0ae02-f5cf-4580-bb78-aaa333135fb6&nonce=defaultNonce&redirect_uri=' + redirectUrl + '/&scope=openid&response_type=id_token&prompt=login'
    if(envConstant == 'prod')
        return  `https://wmtmanagedb2c-identity.walmart.com/wmtmanagedb2c-identity.walmart.com/oauth2/v2.0/authorize?p=B2C_1A_Identity_Google&client_id=c2c835a3-5604-4fbc-a3e2-fe006f3fd54e&nonce=defaultNonce&redirect_uri=${redirectUrl}/&scope=openid&response_type=id_token&prompt=login`

    return ''
}

function getInternalLogoutUrl () {
    if(envConstant == 'dev')
        return  `https://pfeddev.wal-mart.com/idp/startSLO.ping?TargetResource=${redirectUrl}&InErrorResource=${redirectUrl}`;
    if(envConstant == 'devtest')
        return  `https://pfeddev.wal-mart.com/idp/startSLO.ping?TargetResource=${redirectUrl}&InErrorResource=${redirectUrl}`;
    if(envConstant == 'stg')
       return  `https://pfedcert.wal-mart.com/idp/startSLO.ping?TargetResource=${redirectUrl}&InErrorResource=${redirectUrl}`;
    if(envConstant == 'prod')
        return  `https://pfedprod.wal-mart.com/idp/startSLO.ping?TargetResource=${redirectUrl}&InErrorResource=${redirectUrl}`;

    return ''
}


export const env = envConstant; // dev / stg
//export const env = 'dev'; // dev / stg


// export const baseUrl = 'https://64ba2ba55e0670a501d5bd33.mockapi.io/'

export const appBaseUrl = ''

export const API_STATUS_SUCCESS = 200
export const API_STATUS_NOTFOUND = 300
export const API_STATUS_FAILED = 400
export const API_STATUS_ERROR = 500


export const USER_EXTERNAL = 'external'
export const USER_INTERNAL = 'internal'
export const USER_DB = 'db'


export const allowdDomains = [
    'gmail'
]


// export const pingfedClientId = 'mxbr_dev_frontend_oauth'
export const pingfedClientId = getPingfedCLientId()

// export const redirectUrl = 'http://localhost:3000/'


// const b2nLoginDev = 'https://wmtmanagedb2c-identity-qa.walmart.com/wmtmanagedb2c-identity-qa.walmart.com/oauth2/v2.0/authorize?p=B2C_1A_Identity_Google&client_id=a3c1ab3f-df52-4926-89a0-aeb3a23ae4e6&nonce=defaultNonce&redirect_uri=' + redirectUrl + '&scope=openid&response_type=id_token&prompt=login'
// const b2nLoginStg = 'https://wmtmanagedb2c-identity-stg.walmart.com/wmtmanagedb2c-identity-stg.walmart.com/oauth2/v2.0/authorize?p=B2C_1A_Identity_Google&client_id=60e0ae02-f5cf-4580-bb78-aaa333135fb6&nonce=defaultNonce&redirect_uri=https://mxbrfrontend.stg.cloud.wal-mart.com/&scope=openid&response_type=id_token&prompt=login'

//logout endpoints  
// mxbr-azure-b2c app name 
// const b2nLogoutDev = `https://wmtmanagedb2c-identity-qa.walmart.com/wmtmanagedb2c-identity-qa.walmart.com/B2C_1A_Identity_Google/oauth2/v2.0/logout?redirect_uri=${redirectUrl}`;
// const b2nLogoutStg = `https://wmtmanagedb2c-identity-stg.walmart.com/wmtmanagedb2c-identity-stg.walmart.com/B2C_1A_Identity_Google/oauth2/v2.0/logout?redirect_uri=https://mxbrfrontend.stg.cloud.wal-mart.com`;
// const b2nLogouprod = `https://wmtmanagedb2c-identity-stg.walmart.com/wmtmanagedb2c-identity-stg.walmart.com/B2C_1A_Identity_Google/oauth2/v2.0/logout?redirect_uri=https://mxbrfrontend.stg.cloud.wal-mart.com`;

//logout endpoint internal user
// const internalDevLogUrl = `https://pfeddev.wal-mart.com/idp/startSLO.ping?TargetResource=${redirectUrl}`;
// const internalStgLogUrl = `https://pfedcert.wal-mart.com/idp/startSLO.ping?TargetResource=https://mxbrfrontend.stg.cloud.wal-mart.com`;

// export const b2cLoginUrl = (getLoginEnv() == 'stg') ? b2nLoginStg :   b2nLoginDev
// export const b2nLogoutUrl = (getLoginEnv() == 'stg') ? b2nLogoutStg :   b2nLogoutDev


export const b2cLoginUrl = getB2nLoginUrl()
export const b2nLogoutUrl = getB2nLogoutUrl()


// export const internalLogoutUrl = (getLoginEnv() == 'stg') ? internalStgLogUrl :   internalDevLogUrl
export const internalLogoutUrl = getInternalLogoutUrl()



export const authenticateUrl = getPingfedRefreshUrl();
// export const authenticateUrl = 'https://pfeddev.wal-mart.com/as/token.oauth2';

// change the redirect url to your dev redirect url


export const ssoUrl = getPingfedSsoUrl()
// export const ssoUrlDev = 'https://pfeddev.wal-mart.com/as/authorization.oauth2?client_id=' +  pingfedClientId + '&redirect_uri=' + redirectUrl + '&response_type=code&state=1&scope=openid';
//const redirectUrl = 'https://pfeddev.wal-mart.com/as/authorization.oauth2?client_id=mxbr_dev_frontend_oauth&redirect_uri=http://localhost:3000/&response_type=code&state=1&scope=openid';

// refetch token URL
export const refetchTokenUrl = getPingfedRefreshUrl();
// export const refetchTokenUrlDev = 'https://pfeddev.wal-mart.com/as/token.oauth2';


export const POPUP_TYPE_SUCCESS = 'success'
export const POPUP_TYPE_ERROR = 'error'



export const MAP_KEY = 'Aj8i5MMMOKiNZeYlCun-6el0ETG7XHV2Fmp_5RQ5ZWIfOMf1_uAoyDUtMEpaeZzR'


export const SECTION_ID = {
    SECTION_LOCALCOMMERCIAL: 1,
    SECTION_LANDSALE: 2,
    SECTION_OFFERLAND: 3,
    SECTION_SUPPLIER: 4,
    SECTION_GENERAL: 5,
}


export const SECTION_ID_IMAGES = {
    SECTION_LOCALCOMMERCIAL: 1,
    SECTION_LANDSALE: 2,
    SECTION_OFFERLAND: 3,
    SECTION_SUPPLIER: 12,
    SECTION_GENERAL: 5,
    SECTION_PROMOTION: 9,
    SECTION_HOME: 6,
}

