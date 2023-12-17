//Modification required

import Axios from "axios";

export const postRequest = async (url, postData = {}, headerType = "") => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    if (headerType === 'auth') {
    
      let apiResponse = await Axios.post(
        url,
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${tokenData.token}`
          }
        },
        postData
      );
      if (apiResponse.status === 200 || apiResponse.status === 201) {
        return apiResponse;
      } else {
        return apiResponse.data;
      }
    } else {
      let apiResponse = await Axios.post(url, postData);
      if (apiResponse.status === 200 || apiResponse.status === 201) {
        return apiResponse;
      } else {
        return apiResponse.data;
      }
    }
  } catch (error) {
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.code === 500 && error.response.data.message.includes("Some internal server error occurred, please contact admin with the Id:")) {

          // Auth.logout();
          // window.history.pushState(null, document.title, window.location.href);
          // window.addEventListener('popstate', function (event) {
          //   window.history.pushState(null, document.title, window.location.href);
          // });
          window.location.href = "/";
        } else {
          return error;
        }
      } else {
        return error;
      }
    } else {
      return error;
    }
  }
}

export const getRequest = async (url, postData = {}, headerType = "auth") => {
  try {
    let apiResponse = await Axios.get(url, postData);
    if (apiResponse.status === 200 || apiResponse.status === 201) {
      return apiResponse;
    } else {
      return apiResponse.data;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.code === 500 && error.response.data.message.includes("Some internal server error occurred, please contact admin with the Id:")) {

          // Auth.logout();
          window.history.pushState(null, document.title, window.location.href);
          // window.addEventListener('popstate', function (event) {
          //   window.history.pushState(null, document.title, window.location.href);
          // });
          window.location.href = "/";
        } else {
          return error;
        }
      } else {
        return error;
      }
    } else {
      return error;
    }
  }
}

export const patchRequest = async (url, postData = {}, headerType = "") => {
  try {
    let apiResponse = await Axios.patch(url, postData);
    if (apiResponse.status === 200 || apiResponse.status === 201) {
      return apiResponse;
    } else {
      return apiResponse.data;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.code === 500 && error.response.data.message.includes("Some internal server error occurred, please contact admin with the Id:")) {

          // Auth.logout();
          window.history.pushState(null, document.title, window.location.href);
          // window.addEventListener('popstate', function (event) {
          //   window.history.pushState(null, document.title, window.location.href);
          // });
          window.location.href = "/";
        } else {
          return error;
        }
      } else {
        return error;
      }
    } else {
      return error;
    }
  }
}

export const deleteRequest = async (url, onSuccess, onError, headerType = "auth") => {
  try {
    let apiResponse = await Axios.delete(url);
    if (apiResponse.status === 200 || apiResponse.status === 201) {
      onSuccess(apiResponse);
    } else {
      onError(apiResponse.data);
    }
  } catch (error) {
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.code === 500 && error.response.data.message.includes("Some internal server error occurred, please contact admin with the Id:")) {

          // Auth.logout();
          window.history.pushState(null, document.title, window.location.href);
          // window.addEventListener('popstate', function (event) {
          //   window.history.pushState(null, document.title, window.location.href);
          // });
          window.location.href = "/";
        } else {
          onError(error);
        }
      } else {
        onError(error);
      }
    } else {
      onError(error);
    }
  }
}