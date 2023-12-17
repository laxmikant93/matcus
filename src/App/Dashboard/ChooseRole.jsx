import { useDispatch, useSelector } from "react-redux";
import AuthContainer from "../Auth/AuthContainer";
import AppLink from "../../Common/AppLink";
import { SetChooseOption } from "../../store/actions/chooseoption";
import "./ChooseRole.scss";
function ChooseRole() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const selectOption = (option) => {
    dispatch(SetChooseOption(option));
  };

  return (
    <AuthContainer>
      <div className="middleContentPlacement">
        <div className="pageFullCenter">
          <div className="row">
            <div className="col-xs-12 center-xs">
              <div className="mt-25">
                <h1 className="heading text-sm dgray w-300">
                  Hello, {user.user_fullname}
                </h1>
                <p className="sub-heaidng text-xxs dgary">Welcome to Edneed</p>
              </div>
            </div>
            <div className="col-xs-12 text-center mt-40">
              <h2 className="text-xs w-700">To continue</h2>
              <h3 className="text-xxs w-300 dgary">
                Select one of the user roles given below:
              </h3>
            </div>
            <div className="col-xs-12 text-center RoleSelection">
              <div className="heroRole">
                <ul>
                  <li
                    onClick={() =>
                      selectOption(process.env.REACT_APP_PAGE_OWNER_NEW)
                    }
                  >
                    <i className="ed-icon icon-InstituteRole primary i-75 svgColorIcon"></i>
                    <span className="mt-2 text-xs primary w-500">
                      Institute Admin
                    </span>
                  </li>
                  <li
                    onClick={() =>
                      selectOption(process.env.REACT_APP_TEACHER_NEW)
                    }
                  >
                    <i className="ed-icon icon-TeacherRole secondary i-75 svgColorIcon"></i>
                    <span className="mt-2 text-xs secondary w-500">
                      Teacher
                    </span>
                  </li>
                  <li
                    onClick={() =>
                      selectOption(process.env.REACT_APP_STUDENT_NEW)
                    }
                  >
                    <i className="ed-icon icon-StudentRole purple i-75 svgColorIcon"></i>
                    <span className="mt-2 text-xs purple w-500">Student</span>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="col-xs-12 text-center mt-50">
              <p className="text-xxs dgary">
                None of the above? <span className="base">No worries.</span>
              </p>
              <AppLink
                to="/community"
                className="button btn-sm btn-o-silver primary mt-3"
              >
                Discover Edneed Community{" "}
                <i className="animate-r-arrow-icon"></i>
              </AppLink>
            </div> */}
          </div>
        </div>
      </div>
    </AuthContainer>
  );
}

export default ChooseRole;
