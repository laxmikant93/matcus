import React from "react";
import TeacherEcllipse from "../../assets/images/img/teacher-ecllipse.svg";
import TeacherLeftArt from "../../assets/images/img/teacher-l-art.svg";
import "./Theme.scss";

const TeacherTheme = ({ children }) => {
  return (
    <>
      <section className="PrimaryDesignFirst">
        <div className="primaryEcllipse">
          <img src={TeacherEcllipse} alt="" />
        </div>
        <div className="instituteLArt">
          <img src={TeacherLeftArt} alt="" />
        </div>
      </section>
      <section className="">{children}</section>
    </>
  );
};

export default TeacherTheme;
