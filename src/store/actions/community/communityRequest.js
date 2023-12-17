import Request from "../../../Classes/Request";

class communityRequest extends Request {

    constructor() {
        super()
        this.postQuestionEndpoint = {
            postQuestionUrl: super.url('/post'),
            findAll: super.url('/post?isDeleted=false&$populate[]=owner&$sort=-_id'),
            findAllPage: super.url('/post?isDeleted=false&$populate[]=owner&$sort=-_id&$skip=__SKIP__&$limit=__LIMIT__'),
            searchPost: super.url('/post?isDeleted=false&$populate[]=owner&$sort=-_id&text[$search]=__TEXT__'),
            deleteQuestionUrl: super.url('/post/__id__'),
            findQuestion: super.url('/post/__id__?$populate[]=owner&isDeleted=false'),
            postAnswer: super.url('/answer'),
            findAnswer: super.url('/answer/?post=__id__&$populate[]=owner&isDeleted=false&$sort=-_id'),
            findAllAnswer: super.url('/answer/?post=__id__&$populate[]=owner&isDeleted=false&$sort=-_id&$skip=__SKIP__&$limit=__LIMIT__'),
            deleteAnswerUrl: super.url('/answer/__id__'),
            communityVote: super.url('/vote'),
            askQuestionNotification: super.url('/notifications/communityAskQuestion/id'),
            voteQuestionNotification:super.url('/notifications/voteQuestion/id'),
            dislikeQuestionNotification:super.url('/notifications/dislikeQuestion/id'),
            answerCommunityNotification:super.url("/notifications/answercommunity/id","commonservices"),
            deleteanswerNotification:super.url("/notifications/deleteanswer/id","commonservices"),
            voteAnswerNotification:super.url("/notifications/voteanswer/id","commonservices"),
            dislikeAnswerNotification:super.url("/notifications/dislikeanswer/:id","commonservices"),
        }
    }
}

export default new communityRequest();