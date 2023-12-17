import React from "react";
import { useNavigate } from "react-router-dom";

const PasswordChangeSuccess = () => {
  const history = useNavigate();
  const [seconds, setSeconds] = React.useState(5);
  React.useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setTimeout(() => {
        history("/auth/login");
      });
    }
  });
  return (
    <React.Fragment>
      {/* <div className="row center-md middleContentPlacement">
        <div className="col-xs-12">
          <div className="row center-md"> */}
      <div className="passwordChangeSucess">
        <div className="mt-30">
          <h2 className="text-xs w-300 secondary">
            Password changed successfully
          </h2>
          <h5 className="text-xxs w-300 gray">
            Redirecting to login page in
          </h5>
        </div>
      </div>
      {/* </div> */}
      {/* <div className="row">
            <div className="col-xs-12 text-center mt-8"> */}
      <div className="progress mt-40 mb-40" data-percentage="100">
        <span className="progress-left">
          <span className="progress-bar"></span>
        </span>
        <span className="progress-right">
          <span className="progress-bar"></span>
        </span>
        <div className="progress-value">
          <div className="redirectPageTime">
            <span className="secondary text-lg w-300">{seconds}</span>
            <span className="gray text-xxs">Seconds</span>
          </div>
        </div>
      </div>
      {/* </div>
          </div>
        </div>
      </div> */}
    </React.Fragment>
  );
};

export default PasswordChangeSuccess;
