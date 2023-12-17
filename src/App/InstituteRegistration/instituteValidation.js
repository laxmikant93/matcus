import Validation from "../../Classes/Validation";
// import Auth from "../../../Classes/Auth";
class InstituteValidation extends Validation {
    constructor() {
        super()
        this.instituteValidation = this.defaultForm()
    }


    setOwner = ownerId => {
        this.instituteValidation = {
            ...this.instituteValidation,
            owner: {
                value: ownerId,
                valid: ownerId ? true : false
            }
        }
    }

    defaultForm = () => {

        return {
            // page_name: {
            //     value:'',
            //     valid:true
            // },
            institute_name: {
                value: '',
                valid: false
            },
            institute_phone: {
                value: '',
                valid: false
            },
            institute_website: {
                value: '',
                valid: true
            },
            institute_address: {
                value: '',
                valid: false
            },
            institute_about: {
                value: '',
                valid: true
            },
            institute_email: {
                value: '',
                valid: false
            },
            institute_category: {
                value: '',
                valid: false
            },
            institute_country: {
                value: '',
                valid: false
            },
            institute_state: {
                value: '',
                valid: false
            },
            institute_city: {
                value: '',
                valid: false
            },
            institute_zipcode: {
                value: '',
                valid: false
            },
            // owner: {
            //     value:Auth.user()._id,
            //     valid:true
            // },
        }
    }

    handleInput = e => {
        const inputName = e.target.name;
        const inputValue = e.target.value;

        switch (inputName) {
            case "institute_email":
                this.instituteValidation = {
                    ...this.instituteValidation,
                    [inputName]: {
                        value: inputValue.trim(),
                        valid: this.isEmail(inputValue)
                    }
                }
                break;

            case "institute_name":
                this.instituteValidation = {
                    ...this.instituteValidation,
                    [inputName]: {
                        value: inputValue,
                        valid: this.isNotEmpty(inputValue)
                    }
                }
                break;

            case "institute_category":
                this.instituteValidation = {
                    ...this.instituteValidation,
                    [inputName]: {
                        value: inputValue,
                        valid: this.isNotEmpty(inputValue)
                    }
                }
                break;

            case "institute_phone":
                this.instituteValidation = {
                    ...this.instituteValidation,
                    [inputName]: {
                        value: inputValue,
                        valid: this.contactNumber(inputValue)
                    }
                }
                break;


            default:
                this.instituteValidation = {
                    ...this.instituteValidation,
                    [inputName]: {
                        value: inputValue,
                        valid: true
                    }
                }
                break;
        }
    }

    isValid = () => {

        return this.instituteValidation.institute_email.valid && this.instituteValidation.institute_phone.valid &&
            this.instituteValidation.institute_category.valid && this.instituteValidation.institute_name.valid
    }

    getFormInput = () => {
        return this.instituteValidation;
    }

    getFormInputData = () => {
        return {

            institute_name: this.instituteValidation.institute_name.value.trim(),
            institute_phone: this.instituteValidation.institute_phone.value.trim(),
            institute_category: this.instituteValidation.institute_category.value.trim(),
            institute_address: this.instituteValidation.institute_address.value.trim(),
            institute_about: this.instituteValidation.institute_about.value.trim(),
            institute_email: this.instituteValidation.institute_email.value.trim(),
            institute_country: this.instituteValidation.institute_country.value.trim(),
            institute_state: this.instituteValidation.institute_state.value.trim(),
            institute_city: this.instituteValidation.institute_city.value.trim(),
            institute_zipcode: this.instituteValidation.institute_zipcode.value.trim(),

        }
    }

    resetInstituteRegistrationForm = () => {
        this.instituteValidation = this.defaultForm()
    }

}

export default new InstituteValidation();