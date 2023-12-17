/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import FormError from "../../../../../Common/Form/FormError";
import FormInput from "../../../../../Common/Form/FormInput";
import FormTextArea from "../../../../../Common/Form/FormTextArea";
//import { CoursesTaxanomyTopic } from "../../../../../Common/UserElement"
const Topic = ({ OnChangeTopicDetails, TopicData, showCourseError }) => {

  const OnChangeTopic = (e, switchValue) => {
    let Value = e.target.value;
    OnChangeTopicDetails(Value, switchValue)
  }

  const { taxanomyData, taxanomySuccess, } = useSelector(
    (state) => {
      return {
        taxanomyData: state.admincourse.getTaxanomy.data,
        taxanomySuccess: state.admincourse.getTaxanomy.success,
      };
    }
  );
  const CoursesTaxanomyContent = () => {

    if (taxanomySuccess) {
      if (taxanomyData.taxanomyContent) {
        return taxanomyData.taxanomyContent
      } else {
        return "Content"
      }
    } else {
      return "Content"
    }
  }

  const CoursesTaxanomyChapter = () => {

    if (taxanomySuccess) {
      if (taxanomyData && taxanomyData.taxanomyChapter) {
        return taxanomyData.taxanomyChapter
      } else {
        return "Chapter"
      }
    } else {
      return "Chapter"
    }
  }
  const CoursesTaxanomyTopic = () => {

    if (taxanomySuccess) {
      if (taxanomyData && taxanomyData.taxanomyTopic) {
        return taxanomyData.taxanomyTopic
      } else {
        return "Topic"
      }
    } else {
      return "Topic"
    }
  }
  return (
    <React.Fragment>
      <div className="formFieldwrap">
        <FormInput className={` ${showCourseError ? "errorInput" : ""
          }`} placeholder={`${CoursesTaxanomyTopic()} Title`} value={TopicData.topicTitle} onChange={(e) => OnChangeTopic(e, "topicTitle")} maxLength={79} label="Topic Title" />
        {showCourseError && (
          <FormError
            show={TopicData.topicTitle === ""}
            error={`Course ${CoursesTaxanomyTopic()} Title is required.`}
          ></FormError>
        )}
      </div>
      <div className="formFieldwrap">
        <FormTextArea
          maxLength={179}
          onChange={(e) => OnChangeTopic(e, "topicShortDescription")}
          value={TopicData.topicShortDescription}
          placeholder={` ${CoursesTaxanomyTopic()} Short Description`}
          label={` ${CoursesTaxanomyTopic()} Short Description`}
          TextareaBtmTxt="180"

        />
      </div>
    </React.Fragment>
  )
}
export default Topic