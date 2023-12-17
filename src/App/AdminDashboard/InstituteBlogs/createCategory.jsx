import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ValidationFile from '../../../Classes/ValidationFile';
import ValidationUtils from '../../../Classes/ValidationUtils';
import ImageCropper from '../../../Common/Cropper';
import FormError from '../../../Common/Form/FormError';
import FormInput from '../../../Common/Form/FormInput';
import FormTextArea from '../../../Common/Form/FormTextArea';
import Modals from '../../../Common/Modals';
import ModalsBody from '../../../Common/Modals/ModalsBody';
import ModalsFooter from '../../../Common/Modals/ModalsFooter';
import ModalsHeader from '../../../Common/Modals/ModalsHeader';
import './createcategory.scss'
import {
  getSingleCategory, getSingleCategoryReset, postCategory, resetPostCategory,
  updateCategory, updateCategoryReset
} from '../../../store/actions/instituteblogs';


const CreateCategory = ({ onclose, createCategoryref, categoryId }) => {

  let history = useNavigate();
  let dispatch = useDispatch();
  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";

  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryCoverImage, setCategoryCoverImage] = useState("");
  const [categoryTitleError, setCategoryTitleError] = useState("");
  const [categoryDescriptionError, setCategoryDescriptionError] = useState("");
  const [isFilled, setIsFilled] = useState(false);


  const { user, insId, postCategorySuccess, postCategoryLoading, duplicateCatErr,
    singleCategoryData, singleCategorySuccess, updateCategoryLoading, updateCategorySuccess } = useSelector((state) => {
      return {
        user: state.user,
        insId: state.user.user_institute,
        postCategorySuccess: state.instituteblogs.postCategory.success,
        duplicateCatErr: state.instituteblogs.duplicateCategoryError.error,
        postCategoryLoading: state.instituteblogs.postCategory.loading,
        singleCategoryData: state.instituteblogs.getSingleCategory.data,
        singleCategorySuccess: state.instituteblogs.getSingleCategory.success,
        updateCategoryLoading: state.instituteblogs.patchCategory.loading,
        updateCategorySuccess: state.instituteblogs.patchCategory.success,
      }
    })

  const closeModal = () => {
    onclose();
    setCategoryTitle("");
    setCategoryDescription("");
    setCategoryCoverImage("");
    setCategoryTitleError("");
  };

  const handleCategoryInput = (e) => {
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    let inputName = e.target.name;
    if (inputName === "CategoryTitle") {
      setCategoryTitle(value);
      setCategoryTitleError(ValidationUtils.isEmpty(value));
    }
    else {
      setCategoryDescription(value);
      setCategoryDescriptionError(ValidationUtils.isEmpty(value));
    }

  }

  const uploadImage = (data) => {
    let imgData = data.location;
    setCategoryCoverImage(imgData);
  }

  const removeImage = () => {
    let imgData = "";
    setCategoryCoverImage(imgData);
  }

  const categoryDetails = {
    institute: insId,
    owner: user._id,
    category_title: categoryTitle,
    category_desc: categoryDescription,
    category_cover_image: categoryCoverImage
  }

  useEffect(() => {
    if (duplicateCatErr) {
      setCategoryTitleError(true);
    }
  }, [duplicateCatErr])

  const handleCategorySaveButton = (button) => {
    if (ValidationUtils.isEmpty(categoryTitle)) {
      setCategoryTitleError(true);
    }
    if (ValidationUtils.isEmpty(categoryDescription)) {
      setCategoryDescriptionError(true);
    }
    if (ValidationUtils.isNotEmpty(categoryTitle) && ValidationUtils.isNotEmpty(categoryDescription)) {
      if (button === "Save") {
        dispatch(postCategory(categoryDetails));
      }
      else if (button === "Update") {
        dispatch(updateCategory(categoryId, categoryDetails));
      }
    }
  }

  useEffect(() => {
    if (postCategorySuccess) {
      setCategoryTitle("");
      setCategoryDescription("");
      setCategoryCoverImage("");
    }
  }, [postCategorySuccess])

  useEffect(() => {
    // if (postCategorySuccess || updateCategorySuccess) {
    //   onclose();
    // }
    return () => {
      dispatch(resetPostCategory());
      dispatch(getSingleCategoryReset());
      dispatch(updateCategoryReset());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, postCategorySuccess, updateCategorySuccess])

  const handleCategoryCancelButton = () => {
    onclose();
    setCategoryTitle("");
    setCategoryDescription("");
    setCategoryCoverImage("");
    setCategoryTitleError("");
  }

  useEffect(() => {
    if (categoryId) {
      dispatch(getSingleCategory(categoryId));
    }
  }, [categoryId, dispatch])

  if (singleCategorySuccess && singleCategoryData && !isFilled) {
    setIsFilled(true);
    setCategoryTitle(singleCategoryData[0].category_title);
    setCategoryDescription(singleCategoryData[0].category_desc);
    setCategoryCoverImage(singleCategoryData[0].category_cover_image);

  }



  return (
    <Modals ref={createCategoryref} Position="center" Slide="top">
      <ModalsHeader
        title={categoryId ?
          "Edit Category"
          :
          "Add a New Category"}
      />
      <ModalsBody className="EditService-MBody">
        <p className="text-sm w-500 form-heading">{categoryId ? "Update category" : "Create a category"}</p>
        <hr className='mt-5 mb-25' />

        <div className="formFieldwrap ">

          <FormInput
            label="Category Title"
            value={categoryTitle}
            placeholder="Write the Category Title"
            name="CategoryTitle"
            maxLength="80"
            onChange={handleCategoryInput}
            className="text-xs w-400"

          />
          <FormError
            show={!categoryTitle && categoryTitleError}
            error="Category Title is required."
            className=''
          />
          <FormError
            show={categoryTitle && categoryTitleError}
            error="Category Title is taken."
            className=''
          />
        </div>
        <div className="formFieldwrap">
          <FormTextArea
            className="form-control text-xs w-400"
            id="exampleFormControlTextarea1"
            rows="3"
            type="text"
            onChange={handleCategoryInput}
            placeholder="Category Description"
            name="CategoryDescription"
            value={categoryDescription}
            label="Description"
            style={{ whiteSpace: " pre-wrap" }}
            maxLength="500"
            TextareaBtmTxt="500"
          >
          </FormTextArea>
          <FormError
            show={categoryDescriptionError}
            error="Category Description is required."
            className=''
          />
        </div>

        <div className='mt-20'>
          {/* <p className="text-sm w-500">
            {" "}
            Upload Cover Image
          </p> */}

          <div className="">
            <ImageCropper
              minWidth={120}
              maxWidth={400}
              defaultRatio={1 / 1}
              onUploaded={(e) => uploadImage(e, "Category")}
              BtnName="Upload Image"
              IconClassName="i-md primary"
              BtnPropClass="button-o-silver button-block categoty-upload-image-button"
            />
            {categoryCoverImage && (
              <a
                className="btnText priamry text-xxs attachmentwithtext mt-3"
                href={categoryCoverImage}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ed-icon icon-attachment gray i-xs"></i>
                {categoryCoverImage.replace(s3Url, "")}
              </a>
            )}
          </div>
          <div className="DashedInstructionList">
            <p className="text-2xs w-400">
              .jpg, .png formats accepted only
            </p>
          </div>

          <div className="formFieldwrap mt-8">
            {categoryCoverImage ? (
              <button
                type="button"
                onClick={() => removeImage("Category")}
                className="button button-sm button-o-red red mt-8"
              >
                Remove
              </button>
            ) : (
              ""
            )}
          </div>
        </div>

      </ModalsBody>
      <ModalsFooter className="category-footer-wrapper">

        <React.Fragment>
          {categoryId ?
            <React.Fragment>
              {updateCategoryLoading ?
                <button className="button button-primary btn-sm mb-30  mr-20"
                  type="submit" >
                  Updating...
                </button>
                :
                <button className="button button-primary btn-sm mb-30  mr-20"
                  onClick={() => handleCategorySaveButton("Update")}
                  type="submit" >
                  Update
                </button>
              }
            </React.Fragment>
            :
            <React.Fragment>
              <button className="button button btn-sm mb-30 "
                onClick={handleCategoryCancelButton}
                type="submit" >
                Cancel
              </button>
              {
                postCategoryLoading ?
                  <button className="button button-primary btn-sm mb-30  mr-20"
                    type="submit">
                    Saving...
                  </button>
                  :
                  <button className="button button-primary btn-sm mb-30  mr-20"
                    onClick={() => handleCategorySaveButton("Save")}
                    type="submit" >
                    Save
                  </button>}
            </React.Fragment>
          }



        </React.Fragment>

      </ModalsFooter>
    </Modals >
  );
}
export default CreateCategory;