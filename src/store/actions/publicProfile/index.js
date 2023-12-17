// import publicProfile from "../../reducer/publicProfile";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";
import { SUCCESS_MSG_POPUP } from "../successmessagepopup/actionTypes";
import { PUBLIC_PROFILE_TYPE } from "./actionType";
import publicProfileRequest from "./publicProfileRequest";

// post req for creating profile
// export const createUserProfile = (data) => {
//   return (dispatch) => {
//     publicProfileRequest.post(
//       publicProfileRequest.publicProfileEndPoint.createUserProfile,
//       data,
//       (success) => {
//         dispatch({
//           type: PUBLIC_PROFILE_TYPE.CREATE_PUBLIC_PROFILE,
//           payload: success,
//         });
//       },
//       (error) => {
//         dispatch(setCommonError(error.message));
//         dispatch({
//           type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_ERROR,
//           payload: {},
//         });
//       }
//     );
//   };
// };

// get all profile
export const getPublicProfiles = (limit, skip) => {
  return (dispatch) => {
    // dispatch({
    //   type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_LOADING,
    //   payload: {},
    // });

    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.getpublicprofiles
        .replace("_limit_", limit)
        .replace("_skip_", skip),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_LOADED,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const getPublicProfilesLoadMore = (limit, skip) => {
  return (dispatch) => {
    // dispatch({
    //   type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_LOADING,
    //   payload: {},
    // });

    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.getpublicprofiles
        .replace("_limit_", limit)
        .replace("_skip_", skip),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_MORE_LOAD_SUCCESS,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const sortPublicProfile = (userType, limit, skip) => {
  return (dispatch) => {
    dispatch({
      type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_LOADING,
      payload: [],
    });
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.sortpublicprofile
        .replace("__USERTYPE__", userType)
        .replace("_limit_", limit)
        .replace("_skip_", skip),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_SORT,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const sortPublicProfileMore = (userType, limit, skip) => {
  return (dispatch) => {
    dispatch({
      type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_LOADING,
      payload: [],
    });
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.sortpublicprofile
        .replace("__USERTYPE__", userType)
        .replace("_limit_", limit)
        .replace("_skip_", skip),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_SORT_MORE,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const sortPublicProfileScroll = (userType, limit, skip) => {
  return (dispatch) => {
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.sortpublicprofile
        .replace("__USERTYPE__", userType)
        .replace("_limit_", limit)
        .replace("_skip_", skip),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_SORT_SCROLL_MORE,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
//search all type
export const searchpublicprofiles = (search, limit, skip) => {
  return (dispatch) => {
    dispatch({
      type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_LOADING,
      payload: [],
    });
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.searchpublicprofiles.replace(
        "__SEARCH__",
        search
      ).replace("_limit_", limit).replace("_skip_", skip),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_SEARCH,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const searchpublicprofilesScroll = (search, limit, skip) => {
  return (dispatch) => {
    dispatch({
      type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_LOADING,
      payload: [],
    });
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.searchpublicprofiles.replace(
        "__SEARCH__",
        search
      ).replace("_limit_", limit).replace("_skip_", skip),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_SEARCH_SCROLL,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
// search by type
export const searchpublicprofilesTypes = (search, type, limit, skip) => {
  return (dispatch) => {
    dispatch({
      type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_LOADING,
      payload: [],
    });
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.searchpublicprofilesTypes.replace(
        "__SEARCH__",
        search
      ).replace("_type_", type).replace("_limit_", limit).replace("_skip_", skip),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_SEARCH,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const searchpublicprofilesTypeScroll = (search, type, limit, skip) => {
  return (dispatch) => {
    dispatch({
      type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_LOADING,
      payload: [],
    });
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.searchpublicprofilesTypes.replace(
        "__SEARCH__",
        search
      ).replace("_type_", type).replace("_limit_", limit).replace("_skip_", skip),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_SEARCH_TYPE_SCROLL,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};


//checkusername
export const usernamesearchpublicprofiles = (userid, data) => {
  return (dispatch) => {
    dispatch({
      type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_LOADED,
      payload: {},
    });
    publicProfileRequest.post(
      publicProfileRequest.publicProfileEndPoint.usernamesearchpublicprofiles.replace(
        "_USERID_",
        userid
      ),
      data,
      (success) => {
        let urldata = { success: success, data: data };
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_USERNAME_SEARCH,
          payload: urldata,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

//null username value from state

export const nullUsernameResult = () => {
  return (dispatch) => {
    dispatch({
      type: PUBLIC_PROFILE_TYPE.NULL_USER_NAME_DATA,
      payload: [],
    });
  };
};

// post profile banner
export const postProfileBanner = (userID, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.postProfileBanner.replace(
        "__USERID__",
        userID
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_BANNER,
          payload: data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// post profile About
export const updateUserAbout = (userID, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.postProfileAbout.replace(
        "__USERID__",
        userID
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_ABOUT,
          payload: data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// post profile Highlight
export const updateHighlight = (userID, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.postProfileHighlight.replace(
        "__USERID__",
        userID
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_HIGHLIGHT,
          payload: data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// dispatch(updateLevel);
//     dispatch(updateTeachingMOde);
//     dispatch(updateTaughtSubject);
//     dispatch(updateSkills);

// post TaughtLevel
export const updateLevel = (userID, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.updateLevel.replace(
        "__USERID__",
        userID
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_LEVEL,
          payload: data,
        });
        dispatch(showSuccessPopup("Levels Taught updated successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// post TeachingMOde
export const updateTeachingMOde = (userID, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.updateTeachingMOde.replace(
        "__USERID__",
        userID
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_TEACHING_MODE,
          payload: data,
        });
        dispatch(showSuccessPopup("Teaching Mode updated successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// post TaughtSubject
export const updateTaughtSubject = (userID, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.updateTaughtSubject.replace(
        "__USERID__",
        userID
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_TAUGHT_SUBJECT,
          payload: data,
        });
        dispatch(showSuccessPopup("Taught Subject updated successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// post Skills
export const updateSkills = (userID, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.updateSkills.replace(
        "__USERID__",
        userID
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_SKILLS,
          payload: data,
        });
        dispatch(showSuccessPopup("skills updated successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getpublicprofileById = (id) => {
  return (dispatch) => {
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.getprofile.replace("_id_", id),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_BY_ID_LOADED,
          payload: success.data,
        });
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_EDIT_LINK_UPDATE,
          payload: success.data.userInfo,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const putLike = (id, _id) => {
  const data = { _id: _id };
  return (dispatch) => {
    dispatch({
      type: PUBLIC_PROFILE_TYPE.PUT_LIKE_LOADING,
      payload: {},
    });
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.putlike.replace("_id_", id),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUT_LIKE,
          payload: success,
        });
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_UPDATE_LIKE,
          payload: id,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUT_LIKE_ERROR,
          payload: {},
        });
      }
    );
  };
};

export const putUnlike = (id, _id) => {
  const data = { _id: _id };
  return (dispatch) => {
    dispatch({
      type: PUBLIC_PROFILE_TYPE.PUT_UNLIKE_LOADING,
      payload: {},
    });
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.putunlike.replace("_id_", id),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUT_UNLIKE,
          payload: success,
        });
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_UPDATE_UNLIKE,
          payload: id,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUT_UNLIKE_ERROR,
          payload: {},
        });
      }
    );
  };
};

export const putFollow = (id, _id) => {
  const data = { _id: _id, id: id };
  return (dispatch) => {
    dispatch({
      type: PUBLIC_PROFILE_TYPE.PUT_FOLLOWER_LOADING,
      payload: {},
    });
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.putfollow.replace("_id_", id),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUT_FOLLOWER,
          payload: success,
        });
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_UPDATE_FOLLOW,
          payload: id,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUT_FOLLOWER_ERROR,
          payload: {},
        });
      }
    );
  };
};

export const putUnfollow = (id, _id) => {
  const data = { _id: _id, id: id };
  return (dispatch) => {
    dispatch({
      type: PUBLIC_PROFILE_TYPE.PUT_UNFOLLOWER_LOADING,
      payload: {},
    });
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.putunfollow.replace(
        "_id_",
        id
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUT_UNFOLLOWER,
          payload: success,
        });
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_UPDATE_UNFOLLOW,
          payload: id,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUT_UNFOLLOWER_ERROR,
          payload: {},
        });
      }
    );
  };
};

// export const PostLikes=(id,profile_id)=>{
//   return dispatch=>{
//     publicProfileRequest.post(publicProfileRequest.publicProfileEndPoint.postLikes,
//       id,(success)=>{
//         dispatch({type: PUBLIC_PROFILE_TYPE.POST_LIKE,
//         payload: id,
//       });
//       },
//       (error)=>{
//         dispatch(setCommonError(error.message));
//       }
//       )

//   }
// };

// Awards ----------------------------------
export const getAwards = (userId) => {
  return (dispatch) => {
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.getAward.replace(
        "__USERID__",
        userId
      ),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_AWARD_GET,
          payload: success,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const postAward = (userId, data) => {
  return (dispatch) => {
    publicProfileRequest.post(
      publicProfileRequest.publicProfileEndPoint.postAward.replace(
        "__USERID__",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_AWARD_POST,
          payload: success,
        });
        dispatch(showSuccessPopup("Awards has been Added Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const editAward = (userId, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.editAward.replace(
        "__USERID__",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_AWARD_EDIT,
          payload: data,
        });
        dispatch(showSuccessPopup("Awards has been Edited Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteAward = (userId, awardId) => {
  const data = { _id: awardId };
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.deleteAward.replace(
        "__USERID__",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_AWARD_DELETE,
          payload: awardId,
        });
        dispatch(showSuccessPopup("Awards has been Removed Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

//  End Awards -----------------------------------------------

export const getAffiliate = () => {
  return (dispatch) => {
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.getAffiliate,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_AFFILIATE,
          payload: success,
        });
      },
      (error) => {
        // dispatch(setCommonError(error.message));
      }
    );
  };
};

// Education ----------------------------------------------------------

export const getEducations = (userId) => {
  return (dispatch) => {
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.getEducation.replace(
        "__USERID__",
        userId
      ),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_EDUCATION_GET,
          payload: success,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const postEducation = (userId, data) => {
  return (dispatch) => {
    publicProfileRequest.post(
      publicProfileRequest.publicProfileEndPoint.postEducation.replace(
        "__USERID__",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_EDUCATION_POST,
          payload: success,
        });
        dispatch(showSuccessPopup("Education has been Added Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const editEducation = (userId, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.editEducation.replace(
        "__USERID__",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_EDUCATION_EDIT,
          payload: data,
        });
        dispatch(showSuccessPopup("Education has been Updated Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteEducation = (userId, educationId) => {
  const data = { _id: educationId };
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.deleteEducation.replace(
        "__USERID__",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_EDUCATION_DELETE,
          payload: educationId,
        });
        dispatch(showSuccessPopup("Education has been Removed Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// End Education --------------------------------------------------------------

// Cettificate ----------------------------------------------------------

export const getCertificate = (userId) => {
  return (dispatch) => {
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.getCertificate.replace(
        "__USERID__",
        userId
      ),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_CERTIFICATE_GET,
          payload: success,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const postCertificate = (userId, data) => {
  return (dispatch) => {
    publicProfileRequest.post(
      publicProfileRequest.publicProfileEndPoint.postCertificate.replace(
        "__USERID__",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_CERTIFICATE_POST,
          payload: success,
        });
        dispatch(showSuccessPopup("Certificate has been Added Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const editCertificate = (userId, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.editCertificate.replace(
        "__USERID__",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_CERTIFICATE_EDIT,
          payload: data,
        });
        dispatch(
          showSuccessPopup("Certificate has been Updated Successfully!")
        );
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteCertificate = (userId, CertificateId) => {
  const data = { _id: CertificateId };
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.deleteCertificate.replace(
        "__USERID__",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_CERTIFICATE_DELETE,
          payload: CertificateId,
        });
        dispatch(
          showSuccessPopup("Certificate has been Removed Successfully!")
        );
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// End Certificate --------------------------------------------------------------

// Images

export const getImages = (userId) => {
  return (dispatch) => {
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.getImages.replace(
        "__USERID__",
        userId
      ),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_IMAGES_GET,
          payload: success,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const postImage = (userId, data) => {
  return (dispatch) => {
    publicProfileRequest.post(
      publicProfileRequest.publicProfileEndPoint.postImages.replace(
        "__USERID__",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_IMAGES_POST,
          payload: success,
        });
        dispatch(showSuccessPopup("Image has been Added Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const addImage = (userId, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.addImages.replace(
        "__USERID__",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_IMAGES_ADD,
          payload: data,
        });
        // dispatch(showSuccessPopup("Image has been Updated Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteImage = (userId, data) => {
  // const data = { _id: CertificateId };
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.deleteImages.replace(
        "__USERID__",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_IMAGES_DELETE,
          payload: data,
        });
        dispatch(showSuccessPopup("Image has been Removed Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const editAlbum = (userId, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.editImageAlbum.replace(
        "__USERID__",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_ALBUM_IMAGES_EDIT,
          payload: data,
        });
        dispatch(showSuccessPopup("Album has been Updated Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteAlbum = (userId, data) => {
  // const data = { _id: CertificateId };
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.deleteImageAlbum.replace(
        "__USERID__",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_ALBUM_IMAGES_DELETE,
          payload: data,
        });
        dispatch(showSuccessPopup("Album has been Removed Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// End Image ----------------------------

// Videos

export const getVideos = (userId) => {
  return (dispatch) => {
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.getVideos.replace(
        "__USERID__",
        userId
      ),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_VIDEOS_GET,
          payload: success,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const postVideos = (userId, data) => {
  return (dispatch) => {
    publicProfileRequest.post(
      publicProfileRequest.publicProfileEndPoint.postVideos.replace(
        "__USERID__",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_VIDEOS_POST,
          payload: success,
        });
        dispatch(showSuccessPopup("Video has been Added Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const addVideos = (userId, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.addVideos.replace(
        "__USERID__",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_VIDEOS_ADD,
          payload: data,
        });
        dispatch(showSuccessPopup("Video has been Updated Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteVideos = (userId, data) => {
  // const data = { _id: CertificateId };
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.deleteVideos.replace(
        "__USERID__",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_VIDEOS_DELETE,
          payload: data,
        });
        dispatch(showSuccessPopup("Video has been Removed Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const editVideoAlbum = (userId, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.editVideoAlbum.replace(
        "__USERID__",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_ALBUM_VIDEO_EDIT,
          payload: data,
        });
        dispatch(showSuccessPopup("Album has been Updated Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteVideoAlbum = (userId, data) => {
  // const data = { _id: CertificateId };
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.deleteVideoAlbum.replace(
        "__USERID__",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_ALBUM_VIDEO_DELETE,
          payload: data,
        });
        dispatch(showSuccessPopup("Album has been Removed Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// End Videos ----------------------------

export const getProfileExperience = (profileId) => {
  return (dispatch) => {
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.getprofile.replace(
        "_id_",
        profileId
      ),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_EXPERIENCE,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// export const getProfileLanguage = () => {
//   return (dispatch) => {
//     publicProfileRequest.get(
//       publicProfileRequest.publicProfileEndPoint.getLanguage,
//       (success) => {
//         dispatch({
//           type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_LANGUAGE,
//           payload: success,
//         });
//       },
//       (error) => {
//         dispatch(setCommonError(error.message));
//       }
//     );
//   };
// };

export const sendRating = (data) => {
  return (dispatch) => {
    dispatch({
      type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_STORE_RATING,
      payload: data,
    });
  };
};

export const getProfileReviews = (userId) => {
  return (dispatch) => {
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.getReviews.replace(
        "__USERID__",
        userId
      ),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.GET_PUBLIC_PROFILES_REVIEWS,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// post profile review
export const postProfileReviews = (userId, data) => {
  return (dispatch) => {
    publicProfileRequest.post(
      publicProfileRequest.publicProfileEndPoint.getReviews.replace(
        "__USERID__",
        userId
      ),
      data,
      (success) => {
        if (success.data.response._id) {
     
          data._id = success.data.response._id;
          dispatch({
            type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_POST_REVIEW,
            payload: { data: data, message: success.message },
          });
          dispatch(showSuccessPopup("Your Review Added Successfully"));
        }
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// Edit profile review
export const editProfileReviews = (userId, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.getReviews.replace(
        "__USERID__",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_EDIT_REVIEW,
          payload: data,
        });
        dispatch(showSuccessPopup("Your Review Updated Successfully"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// Delete profile review
export const deleteReview = (user, reviewData) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.deleteReview.replace(
        "__USERID__",
        user
      ),
      reviewData,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_DELETE_REVIEW,
          payload: reviewData,
        });
        dispatch(showSuccessPopup("Your Review has been Removed Successfully"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const editProfileLinks = (edit, id) => {
  const data = {
    name: edit.name,
    username: edit.username,
    short_intro: edit.short_intro,
    website: edit.website,
    facebook: edit.facebook,
    linkedin: edit.linkedin,
    instagram: edit.instagram,
    twitter: edit.twitter,
    youtube: edit.youtube,
    public_profile_picture: edit.public_profile_picture,
  };
  return (dispatch) => {
    dispatch({
      type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_EDIT_LINK_LOADING,
      payload: [],
    });
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.editprofilelinks.replace(
        "_id_",
        id
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_EDIT_LINK,
          payload: data,
        });
        if (data.public_profile_picture === null) {
          dispatch(showSuccessPopup("Your profile photo is removed"));
        }
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getExperience = (profileId) => {
  return (dispatch) => {
    dispatch({
      type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_EXPERIENCE_ADD_LOADING,
      payload: [],
    });

    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.getExperience.replace(
        "_id_",
        profileId
      ),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_EXPERIENCE_GET,
          payload: success,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const addExperience = (profileId, fields) => {
  return (dispatch) => {
    dispatch({
      type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_EXPERIENCE_ADD_LOADING,
      payload: [],
    });

    publicProfileRequest.post(
      publicProfileRequest.publicProfileEndPoint.postExperience.replace(
        "_id_",
        profileId
      ),
      fields,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_EXPERIENCE_ADD,
          payload: fields,
        });
        dispatch(showSuccessPopup("Experience Added Successfuly!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteExperience = (profileId, expId) => {
  const data = { _id: expId };
  // experienceid = data._id

  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.deleteExperience.replace(
        "_id_",
        profileId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_EXPERIENCE_DELETE,
          payload: expId,
        });
        dispatch(showSuccessPopup("Experience has been Deleted Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const editExperience = (profileId, data) => {
  // const data = { _id: expId };

  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.editExperience.replace(
        "_id_",
        profileId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_EXPERIENCE_EDIT,
          payload: data,
        });
        dispatch(showSuccessPopup("Experience has been Updated Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

//get the details of profle contact details
export const getContact = (id) => {
  return (dispatch) => {
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.getContactAndAddress.replace(
        "_id_",
        id
      ),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_GET_CONTACT_AND_ADDRESS,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// patch email and phone details in contact
export const patchContact = (profileId, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.patchContact.replace(
        "_id_",
        profileId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_PATCH_CONTACT,
          payload: data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

//get primary address
export const getprimaryAddress = (userId) => {
  return (dispatch) => {
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.getPrimaryAddress.replace(
        "_id_",
        userId
      ),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_GET_PRIMARYADDRESS,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// patch primary address details in contact

export const patchprimaryaddress = (profileId, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.patchPrimaryaddress.replace(
        "_id_",
        profileId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_PATCH_PRIMARYADDRESS,
          payload: data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// pOST FOR primary address details in contact

export const postPrimaryaddress = (profileId, data) => {
  return (dispatch) => {
    publicProfileRequest.post(
      publicProfileRequest.publicProfileEndPoint.postPrimaryAddress.replace(
        "_id_",
        profileId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_POST_PRIMARYADDRESS,
          payload: data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// delete primary address details in contact

export const deleteprimaryaddress = (profileId, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.deletePrimaryAddress.replace(
        "_id_",
        profileId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_DELETE_PRIMARYADDRESS,
          payload: data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

//get primary address
export const getWorkAddress = (userId) => {
  return (dispatch) => {
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.getWorkAddress.replace(
        "_id_",
        userId
      ),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_GET_WORKADDRESS,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// post primary address details in contact

export const postWorkAddress = (profileId, data) => {
  return (dispatch) => {
    publicProfileRequest.post(
      publicProfileRequest.publicProfileEndPoint.postWorkAddress.replace(
        "_id_",
        profileId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_POST_WORKADDRESS,
          payload: data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// patch primary address details in contact

export const patchWorkAddress = (profileId, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.patchWorkAddress.replace(
        "_id_",
        profileId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_PATCH_WORKADDRESS,
          payload: data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// delete primary address details in contact

export const deleteWorkAaddress = (profileId, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.deleteWorkAddress.replace(
        "_id_",
        profileId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_DELETE_PRIMARYADDRESS,
          payload: data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// export const getfollowingList = (profileId) => {
//   return (dispatch) => {
//     publicProfileRequest.get(
//       publicProfileRequest.publicProfileEndPoint.getFollowingList.replace(
//         "_id_",
//         profileId
//       ),
//       (success) => {
//         dispatch({
//           type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_GET_FOLLOWINGLIST,
//           payload: success,
//         });
//       },
//       (error) => {
//         dispatch(setCommonError(error.message));
//       }
//     );
//   };
// };

export const getfollowingList = (profileId) => {
  return (dispatch) => {
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.getFollowingList.replace(
        "_id_",
        profileId
      ),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_GET_FOLLOWINGLIST,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getfollowerList = (profileId) => {
  return (dispatch) => {
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.getFollowerList.replace(
        "_id_",
        profileId
      ),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_GET_FOLLOWERLIST,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// This function has been using in follower and following list
export const putFollowInList = (id, _id) => {
  const data = { _id: _id, id: id };
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.putfollow.replace("_id_", id),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_FOLLOW_FOLLOWERLIST,
          payload: data,
        });
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_FOLLOW_FOLLOWINGLIST,
          payload: data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// This function has been using in follower and following list
export const putUnfollowInList = (id, _id) => {
  const data = { _id: _id, id: id };
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.putunfollow.replace(
        "_id_",
        id
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_UNFOLLOW_FOLLOWERLIST,
          payload: data,
        });
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_UNFOLLOW_FOLLOWINGLIST,
          payload: data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

//remove follower from our list
export const removeFollowers = (data, profileId) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.removeFollower.replace(
        "_id_",
        profileId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_REMOVE_FOLLOWERS,
          payload: success,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
//Interest And Hobbies
export const getInterestHoobies = (userid) => {
  return (dispatch) => {
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.getInterestHobbies.replace(
        "_id_",
        userid
      ),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_INTEREST_HOBBIES_GET,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const postInterestHobbies = (profileId, data) => {
  return (dispatch) => {
    publicProfileRequest.post(
      publicProfileRequest.publicProfileEndPoint.postInterestHobbies.replace(
        "_id_",
        profileId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_INTEREST_HOBBIES_POST,
          payload: success,
        });
        dispatch(
          showSuccessPopup("Interest and Hobbies has been Added Successfully!")
        );
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const DeleteInterestHobbies = (userid, id) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.deleteInteestHobbies.replace(
        "_id_",
        userid
      ),
      id,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_INTEREST_HOBBIES_DELETE,
          payload: id,
        });
        dispatch(
          showSuccessPopup(
            "Interest and Hobbies has been Removed Successfully!"
          )
        );
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
//hobbies end

//start languages

export const getLanguages = (userId) => {
  return (dispatch) => {
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.getLanguages.replace(
        "_id_",
        userId
      ),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_LANGUAGES_GET,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const postLanguages = (userId, data) => {
  return (dispatch) => {
    publicProfileRequest.post(
      publicProfileRequest.publicProfileEndPoint.postLanguages.replace(
        "_id_",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_LANGUAGES_POST,
          payload: success,
        });
        dispatch(showSuccessPopup("Languages has been Added Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

//Professional Affilation

export const getProffessionalAffilates = (userId) => {
  return (dispatch) => {
    publicProfileRequest.get(
      publicProfileRequest.publicProfileEndPoint.getProffessionalAffilates.replace(
        "_id_",
        userId
      ),
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_AFFILIATE_GET,
          payload: success.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const postProffessionalAffilates = (userId, data) => {
  return (dispatch) => {
    publicProfileRequest.post(
      publicProfileRequest.publicProfileEndPoint.postProffessionalAffilates.replace(
        "_id_",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_AFFILIATE_POST,
          payload: success,
        });
        dispatch(
          showSuccessPopup(
            "Professional Affiliations has been Added Successfully!"
          )
        );
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const patchProffessionalAffilates = (userId, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.patchProffessionalAffilates.replace(
        "_id_",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_AFFILIATE_PATCH,
          payload: success,
        });
        dispatch(
          showSuccessPopup(
            "Professional Affiliations has been Edited Successfully!"
          )
        );
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteProffessionalAffilates = (userId, id) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.deleteProffessionalAffilates.replace(
        "_id_",
        userId
      ),
      id,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILES_AFFILIATE_DELETE,
          payload: id,
        });
        dispatch(
          showSuccessPopup(
            "Professional Affiliations has been Removed Successfully!"
          )
        );
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

//proffessional affilates
export const patchLanguages = (userId, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.patchLanguages.replace(
        "_id_",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_LANGUAGES_PATCH,
          payload: data,
        });
        dispatch(showSuccessPopup("Languages has been Edited Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const deleteLanguages = (userId, id) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.deleteLanguages.replace(
        "_id_",
        userId
      ),
      id,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_LANGUAGES_DELETE,
          payload: success,
        });
        dispatch(showSuccessPopup("Languages has been Removed Successfully!"));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const updateUserType = (userId, data) => {
  return (dispatch) => {
    publicProfileRequest.patch(
      publicProfileRequest.publicProfileEndPoint.updateUsertype.replace(
        "_id_",
        userId
      ),
      data,
      (success) => {
        dispatch({
          type: PUBLIC_PROFILE_TYPE.PUBLIC_PROFILE_USERTYPE_UPDATE,
          payload: success.data,
        });
        dispatch(showSuccessPopup("User Type updated successfully."));
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

//end languages
