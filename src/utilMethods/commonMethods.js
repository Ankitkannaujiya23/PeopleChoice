//for get access token from session Storage
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

//for get refresh token from session Storage
export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

//for add elipsis means add (...) when our string title, description... greater than limit length
export const addElipsis = (str, limit) => {
  return str.length > limit ? str.substring(0, limit) + "..." : str;
};

//for logout to remove tokens
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
//this is new
