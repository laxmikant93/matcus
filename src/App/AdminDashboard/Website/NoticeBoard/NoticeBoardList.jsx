import React, { useState, useRef, useEffect } from "react";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import InstituteTheme from "../../../../Common/Theme/InstituteTheme";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editNoticeDetails, getNoticeList, searchSortByNoticeList } from "../../../../store/actions/NoticeBoard";
import { deleteNotice } from "../../../../store/actions/NoticeBoard";
import BackgroundDefault from "../../../../assets/images/img/BackgroundDefault.png";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import IconAttachment from "./icon-attachment.svg";
import NoDataAvailable from "../../../../Common/NoDataAvailable";
import Popup from "../../../../Common/Popup";
import "./NoticeBoard.scss"
import MascllaniousHeader from "./MascellaniousHeader";

function NoticeBoardList() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [Notice, setNotice] = useState("");
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [readMoreText, setReadMoreText] = useState("");
  const [toggle, setTogget] = useState(false);

  const handelUpdateUser = (item) => {
    history(`/update-miscellaneous/${item._id}`)
  }

  const {
    users,
    noticeBoardListSuccess,
    noticeBoardListLoading,
    noticeBoardListData,
    buttonDeleteLoading,
    buttonDeleteSuccess,
    businesstype
  } = useSelector((state) => {
    return {
      users: state.user,
      businesstype: state.user.user_business_type,
      noticeBoardListSuccess: state.noticeboard.noticeList.success,
      noticeBoardListLoading: state.noticeboard.noticeList.loading,
      noticeBoardListData: state.noticeboard.noticeList.data,
      buttonDeleteLoading: state.noticeboard.deleteNotice.loading,
      buttonDeleteSuccess: state.noticeboard.deleteNotice.success,

    };
  });

  //To change state inside notice list
  const handelListStatus = (e, _id) => {
    let inputValue = e.target.value;
    dispatch(editNoticeDetails(_id, listStatusUpdateDataInfo(inputValue)));
  };

  const listStatusUpdateDataInfo = (inputValue) => {
    return {
      "isStatus": inputValue,
      "industry": businesstype
    };
  };

  //Short by dropdown function
  const searchShort = (e) => {
    let value = e.target.value;
    switch (value) {
      case "All":
        dispatch(getNoticeList(users.user_institute, users._id, businesstype));
        break;
      case "Active":
        dispatch(searchSortByNoticeList(users.user_institute, users._id, "Active", businesstype))
        break;
      case "Inactive":
        dispatch(searchSortByNoticeList(users.user_institute, users._id, "Inactive", businesstype))
        break;
      default:
    }
  }

  //Popup on deleting 
  const onClickBtnDropDownRemove = (_id) => {
    setNotice(_id);
    setIsActive(true);
  };

  //Function On remove button
  const handleDeleteUser = (_id) => {
    dispatch(deleteNotice(_id, businesstype));
  };

  useEffect(() => {
    dispatch(getNoticeList(users.user_institute, users._id, businesstype))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    !buttonDeleteLoading && buttonDeleteSuccess && setIsActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonDeleteLoading, buttonDeleteSuccess]);

  const ReadMoreButton = (id, active) => {
    setReadMoreText(id);
    setTogget(active);
  };

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/miscellaneous-list" title="Miscellaneous" />
      </Breadcrumb>
      <div className="PageTopHead PTH-AnnouncementList mt-30">
        <div className="PTH-Item">
          {noticeBoardListSuccess && noticeBoardListData ?
            <h1 className="text-sm w-300">
              <span className="primary"> {noticeBoardListData.length} Miscellaneous</span>
            </h1> :
            <h1 className="text-sm w-300">
              <span className="primary">Miscellaneous</span>
            </h1>
          }
        </div>
        <div className="PTH-Item">
          <div className="SortByTableHeadCst">
            <label>Sort by</label>
            <select
              onChange={(e) => searchShort(e)}
            >
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
        <div className="PTH-Item P-Right">
          <button
            className="button button-primary btn-oval btn-sm button-block"
            onClick={() => history("/add-miscellaneous")}
          >
            <i className="ed-icon icon-plus-add white i-xs"></i>
            Add Miscellaneous
          </button>
        </div>
      </div>
      <MascllaniousHeader />
      {/* <SelectTitle type="noticeSelect" /> */}
      {/* <SelectTitle type="announcementSelect" /> */}
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-3">Title</li>
          <li className="col col-3"> Description</li>
          <li className="col col-2">Attachment</li>
          <li className="col col-2">Status</li>
          <li className="col col-2">&nbsp;</li>
        </ul>
        <div className="gridBody">
          {
            noticeBoardListLoading ? (<NoDataAvailable title="Loading..." />) : (
              <>
                {
                  noticeBoardListSuccess && noticeBoardListData.length ? (
                    noticeBoardListData.map((item) => {
                      return (
                        <div className="gridRow">
                          <ul className="topInfo">
                            <li className="col col-3" data-head="Title ">
                              <div className="text-xs w-600 base">
                                {item.title}
                              </div>
                            </li>
                            <li
                              className="col col-3"
                              data-head="Description"
                            >
                              <React.Fragment>
                                {/* {item._id === readMoreText && toggle
                                  ? item.description
                                  : item.description.slice(0, 50)} */}

                                {/* <div
                                  className={`${item.description.length > 50
                                    ? "ToggleBtnSectionCst sun-editor-output"
                                    : ""
                                    } `}
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      item.description
                                  }}
                                >
                                  <span
                                    className={
                                      `primary ${item._id === readMoreText && toggle
                                        ? "active"
                                        : ""}`
                                    }
                                    onClick={() =>
                                      ReadMoreButton(item._id, !toggle)
                                    }
                                  >
                                    <React.Fragment>
                                      {!toggle && item.description.length > 50
                                        ? "Read More"
                                        : item._id === readMoreText &&
                                          item.description.length > 50 &&
                                          toggle
                                          ? "Read Less"
                                          : item._id !== readMoreText &&
                                            item.description.length > 50 &&
                                            toggle
                                            ? "Read More"
                                            : ""}
                                    </React.Fragment>
                                  </span>
                                </div> */}
                                <div className="mt-3 sun-editor-output"
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      item.description
                                  }}
                                >
                                </div>
                              </React.Fragment>
                            </li>
                            {/* 
                              <div className="text-xxs w-500"> {item.description}</div> */}

                            <li className="col col-2" data-head="Attachment">
                              {!item?.attachment?.src || item?.attachment?.src === "" ? (
                                ""
                              ) : (
                                <a
                                  href={item?.attachment?.src}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View Attachment <img src={IconAttachment} alt="attachment icon" />
                                </a>
                              )}
                            </li>
                            <li className="col col-2" data-head="Status">
                              {item.isStatus ? (
                                <div className="selectTextType">
                                  <select
                                    className=""
                                    onChange={(e) =>
                                      handelListStatus(e, item._id)
                                    }
                                    value={item.isStatus}
                                  >
                                    <option>Active</option>
                                    <option>Inactive</option>
                                  </select>
                                </div>
                              ) : (
                                ""
                              )}
                            </li>
                            <li className="col col-2 actionCols">
                              <div className="actionBtn">
                                <button
                                  className="btn-square"
                                  title="Edit"
                                  onClick={() => handelUpdateUser(item)}
                                >
                                  <span className="cssIcon">
                                    <i className="ed-pen"></i>
                                  </span>
                                </button>
                                <button
                                  className="btn-square"
                                  title="Delete"
                                  onClick={() =>
                                    onClickBtnDropDownRemove(item._id, true)
                                  }
                                >
                                  <span className="cssIcon">
                                    <i className="ed-trash"></i>
                                  </span>
                                </button>
                              </div>
                              {item._id === Notice && isActive && (
                                <Popup
                                  show={isActive}
                                  RemovePopToggleRef={dropdownRef}
                                  CancelProp={() => setIsActive(!isActive)}
                                  RemoveProp={() => handleDeleteUser(item._id)}
                                  loading={buttonDeleteLoading}
                                >
                                  <p className="gray text-xs w-600">
                                    You are about to remove this review.
                                  </p>
                                  <p className="red text-xxs w-400">Are you sure?</p>
                                </Popup>
                              )}
                            </li>
                          </ul>
                        </div>
                      );
                    })) : (
                    <NoDataAvailable title="No Records Found." />
                  )
                }
              </>
            )
          }

        </div>
      </div>
    </React.Fragment>
  )
}
export default NoticeBoardList