import React from "react";
import Modal from "../../Common/Modal";
import ModalHeader from "../../Common/Modal/ModalHeader";
import ModalBody from "../../Common/Modal/ModalBody";
import { useDispatch } from "react-redux";
import {
  putFollowInList,
  putUnfollowInList,
  getfollowerList,
  getfollowingList,
  getpublicprofileById,
  removeFollowers,
} from "../../store/actions/publicProfile";
import { useEffect } from "react";
const ListModal = ({
  ShowModalProp,
  CloseModalProp,
  List,
  userId,
  datasuccess,
  singleProfile,
  isOnline,
  type,
  isFound,
}) => {
  // const [followState,setFollowState]=useState([]);
  const profileId = singleProfile && singleProfile.user;
  const dispatch = useDispatch();
  let username = singleProfile && singleProfile.username;
  const DoFollow = (item) => {
    let valid = item.follower.includes(userId);
    if (valid && isOnline) {
      dispatch(putUnfollowInList(userId, item._id));
      setTimeout(() => {
        // dispatch(getfollowingList(profileId));
        // dispatch(getfollowerList(profileId));
        dispatch(getpublicprofileById(username));
      }, 800);
    } else if (!valid && isOnline) {
      dispatch(putFollowInList(userId, item._id));
      setTimeout(() => {
        // dispatch(getfollowingList(profileId));
        // dispatch(getfollowerList(profileId));
        dispatch(getpublicprofileById(username));
      }, 800);
    }
  };
  const FollowerRemove = (id) => {
    let data = { _id: id };
    if (userId && isFound) {
      dispatch(removeFollowers(data, profileId));
      List && List.length === 1 && CloseModalProp();
      setTimeout(() => {
        dispatch(getfollowerList(profileId));
        dispatch(getpublicprofileById(username));
      }, 800);
    } else {
    }
  };

  useEffect(() => {
    profileId && dispatch(getfollowingList(profileId));
    profileId && dispatch(getfollowerList(profileId));
  }, [ShowModalProp, profileId, dispatch]);

  //* Get last word from Institute Name */
  function getLastWord(words) {
    var lastLetter = words.split(" ");
    return lastLetter[lastLetter.length - 1][0];
  }
  return (
    <Modal show={ShowModalProp}>
      <ModalHeader
        title={type === "Follower" ? (List.length > 1 ? `${List.length} Followers` : `${List.length} Follower`)
          : (List.length > 1 ? `${List.length} Followings` : `${List.length} Following`)}
        closeButton={true}
        onclose={CloseModalProp}
      />
      <ModalBody>
        <div className="FollowFollowingListWrapper">
          {List && List.map !== undefined ? (
            List.map &&
            List.map((item) => {
              return (
                item && (
                  <div className="FollowFollowingListItem" key={item._id}>
                    <div className="dummyProfilePicture">
                      <a href={item.username} target="_blank" rel="noreferrer">
                        {item.public_profile_picture !== "" &&
                          item.public_profile_picture !== null &&
                          item.public_profile_picture !== "false" ? (
                          <img src={item.public_profile_picture} alt="user" />
                        ) : (
                          item.name !== "" && item.name !== undefined && item.name !== null &&
                          item.name.substring(0, 1) + getLastWord(item.name)
                        )}

                        {/* {item.name !== "null" && getLastWord(item.name)} */}
                      </a>
                    </div>
                    <div className="FollowFollowingContent">
                      <p className="text-xs w-500">
                        <a
                          href={item.username}
                          target="_blank"
                          rel="noreferrer"
                          className="base"
                        >
                          {item.name !== "null" && item.name}
                        </a>
                      </p>
                      <p className="mgray text-xxs">{item.role}</p>
                      <p className="mgray text-xxs">
                        {item.follower.length}{" "}
                        {item.follower.length > 1 ? "Followers" : "Follower"}
                      </p>
                    </div>
                    <div className="FollowFollowingListAction">
                      {userId !== item.user && (
                        <button
                          className="button button-primary btn-xs btn-oval"
                          onClick={() => DoFollow(item)}
                        >
                          {/* {item.follower.includes(userId)?"Following":"Follow"} */}
                          {item.follower.includes(userId) ? (
                            <React.Fragment>
                              <i className="ed-icon icon-check white i-s"></i>
                              Following
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <i className="ed-icon icon-plus-add white i-s"></i>
                              Follow
                            </React.Fragment>
                          )}
                        </button>
                      )}
                      {type === "Follower" && isFound && (
                        <button
                          className="button btn-o-silver base btn-xs btn-oval"
                          onClick={() => FollowerRemove(item.user)}
                        >
                          <i className="ed-icon icon-delete base i-s"></i>
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                )
              );
            })
          ) : (
            <div className="FollowFollowingListItem">Loading....</div>
          )}

          {/* <div className="FollowFollowingListItem">
            <div className="dummyProfilePicture">GR</div>
            <div className="FollowFollowingContent">
              <p className="text-xs w-500">Gaurav Ranjan</p>
              <p className="mgray text-xxs">200k Follower</p>
            </div>
           
            <button className="button btn-o-primary btn-xs primary btn-oval">
              <i className="ed-icon icon-plus-add primary i-s"></i>
              Follow
            </button>
          </div> */}
          {/* <div className="FollowFollowingListItem">
            <div className="dummyProfilePicture"></div>
            <div className="FollowFollowingContent">
              <p className="text-xs w-500">Gaurav Ranjan</p>
              <p className="mgray text-xxs">200k Follower</p>
            </div>
         
            <button className="button btn-o-primary btn-xs primary btn-oval">
              <i className="ed-icon icon-check primary i-s"></i>
              Following
            </button>
          </div> */}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ListModal;
