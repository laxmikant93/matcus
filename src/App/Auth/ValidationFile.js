
class ValidationFile {


    validEmail(value) {


        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (!pattern.test(value)) {

            return false

        }
        else {
            return true
        }
    }

    filterDomainName(DomainValue) {
        let Alltlds = [
            "com",
            "co.in",
            "info",
            "biz",
            "pro",
            "ru",
            "org",
            "net",
            "uk",
            "de",
            "in",
        ];

        let regex = /[^a-zA-Z0-9]/g;
        if (DomainValue.includes(".")) {
            let val = DomainValue.split(".");
            if (Alltlds.includes(val[val.length - 1])) {
                if (val[val.length - 2] === "co") {
                    if (val[0] === "www") {
                        let tdlsVal = `.` + val[val.length - 2] + `.` + val[val.length - 1]
                        let pikachu = val;
                        pikachu.splice(0, 1);
                        pikachu.splice(pikachu.length - 2, 2);
                        let data = pikachu.join();
                        let dvalue = data.replace(regex, "");
                        return { dvalue, tdlsVal }

                    } else {
                        let tdlsVal = `.` + val[val.length - 2] + `.` + val[val.length - 1]
                        let pikachu = val;
                        pikachu.splice(pikachu.length - 2, 2);
                        let data = pikachu.join();
                        let dvalue = data.replace(regex, "");
                        return { dvalue, tdlsVal }

                    }
                } else {
                    if (val[0] === "www") {
                        let tdlsVal = `.` + val[val.length - 1]
                        let pikachu = val;
                        pikachu.splice(0, 1);
                        pikachu.splice(pikachu.length - 1, 1);
                        let data = pikachu.join();
                        let dvalue = data.replace(regex, "");
                        return { dvalue, tdlsVal }

                    } else {
                        let tdlsVal = `.` + val[val.length - 1]
                        let pikachu = val;
                        pikachu.splice(pikachu.length - 1, 1);
                        let data = pikachu.join();
                        let dvalue = data.replace(regex, "");
                        return { dvalue, tdlsVal }

                    }
                }
            } else {
                let regex = /[^a-zA-Z0-9]/g;
                let value = DomainValue.replace(regex, "");
                let dvalue = value.trim();
                let tdlsVal = ".com"
                return { dvalue, tdlsVal }
            }
        } else {
            let regex = /[^a-zA-Z0-9]/g;
            let value = DomainValue.replace(regex, "");
            let dvalue = value.trim();
            let tdlsVal = ".com"
            return { dvalue, tdlsVal }

        }
    }


    validDomain(value) {
        var pattern = new RegExp(/^-+|-+$|[^a-z0-9""]+/g, "")
        if (pattern.test(value)) {
            return false
        }
        else {
            return true
        }
    }

    ValidUsername(value) {
        var pattern = new RegExp(/^-+|-+$|[^a-z0-9(!@#$%^&*.)""]+/g, "")
        if (pattern.test(value)) {

            return false
        }
        else {
            return true
        }
    }

    ValidPassword(value) {
        // var pattern= new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
        var pattern = new RegExp(/[0-9a-zA-Z]{4,}/)
        if (pattern.test(value)) {

            return true
        }
        else {
            return false
        }

    }
    ValidPasswordHard(value) {
        // var pattern= new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
        var pattern = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,16}$/)
        if (pattern.test(value)) {

            return true
        }
        else {
            return false
        }

    }

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


    validEmpty(value) {

        return (value == null || value === undefined || !value || value.length === 0) ? false : true;

    }

    removeAllSpace = (value) => {
        // let inputValue = value.trim();
        return value.replace(" ", "")
    }


    samePassword(value1, value2) {
        if (value1 === value2) {
            return true
        }
        else {
            return false
        }
    }
    // ZipCodeRegexCheck(regex, value) {
    //     let patterBackSlashChange = regex.replace("^-+|-+$|^a-z0-9(!@#$%^&*.)", '');
    //     var pattern = new RegExp(patterBackSlashChange)

    //     if (pattern.test(value)) {

    //         return false
    //     }
    //     else {
    //         return true
    //     }

    // }
    validWebsiteLink(value) {
        // eslint-disable-next-line no-useless-escape
        var pattern = new RegExp(/(?:www\.)?\.com(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*)*([\w\-]*)/)
        if (!pattern.test(value)) {
            return false;

        } else {
            return true;
        }
    }

    // validPassword(value){
    //     return(value.length>=6)?true:false;
    // }
}
export default new ValidationFile();
