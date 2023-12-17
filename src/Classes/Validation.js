/* eslint-disable no-useless-escape */
export default class Validation {
    /**
    * 
    * @param {*} value : Validate value or string as empty, it returns true for emprty string
    */
    isEmpty(value) {
        return (value == null || value === undefined || !value || value.length === 0) ? true : false;
    }

    /**
     * 
     * @param {*} value : Validate value or string as empty, it returns true for not emprty string
     */
    isNotEmpty(value) {
        if (typeof value === "object") {
            return true
        }
        return (value == null || value === undefined || !value || value.length === 0 || !value.trim()) ? false : true;
    }

    /**
     * 
     * @param {*} email : Valid input value or string as email.
     */
    isEmail(email) {
        let re = new RegExp(/^(([^<>()\][\]\\.,;:\s@"]+(\.[^<>()\][\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return re.test(String(email).toLowerCase());
    }

    /**
     * 
     * @param {*} inputString : input string is required to check value.
     */
    isNumber(inputString) {
        if (inputString) {
            return !isNaN(inputString); // isNaN returns true for string and false for number
        }
        return (this.isNotEmpty(inputString) && typeof inputString === "number") ? true : false

    }
    /**
     * 
     * @param {*} inputNumber : Must be a number input
     */
    maximum(inputNumber, maxValue) {
        return (this.isNumber(inputNumber) && maxValue >= inputNumber) ? true : false
    }
    /**
     * 
     * @param {*} maxVal : Set Maximum value
     * @param {*} inputVal : User entered value
     */
    lessthanVal(maxVal, inputVal) {
        return (maxVal >= inputVal) ? true : false
    }
    /**
     * 
     * @param {*} charLen : Set Maximum value
     * @param {*} inputVal : User entered value
     */
    characterLength(charLen, inputVal) {
        return (inputVal && charLen >= inputVal.length) ? true : false
    }

    compareCurrentDateTime(data_time) {
        let currentDateTime = new Date();
        return data_time > currentDateTime
    }

    isMobile(mobile) {

        const mobileArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        const splitNumber = mobile.split('');
       
        if (JSON.stringify(splitNumber) !== JSON.stringify(mobileArr)) {
            if (/^\d{10}$/.test(mobile)) {
                var mob = /^[1-9]{1}[0-9]{9}$/;
                if (!mob.test(mobile)) {
                    return false;
                }
                return true;

            } else {

                return false
            }
        }
        else {
            return false
        }
    }

    landlineAndMobile(mobile) {
        // const mobileArr = ["1","2","3","4","5","6","7","8","9","0"];
        // const splitNumber = mobile.split('');
        if (/^(\(?\+?[0-9]*\)?)?[0-9(\)]*$/.test(mobile)) {
            return true;
        } else {
            return false
        }
    }


    contactNumber(mobile) {
        if (this.isNotEmpty(mobile)) {
            if (/^[0-9(\)]*$/.test(mobile)) {
                return true;
            } else {
                return false
            }
        }
        else {
            return false
        }

    }

    contactValidation(mobile) {
        if (mobile.lenght < 10) {
            return false;
        } else {
            return true
        }
    }



    /**
     * 
     * @param {*} length : specify
     * @param {*} inputString : any string to check length
     */
    checkInputLength(length, inputString) {

        return length === inputString.length ? true : false;

    }


    /**
     * @type : return boolean true or false
     * @param {*} string : string
     * @param {*} string1 : string1
     */
    matchTwoString(string, string1) {

        // localeCompare method return 0 when both string are matched or same.
        return string.toString().localeCompare(string1.toString()) === 0 ? true : false;

    }

    // validation for contact number between 10 to 15 digits
    validContact(inputValue) {
        if (this.isNotEmpty(inputValue)) {
            if (/^\d{10,15}$/.test(inputValue)) {
                const contact = /^[0-9]*$/;
                if (contact.test(inputValue) === false) {
                    return false;
                }
                return true;
            }
        } else {
            return false
        }
    }

    // validation for contact number between 8 to 10 digits

    validPhoneNumber(inputValue) {
        if (this.isNotEmpty(inputValue)) {
            if (/^\d{8,10}$/.test(inputValue)) {
                const contact = /^[0-9]*$/;
                if (contact.test(inputValue) === false) {
                    return false;
                }
                return true;
            }
        } else {
            return false
        }
    }

    alphaNumeric(inputValue) {
        if (this.isNotEmpty(inputValue)) {
            if (/^[a-zA-Z0-9_]*$/.test(inputValue)) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    lengthGraterThan(inputString, length) {
        return length > inputString.length ? true : false;
    }

    lengthGraterAndEqual(inputString, length) {
        return inputString.length >= length ? true : false;
    }

    lengthLessThan(inputString, length) {
        return length > inputString.length ? true : false;
    }

    lengthEqual(inputString, length) {
        return length === inputString.length ? true : false;
    }


    minLength(inputString, length) {
        return length <= inputString.length ? true : false;
    }

    maxLength(inputString, length) {
        return length >= inputString.length ? true : false;
    }
}
