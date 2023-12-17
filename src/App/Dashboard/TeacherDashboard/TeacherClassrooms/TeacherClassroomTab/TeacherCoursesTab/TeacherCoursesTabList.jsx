import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import DummyImage from "../../../../../../Common/DummyMedia/DummyImage";
import Popup from "../../../../../../Common/Popup";
import { deleteClassroomViewItem } from "../../../../../../store/actions/classroomdetail";
import AssignToModal from "../../../../../Course/AdminCourse/AssignToDropdown";
import IconAssign from "../../icon-assign.svg";
import IconForward from "../../icon-forward.svg";
import IconDelete from "../../icon-delete.svg";
import ImageViewer from "../../../../../../Common/ImageViewer";
const TeacherCoursesTabList = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const {
    users,
    ViewClassroomList,
    ViewClassroomListSuccess,
    ViewClassroomDeleteLoading,
    ViewClassroomDeleteSuccess,
  } = useSelector((state) => {
    return {
      users: state.user,
      ViewClassroomList: state.classroomDetail.list.data,
      ViewClassroomListSuccess: state.classroomDetail.list.success,
      ViewClassroomDeleteLoading: state.classroomDetail.delete.loading,
      ViewClassroomDeleteSuccess: state.classroomDetail.delete.success,
    };
  });

  const { classroomId, subjectId } = useParams();
  const ToggleValue = "teacherCourses";
  const RemovePopToggleRef = useRef();
  const [RemovePop, setRemovePop] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const RemovePopState = (_id) => {
    setRemovePop(!RemovePop);
    setDeleteID(_id);
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
  const EditCourse = (item) => {
    if (item.owner === users._id) {
      history(
        `/dashboard/edit-teacherClassroom-course/${item._id}/${classroomId}`
      );
    } else {
      history(
        `/dashboard/course-detail-classroom-view/${item._id}/${classroomId}/${subjectId}`
      );
    }
  };
  const handleDelete = (_id) => {
    dispatch(deleteClassroomViewItem(_id, "teacherCourses"));
  };

  useEffect(() => {
    !ViewClassroomDeleteLoading &&
      ViewClassroomDeleteSuccess &&
      setRemovePop(false);
  }, [ViewClassroomDeleteLoading, ViewClassroomDeleteSuccess]);
  return (
    <React.Fragment>
      <div className="CourseListWrappper">
        <ul className="CourseListItemWrap">
          {ViewClassroomListSuccess && ToggleValue === "teacherCourses" ? (
            ViewClassroomList.length ? (
              ViewClassroomList.map((item) => {
                return (
                  <React.Fragment>
                    <li className="CourseListItem">
                      <div className="CourseListMediaItem">
                        {item.courseIntroVideo && item.courseBanner ? (
                          <React.Fragment>
                            {item.defaultBanner === "image" ? (
                              <ImageViewer
                                className="banner-image"
                                object={item.courseBanner}
                                alt="Course Banner"
                              />
                            ) : (
                              <video
                                className="banner-video"
                                // height="180"
                                src={item.courseIntroVideo?.src}
                                controls
                                // className="gallery-thumnail"
                                alt=""
                              ></video>
                            )}
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            {item.courseBanner ? (
                              <ImageViewer
                                className="banner-image"
                                object={item.courseBanner}
                                alt="Course Banner"
                              />
                            ) : (
                              <React.Fragment>
                                {item.courseIntroVideo?.src ? (
                                  <video
                                    className="banner-video"
                                    // height="180"
                                    src={item.courseIntroVideo?.src}
                                    controls
                                    // className="gallery-thumnail"
                                    alt=""
                                  ></video>
                                ) : (
                                  <DummyImage Caption="No Video Available" />
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
                        {item.owner === users._id ? (
                          <button
                            className="grp-hover"
                            onClick={() => handleNotify(item._id)}
                            type="button"
                            title="Assign to"
                          >
                            <img src={IconAssign} alt="Bell icon" />
                          </button>
                        ) : (
                          ""
                        )}

                        {item.owner === users._id ? (
                          <button
                            className="grp-hover"
                            onClick={() => RemovePopState(item._id)}
                            type="button"
                            title="Remove"
                          >
                            <img src={IconDelete} alt="Delete icon" />
                          </button>
                        ) : (
                          ""
                        )}
                        <button
                          onClick={() => EditCourse(item)}
                          className="text-sm"
                          type="button"
                          title="Forward"
                        >
                          <img src={IconForward} alt="Forward icon" />
                        </button>
                      </div>
                      {item._id === deleteID && RemovePop && (
                        <Popup
                          show={RemovePop}
                          RemovePopToggleRef={RemovePopToggleRef}
                          CancelProp={() => setRemovePop(!RemovePop)}
                          RemoveProp={() => handleDelete(item._id)}
                          loading={ViewClassroomDeleteLoading}
                        >
                          <p className="gray text-xxs w-300">
                            You are about to remove this Study Material.
                          </p>
                          <p className="dgray text-xxs w-400">Are you sure?</p>
                        </Popup>
                      )}
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
export default TeacherCoursesTabList;
