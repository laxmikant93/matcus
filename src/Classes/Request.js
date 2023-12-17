/* eslint-disable no-useless-constructor */
import Axios from "axios";
// import { userDetail } from "../Constant/auth";
import Api from "./Api";
import Auth from "./Auth";
// import Cookies from "./Cookies";
class Request extends Api {
  constructor() {
    super();
  }

  /**
   *
   * @param {*} url : API URL
   * @param {*} postData : data in object
   * @param {*} onSuccess : Callback for success response,
   * @param {*} onError : Callback for error response,
   * @param {*} headerType : "auth" is default,
   */

  post = async (url, postData, onSuccess, onError, headerType = "auth") => {

    try {
      var apiResponse = await Axios.post(url, postData, {
        headers:
          headerType === "auth"
            ? this.getApiheader()
            : this.getNonLoginApiHeader(),
        onUploadProgress: (fileUploadProgressEvent) => {
          localStorage.setItem(
            "Progress",
            JSON.stringify(fileUploadProgressEvent)
          );

          // const progress = parseInt(
          //   Math.round(
          //     (fileUploadProgressEvent.loaded * 100) /
          //     fileUploadProgressEvent.total
          //   )
          // );
        },
      });
      // console.log(typeof (apiResponse.status), "line 43")
      if (apiResponse.status === 200 || apiResponse.status === 201) {
        onSuccess(apiResponse);
      } else {
        onError(apiResponse.data);
      }
      localStorage.setItem('ResetTimer', 'true');
    } catch (error) {
      // console.log("line 74", error)
      // if (error.response && error.response.status && error.response.status === 401) {
      //   Auth.logout();
      //   window.history.pushState(null, document.title, window.location.href);
      //   window.addEventListener('popstate', function (event) {
      //     window.history.pushState(null, document.title, window.location.href);
      //   });
      //   window.location.href = "/";
      // } else {
      //   onError(error);
      // }

      return this.onError(apiResponse.data)
    }
  };

  get = async (url, onSuccess, onError, headerType = "auth") => {
    try {
      var apiResponse = await Axios.get(url, {
        headers:
          headerType === "auth"
            ? this.getApiheader()
            : this.getNonLoginApiHeader(),
      });
      // console.log("line 103", apiResponse)
      if (apiResponse.status === 200 || apiResponse.status === 201) {
        onSuccess(apiResponse);
      } else {
        onError(apiResponse.data);
      }
    } catch (error) {
      // console.log("line 103", error.response)
      // if (error.response && error.response.status && error.response && error.response.status && error.response.status === 401) {
      //   Auth.logout();
      //   window.history.pushState(null, document.title, window.location.href);
      //   window.addEventListener('popstate', function (event) {
      //     window.history.pushState(null, document.title, window.location.href);
      //   });
      //   window.location.href = "/";
      // } else {
      //   onError(error);
      // }

      return this.onError(apiResponse.data)
    }
  };

  patch = async (url, patchData, onSuccess, onError, headerType = "auth") => {

    try {
      var apiResponse = await Axios.patch(url, patchData, {
        headers:
          headerType === "auth"
            ? this.getApiheader()
            : this.getNonLoginApiHeader(),
      });
      if (apiResponse.status === 200 || apiResponse.status === 201) {
        onSuccess(apiResponse);

      } else {
        onError(apiResponse.data);
      }
    } catch (error) {
      // if (error.response && error.response.status && error.response.status === 401) {
      //   Auth.logout();
      //   window.history.pushState(null, document.title, window.location.href);
      //   window.addEventListener('popstate', function (event) {
      //     window.history.pushState(null, document.title, window.location.href);
      //   });
      //   window.location.href = "/";
      // } else {
      //   onError(error);
      // }
    }
  };

  delete = async (url, onSuccess, onError, headerType = "auth") => {

    try {
      var apiResponse = await Axios.delete(url, {
        headers:
          headerType === "auth"
            ? this.getApiheader()
            : this.getNonLoginApiHeader(),
      });

      if (apiResponse.status === 200 || apiResponse.status === 201) {
        onSuccess(apiResponse);

      } else {
        onError(apiResponse.data);
      }
    } catch (error) {
      // if (error.response && error.response.status && error.response.status === 401) {
      //   Auth.logout();
      //   window.history.pushState(null, document.title, window.location.href);
      //   window.addEventListener('popstate', function (event) {
      //     window.history.pushState(null, document.title, window.location.href);
      //   });
      //   window.location.href = "/";
      // } else {
      //   onError(error);
      // }
    }
  };

  returnResponse = (data, error) => {
    return {
      data,
      error,
    };
  };

  onResponse = (data) => {
    return this.returnResponse(data, undefined);
  };

  onError = (error) => {
    return this.returnResponse(undefined, error);
  };
}

export default Request;
