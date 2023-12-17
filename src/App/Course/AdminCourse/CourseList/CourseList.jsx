import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import IconForward from "./icon-forward.svg";
import IconDelete from "./icon-delete.svg";
// import IconBell from "./icon-bell.svg";
import IconAssign from "./icon-assign.svg";
import DummyImage from "../../../../Common/DummyMedia/DummyImage";
// import DummyVideo from "../../../../Common/DummyMedia/DummyVideo";
import Popup from "../../../../Common/Popup";
import { deleteCourse } from "../../../../store/actions/admincourse";
import AssignToModal from "../AssignToDropdown";
import ImageViewer from "../../../../Common/ImageViewer";
// import DummyVideo from "../../../../Common/DummyMedia/DummyVideo";

const CourseList = () => {
  const history = useNavigate();
  const { adminCourseList, adminCourseListSuccess, deleteCourseState } =
    useSelector((state) => {
      return {
        // user: state.user,
        adminCourseList: state.admincourse.list.data,
        adminCourseListSuccess: state.admincourse.list.success,
        deleteCourseState: state.admincourse.deleteCourse,
      };
    });
  const dispatch = useDispatch();
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
  const EditCourse = (_id) => {
    history(`/edit-courses/${_id}`);
  };
  const handleDelete = (_id) => {
    dispatch(deleteCourse(_id));
  };
  useEffect(() => {
    !deleteCourseState.loading &&
      deleteCourseState.success &&
      setRemovePop(false);
  }, [deleteCourseState.loading, deleteCourseState.success]);
  return (
    <div className="CourseListWrappper">
      <ul className="CourseListItemWrap">
        {adminCourseListSuccess ? (
          adminCourseList.length ? (
            adminCourseList.map((item) => {
              return (
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
                            src={item?.courseIntroVideo?.src}
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
                              <DummyImage Caption="No Image Available" />
                            )}
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    )}
                  </div>
                  <div className="CourseListContentItem">
                    {item.courseLevel === "institute" ? "Institute Level" : ""}
                    <p className="text-sm w-700">{item.courseTitle}</p>
                    <p className="text-xxs w-500">{item.shortIntro}</p>
                    <ul className="detailAttr">
                      <li>
                        <p className="text-2xs w-600 primary">Starts From</p>
                        <p className="text-xxs w-700">
                          {item.startFrom ? (
                            <React.Fragment>
                              {moment(item.startFrom).format("Do MMMM YYYY")}
                            </React.Fragment>
                          ) : (
                            "-"
                          )}
                        </p>
                      </li>
                      <li>
                        <p className="text-2xs w-600 primary">Duration</p>
                        <p className="text-xxs w-700">
                          {`${item.durationYear ? item.durationYear : "-"
                            } Year`}{" "}
                          |{" "}
                          {`${item.durationMonth ? item.durationMonth : "-"
                            } Months`}
                        </p>
                      </li>
                      <li>
                        <p className="text-2xs w-600 primary">Created By</p>
                        <p className="text-xxs w-700">{item.createdBy}</p>
                      </li>
                    </ul>
                  </div>
                  <div className="CourseListActionItem">
                    <button
                      onClick={() => handleNotify(item._id)}
                      className="grp-hover"
                      type="button"
                      title="Assign to"
                    >
                      <img src={IconAssign} alt="" />
                    </button>
                    {/* <button
                        onClick={() => handleNotify(item._id)}
                        className="grp-hover"
                        type="button"
                      >
                        <img src={IconBell} alt="" />
                      </button> */}

                    <button
                      className="grp-hover"
                      type="button"
                      onClick={() => RemovePopState(item._id)}
                      title="Remove"
                    >
                      <img src={IconDelete} alt="" />
                    </button>
                    <button
                      onClick={() => EditCourse(item._id)}
                      className="grp-hover text-sm"
                      type="button"
                      title="Forward"
                    >
                      <img src={IconForward} alt="" />
                    </button>
                    {item._id === deleteID && RemovePop && (
                      <Popup
                        show={RemovePop}
                        RemovePopToggleRef={RemovePopToggleRef}
                        CancelProp={() => setRemovePop(!RemovePop)}
                        RemoveProp={() => handleDelete(item._id)}
                        loading={deleteCourseState.loading}
                      >
                        <p className="gray text-xxs w-300">
                          You are about to remove this Material.
                        </p>
                        <p className="dgray text-xxs w-400">Are you sure?</p>
                      </Popup>
                    )}
                  </div>
                </li>
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
        <AssignToModal
          onclose={closeModalState}
          show={assignToModalState}
          courseId={assignToCourseId}
        />
      </ul>
    </div>
  );
};

export default CourseList;
