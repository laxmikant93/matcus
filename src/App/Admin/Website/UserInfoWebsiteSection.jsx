import React, { useEffect } from "react";
import DummyProfile from "../../../assets/images/img/DummyProfile.png";
import NoDataAvailable from "../../../Common/NoDataAvailable";
import { useDispatch, useSelector } from "react-redux";
import { getWebsiteInstituteData } from "../../../store/actions/websiteuifaculty";

const UserInfoWebsiteSection = () => {
  const dispatch = useDispatch();

  const { websitefacultylist, users } = useSelector((state) => {
    return {
      websitefacultylist: state.websitefaculty.list.data,
      users: state.user,
    };
  });

  useEffect(() => {
    dispatch(getWebsiteInstituteData(users.userinfo_institute));
  }, [dispatch, users]);

  return (
    <div className="pageFullCenter faculty-gallery-sec">
      <div className="row">
          <div className="col-md-12">
            <h3 className="heading text-sm w-700">Our Teachers</h3>
            <p className="sub-heading w-500">Great people behind our success</p>
          </div>
          <div className="col-md-12">
            <div className="faculty-gallery-wrapper mt-20">
              {websitefacultylist.length ? (
                websitefacultylist.map((item) => {
                  return (
                    <div className="faculty-gallery">
                      <div className="faculty-gallery-img">
                        <img
                          src={
                            item.profile_picture === ""
                              ? DummyProfile
                              : item.profile_picture
                          }
                          alt=""
                        />
                      </div>
                      <div className="faculty-gallery-caption mt-10">
                        <h4 className="heading text-xs w-500">
                          {item.fullname}
                        </h4>
                      </div>
                    </div>
                  );
                })
              ) : (
                <NoDataAvailable title="No Records Found." />
              )}
            </div>
          </div>
        </div>
    </div>
  );
};

export default UserInfoWebsiteSection;
