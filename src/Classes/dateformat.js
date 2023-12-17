class dateFormat {

    constructor(dateInput){
        this.userInputDate = dateInput?new Date(dateInput):new Date()
        this.monthName = {
            "1":"Jan",
            "2":"Feb",
            "3":"Mar",
            "4":"Apr",
            "5":"May",
            "6":"Jun",
            "7":"Jul",
            "8":"Aug",
            "9":"Sep",
            "10":"Oct",
            "11":"Nov",
            "12":"Dec"
        }

    }


    getDay = () =>{

        return this.userInputDate.getDay()

    }

    getDate = () => {
        return this.userInputDate.getDate()>9?this.userInputDate.getDate():`0${this.userInputDate.getDate()}`;
    }

    getMonth = () => {
        return this.monthName[this.userInputDate.getMonth()+1];
    }

    getYear = () => {
        return this.userInputDate.getFullYear();
    }


    getMonthNumber= () => {
        let mnth = this.userInputDate.getMonth()+1;
        return mnth>9?mnth:`0${mnth}`;
    }
    

    getHr = () => {
        
        return this.userInputDate.getHours()>12?this.userInputDate.getHours()-12:this.userInputDate.getHours(); 
    }

    getMm = () => {
        return this.userInputDate.getMinutes();
    }

    getAmPm = () => {
        return this.userInputDate.getHours()>12?"PM":"AM"
    }


    getFullTime = () =>{
        return `${this.getHr()}:${this.getMm()}${this.getAmPm()}`
    }

    getDateMonthYear = (separator="/") => {
        return `${this.getDate()}${separator}${this.getMonthNumber()}${separator}${this.getYear()}`;
    }

    getChatDateTime = () => {
        return `${this.getDateMonthYear()} ${this.getFullTime()}`
    }

}

export default dateFormat;