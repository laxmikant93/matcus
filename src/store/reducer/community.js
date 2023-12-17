import communityType from "../actions/community/actionTypes";

const COMMUNITY_INITIAL_STATE = {
  listQuestions: {
    data: [],
    totalQuestionFound: 0,
    isloaded: false,
  },
  question: {
    data: [],
    error: false
  },
  deleteQuestion: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  findQuestion: {
    data: [],
    loading: false,
  },
  answer: {
    data: [],
    error: false
  },
  listAnswers: {
    data: [],
    loading: false,
  },
  deleteAnswers: {
    data: [],
    loading: false,
  },
  voteCheck: {
    data: [],
    loading: false,
    loaded: false,
  },
  voteCheckAns: {
    data: [],
    loading: false,
    loaded: false,
  },
  searchWords: '',
  vote: [],
}


const community = (state = COMMUNITY_INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case communityType.LIST_QUESTIONS: {

      return {
        ...state,
        listQuestions: {
          ...state.listQuestions,
          data: payload.data,
          totalQuestionFound: payload.total,
          success: true,
          isloaded: true,
        }
      };
    }
    case communityType.LIST_MORE_QUESTIONS: {

      return {
        ...state,
        listQuestions: {
          ...state.listQuestions,
          data: state.listQuestions.data.concat(payload.data),
          totalQuestionFound: payload.total,
          success: true,
          isloaded: true,
        }
      };
    }
    case communityType.ASKED_QUESTIONS: {

      return {

        ...state,
        question: {
          ...state.question,
          data: payload,
          success: true,
        },
        listQuestions: {
          ...state.listQuestions,
          data: [payload].concat(state.listQuestions.data),
          success: true,
          isloaded: true,
        },
      }
    }
    case communityType.DELETE_QUESTION: {
      return {
        ...state,
        deleteQuestion: {
          ...state.delete,
          data: state.listQuestions.data.filter((data) => data._id !== payload),
          success: true,
        },
        listQuestions: {
          ...state.listQuestions,
          data: state.listQuestions.data.filter((data) => data._id !== payload),
          success: true,
          isloaded: true,
        },
      };
    }

    case communityType.FIND_QUESTION_LOADING: {

      return ({
        ...state,
        findQuestion: {
          data: payload,
          loading: true,
        },
        success: true,
      })
    }
    case communityType.LIST_ANSWERS: {

      return {
        ...state,
        listAnswers: {
          ...state.listAnswers,
          data: payload,
          success: true,
        },
      }
    }
    case communityType.LIST_MORE_ANSWERS: {

      return {
        ...state,
        listAnswers: {
          ...state.listAnswers,
          data: payload,
          success: true,
        },
      }
    }
    case communityType.POST_ANSWER:
      return {
        ...state,
        answer: {
          ...state.answer,
          data: payload,
          success: true,
        },
        listAnswers: {
          ...state.listAnswers,
          data: {
            ...state.listAnswers,
            data: [payload].concat(state.listAnswers.data.data),
            total: ++state.listAnswers.data.total
          },
          success: true,
        },
      }

    case communityType.DELETE_ANSWER: {
      return {
        ...state,
        deleteAnswers: {
          ...state.delete,
          success: true,
        },
        listAnswers: {
          ...state.listAnswers,
          data: {
            ...state.listAnswers.data,
            data: state.listAnswers.data.data.filter((item) => item._id !== payload)
          },
          success: true,
        }
      };
    }
    case communityType.SEARCH_WORDS: {
      return {
        ...state,
        searchWords: payload
      };
    }

    case communityType.VOTE_QUESTION: {

      let updatedQuestions;
      if (payload.up) {
        updatedQuestions = state.listQuestions.data.map((data) => {
          return data._id === payload.ref
            ? {
              ...data,
              upVotes: 1 + data.upVotes,
              downVotes: data.myVote === -1 ? data.downVotes - 1 : data.downVotes,
              myVote: 1
            }
            : data;
        });
      } else {
        updatedQuestions = state.listQuestions.data.map((data) => {
          return data._id === payload.ref
            ? {
              ...data,
              upVotes: data.myVote === 1 ? data.upVotes - 1 : data.upVotes,
              downVotes: 1 + data.downVotes,
              myVote: -1
            }
            : data;
        });
      }

      return {
        ...state,
        vote: payload,
        listQuestions: {
          ...state.listQuestions,
          data: updatedQuestions,
          success: true,
          isloaded: true,
        },
        voteCheck: {
          ...state.voteCheck,
          data: [],
          success: true,
          loaded: true,
        },
      };
    }



    case communityType.VOTE_ANSWER: {


      let updatedAnswer;
      if (payload.up) {

        updatedAnswer = state.listAnswers.data.data.map((data) => {
          return data._id === payload.ref
            ? {
              ...data,
              upVotes: 1 + data.upVotes,
              downVotes: data.myVote === -1 ? data.downVotes - 1 : data.downVotes,
              myVote: 1
            }
            : data;
        });
      } else {

        updatedAnswer = state.listAnswers.data.data.map((data) => {
          return data._id === payload.ref
            ? {
              ...data,
              upVotes: data.myVote === 1 ? data.upVotes - 1 : data.upVotes,
              downVotes: 1 + data.downVotes,
              myVote: -1
            }
            : data;
        });
      }

      return {
        ...state,
        vote: payload,
        listAnswers: {
          ...state.listAnswers,
          data: {
            ...state.listAnswers.data,
            data: updatedAnswer
          },
          success: true,
        },
        voteCheckAns: {
          ...state.voteCheckAns,
          data: [],
          success: true,
          loaded: true,
        },
      };
    }
    case communityType.VOTE_CHECK: {
      return {
        ...state,
        voteCheck: {
          ...state.voteCheck,
          data: [],
          loading: true,
          loaded: false,
        },
      };
    }
    case communityType.VOTE_CHECK_ANS: {
      return {
        ...state,
        voteCheckAns: {
          ...state.voteCheckAns,
          data: [],
          loading: true,
          loaded: false,
        },
      };
    }

    default:
      return state;
  }
};

export default community