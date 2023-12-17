import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ValidationFile from '../../../Classes/ValidationFile';
import FormError from '../../../Common/Form/FormError';
import FormInput from '../../../Common/Form/FormInput';
import FormInputFile from '../../../Common/Form/FormInputFile';
import Modals from '../../../Common/Modals';
import ModalBody from '../../../Common/Modals/ModalsBody';
import ModalHeader from '../../../Common/Modals/ModalsHeader';
import Cropper from "../../../Common/Cropper/index"
import { editMainCategoryData, postMainCategoryDetail, postResetMAinCategoryDetail, resetGetMainSingleCategory } from '../../../store/actions/bookAppointment';
import "./bookAppointment.style.scss"
import { useParams } from 'react-router-dom';
import FormTextArea from '../../../Common/Form/FormTextArea';

const AddCategoryPopup = ({ onCloseAddcategory, showAddCategoryRef, onCloseEditcategory, showEditCategoryRef, title, data, catid, create }) => {
  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";
  const dispatch = useDispatch();
  const [newCategory, setNewCategory] = useState("")
  const [newCategoryError, setNewCategoryError] = useState(false)
  const [categoryLogo, setCategoryLogo] = useState("")
  const [categoryLogoError, setCategoryLogoError] = useState()
  const [serviceVissible, setServiceVissible] = useState(false);
  const [description, setDescription] = useState("")
  const { users, businesstype, postCategoryLoading, editCategoryLoading, postCategorySuccess,
    editCategorySucess } = useSelector((state) => {
      return {
        users: state.user,
        businesstype: state.user.user_business_type,
        postCategoryLoading: state.bookAppointment.postMainCategory.loading,
        postCategorySuccess: state.bookAppointment.postMainCategory.success,
        editCategoryLoading: state.bookAppointment.editSingleMainCategory.loading,
        editCategorySucess: state.bookAppointment.editSingleMainCategory.success
      };
    })
  const ref = useRef()
  useEffect(() => {
    // console.log("create", create)
    if (create) {
      setNewCategory("")
      setDescription("")
      setNewCategoryError(false)
      setCategoryLogo("")
      setCategoryLogoError(false)
      setServiceVissible(false)
    }
    else if (data) {
      setNewCategory(data.main_category_name)
      setDescription(data.description)
      setNewCategoryError(false)
      setCategoryLogo(data.uploadefile)
      setCategoryLogoError(false)
      setServiceVissible(data.markAsFeatured)
    }

  }, [data, create, catid])

  useEffect(() => {
    return () => {
      dispatch(postResetMAinCategoryDetail());
    }
  }, [dispatch])

  useEffect(() => {
    return () => {
      dispatch(resetGetMainSingleCategory())
    }
  }, [dispatch])

  // console.log("line no 60", data, catid)
  // const closeModel = () => {
  //   setNewCategory("")
  //   setCategoryLogo("")
  // }

  // const closeEditModel = () => {
  //   onCloseEditcategory()
  // }
  const handleCategoryInput = (e) => {
    let inputValue = e.target.value;
    let inputName = e.target.name
    // setNewCategory(inputValue)
    switch (inputName) {
      case "mainCategory":
        setNewCategory(ValidationFile.spaceNotAccept(inputValue));
        setNewCategoryError(ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue)));
        break;
      case "description":
        setDescription(ValidationFile.spaceNotAccept(inputValue));
        break;
      case "category_logo":
        setCategoryLogoError(ValidationFile.isEmpty(inputValue));
        break;
      default:
        return false;
    };
  }

  const handleCancle = (type) => {
    if (catid) {
      showAddCategoryRef.current.close();
      dispatch(resetGetMainSingleCategory())
      onCloseAddcategory()
    }
    else {
      showAddCategoryRef.current.close();
      dispatch(resetGetMainSingleCategory())
      setNewCategory("")
      setCategoryLogo("")
      setNewCategoryError(false)
      onCloseAddcategory()
    }

  }

  const uploadThumbnail = (data) => {
    let imgData = data.location;
    setCategoryLogo(imgData);
  }

  const removeThumbnail = () => {
    setCategoryLogo("");
  };

  const handleVissible = (e) => {
    let inputVissible = e.target.checked
    if (inputVissible) {
      setServiceVissible(true);
    }
    else {
      setServiceVissible(false);
    }

  }
  const isFormValid = () => {
    if (!ValidationFile.isEmpty(newCategory?.trim())) {
      return true;
    }
    else {
      return false;
    }
  }
  useEffect(() => {
    if (postCategorySuccess ||
      editCategorySucess) {
      showAddCategoryRef.current.close();
    }
  }, [postCategorySuccess,
    editCategorySucess])

  const addNewCategory = (e, type) => {
    e.preventDefault();
    if (catid) {
      if (isFormValid()) {
        let data = {
          institute: users.user_institute,
          main_category_name: newCategory,
          description: description,
          uploadefile: categoryLogo,
          markAsFeatured: serviceVissible,
          owner: users._id,
        }
        dispatch(editMainCategoryData(catid, businesstype, data))
        onCloseAddcategory()
      }
    } else {
      let data = {
        institute: users.user_institute,
        main_category_name: newCategory,
        description: description,
        uploadefile: categoryLogo,
        markAsFeatured: serviceVissible,
        owner: users._id,
        business: users.user_institute
      }
      if (ValidationFile.isNotEmpty(newCategory)) {
        setNewCategoryError(false)
        dispatch(postMainCategoryDetail(businesstype, data))
        setNewCategory("")
        setCategoryLogo("")
        onCloseAddcategory()
      }
      else {
        setNewCategoryError(true);
        setCategoryLogoError(true)
      }

    }
  }
  return (
    <Modals ref={showAddCategoryRef} Position="center" slide="center" ClosePopUp={() => handleCancle()} ModalsSize="sm">
      <ModalHeader title={catid ? "Edit category" : " Add a category"} className="bgPopup" />
      <ModalBody>
        <form className="Addcategory-wrap" onSubmit={(e) => addNewCategory(e)} >
          <div className="formFieldwrap">
            <FormInput
              placeholder="Write Category Name"
              value={newCategory}
              name="mainCategory"
              onChange={(e) => handleCategoryInput(e)}
            />
            <FormError
              show={newCategoryError && newCategory === ""}
              error="Main Category is required"
            ></FormError>
          </div>
          <div className="formFieldwrap">
            <FormTextArea
              placeholder="Write Category Description"
              name="description"
              className="area-input"
              value={description}
              onChange={(e) => handleCategoryInput(e)}
            />
            <FormError
              error="Category Description is required"
            ></FormError>
          </div>
          {/* {catid ? (
            <div className="image-container mb-20">
              <div className="profile">
                <img src="https://cdn.pixabay.com/photo/2015/07/20/13/01/man-852770_960_720.jpg" alt="" className="img-fluid" />
              </div>
            </div>
          )

          } */}
          {/* <div className="image-container mb-20">
            <div className="profile">
              <img src="https://cdn.pixabay.com/photo/2015/07/20/13/01/man-852770_960_720.jpg" alt="" className="img-fluid" />
            </div>
          </div> */}
          <div className="mb-20">
            {categoryLogo ? (
              <>
                <p className="text-2xs w-300 mb-10">Image Preview</p>
                <div className="image-container mb-20">
                  <div className="profile">
                    <img src={categoryLogo} alt="" className="img-fluid" />
                  </div>
                </div>
              </>
            ) : (
              <div className="file-input-wrapper">
                <Cropper
                  minWidth={300}
                  ref={ref}
                  maxWidth={600}
                  defaultRatio={5 / 3}
                  onUploaded={uploadThumbnail}
                  BtnName="Upload Image"
                  IconClassName="i-md icon-upload "
                  BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                />
                <div className="inline between-xs mt-5 mb-5">
                  <p className="text-2xs w-400">.jpg, .png formats accepted only</p>
                </div>
              </div>
            )
            }

            {
              categoryLogo ? (
                <>
                  {categoryLogo && <>
                    <button
                      type="button"
                      className="button btn-xs btn-o-gray"
                      onClick={removeThumbnail}
                    > Remove
                    </button>
                    <br />
                  </>
                  }
                </>
              ) : ""
            }
          </div>
          <div className="footpopup-wrap">
            <div>
              <div className="markfeature">
                <label className="small">
                  <input
                    type="checkbox"
                    checked={serviceVissible}
                    onClick={(e) => handleVissible(e)}
                  />
                  Mark as featured
                </label>
              </div>
              <p className="text-3xs w-300">If marked as featured then the profile wil be
                shown on the homepage.</p>
            </div>
            <div className="button_group">
              <button className="button btn-o-primary btn-xs" type='button' onClick={(e) => handleCancle(e)} >{catid ? "Cancel" : "Cancel"}</button>
              <button className="button button-primary btn-xs" type='submit'>
                {editCategoryLoading || postCategoryLoading ? "Saving" : "Save"}</button>
            </div>
          </div>
        </form>
      </ModalBody>
    </Modals>
  )
}

export default AddCategoryPopup