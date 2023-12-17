import {
  createInstitute,
  resetInstituteStates,
  changeInstituteState,
  findInstituteInformation
} from "../../store/actions/instituteregistration/action";
import { UnsetChooseOption } from "../../store/actions/chooseoption";

export const InsMapStateToProps = (state) => {
  return {
    user: state.user,
    institute: state.instituteregistration,
    institutedetail: state.manageinstituteinfo,
  };
};

export const InsMapDispatchToProps = (dispatch) => {
  return {
    registerInstitutes: (information) => dispatch(createInstitute(information)),
    resetStates: () => {
      dispatch(resetInstituteStates());
      dispatch(UnsetChooseOption());
    },
    changeInstituteStates: (state, status) =>
      dispatch(changeInstituteState(state, status)),
    getInstituteInformation: (instituteId, industry) => dispatch(findInstituteInformation(instituteId, industry))
  };
};
