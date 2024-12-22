import axios from "axios";
import { getAccessToken } from "../utilMethods/commonMethods.js";
// Base URL
// export const baseURL = "http://localhost:5001";
export const baseURL = "https://peoplechoiceserver.onrender.com";

let token = getAccessToken();
// API Call for creating an user
export const userSignUp = async (url, model) => {
  let data;
  await axios
    .post(url, model)
    .then((res) => {
      data = res.data;
    })
    .catch((error) => console.log(error));

  return data;
};

// API Call for User Login
export const userLogin = async (url, model) => {
  let data;
  await axios
    .post(`${baseURL}/${url}`, model)
    .then((res) => {
      data = res.data;
    })
    .catch((err) => console.log(err));

  return data;
};

//API Call for uploading a file
export const fileUpload = async (url, model) => {
  let data = "";
  await axios
    .post(`${baseURL}/${url}`, model)
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
};

// API Call for creating a post
export const createPost = async (url, model, token, id) => {
  let data = "";
  //for post api calls we have to pass the body after just url and header after the body like ==> url,body,{headers}
  await axios
    .post(`${baseURL}/${url}`, model, { headers: { token: token } })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return data;
};

// API Call for Updating a post
export const updatePost = async (url, model, token, id) => {
  let data = "";
  //for post api calls we have to pass the body after just url and header after the body like ==> url,body,{headers}
  await axios
    .put(`${baseURL}/${url}`, model, { headers: { token: token } })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return data;
};

// API Call for fetching all blog post
export const fetchAllPost = async (url, query, token) => {
  let data;
  if (query) {
    await axios
      .get(`${baseURL}/${url}`, {
        params: {
          category: query,
        },
        headers: {
          token: token,
        },
      })
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    await axios
      .get(`${baseURL}/${url}`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return data;
};

//API Call for getting single Blog on the basis of its id
export const getSinglePost = async (url) => {
  let token = getAccessToken();
  let data;
  await axios
    .get(`${baseURL}/${url}`, { headers: { token: token } })
    .then((res) => {
      if (res.status === 200) {
        data = res.data;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
};

//API call for deleting a post by id
export const deleteBlogPost = async (url) => {
  let data;
  await axios
    .delete(`${baseURL}/${url}`, { headers: { token: token } })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => console.log(error));
  return data;
};

//API Call for add new comments on post
export const addNewComment = async (url, model) => {
  let token = getAccessToken();
  let data;
  await axios
    .post(`${baseURL}/${url}`, model, { headers: { token: token } })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => console.log(error));
  return data;
};

//API call for fetching all comments corresponding post id
export const fetchAllComments = async (url) => {
  let token = getAccessToken();

  let data;
  await axios
    .get(`${baseURL}/${url}`, { headers: { token } })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => console.log(error));
  return data;
};

//Api call for delete comment by id
export const deleteCommentById = async (url) => {
  let token = getAccessToken();
  let data;
  await axios
    .delete(`${baseURL}/${url}`, { headers: { token: token } })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => console.log(error));
  return data;
};

//API call for add subscriber
export const addSubscriber = async (url, model) => {
  let token = getAccessToken();
  let data;
  await axios
    .post(`${baseURL}/${url}`, model, { headers: { token: token } })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => console.log(error));
  return data;
};
