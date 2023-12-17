import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import DummyImage from "../../../Common/DummyMedia/DummyImage";
import Popup from "../../../Common/Popup";
import { deleteTeacherCourse } from "../../../store/actions/teachercourse";
import AssignToModal from "../AdminCourse/AssignToDropdown";
import IconAssign from "../icon-assign.svg";
import IconRemove from "../icon-delete.svg";
import IconEdit from "../icon-edit.svg";

const TeacherCourseList = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const {
    user,
    teacherCourseList,
    teacherCourseListSuccess,
    deleteTeacherCourseLoading,
    deleteTeacherCourseSuccess,
  } = useSelector((state) => {
    return {
      user: state.user,
      teacherCourseList: state.teachercourse.teacherCourseList.data,
      teacherCourseListSuccess: state.teachercourse.teacherCourseList.success,
      deleteTeacherCourseLoading:
        state.teachercourse.deleteTeacherCourse.loading,
      deleteTeacherCourseSuccess:
        state.teachercourse.deleteTeacherCourse.success,
    };
  });
  const RemovePopToggleRef = useRef();
  const [RemovePop, setRemovePop] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const RemovePopState = (_id) => {
    setRemovePop(!RemovePop);
    setDeleteID(_id);
  };
  const EditCourse = (item) => {
    if (item.owner === user._id) {
      history(`/dashboard/teacher-edit-course/${item._id}`);
    } else {
      history(`/dashboard/course-detail-view/${item._id}`);
    }
  };

  const [assignToCourseId, setAssignToCourseId] = useState("");
  const [assignToModalState, setAssignToModalState] = useState(false);
  const closeModalState = () => {
    setAssignToModalState(!assignToModalState);

    setAssignToCourseId("");
  };

  const handleNotify = (_id) => {
    setAssignToCourseId(_id);

    setAssignToModalState(!assignToModalState);
  };
  const handleDelete = (_id) => {
    dispatch(deleteTeacherCourse(_id));
  };
  useEffect(() => {
    !deleteTeacherCourseLoading &&
      deleteTeacherCourseSuccess &&
      setRemovePop(false);
  }, [deleteTeacherCourseLoading, deleteTeacherCourseSuccess]);
  return (
    <React.Fragment>
      <div className="CourseListWrappper">
        <ul className="CourseListItemWrap">
          {teacherCourseListSuccess ? (
            teacherCourseList.length ? (
              teacherCourseList.map((item) => {
                return (
                  <React.Fragment>
                    <li className="CourseListItem">
                      <div className="CourseListMediaItem">
                        {item.courseIntroVideo && item.courseBanner ? (
                          <React.Fragment>
                            {item.defaultBanner === "image" ? (
                              <img
                                className="banner-image"
                                src={item.courseBanner}
                                alt="Course Banner"
                              />
                            ) : (
                              <video
                                className="banner-video"
                                // height="180"
                                src={item.courseIntroVideo}
                                controls
                                // className="gallery-thumnail"
                                alt=""
                              ></video>
                            )}
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            {item.courseBanner ? (
                              <img
                                className="banner-image"
                                src={item.courseBanner}
                                alt="Course Banner"
                              />
                            ) : (
                              <React.Fragment>
                                {item.courseIntroVideo ? (
                                  <video
                                    className="banner-video"
                                    // height="180"
                                    src={item.courseIntroVideo}
                                    controls
                                    // className="gallery-thumnail"
                                    alt=""
                                  ></video>
                                ) : (
                                  <DummyImage Caption="No Image Available" />
                                )}
                              </React.Fragment>
                            )}
                          </React.Fragment>
                        )}
                      </div>
                      <div className="CourseListContentItem">
                        {item.courseLevel === "institute" ? (
                          <span className="buttonRoleLevel">
                            Institute Level
                          </span>
                        ) : (
                          ""
                        )}
                        <p className="text-sm w-700">{item.courseTitle}</p>
                        <p className="text-xxs w-500">{item.shortIntro}</p>
                        <ul className="detailAttr">
                          <li>
                            <p className="text-2xs w-600 secondary">
                              Starts From
                            </p>
                            <p className="text-xxs w-700">
                              {" "}
                              {item.startFrom ? (
                                <React.Fragment>
                                  {moment(item.startFrom).format(
                                    "Do MMMM YYYY"
                                  )}
                                </React.Fragment>
                              ) : (
                                "-"
                              )}
                            </p>
                          </li>
                          <li>
                            <p className="text-2xs w-600 secondary">Duration</p>
                            <p className="text-xxs w-700">
                              {`${item.durationYear ? item.durationYear : "-"
                                } Year`}{" "}
                              |{" "}
                              {`${item.durationMonth ? item.durationMonth : "-"
                                } Months`}
                            </p>
                          </li>
                          <li>
                            <p className="text-2xs w-600 secondary">
                              Created By
                            </p>
                            <p className="text-xxs w-700">{item.createdBy}</p>
                          </li>
                        </ul>
                      </div>
                      <div className="CourseListActionItem">
                        {item.owner === user._id ? (
                          <button
                            className="grp-hover"
                            onClick={() => handleNotify(item._id)}
                            type="button"
                            title="Notify"
                          >
                            <img src={IconAssign} alt="Notify" />
                          </button>
                        ) : (
                          ""
                        )}
                        {item.owner === user._id ? (
                          <button
                            className="grp-hover"
                            onClick={() => RemovePopState(item._id)}
                            type="button"
                            title="Remove"
                          >
                            <img src={IconRemove} alt="Remove" />
                          </button>
                        ) : (
                          ""
                        )}
                        <button
                          onClick={() => EditCourse(item)}
                          className="grp-hover"
                          type="button"
                          title="Edit"
                        >
                          <img src={IconEdit} alt="Forward" />
                        </button>

                        {item._id === deleteID && RemovePop && (
                          <Popup
                            show={RemovePop}
                            RemovePopToggleRef={RemovePopToggleRef}
                            CancelProp={() => setRemovePop(!RemovePop)}
                            RemoveProp={() => handleDelete(item._id)}
                            loading={deleteTeacherCourseLoading}
                          >
                            <p className="gray text-xxs w-300">
                              You are about to remove this Material.
                            </p>
                            <p className="dgray text-xxs w-400">Are you sure?</p>
                          </Popup>
                        )}
                      </div>
                    </li>
                  </React.Fragment>
                );
              })
            ) : (
              <div className="loadingGridData">No Material Found.</div>
            )
          ) : (
            <div className="loadingGridData">
              <i className="ed-loadingGrid"></i>
            </div>
          )}
        </ul>

        <AssignToModal
          onclose={closeModalState}
          show={assignToModalState}
          courseId={assignToCourseId}
        />
      </div>
    </React.Fragment>
  );
};
export default TeacherCourseList;
