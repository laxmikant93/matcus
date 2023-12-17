// action type
import communityType from "./actionTypes";
import communityRequest from "./communityRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";

//                      _____________________QUESTIONS_________________________

// get all the questions
export const getQuestionData = () => {
	return (dispatch) => {
		communityRequest.get(
			communityRequest.postQuestionEndpoint.findAll,
			(success) => {
				dispatch({
					type: communityType.LIST_QUESTIONS,
					payload: success.data,
				});
			},
			(error) => {
				dispatch(setCommonError(error.message));
			},
		);
	};
};
// get all the questions
export const getMoreQuestionData = (skip, limit) => {
	return (dispatch) => {
		communityRequest.get(
			communityRequest.postQuestionEndpoint.findAllPage.replace("__SKIP__", skip).replace("__LIMIT__", limit),
			(success) => {
				dispatch({
					type: communityType.LIST_MORE_QUESTIONS,
					payload: success.data,
				});
			},
			(error) => {
				dispatch(setCommonError(error.message));
			},
		);
	};
};
//
// get all the searched Posts/questions
export const searchQuestion = (searchwords) => {
	return (dispatch) => {
		communityRequest.get(
			communityRequest.postQuestionEndpoint.searchPost.replace("__TEXT__", searchwords),
			(success) => {
				dispatch({
					type: communityType.LIST_QUESTIONS,
					payload: success.data,
				});
			},
			(error) => {
				dispatch(setCommonError(error.message));
			},
		);
	};
};
//

// post question

export const postQuestionData = (data, UserFullname, profile_url) => {
	return (dispatch) => {
		communityRequest.post(
			communityRequest.postQuestionEndpoint.postQuestionUrl,
			data,
			(success) => {
				dispatch(showSuccessPopup("Question Published."));
				dispatch({
					type: communityType.ASKED_QUESTIONS,
					payload: {
						...success.data,
						answers_data: [],
						owner_fullname: UserFullname,
						owner_profile_picture: profile_url,
						upVotes: 0,
						downVotes: 0,
						myVote: 0,
					},
				});
				dispatch(findQuestion(success.data._id));
			if(success.data){
				dispatch(sendNewQuestionNotification(success.data));			//Ask Community Notifications
			}
			},
			(error) => {
				dispatch(setCommonError(error.message));
			},
		);
	};
};
//

// find single question
export const findQuestion = (questionId) => {
	return (dispatch) => {
		dispatch({
			type: communityType.FIND_QUESTION_LOADING,
			payload: {},
		});

		communityRequest.get(
			communityRequest.postQuestionEndpoint.findQuestion.replace("__id__", questionId),
			(success) => {
				dispatch({
					type: communityType.FIND_QUESTION_LOADING,
					payload: success.data,
				});

			},
			(error) => {
				dispatch(setCommonError(error.message));
			},
		);
	};
};

// delete question
export const deleteQuestionData = (id) => {
	return (dispatch) => {
		communityRequest.delete(
			communityRequest.postQuestionEndpoint.deleteQuestionUrl.replace("__id__", id),
			(success) => {
				dispatch({
					type: communityType.DELETE_QUESTION,
					payload: success.data._id,
				});
			},
			(error) => {
				dispatch(setCommonError(error.message));
			},
		);
	};
};
//

//                         __________________ANSWERS__________________

// get all the answers
export const getAnswerData = (id) => {
	return (dispatch) => {
		communityRequest.get(
			communityRequest.postQuestionEndpoint.findAnswer.replace("__id__", id),
			(success) => {
				dispatch({
					type: communityType.LIST_ANSWERS,
					payload: success.data,
					// payload: success.data.data,
					// payload: {...success.data, answers_data: []}
				});
			},
			(error) => {
				dispatch(setCommonError(error.message));
			},
		);
	};
};
export const getMoreAnswerData = (id, skip, limit) => {
	return (dispatch) => {
		communityRequest.get(
			communityRequest.postQuestionEndpoint.findAllAnswer
				.replace("__id__", id)
				.replace("__SKIP__", skip)
				.replace("__LIMIT__", limit),
			(success) => {
				dispatch({
					type: communityType.LIST_MORE_ANSWERS,
					payload: success.data,
				});
			},
			(error) => {
				dispatch(setCommonError(error.message));
			},
		);
	};
};
//

// post answer
export const postAnswerData = (data) => {
	return (dispatch) => {
		communityRequest.post(
			communityRequest.postQuestionEndpoint.postAnswer,
			data,
			(success) => {
				dispatch(showSuccessPopup("Your Answer was Successfully Published !!"));
				dispatch({
					type: communityType.POST_ANSWER,
					payload: {
						...success.data,
						...success.data.data,
						upVotes: 0,
						downVotes: 0,
						myVote: 0
					}
				});

				dispatch(answerCommunityquestion(success.data));
			},
			(error) => {
				dispatch(setCommonError(error.message));
			},
		);
	};
};
//

// delete answer
export const deleteAnswerwData = (id) => {
	return (dispatch) => {
		communityRequest.delete(
			communityRequest.postQuestionEndpoint.deleteAnswerUrl.replace("__id__", id),
			(success) => {
				dispatch({
					type: communityType.DELETE_ANSWER,
					payload: success.data._id,
				});

				dispatch(deleteAnswerNotification(success.data));
			},
			(error) => {
				dispatch(setCommonError(error.message));
			},
		);
	};
};
//

//  --------------------------- UPVOTE / Downvote ----------------------

export const questionVote = (data) => {
	return (dispatch) => {
		communityRequest.post(
			communityRequest.postQuestionEndpoint.communityVote,
			data,
			(success) => {
				dispatch({
					type: communityType.VOTE_QUESTION,
					payload: success.data,
				});

				if(success.data.up){
					dispatch(voteQuestionNotification(success.data));   //Vote Notification in community
				}else{
					dispatch(dislikeQuestionNotification(success.data));   //Vote Notification in community
				}
			},
			(error) => {
				dispatch(setCommonError(error.message));
			},
		);
	};
};
export const checkVoteRest = () => {
	return (dispatch) => {
		dispatch({
			type: communityType.VOTE_CHECK,
		});
	};
};
export const checkVoteAnsRest = () => {
	return (dispatch) => {
		dispatch({
			type: communityType.VOTE_CHECK_ANS,
		});
	};
};

export const answerVote = (data) => {
	return (dispatch) => {
		communityRequest.post(
			communityRequest.postQuestionEndpoint.communityVote,
			data,
			(success) => {
				dispatch({
					type: communityType.VOTE_ANSWER,
					payload: success.data,
				});
				if(success.data.up){
					dispatch(voteanswerNotification(success.data));
				}else{
					dispatch(dislikeanswerNotification(success.data));
				}
			},
			(error) => {
				dispatch(setCommonError(error.message));
			},
		);
	};
};
// get all the questions
export const searchWords = (data) => {
	return (dispatch) => {
		dispatch({
			type: communityType.SEARCH_WORDS,
			payload: data,
		});
	};
};


//add new question Notification
export const sendNewQuestionNotification=(data)=>{
	return (dispatch)=>{
		let id=data.owner;
		communityRequest.post(communityRequest.postQuestionEndpoint.askQuestionNotification.replace("id",id),
			data,
			(success)=>{
				
			},(error)=>{

			},
			)
	}
}

//vote question notification
export const voteQuestionNotification=(data)=>{
return (dispatch)=>{	
	let id=data.voter;
	communityRequest.post(communityRequest.postQuestionEndpoint.voteQuestionNotification.replace("id",id),
	data,
	(success)=>{
	},(error)=>{

	}
	)
}
}

//vote question notification
export const dislikeQuestionNotification=(data)=>{
return (dispatch)=>{
	let id=data.voter;
	communityRequest.patch(communityRequest.postQuestionEndpoint.dislikeQuestionNotification.replace("id",id),
	data,
	(success)=>{

	},(error)=>{

	})
}
}

//answer notification
export const answerCommunityquestion=(data)=>{

	return (dispatch)=>{
		let id=data.owner;
		communityRequest.post(communityRequest.postQuestionEndpoint.answerCommunityNotification.replace("id",id),
		data,
		(success)=>{
		},(error)=>{
		})
	}
}

//delete answer notifications
export const deleteAnswerNotification=(data)=>{
	return(dispatch)=>{
		let id=data.owner;
		communityRequest.patch(communityRequest.postQuestionEndpoint.deleteanswerNotification.replace("id",id),
		data,
		(success)=>{
		},(error)=>{
		})

	}
}
//vote answer notification
export const voteanswerNotification=(data)=>{
	return(dispatch)=>{
		let id=data.voter;
		communityRequest.post(communityRequest.postQuestionEndpoint.voteAnswerNotification.replace("id",id),
		data,
		(success)=>{
		},(error)=>{
		})
	}

}

//dislike answer notification
export const dislikeanswerNotification=(data)=>{
	return (dispatch)=>{
		let id=data.voter;
		communityRequest.post(communityRequest.postQuestionEndpoint.dislikeAnswerNotification.replace("id",id),
		data,
		(success)=>{
		},(error)=>{
		})
	}
}
