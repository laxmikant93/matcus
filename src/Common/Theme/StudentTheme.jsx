import React from "react";
import StudentEcllipse from "../../assets/images/img/student-ecllipse.svg";
import StudentLeftArt from "../../assets/images/img/student-l-art.svg";
import "./Theme.scss";

const TeacherTheme = ({ children }) => {
  return (
    <>
      <section className="PrimaryDesignFirst">
        <div className="primaryEcllipse">
          <img src={StudentEcllipse} alt="" />
        </div>
        <div className="instituteLArt">
          <img src={StudentLeftArt} alt="" />
        </div>
      </section>
      <section className="">{children}</section>
    </>
  );
};

export default TeacherTheme;
