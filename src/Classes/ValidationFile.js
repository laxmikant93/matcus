/* eslint-disable no-useless-escape */
import Validation from "./Validation"
class ValidationFile extends Validation {
  validEmail(value) {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );


    if (!pattern.test(value)) {
      return false;
    } else {
      return true;
    }
  }

  isNumber(inputString) {
    return (this.isNotEmpty(inputString) && typeof inputString === "number") ? true : false

  }
  isNotEmpty(value) {
    if (typeof value === "object") {
      return true
    }
    return (value == null || value === undefined || !value || value.length === 0) ? false : true;
  }

  validFacebookLink(value) {
    var pattern = new RegExp(
      /(?:http:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/

    )
    if (!pattern.test(value)) {
      return false;

    } else {
      return true;
    }
  }

  validlinkedinLink(value) {
    var pattern = new RegExp(
      /(?:http:\/\/)?(?:www\.)?linkedin\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/
    )
    if (!pattern.test(value)) {
      return false;

    } else {
      return true;
    }
  }

  validtwitterLink(value) {
    var pattern = new RegExp(
      /(?:http:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/
    )
    if (!pattern.test(value)) {
      return false;
    } else {
      return true;
    }
  }
  validinstagramLink(value) {
    var pattern = new RegExp(
      /(?:http:\/\/)?(?:www\.)?instagram\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/
    )
    if (!pattern.test(value)) {
      return false;

    } else {
      return true;
    }
  }
  validWebsiteLink(value) {
    var pattern = new RegExp(
      /(?:www\.)?\.[a-z](?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*)*([\w\-]*)/

    )
    if (!pattern.test(value)) {
      return false;

    } else {
      return true;
    }
  }
  removeSpace = (value) => {
    let returnValue = value
    let InputValue = value.split(" ");
    if (InputValue.length > 1) {
      returnValue = InputValue[0] + InputValue[1]
    }

    return returnValue
  }

  removeSpaceFullName = (inputValue, intialValue) => {
    return inputValue.length > 1 ? (inputValue[inputValue.length - 2] === " " && inputValue[inputValue.length - 1] === " " ? intialValue : inputValue) : inputValue.trim()

  }
  removeAllSpace = (value) => {
    // let inputValue = value.trim();
    return value.replace(" ", "")
  }


  validyoutubeLink(value) {
    var pattern = new RegExp(
      /(?:http:\/\/)?(?:www\.)?youtube\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/
    )
    if (!pattern.test(value)) {
      return false;

    } else {
      return true;
    }
  }
  validEmpty(value) {
    return value == null || value === undefined || !value || value.length === 0
      ? false
      : true;
  }
  spaceNotAccept(value) {
    return value.length > 0 && value[0] === " " ? "" : value
  }
  // validEmpty(value,name){

  //     if(value == null || value===undefined || !value ||  value.length === 0)
  //     {
  //         return false;
  //     }
  //     else{
  //         switch(name){
  //             case 'email':
  //                 let re = new RegExp(/^(([^<>()\][\]\\.,;:\s@"]+(\.[^<>()\][\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  //                 return re.test(String(value).toLowerCase());
  //             case 'password':
  //                 return(value.length>=6)?true:false;
  //             default :
  //             return false
  //         }
  //     }
  // }

  ValidateNumber(value) {
    // var pattern= new RegExp(/^-+|-+$|[^0-9]+/g, "")
    var pattern = new RegExp(/^\d{16}$|-+|-+$|[^0-9]+/g, "")
    // var pattern= new RegExp(/^[0-9]{10,10}$/g, "")
    if (pattern.test(value)) {

      return false
    }
    else {
      return true
    }

  }

  samePassword(value1, value2) {
    if (value1 === value2) {
      return true;
    } else {
      return false;
    }
  }
  validWebsiteLinkPrivateDomain(value) {
    var pattern = new RegExp(
      /(?:www\.)?\.[a-z](?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*)*([\w\-]*)/

    )
    if (!pattern.test(value)) {
      return false;

    } else {
      return true;
    }
  }
  containsSpecialChars(value) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(value);
  }
  // validPassword(value){
  //     return(value.length>=6)?true:false;
  // }
}
export default new ValidationFile();
