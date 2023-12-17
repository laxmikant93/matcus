/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import FormInput from "../../../../../Common/Form/FormInput";
import CardBody from "../../../../../Common/Card/CardBody";
import TextEditor from "../../../../../Common/Form/TextEditor";
import IconDeleteWhite from "./icon-delete-white.svg";
import Popup from "../../../../../Common/Popup";
import { useSelector } from "react-redux";
//import { CoursesTaxanomyChapter } from "../../../../../Common/UserElement"
const Chapter = ({ chapterOnChange, ChapterData, DeleteTopicChapter }) => {
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

  const RemovePopToggleRef = useRef();
  const [RemovePop, setRemovePop] = useState(false);
  const [deleteID, setDeleteID] = useState("");

  const RemovePopState = (_id) => {
    setRemovePop(!RemovePop);
    setDeleteID(_id);
  };
  const currentResponse = (value) => {
    if (value.length > 280) {

    } else {
      chapterOnChange(value, "chapterShortDescription");
    }

  };
  const chapterTitle = (e) => {
    let value = e.target.value;
    chapterOnChange(value, "chapterTitle");
  };

  const handleDeleteChapter = (_id) => {
    DeleteTopicChapter(_id);
  };

  return (
    <form>
      <div className="DelChapterBtn">
        <span type="button" onClick={() => RemovePopState(ChapterData._id)}>
          <img src={IconDeleteWhite} alt="Audio" title="Audio" />
        </span>
        {ChapterData._id === deleteID && RemovePop && (
          <Popup
            show={RemovePop}
            RemovePopToggleRef={RemovePopToggleRef}
            CancelProp={() => setRemovePop(!RemovePop)}
            RemoveProp={() => handleDeleteChapter(ChapterData._id)}
          >
            <p className="gray text-xxs w-300">
              You are about to remove this {CoursesTaxanomyChapter()}.
            </p>
            <p className="dgray text-xxs w-400">Are you sure?</p>
          </Popup>
        )}
      </div>
      <div className="formFieldwrap">
        <FormInput
          placeholder={`${CoursesTaxanomyChapter()}`}
          label="Chapter Title"
          value={ChapterData.chapterTitle}
          onChange={(e) => chapterTitle(e)}
          maxlength={80}
        />
      </div>
      <TextEditor
        preFilledData={ChapterData.chapterShortDescription}
        currentResponse={(value) => currentResponse(value)}
      />

      {/* <div className="input-custom-type inline">
          <label className="small w-600 active">
            <input type="radio" name="WhatsappNumber" value="same" />
            Publish Now
          </label>
          <label className="small w-600">
            <input type="radio" name="WhatsappNumber" value="same" />
            Save Now
          </label>
          <label className="small w-600">
            <input type="radio" name="WhatsappNumber" value="same" />
            Publish Later
          </label>
        </div>
        <div className="input-custom-type mt-30">
          <label className="large w-600 active">
            <input type="checkbox" name="WhatsappNumber" value="same" />
            <div className="text-xs w-500 labelText">
              Mark as Downloadable <br />
              <span className="text-xxs base w-600">
                Download file button will be shown to students
              </span>
            </div>
          </label>
        </div> */}
    </form>
  );
};
export default Chapter;
