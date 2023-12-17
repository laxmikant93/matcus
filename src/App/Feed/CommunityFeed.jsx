import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommunityFeedData } from "../../store/actions/edneedfeed";
import DummyProfile from "../../assets/images/img/DummyProfile.png";
import moment from "moment";
import AppLink from "../../Common/AppLink";

const CommunityFeed = () => {
  const dispatch = useDispatch();

  const { communityfeedlist, communityfeedsuccess } = useSelector((state) => {
    return {
      communityfeedlist: state.edneedfeed.communityFeed.data,
      communityfeedsuccess: state.edneedfeed.communityFeed.success,
    };
  });

  useEffect(() => {
    let limit = 6;
    let skip = 0;
    dispatch(getCommunityFeedData(skip, limit));
  }, [dispatch]);

  return (
    <>
      <div className="pageFullCenter ED-CommunityFeedWrapper">
        <div className="CommunityFeedCst">
          <div className="CommunityFeedHead">
            <p className="text-md bsPink w-100"> Community</p>
            <p className="text-xs w-500">
              Ask questions, share knowledge, participate in discussions and
              exchange experiences.
            </p>
          </div>
          <div className="CommunityFeedSubHead mt-50 mb-10">
            <p className="text-xs w-600">Most Trending Questions</p>
            <p className="text-xs w-500">
              What happening on Edneed Community
            </p>
          </div>

          <div className="CommunityFeedQuestion">
            {communityfeedsuccess
              ? communityfeedlist.map((question) => {
                return (
                  <div key={question._id} className="community-asked">
                    <div className="ask-profile text-left">
                      <div className="ask-profile-img">
                        <img
                          className="profile-img"
                          src={
                            question.owner_profile_picture
                              ? question.owner_profile_picture
                              : DummyProfile
                          }
                          alt="Ask User Profile"
                        />
                      </div>

                      <div className="asked-question-area text-left">
                        <div className="asked-question-area-wrap">
                          <div className="heading asked-ques-name">
                            <h2
                              className="text-xs w-700"
                              style={{ whiteSpace: "pre-wrap" }}
                            >
                              {question.text}
                            </h2>
                          </div>
                          <div className="sub-heading asked-ques-detail mt-10">
                            <ul>
                              <li className="text-xxs dgray">
                                Asked by:
                                <span className="base w-500">
                                  {" "}
                                  {question.owner_fullname}{" "}
                                </span>
                              </li>
                              <li className="text-xxs dgray">
                                Asked on:
                                <span className="base w-500">
                                  {moment(question.createdAt).format(
                                    "MMM Do, YYYY h:mm a"
                                  )}{" "}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="asked-answer-all text-left">
                      <ul className="asked-answer-all-ui">
                        <li className="asked-answer-all-ui-item">
                          <AppLink
                            to={`/answer/${question._id}`}
                            target="_blank"
                          >
                            {question.answersCount} Answers
                            <i className="animate-r-arrow-icon"></i>
                          </AppLink>
                        </li>
                        <li className="asked-answer-all-ui-item">
                          <AppLink
                            to={`/answer/${question._id}`}
                            target="_blank"
                          >
                            Answer this question
                          </AppLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })
              : "Loading.."}
          </div>
          <AppLink className="button button-bsPink mt-50" to="/community">
            {" "}
            Discover Community
          </AppLink>
        </div>
      </div>
    </>
  );
};
export default CommunityFeed;
