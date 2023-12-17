import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Breadcrumb from '../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../Common/Breadcrumb/BreadcrumbItem';
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import { getStudentUserInfoDataIdFaculty } from '../../../store/actions/studentlistuserinfo';
import EditStduentCourse from '../Student/EditStudent/EditStudentCourse';

const EditTeacher = () => {
  const { _id } = useParams()
  const dispatch = useDispatch()
  const { facultyData, facultySuccess } = useSelector((state) => {
    return {
      facultyData: state.studentlistuserinfo.dataid.data,
      facultySuccess: state.studentlistuserinfo.dataid.success
    }
  })
  useEffect(() => {
    dispatch(getStudentUserInfoDataIdFaculty(_id));
  }, [_id, dispatch])
  return (
    <React.Fragment>
      <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/invite-faculty-list" title="Teachers" />
          <BreadcrumbItem
            to={`/edit-teacher/${_id}`}
            title="Edit Teacher"
          />
        </Breadcrumb>
        <div className="PageTopHead PTH-EditFaculty mt-20">
          <div className="PTH-Item">
            <p className="heading dgray text-sm w-300">{facultySuccess ? facultyData.fullname : "Loading..."}</p>
            <p className="sub-heading primary">{facultySuccess ? facultyData.email : "Loading..."}</p>
          </div>
        </div>
        <EditStduentCourse userType="Teacher" />
    </React.Fragment>
  )
}
export default EditTeacher;