

//for get access token from session Storage
export const getAccessToken=()=>{
    return window.sessionStorage.getItem('accessToken');
}

//for get refresh token from session Storage
export const getRefreshToken=()=>{
    return window.sessionStorage.getItem('refreshToken');
}

//for add elipsis means add (...) when our string title, description... greater than limit length
export const addElipsis=(str, limit)=>{
    return  str.length> limit ? str.substring(0,limit)+"..." : str ; 
}

//this is new