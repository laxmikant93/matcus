/* eslint-disable no-useless-escape */
export default class ValidationUtils {
  /**
   *
   * @param {*} value : Validate value or string as empty, it returns true for emprty string
   */
  static isEmpty(value) {
    return value == null || value === undefined || !value || value.length === 0
      ? true
      : false;
  }

  /**
   *
   * @param {*} value : Validate value or string as empty, it returns true for not emprty string
   */
  static isNotEmpty(value) {
    return value == null ||
      value === undefined ||
      !value ||
      value.length === 0
      // !value.trim()
      ? false
      : true;
  }

  /**
   *
   * @param {*} email : Valid input value or string as email.
   */
  static isEmail(email) {
    let re = new RegExp(
      /^(([^<>()\][\]\\.,;:\s@"]+(\.[^<>()\][\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return re.test(String(email).toLowerCase());
  }

  /**
   *
   * @param {*} inputString : input string is required to check
   */
  static isNumber(inputString) {
    return this.isNotEmpty(inputString) && typeof inputString === "number"
      ? true
      : false;
  }
  /**
   *
   * @param {*} inputNumber : Must be a number input
   */
  static maximum(inputNumber, maxValue) {
    return this.isNumber(inputNumber) && maxValue >= inputNumber ? true : false;
  }

  static isMobile(mobile) {
    const mobileArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const splitNumber = mobile.split("");

    if (JSON.stringify(splitNumber) !== JSON.stringify(mobileArr)) {
      if (/^\d{10}$/.test(mobile)) {
        var mob = /^[1-9]{1}[0-9]{9}$/;
        if (!mob.test(mobile)) {
          return false;
        }
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  static landlineAndMobile(mobile) {
    // const mobileArr = ["1","2","3","4","5","6","7","8","9","0"];
    // const splitNumber = mobile.split('');

    if (/^(\(?\+?[0-9]*\)?)?[0-9(\)]*$/.test(mobile)) {
      return true;
    } else {
      return false;
    }
  }

  static contactNumber(mobile) {
    if (this.isNotEmpty(mobile)) {
      if (/^[0-9(\)]*$/.test(mobile)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  /**
   *
   * @param {*} length : specify
   * @param {*} inputString : any string to check length
   */
  static checkInputLength(length, inputString) {
    return length === inputString.length ? true : false;
  }

  /**
   * @type : return boolean true or false
   * @param {*} string : string
   * @param {*} string1 : string1
   */
  static matchTwoString(string, string1) {
    // localeCompare method return 0 when both string are matched or same.
    return string.toString().localeCompare(string1.toString()) === 0
      ? true
      : false;
  }
}
