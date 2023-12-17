import React, { useState } from "react";
import ModalBody from "../../../../Common/Modal/ModalBody";
import Modal from "../../../../Common/Modal";
import ModalHeader from "../../../../Common/Modal/ModalHeader";
import ModalFooter from "../../../../Common/Modal/ModalFooter";
import { useDispatch, useSelector } from "react-redux";
import SearchUserByUsername from "../../../../Common/SearchUserByUsername";
import { AddTeacherClassroom, AddTeacherReset, getClassroomViewList } from "../../../../store/actions/classroomdetail";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Storage from "../../../../Classes/Storage";
import { courseID } from "../../../../Constant/auth";
const AddTeacher = ({ modalOpen, CloseAddTeacherModal, teacherClassroom, ToggleValue }) => {

  const dispatch = useDispatch();
  const { classroomId, subjectId } = useParams();
  const [validateForm, setValidateForm] = useState(false);


  const {
    users,
    courseid,
    AddTeacherLoading,
    AddTeacherSuccess
  } = useSelector((state) => {
    return {
      users: state.user,
      courseid: state.classroomDetail.classrooomData.data.data_courseInfo,
      AddTeacherLoading: state.classroomDetail.addTeacherClassroom.loading,
      AddTeacherSuccess: state.classroomDetail.addTeacherClassroom.success
    };
  });

  const [assignTeacherFormKey, setAssignTeacherFormKey] = useState([
    { formKey: Math.random().toFixed(6), value: "" },
  ]);

  const handleRemoveClick = (inputKey) => {
    let allFormKeys = assignTeacherFormKey.filter(
      (FormItem) => FormItem.formKey !== inputKey
    );
    setAssignTeacherFormKey([...allFormKeys]);
  };

  useEffect(() => {
    if (AddTeacherSuccess) {

      setTimeout(() => {
        if (teacherClassroom) {
          dispatch(
            getClassroomViewList(users.user_institute, subjectId, ToggleValue, classroomId)
          );
        } else {
          dispatch(getClassroomViewList(users.user_institute, classroomId, ToggleValue, Storage.getJson(courseID), ToggleValue === "Students" ? "student" : "teacher"))
        }
      }, 500);
      CloseAddTeacherModal()
      dispatch(AddTeacherReset())
      setAssignTeacherFormKey([{ formKey: Math.random().toFixed(6), value: "" }]);
    }
  }, [AddTeacherSuccess, CloseAddTeacherModal, ToggleValue, classroomId, dispatch, subjectId, teacherClassroom, users.user_institute])

  const handleAddClick = () => {
    let allNewFormKeys = assignTeacherFormKey;
    allNewFormKeys.push({ formKey: Math.random().toFixed(6), value: "" });
    setAssignTeacherFormKey([...allNewFormKeys]);
  };

  const CloseAssignmentModal = () => {
    CloseAddTeacherModal()
  };

  const handleSubmit = (e) => {
    setValidateForm(true);
    e.preventDefault();

    if (assignTeacherValid()) {
      dispatch(AddTeacherClassroom(assignTeacherRequestData(), ToggleValue))
    }
  };

  const assignTeacherValid = () => {
    return !assignTeacherFormKey
      .map((FormInput) => (FormInput.value ? FormInput.value : undefined))
      .includes(undefined);
  };

  const assignTeacherRequestData = () => {
    return assignTeacherFormKey.map((FormInput) =>
      FormInput.value ? FormInput.value : undefined
    );
  };

  const suggestionSelected = (user) => {
    if (ToggleValue === "Teachers") {
      const allFormArr = assignTeacherFormKey.map((FormItem) =>
        FormItem.formKey === user.inputkey
          ? {
            ...FormItem,
            value: {
              user: user.user,
              owner: users._id,
              institute: users.user_institute,
              kind: "teacher",
              course: courseid,
              classroom: courseid === classroomId && subjectId ? subjectId : classroomId,
            },
          }
          : FormItem
      );
      setAssignTeacherFormKey([...allFormArr]);
    } else {
      const allFormArr = assignTeacherFormKey.map((FormItem) =>
        FormItem.formKey === user.inputkey
          ? {
            ...FormItem,
            value: {
              user: user.user,
              owner: users._id,
              institute: users.user_institute,
              kind: "student",
              course: courseid,
              classroom: courseid === classroomId && subjectId ? subjectId : classroomId,
            },
          }
          : FormItem
      );
      setAssignTeacherFormKey([...allFormArr]);
    }
  };

  return (
    <React.Fragment>
      <Modal show={modalOpen}>
        <ModalHeader
          title={ToggleValue}
          closeButton={true}
          onclose={() => CloseAssignmentModal()}
        />
        <ModalBody>
          <div className="pageFullCenter">
            {assignTeacherFormKey.map((FormItem) => {
              return (
                <div key={FormItem.formKey}>
                  <div className="addSubWrapper">
                    <div className="formFieldwrap">
                      {ToggleValue === "Teachers" ? (
                        <SearchUserByUsername
                          validate={validateForm}
                          name={FormItem.formKey}
                          inputkey={FormItem.formKey}
                          institute={users.user_institute}
                          usertype={process.env.REACT_APP_TEACHER}
                          courseid={courseid}
                          subjectId={classroomId}
                          onSelect={(user) => {
                            suggestionSelected(user);
                          }}
                          kind="teacher"
                          label="Email"
                          placeholder="Teacher's Email"
                          industry={users.user_business_type}
                        />
                      ) : (
                        <SearchUserByUsername
                          validate={validateForm}
                          name={FormItem.formKey}
                          inputkey={FormItem.formKey}
                          institute={users.user_institute}
                          usertype={process.env.REACT_APP_STUDENT}
                          courseid={courseid}
                          subjectId={teacherClassroom ? subjectId : classroomId}
                          onSelect={(user) => {
                            suggestionSelected(user);
                          }}
                          kind="student"
                          label="Email"
                          placeholder="Student's Email"
                          industry={users.user_business_type}
                        />
                      )
                      }
                    </div>
                    {assignTeacherFormKey.length !== 1 && (
                      <button
                        className="button btn-o-silver base btn-sm w-500"
                        onClick={() => handleRemoveClick(FormItem.formKey)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {assignTeacherFormKey.length !== 5 && (
              <button
                className="button btn-o-primary primary btn-sm w-500"
                onClick={handleAddClick}
              >
                Add More
              </button>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          {!AddTeacherLoading && (
            <button
              className="button btn-md button-theme"
              onClick={(e) => handleSubmit(e)}
            >
              Add {ToggleValue}
            </button>
          )}
          {AddTeacherLoading && (
            <button className="button btn-md button-theme">Adding {ToggleValue}...</button>
          )}
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};
export default AddTeacher;
