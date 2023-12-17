import React from "react";
import ContentSection from "./ContentSection";
import ContentTaxonomy from "./ContentTaxonomy";
import "./CourseContent.scss";
const CourseContent = () => {
  return (
    <div className="courseContentWrapper">
      <ContentSection />
      <ContentTaxonomy />
    </div>
  );
};

export default CourseContent;
