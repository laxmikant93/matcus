import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../../Common/Form/FormInput";
import {
  readSectionTitle,
  resetSectionTitle,
  updateSectionTitle,
} from "../../../../store/actions/sectionTitle";
import ValidationFile from "../../../../Classes/ValidationFile";
import FormError from "../../../../Common/Form/FormError";
import SelectInput from "../../../../Common/Form/SelectInput";
import { showSuccessPopup } from "../../../../store/actions/successmessagepopup";
function MascellaniousHeader() {
  const dispatch = useDispatch();
  const [ToggleSectionTitle, SetToggleSectionTitle] = useState(false);
  const [showMiscellaneousFormInput, setShowMiscellaneousFormInput] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [miscellaneousTitle, setMiscellaneousTitle] = useState("");
  const [miscellaneousFormTitle, setMiscellaneousFormTitle] = useState("");
  const [miscellaneousFormError, setMiscellaneousFormError] = useState(false);
  const [miscellaneoussubHeading, setMiscellaneousSubHeading] = useState();
  const [miscellaneoussubHeadingError, setMiscellaneousSubHeadingError] = useState(false);
  const { user, sectionData } = useSelector((state) => {
    return {
      user: state.user,
      sectionData: state.sectionTitle.list,
    };
  });

  if (sectionData.success && sectionData.data && !isFilled) {
    setIsFilled(true);
    setMiscellaneousTitle(sectionData.data.noticehead);
    setMiscellaneousSubHeading(sectionData.data.noticesubhead);
    if (
      sectionData.data.noticehead !== "Miscellanious" &&
      sectionData.data.noticehead !== "E-magazine" &&
      sectionData.data.noticehead !== "Brochure & Forms" &&
      sectionData.data.noticehead !== "Documents"
    ) {
      setShowMiscellaneousFormInput(true);
      setMiscellaneousTitle("Others");
      setMiscellaneousFormTitle(sectionData.data.noticehead);
    }

  }

  const handleInput = (e) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;
    switch (inputName) {
      case "miscellaniousHeader":
        if (inputValue === "Others") {
          setShowMiscellaneousFormInput(true);
          setMiscellaneousTitle(inputValue);

        } else {
          setMiscellaneousTitle(inputValue);
          setShowMiscellaneousFormInput(false);
          setMiscellaneousFormTitle("");
          setMiscellaneousFormError(false);
        }
        break;
      case "miscellaniousformhead":
        setMiscellaneousFormTitle(ValidationFile.spaceNotAccept(inputValue));
        setMiscellaneousFormError(ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue)));
        break;

      case "miscellaneousHeading":
        setMiscellaneousSubHeading(ValidationFile.spaceNotAccept(inputValue));
        setMiscellaneousSubHeadingError(ValidationFile.isEmpty(inputValue));
        break;
      default:
    }

  };

  const MiscellaneousHeaderData = () => {
    return {
      noticehead: miscellaneousTitle === "Others" ? miscellaneousFormTitle : miscellaneousTitle,
      institute: user.user_institute,
      noticesubhead: miscellaneoussubHeading ? miscellaneoussubHeading : "",
      owner: user._id,
    };
  };
  useEffect(() => {
    dispatch(readSectionTitle(user.user_institute));
  }, [user, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetSectionTitle());
    };
  }, [dispatch]);

  const handleMiscellaneousValidation = () => {
    let isValid = false
    if (miscellaneousTitle === "Others" && ValidationFile.isEmpty(miscellaneousFormTitle)) {
      isValid = false
      setMiscellaneousFormError(true);
    }
    else {
      isValid = true
    }
    return isValid
  }

  const onBlur = () => {
    const isMiscellaneousValid = handleMiscellaneousValidation()
    if (ValidationFile.isEmpty(miscellaneoussubHeading)) {
      setMiscellaneousSubHeadingError(true)
    }
    if (isMiscellaneousValid && !ValidationFile.isEmpty(ValidationFile.spaceNotAccept(miscellaneoussubHeading))) {
      dispatch(
        updateSectionTitle(
          MiscellaneousHeaderData()
        ));
      dispatch(showSuccessPopup(`"Miscellaneous Heading and Sub Heading is Updated."`));

      SetToggleSectionTitle(false);
    }
  };
  return (
    <div className="SectionTitleCustomWrap">
      <div className="SectionTitleCustom">
        <button
          className={`btnText BtnCaret text-xxs w-300 ${ToggleSectionTitle ? `active` : ``
            }`}
          onClick={() => SetToggleSectionTitle(!ToggleSectionTitle)}
        >
          Miscellaneous Title & Heading
        </button>
        {ToggleSectionTitle && (
          <div className="SectionTitleInput mt-10">
            {!sectionData.loading && sectionData.success ? (
              <React.Fragment>
                <div className="formFieldwrap">
                  <SelectInput
                    className={"errorInput"}
                    name="miscellaniousHeader"
                    onChange={handleInput}
                    value={miscellaneousTitle}
                    onKeyUp={handleInput}
                    onKeyDown={handleInput}
                    id="select_Miscellanious"
                    // onBlur={onBlur}
                    label="Miscellaneous Title"
                  >
                    <option value="Miscellanious">Miscellanious</option>
                    <option value="E-magazine">E-magazine</option>
                    <option value="Brochure & Forms">Brochure & Forms</option>
                    <option value="Documents">Documents</option>
                    <option value="Others">Others</option>
                  </SelectInput>
                </div>
                {showMiscellaneousFormInput ? (
                  <React.Fragment>
                    <div className="formFieldwrap">
                      <FormInput
                        type="text"
                        label="Tell us about your suitable name"
                        name="miscellaniousformhead"
                        value={miscellaneousFormTitle}
                        placeholder="Tell us about your suitable name"
                        onChange={handleInput}
                        onKeyUp={handleInput}
                        maxLength="20"
                      />
                      <FormError
                        show={!miscellaneousFormTitle && miscellaneousFormError}
                        error="Miscellaneous title is required."
                      />
                    </div>
                  </React.Fragment>
                ) : (
                  ""
                )}


                <React.Fragment>
                  <div className="formFieldwrap">
                    <FormInput
                      type="text"
                      label="Miscellaneous heading"
                      name="miscellaneousHeading"
                      value={miscellaneoussubHeading}
                      placeholder="Miscellaneous heading"
                      onChange={handleInput}
                      onKeyUp={handleInput}
                    />
                    <FormError
                      show={miscellaneoussubHeadingError}
                      error="Miscellaneous sub heading is required."
                    />
                  </div>
                </React.Fragment>

                <button
                  className="button button-primary btn-sm mb-20"
                  onClick={onBlur}
                >
                  Save
                </button>
              </React.Fragment>
            ) : (
              <h3> Saving...</h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default MascellaniousHeader;
