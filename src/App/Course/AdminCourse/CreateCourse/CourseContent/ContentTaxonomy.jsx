import React, { useEffect, useState } from "react";
import FormInput from "../../../../../Common/Form/FormInput";
import {
  PostTaxanomy,
  getCourseTaxanomy,
} from "../../../../../store/actions/admincourse";
import ValidationFile from "../../../../Auth/ValidationFile";
import FormError from "../../../../../Common/Form/FormError";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const ContentTaxonomy = () => {
  let { _id } = useParams();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const { user, taxanomyData, taxanomyState, taxanomyPostState } = useSelector(
    (state) => {
      return {
        user: state.user,
        taxanomyData: state.admincourse.getTaxanomy.data,
        taxanomyState: state.admincourse.getTaxanomy,
        taxanomyPostState: state.admincourse.editTaxanomy,
      };
    }
  );

  useEffect(() => {
    if (taxanomyState.success) {
      let data = {
        taxanomyTopic: {
          value: taxanomyData ? taxanomyData.taxanomyTopic : "Topic",
          isValid: true,
        },
        taxanomyChapter: {
          value: taxanomyData ? taxanomyData.taxanomyChapter : "Chapter",
          isValid: true,
        },
        taxanomyContent: {
          value: taxanomyData ? taxanomyData.taxanomyContent : "Content",
          isValid: true,
        },
        validation: true,
      };
      setTaxanomy(data);
    }
  }, [taxanomyData, taxanomyState]);

  const [taxanomyError, setTaxanomyError] = useState(false);
  const [taxanomy, setTaxanomy] = useState({
    taxanomyTopic: {
      value: "Topic",
      isValid: true,
    },
    taxanomyChapter: {
      value: "Chapter",
      isValid: true,
    },
    taxanomyContent: {
      value: "Content",
      isValid: true,
    },
    validation: true,
  });

  const [isFilled, setIsFilled] = useState(false);
  if (!isFilled && taxanomyState.success) {
    setIsFilled(true);
  }

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value.trim();

    let taxanomyData = {
      ...taxanomy,
      [inputName]: {
        value: inputValue,
        isValid: validationConfirm(inputValue, inputName),
      },
      validation: isFormValid(),
    };

    setTaxanomy(taxanomyData);
    setTaxanomyError(false);
  };

  const isFormValid = () => {
    return taxanomy.taxanomyTopic.isValid &&
      taxanomy.taxanomyChapter.isValid &&
      taxanomy.taxanomyContent.isValid
      ? true
      : false;
  };

  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "taxanomyTopic":
        return ValidationFile.validEmpty(inputValue);

      case "taxanomyChapter":
        return ValidationFile.validEmpty(inputValue);

      case "taxanomyContent":
        return ValidationFile.validEmpty(inputValue);

      default:
        return false;
    }
  };

  const handleSubmit = (e) => {
    setTaxanomyError(true);
    let data = {
      taxanomyTopic: taxanomy.taxanomyTopic.value,
      taxanomyChapter: taxanomy.taxanomyChapter.value,
      taxanomyContent: taxanomy.taxanomyContent.value,
      courseInfoId: _id,
      institute: user.user_institute,
      owner: user._id,
    };
    if (isFormValid()) {
      dispatch(PostTaxanomy(data));
    }
  };
  const [isPost, setIsPost] = useState(false);
  if (taxanomyPostState.success && !taxanomyPostState.loading && !isPost) {
    setIsPost(true);
    setToggle(!toggle);
  }

  useEffect(() => {
    dispatch(getCourseTaxanomy(_id));
  }, [_id, dispatch]);

  const editTaxonomy = () => {
    setToggle(!toggle);
    setTaxanomyError(false);
  };

  return (
    <div className="contentTaxonomyWrap">
      <button
        className="button btn-o-primary btn-xs primary mb-10"
        onClick={editTaxonomy}
      >
        <i className="ed-icon icon-edit i-xs primary"></i>
        Edit Taxonomy
      </button>
      {toggle ? (
        <React.Fragment>
          {/* <form onSubmit={handleSubmit}> */}
          <div className="formFieldwrap">
            <FormInput
              type="text"
              // label="Topic"
              name="taxanomyTopic"
              placeholder="Topic"
              maxLength="20"
              onChange={handleInput}
              onKeyUp={handleInput}
              value={taxanomy.taxanomyTopic.value}
            />

            <FormError
              show={!taxanomy.taxanomyTopic.isValid && taxanomyError}
              error="Topic required."
            />
          </div>
          <div className="formFieldwrap">
            <FormInput
              type="text"
              name="taxanomyChapter"
              // label="Chapter"
              placeholder="Chapter"
              onChange={handleInput}
              onKeyUp={handleInput}
              value={taxanomy.taxanomyChapter.value}
              maxLength="20"
            />

            <FormError
              show={!taxanomy.taxanomyChapter.isValid && taxanomyError}
              error="Chapter required."
            />
          </div>
          <div className="formFieldwrap">
            <FormInput
              type="text"
              name="taxanomyContent"
              // label="Content"
              placeholder="Content"
              onChange={handleInput}
              onKeyUp={handleInput}
              value={taxanomy.taxanomyContent.value}
              maxLength="20"
            />

            <FormError
              show={!taxanomy.taxanomyContent.isValid && taxanomyError}
              error="Content required."
            />
          </div>
          {taxanomyPostState.loading ? (
            <button
              className="button button-primary btn-sm mb-20"
              type="button"
            // onClick={handleSubmit}
            >
              Saving...
            </button>
          ) : (
            <button
              className="button button-primary btn-xs mb-20"
              type="button"
              onClick={handleSubmit}
            >
              Save
            </button>
          )}

          <button
            className="button button-primary btn-xs mb-20"
            type="button"
            onClick={editTaxonomy}
          >
            Cancel
          </button>
          {/* </form> */}
        </React.Fragment>
      ) : (
        ""
      )}

      <ul className="tree cascade">
        <li>
          <div className="text-xs w-700">Material Hierarchy</div>
          <ul>
            <li>
              <div className="caret text-xs w-700">
                {taxanomy.taxanomyTopic.value} 1
              </div>
              <ul>
                <li>
                  <div className="caret text-xs w-700">
                    {taxanomy.taxanomyChapter.value} 1.1
                  </div>
                  <ul>
                    <li>
                      <div className="text-xs w-300">
                        {taxanomy.taxanomyContent.value} 1.1.1
                      </div>
                    </li>
                    <li>
                      <div className="text-xs w-300">
                        {taxanomy.taxanomyContent.value} 1.1.2
                      </div>
                    </li>
                    <li>
                      <div className="text-xs w-300">
                        {taxanomy.taxanomyContent.value} 1.1.3
                      </div>
                    </li>
                  </ul>
                </li>
                <li>
                  <div>{taxanomy.taxanomyChapter.value} 1.2</div>
                </li>
              </ul>
            </li>
            <li>
              <div className="caret text-xs w-700">
                {taxanomy.taxanomyTopic.value} 2
              </div>
              <ul>
                <li>
                  <div className="text-xs w-300">
                    {taxanomy.taxanomyContent.value} 2.1
                  </div>
                </li>
                <li>
                  <div className="text-xs w-300">
                    {taxanomy.taxanomyContent.value} 2.2
                  </div>
                </li>
                <li>
                  <div className="text-xs w-300">
                    {taxanomy.taxanomyContent.value} 2.3
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ContentTaxonomy;
