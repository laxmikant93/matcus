import {
  findInstituteInformation,
  updateInstituteInformation,
  resetManageInstituteInfo
} from "../../store/actions/instituteregistration/action";

export const InsManageMapStateToProps = (state) => {
  return {
    user: state.user,
    institutedetail: state.manageinstituteinfo,
  };
};

export const InsManageMapDispatchToProps = (dispatch) => {
  return {
    getInstituteInformation: (instituteId, industry) => dispatch(findInstituteInformation(instituteId, industry)),
    updateInstitute: (id, data, industry, stepper, user) => dispatch(updateInstituteInformation(id, data, industry, stepper, user)),
    resetInformation: () => dispatch(resetManageInstituteInfo())
  };
};
