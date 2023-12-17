import React from "react";
import { useNavigate } from "react-router-dom";

const TeacherDashboardPrepare = () => {
  const history = useNavigate();
  const [seconds, setSeconds] = React.useState(5);
  React.useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setTimeout(() => {
        history("/dashboard/teacher-dashboard");
      });
    }
  });
  return (
    <React.Fragment>
      <div className="row middleContentPlacement">
        <div className="col-md-12 text-center">
          <h2 className="text-sm secondary w-300">You're almost done</h2>
          <p className="text-xxs gray w-300">
            Please verify the details given below:
          </p>
          <div className="progress mt-20" data-percentage="100">
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
        </div>
      </div>
    </React.Fragment>
  );
};
export default TeacherDashboardPrepare;
