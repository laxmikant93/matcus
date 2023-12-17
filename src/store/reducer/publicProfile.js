import { PUBLIC_PROFILE_TYPE } from "../actions/publicProfile/actionType";

const initialState = {
  profiles: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false,
  },

  singleProfile: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false,
  },
  like: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false,
  },
  follower: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false,
  },
  editLink: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false,
  },
  experience: {
    data: [],
    success: false,
  },
  contact: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false,
  },
  storeRating: 0,
  reviews: {
    allReviews: [],
    postReview: false,
    success: false,
  },
  awards: {
    data: [],
    success: false,
  },
  followingList: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false,
  },
  followerList: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false,
  },
  education: {
    data: [],
    success: false,
  },
  certificate: {
    data: [],
    success: false,
  },
  Interest_Hobbies: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false,
  },
  Languages: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false,
  },
  Proffesional_Affilates: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false,
  },
  images: {
    data: [],
    success: false,
  },
  videos: {
    data: [],
    success: false,
  },
  workAddress: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false,
  },
  primaryAddress: {
    data: [],
    loading: false,
    success: false,
    error: false,
    loaded: false,
  },
  usernamecheck: {
    data: [],
    username: [],
    loading: false,
    success: false,
    error: false,
    loaded: false,
  },
};

const publicProfile = (state = initialState, { type, payload }) => {
  switch (type) {
    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_LOADING: {
      return {
        ...state,
        profiles: {
          ...state.profiles,
          data: [],
          loading: true,
          error: false,
          loaded: false,
          success: false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_LOADED: {
      return {
        ...state,
        profiles: {
          ...state.profiles,
          data: payload,
          loading: false,
          loaded: true,
          success: true,
          error: false,
        },
      };
    }
    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_MORE_LOAD_SUCCESS: {
      return {
        ...state,
        profiles: {
          ...state.profiles,
          data: {
            ...state.profiles.data,
            data: state.profiles.data.data.concat(payload.data),
          },
          loading: false,
          loaded: true,
          success: true,
          error: false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_SORT_MORE: {
      return {
        ...state,
        profiles: {
          ...state.profiles,
          data: {
            ...state.profiles.data,
            data: state.profiles.data.data.concat(payload.data),
          },
          loading: false,
          loaded: true,
          success: true,
          error: false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_BY_ID_LOADING: {
      return {
        ...state,
        singleProfile: {
          ...state.singleProfile,
          data: [],
          loading: true,
          loaded: false,
          success: false,
          error: false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_BY_ID_LOADED: {
      return {
        ...state,
        singleProfile: {
          ...state.singleProfile,
          data: payload,
          loaded: true,
          success: true,
          error: false,
          loading: false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_BANNER: {
      return {
        ...state,
        singleProfile: {
          ...state.singleProfile,
          data: {
            userInfo: {
              ...state.singleProfile.data.userInfo,
              ...payload,
              // public_profile_banner: payload,
            },
            profileInfo: {
              ...state.singleProfile.data.profileInfo,
            },
          },
          loaded: true,
          success: true,
          error: false,
          loading: false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_LEVEL: {
      return {
        ...state,
        singleProfile: {
          ...state.singleProfile,
          data: {
            userInfo: {
              ...state.singleProfile.data.userInfo,
              ...payload,
            },
            profileInfo: {
              ...state.singleProfile.data.profileInfo,
            },
          },
          loaded: true,
          success: true,
          error: false,
          loading: false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_TEACHING_MODE: {
      return {
        ...state,
        singleProfile: {
          ...state.singleProfile,
          data: {
            userInfo: {
              ...state.singleProfile.data.userInfo,
              ...payload,
            },
            profileInfo: {
              ...state.singleProfile.data.profileInfo,
            },
          },
          loaded: true,
          success: true,
          error: false,
          loading: false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_TAUGHT_SUBJECT: {
      return {
        ...state,
        singleProfile: {
          ...state.singleProfile,
          data: {
            userInfo: {
              ...state.singleProfile.data.userInfo,
              ...payload,
            },
            profileInfo: {
              ...state.singleProfile.data.profileInfo,
            },
          },
          loaded: true,
          success: true,
          error: false,
          loading: false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_SKILLS: {
      return {
        ...state,
        singleProfile: {
          ...state.singleProfile,
          data: {
            userInfo: {
              ...state.singleProfile.data.userInfo,
              ...payload,
            },
            profileInfo: {
              ...state.singleProfile.data.profileInfo,
            },
          },
          loaded: true,
          success: true,
          error: false,
          loading: false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUT_LIKE_LOADING: {
      return {
        ...state,
        like: {
          ...state.like,
          data: [],
          loading: true,
          loaded: false,
          success: false,
          error: false,
        },
      };
    }
    case PUBLIC_PROFILE_TYPE.PUT_LIKE: {
      return {
        ...state,
        like: {
          ...state.like,
          data: payload,
          error: false,
          loading: false,
          success: true,
          loaded: true,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUT_UNLIKE: {
      return {
        ...state,
        like: {
          ...state.like,
          data: payload,
          error: false,
          success: true,
          loading: false,
          loaded: true,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUT_UNLIKE_LOADING: {
      return {
        ...state,
        like: {
          ...state.like,
          data: [],
          loading: true,
          loaded: false,
          success: false,
          error: false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUT_FOLLOWER_LOADING: {
      return {
        ...state,
        follower: {
          ...state.follower,
          data: [],
          error: false,
          success: false,
          loading: true,
          loaded: false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUT_FOLLOWER: {
      return {
        ...state,
        follower: {
          ...state.follower,
          data: payload,
          error: false,
          loaded: true,
          success: true,
          loading: false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUT_UNFOLLOWER_LOADING: {
      return {
        ...state,
        follower: {
          ...state.follower,
          data: [],
          success: false,
          loading: true,
          loaded: false,
          error: false,
        },
      };
    }
    case PUBLIC_PROFILE_TYPE.PUT_UNFOLLOWER: {
      return {
        ...state,
        follower: {
          ...state.follower,
          data: [],
          success: true,
          loaded: true,
          loading: false,
          error: false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_UPDATE_LIKE: {
      return {
        ...state,
        singleProfile: {
          ...state.singleProfile,
          like: state.singleProfile.data.userInfo.like.push(payload),
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_UPDATE_UNLIKE: {
      return {
        ...state,
        singleProfile: {
          ...state.singleProfile,
          data: {
            ...state.singleProfile.data,
            userInfo: {
              ...state.singleProfile.data.userInfo,
              like: state.singleProfile.data.userInfo.like.filter((data) => {
                return data !== payload;
              }),
            },
            profileInfo: {
              ...state.singleProfile.data.profileInfo,
            },
          },
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_HIGHLIGHT: {
      return {
        ...state,
        singleProfile: {
          ...state.singleProfile,
          data: {
            ...state.singleProfile.data,
            userInfo: {
              ...state.singleProfile.data.userInfo,
            },
            profileInfo: {
              ...state.singleProfile.data.profileInfo,
              ...payload,
            },
          },
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_UPDATE_FOLLOW: {
      return {
        ...state,
        singleProfile: {
          ...state.singleProfile,
          follower: state.singleProfile.data.userInfo.follower.push(payload),
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_UPDATE_UNFOLLOW: {
      return {
        ...state,
        singleProfile: {
          ...state.singleProfile,
          data: {
            ...state.singleProfile.data,
            userInfo: {
              ...state.singleProfile.data.userInfo,
              follower: state.singleProfile.data.userInfo.follower.filter(
                (data) => {
                  return data !== payload;
                }
              ),
            },
            profileInfo: {
              ...state.singleProfile.data.profileInfo,
            },
          },
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_EDIT_LINK: {
      return {
        ...state,
        editLink: {
          ...state.editLink,
          data: payload,
          error: false,
          loading: false,
          loaded: true,
          success: true,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_EDIT_LINK_LOADING: {
      return {
        ...state,
        editLink: {
          ...state.editLink,
          data: [],
          error: false,
          loading: true,
          loaded: false,
          success: false,
        },
      };
    }
    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_EDIT_LINK_UPDATE: {
      return {
        ...state,
        editLink: {
          ...state.editLink,
          data: payload,
          error: false,
          loading: false,
          loaded: true,
          success: true,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_EXPERIENCE_GET: {
      return {
        ...state,
        experience: {
          ...state.experience,
          data: payload.data.length > 0 ? payload.data.reverse() : [],
          success: payload.statusText === ("OK" || 200) ? true : false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_EXPERIENCE_ADD: {
      return {
        ...state,
        experience: {
          ...state.experience,
          data: [payload].concat(state.experience.data),
          success: true,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_EXPERIENCE_EDIT: {
      return {
        ...state,
        experience: {
          ...state.experience,
          data: state.experience.data.map((experience) => {
            return experience._id === payload._id
              ? {
                ...experience,
                ...payload,
              }
              : experience;
          }),
          success: true,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_EXPERIENCE_DELETE: {
      return {
        ...state,
        experience: {
          ...state.experience,
          data: state.experience.data.filter((experience) => {
            return experience._id !== payload;
          }),
          success: true,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_GET_CONTACT_AND_ADDRESS: {
      return {
        ...state,
        contact: {
          ...state.contact,
          data: payload,
          loading: false,
          loaded: true,
          success: true,
          error: false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_GET_PRIMARYADDRESS: {
      return {
        ...state,
        primaryAddress: {
          ...state.primaryAddress,
          data: payload,
          loading: false,
          loaded: true,
          success: true,
          error: false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_GET_WORKADDRESS: {
      return {
        ...state,
        workAddress: {
          ...state.workAddress,
          data: payload,
          loading: false,
          loaded: true,
          success: true,
          error: false,
        },
      };
    }
    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_PATCH_CONTACT: {
      return {
        ...state,
        contact: {
          ...state.contact,
          data: payload,
          loaded: true,
          loading: false,
          error: false,
          success: true,
        },
      };
    }

    // case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_PATCH_PRIMARYADDRESS: {
    //   return {
    //     ...state,
    //     primaryAddress: {
    //       ...state.primaryAddress,
    //       data: payload,
    //       loaded: true,
    //       loading: false,
    //       success: true,
    //       error: false,
    //     },
    //   };
    // }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_POST_PRIMARYADDRESS: {
      return {
        ...state,
        primaryAddress: {
          ...state.primaryAddress,
          data: payload,
          loaded: true,
          loading: false,
          success: true,
          error: false,
        },
      };
    }
    // case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_DELETE_PRIMARYADDRESS: {
    //   return {
    //     ...state,
    //     primaryAddress: {
    //       ...state.primaryAddress,
    //       data: payload,
    //       loaded: true,
    //       loading: false,
    //       success: true,
    //       error: false,
    //     },
    //   };
    // }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_POST_WORKADDRESS: {
      return {
        ...state,
        workAddress: {
          ...state.workAddress,
          data: payload,
          loaded: true,
          loading: false,
          success: true,
          error: false,
        },
      };
    }

    // case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_PATCH_WORKADDRESS: {
    //   return {
    //     ...state,
    //     workAddress: {
    //       ...state.workAddress,
    //       data: payload,
    //       loaded: true,
    //       loading: false,
    //       success: true,
    //       error: false,
    //     },
    //   };
    // }

    // case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_DELETE_WORKADDRESS: {
    //   return {
    //     ...state,
    //     workAddress: {
    //       ...state.workAddress,
    //       data: payload,
    //       loaded: true,
    //       loading: false,
    //       success: true,
    //       error: false,
    //     },
    //   };
    // }

    case PUBLIC_PROFILE_TYPE.GET_PUBLIC_PROFILES_REVIEWS: {
      return {
        ...state,
        reviews: {
          ...state.reviews,
          // allReviews: payload.length > 0 ? payload.reverse() : [],
          allReviews: payload,
          postReview: false,
          success: payload.length > 0 ? true : false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_POST_REVIEW: {
      return {
        ...state,
        reviews: {
          ...state.reviews,
          allReviews: [payload.data].concat(state.reviews.allReviews),
          postReview: payload.message === "200" ? true : false,
          success: true,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_EDIT_REVIEW: {
      return {
        ...state,
        reviews: {
          ...state.reviews,
          allReviews: state.reviews.allReviews.map((reviewData) =>
            reviewData._id === payload._id
              ? {
                ...reviewData,
                ...payload,
              }
              : reviewData
          ),
          postReview: false,
          success: true,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_DELETE_REVIEW: {
      return {
        ...state,
        reviews: {
          ...state.reviews,
          allReviews: state.reviews.allReviews.filter((review) => {
            return review._id !== payload._id;
          }),
          success: true,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_STORE_RATING: {
      return {
        ...state,
        storeRating: payload,
      };
    }

    // awards
    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_AWARD_GET: {
      return {
        ...state,
        awards: {
          ...state.awards,
          data: payload.data.length > 0 ? payload.data.reverse() : [],
          success: payload.statusText === ("OK" || 200) ? true : false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_AWARD_POST: {
      return {
        ...state,
        awards: {
          ...state.awards,
          data: [payload].concat(state.awards.data),
          success: true,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_AWARD_EDIT: {
      return {
        ...state,
        awards: {
          ...state.awards,
          data: state.awards.data.map((award) => {
            return award._id === payload._id ? { ...award, ...payload } : award;
          }),
          success: true,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_AWARD_DELETE: {
      return {
        ...state,
        awards: {
          ...state.awards,
          data: state.awards.data.filter((award) => {
            return award._id !== payload;
          }),
          success: true,
        },
      };
    }

    // Education
    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_EDUCATION_GET: {
      return {
        ...state,
        education: {
          ...state.education,
          data: payload.data.length > 0 ? payload.data.reverse() : [],
          success: payload.statusText === ("OK" || 200) ? true : false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_EDUCATION_POST: {
      return {
        ...state,
        education: {
          ...state.education,
          data: [payload].concat(state.education.data),
          success: true,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_EDUCATION_EDIT: {
      return {
        ...state,
        education: {
          ...state.education,
          data: state.education.data.map((education) => {
            return education._id === payload._id
              ? { ...education, ...payload }
              : education;
          }),
          success: true,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_EDUCATION_DELETE: {
      return {
        ...state,
        education: {
          ...state.education,
          data: state.education.data.filter((education) => {
            return education._id !== payload;
          }),
          success: true,
        },
      };
    }

    // Certificate
    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_CERTIFICATE_GET: {
      return {
        ...state,
        certificate: {
          ...state.certificate,
          data: payload.data.length > 0 ? payload.data.reverse() : [],
          success: payload.statusText === ("OK" || 200) ? true : false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_CERTIFICATE_POST: {
      return {
        ...state,
        certificate: {
          ...state.certificate,
          data: [payload].concat(state.certificate.data),
          success: true,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_CERTIFICATE_EDIT: {
      return {
        ...state,
        certificate: {
          ...state.certificate,
          data: state.certificate.data.map((certificate) => {
            return certificate._id === payload._id
              ? { ...certificate, ...payload }
              : certificate;
          }),
          success: true,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_CERTIFICATE_DELETE: {
      return {
        ...state,
        certificate: {
          ...state.certificate,
          data: state.certificate.data.filter((certificate) => {
            return certificate._id !== payload;
          }),
          success: true,
        },
      };
    }

    // case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_EXPERIENCE_LIST_UPDATE:{ awards
    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_GET_FOLLOWINGLIST: {
      return {
        ...state,
        followingList: {
          ...state.followingList,
          data: payload,
          success: true,
          loaded: true,
          loading: false,
          error: false,
        },
      };
    }
    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_FOLLOW_FOLLOWINGLIST: {
      return {
        ...state,
        followingList: {
          ...state.followingList,
          data: state.followingList.data.map((item, i) => {
            if (item._id === payload._id) {
              return {
                ...state.followingList.data[i],
                follower: state.followingList.data[i].follower.concat(
                  payload.id
                ),
              };
            }
            return state.followingList.data[i];
          }),
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_FOLLOW_FOLLOWERLIST: {
      return {
        ...state,
        followerList: {
          ...state.followerList,
          data: state.followerList.data.map((item, i) => {
            if (item._id === payload._id) {
              // const newID=state.followerList.data[i].follower.concat(payload.id);

              return {
                ...state.followerList.data[i],
                follower: state.followerList.data[i].follower.concat(
                  payload.id
                ),
              };
            }
            return state.followerList.data[i];
          }),
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_UNFOLLOW_FOLLOWERLIST: {
      return {
        ...state,
        followerList: {
          ...state.followerList,
          data: state.followerList.data.map((item, i) => {
            if (item._id === payload._id) {
              // const newId = state.followerList.data[i].follower.filter(
              //   (data) => {
              //     return data !== payload.id;
              //   }
              // );

              return {
                ...state.followerList.data[i],
                follower: state.followerList.data[i].follower.filter((data) => {
                  return data !== payload.id;
                }),
              };
            }
            return state.followerList.data[i];
          }),
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_UNFOLLOW_FOLLOWINGLIST: {
      return {
        ...state,
        followingList: {
          ...state.followingList,
          data: state.followingList.data.map((item, i) => {
            if (item._id === payload._id) {
              // const newID = state.followingList.data[i].follower.filter(
              //   (data) => {
              //     return data !== payload.id;
              //   }
              // );

              return {
                ...state.followingList.data[i],
                follower: state.followingList.data[i].follower.filter(
                  (data) => {
                    return data !== payload.id;
                  }
                ),
              };
            }
            return state.followingList.data[i];
          }),
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_GET_FOLLOWERLIST: {
      return {
        ...state,
        followerList: {
          ...state.followerList,
          data: payload,
          success: true,
          loaded: true,
          loading: false,
          error: false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_INTEREST_HOBBIES_GET: {
      return {
        ...state,
        Interest_Hobbies: {
          ...state.Interest_Hobbies,
          data: [...payload].reverse(),
          success: true,
          loading: false,
          loaded: true,
          error: false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_INTEREST_HOBBIES_DELETE: {
      return {
        ...state,
        Interest_Hobbies: {
          ...state.Interest_Hobbies,
          data: state.Interest_Hobbies.data.filter((int) => {
            return int._id !== payload._id;
          }),
          success: true,
          loading: false,
          loaded: true,
          error: false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_LANGUAGES_GET: {
      return {
        ...state,
        Languages: {
          ...state.Languages,
          data: payload.length > 0 ? payload.reverse() : [],
          loaded: true,
          loading: false,
          success: true,
          error: false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_LANGUAGES_POST: {
      return {
        ...state,
        Languages: {
          ...state.Languages,
          data: [payload].concat(state.Languages.data),
          loading: false,
          loaded: true,
          success: true,
          error: false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_LANGUAGES_PATCH: {
      return {
        ...state,
        Languages: {
          ...state.Languages,
          data: state.Languages.data.map((lang) => {
            return lang._id === payload._id ? { ...lang, ...payload } : lang;
          }),
          success: true,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_LANGUAGES_DELETE: {
      return {
        ...state,
        Languages: {
          ...state.Languages,
          data: state.Languages.data.filter((lang) => {
            return lang._id !== payload;
          }),
          success: true,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_AFFILIATE_GET: {
      return {
        ...state,
        Proffesional_Affilates: {
          ...state.Proffesional_Affilates,
          data: payload.length > 0 ? payload.reverse() : [],
          success: true,
          loaded: true,
          loading: false,
          error: false,
        },
      };
    }

    // case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_AFFILIATE_POST: {
    //   return {
    //     ...state,
    //     Proffesional_Affilates: {
    //       ...state.Proffesional_Affilates,
    //       data: [payload].concat(state.Languages.data),
    //       success: true,
    //       error: false,
    //       loading: false,
    //       loaded: true,
    //     },
    //   };
    // }

    // case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_AFFILIATE_PATCH: {
    //   return {
    //     ...state,
    //     Proffesional_Affilates: {
    //       ...state.Proffesional_Affilates,
    //       data: state.Proffesional_Affilates.data.map((affiliate) => {
    //         return affiliate._id === payload._id
    //           ? { ...affiliate, ...payload }
    //           : affiliate;
    //       }),
    //     },
    //   };
    // }

    // case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_AFFILIATE_DELETE: {
    //   return {
    //     ...state,
    //     Proffesional_Affilates: {
    //       ...state.Proffesional_Affilates,
    //       data: state.Proffesional_Affilates.data.map((affiliate) => {
    //         return affiliate._id === payload._id
    //           ? affiliate !== payload
    //           : affiliate;
    //       }),
    //     },
    //   };
    // }
    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_SORT: {
      return {
        ...state,
        profiles: {
          ...state.profiles,
          data: payload,
          loading: false,
          loaded: true,
          success: true,
          error: false,
        },
      };
    }
    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_SORT_SCROLL_MORE: {
      return {
        ...state,
        profiles: {
          ...state.profiles,
          data: {
            ...state.profiles.data,
            data: state.profiles.data.data.concat(payload.data),
          },
          loading: false,
          loaded: true,
          success: true,
          error: false,
        },
      };
    }
    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_SEARCH: {
      return {
        ...state,
        profiles: {
          ...state.profiles,
          data: payload,
          success: true,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_SEARCH_SCROLL: {
      return {
        ...state,
        profiles: {
          ...state.profiles,
          data: {
            ...state.profiles.data,
            data: state.profiles.data.data.concat(payload.data),
          },
        },
      };
    }
    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_SEARCH_TYPE_SCROLL: {
      return {
        ...state,
        profiles: {
          ...state.profiles,
          data: {
            ...state.profiles.data,
            data: state.profiles.data.data.concat(payload.data),
          },
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_IMAGES_GET: {
      return {
        ...state,
        images: {
          ...state.images,
          data: payload.data ? payload.data : [],
          success: payload.data ? true : false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_ALBUM_IMAGES_EDIT: {
      return {
        ...state,
        images: {
          ...state.images,
          data: state.images.data.map((album) => {
            return album._id === payload.id
              ? {
                ...album,
                ...payload,
              }
              : album;
          }),
          success: payload.data ? true : false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_VIDEOS_GET: {
      return {
        ...state,
        videos: {
          ...state.videos,
          data: payload.data ? payload.data : [],
          success: payload.data ? true : false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_VIDEOS_EDIT: {
      return {
        ...state,
        videos: {
          ...state.videos,
          data: payload.data,
          success: true,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_USERNAME_SEARCH: {
      return {
        ...state,
        usernamecheck: {
          ...state.usernamecheck,
          data: payload.success.data,
          username: payload.data,
          loaded: true,
          success: true,
          error: false,
          loading: false,
        },
      };
    }

    case PUBLIC_PROFILE_TYPE.NULL_USER_NAME_DATA: {
      return {
        ...state,
        usernamecheck: {
          ...state.usernamecheck,
          data: payload,
          username: [],
          loaded: false,
          success: false,
          error: false,
          loading: true,
        },
      };
    }
    case PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_ABOUT: {
      return {
        ...state,
        singleProfile: {
          ...state.singleProfile,
          data: {
            ...state.singleProfile.data,
            userInfo: {
              ...state.singleProfile.data.userInfo,
            },
            profileInfo: {
              ...state.singleProfile.data.profileInfo,
              about: payload.about,
            },
          },
        },
      };
    }
    default:
      return state;
  }
};

export default publicProfile;
