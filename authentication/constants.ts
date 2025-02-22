const tokenExpiry = 43199;
const pollingTime = 18 * 60 * 1000;
const refetchTimeDifference = 5 * 60 * 1000;

const lsKeys = {
    accessToken : 'accessToken',
    refreshToken : 'refreshToken',
    userType : 'userType',
    pfToken : 'pfToken',
}

export {tokenExpiry, pollingTime, refetchTimeDifference, lsKeys};