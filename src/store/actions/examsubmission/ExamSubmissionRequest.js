import Api from "../../../Classes/Api";

class ExamSubmissionRequest extends Api {

    constructor(){
        super()
        this.examSubmissionEndpoint = {
            get:super.url("submission")
        }
    }
}

export default new ExamSubmissionRequest()