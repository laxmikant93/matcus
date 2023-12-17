import React, { useState } from 'react'
import FormError from '../../../../Common/Form/FormError'
import FormInput from '../../../../Common/Form/FormInput'
import ImageCropper from '../../../../Common/Cropper'
import './categoryFillDetsils.scss';
// import Image1 from '../../../Dashboard/EcommerceDashboard/assets/images/image1.png';
import CategoryDropDown from '../CategoryDropDown/CategoryDropDown';
import SwitchButtonEcom from '../../../Dashboard/EcommerceDashboard/Component/SwitchButtonEcom/SwitchButtonEcom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createCategory, EditSelectionReset, EditCategory } from '../../../../store/actions/ecomAdmin';
import { useEffect } from 'react';
import { useRef } from 'react';
import { patchInstituteInfo } from '../../../../store/actions/businessInfo';
// import { useEffect } from 'react';

const CategoryFillDetails = () => {

  const ref = useRef();
  const dispatch = useDispatch();
  const { users, EditSelectionSuccess,
    EditSelectionData, getCategorylistSuccess, createCategorySucces,
    createCategoryData,
    createCategoryLoading,
    getCategorylistData, createCategoryError, updateCategoryError,
    updateCategoryLoading,
    updateCategoryData, updateCategorySuccess, createCategorySuccess } = useSelector((state) => {
      return {
        users: state.user,
        EditSelectionSuccess: state.ecomAdmin.editSelection.success,
        EditSelectionData: state.ecomAdmin.editSelection.data,
        getCategorylistSuccess: state.ecomAdmin.list.success,
        getCategorylistData: state.ecomAdmin.list.data,
        createCategoryError: state.ecomAdmin.create.error,
        createCategoryLoading: state.ecomAdmin.create.loading,
        createCategorySuccess: state.ecomAdmin.create.success,
        createCategoryData: state.ecomAdmin.create.data,
        updateCategoryError: state.ecomAdmin.edit.error,
        updateCategoryLoading: state.ecomAdmin.edit.loading,
        updateCategorySuccess: state.ecomAdmin.edit.success,
        updateCategoryData: state.ecomAdmin.edit.data,
      }
    })

  useEffect(() => {
    if (createCategoryError || updateCategoryError) {
      if (createCategoryData === "Category with Same Name exist Please Choose another name") {
        setErrorCreate(true)
      }
    }
  }, [createCategoryError, updateCategoryError])

  useEffect(() => {
    if (updateCategorySuccess || createCategorySuccess) {
      setCategoryName("")
      setUploadedImage("")
      setSlugName("")
      setIsFeatured(false)
      setIsSubmit(false)
      setErrorCreate(false)
    }

  }, [updateCategorySuccess, createCategorySuccess])

  const [categoryName, setCategoryName] = useState("");
  const [slugName, setSlugName] = useState("");
  const [uploadOnButton, setuploadOnButton] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const [selectedCategroy, setSelectedCategroy] = useState({});
  const [isFeatured, setIsFeatured] = useState(false);
  const [heirarchyname, setHeirarchyname] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isErrorCreate, setErrorCreate] = useState(false);
  const [cancel, setCancel] = useState(false);
  const dataPrep = (value) => {

    switch (value.category_level) {
      case 0:
        return {
          owner: users._id,
          business: users.user_business,
          category_level: 1,
          subCategoryName: categoryName,
          picture: uploadedImage,
          categoryId: value._id,
          position: EditSelectionSuccess ? value.position : getCategorylistData.data.find((item) => item._id === value._id)?.subcategories?.length,
          slug: slugName === "" ? categoryName : slugName,
          featured: isFeatured,
          sub_category_hierarchyname: heirarchyname
        }

      case 1:

        let mainDataId = ""
        for (let i = 0; getCategorylistData.data.length > 0; i++) {
          if (getCategorylistData.data[i].subcategories.find((item) => item._id === value._id)) {
            mainDataId = getCategorylistData.data[i]
            break
          }
        }

        return {
          owner: users._id,
          business: users.user_business,
          category_level: 2,
          subSubCategoryName: categoryName,
          picture: uploadedImage,
          subCategoryId: value._id,
          categoryId: value.categoryId,
          position: EditSelectionSuccess ? value.position : mainDataId.subcategories.find((item) => item._id === value._id).subsubcategories.length,
          slug: slugName === "" ? categoryName : slugName,
          featured: isFeatured,
          sub_sub_category_hierarchyname: heirarchyname
        }

      default:
        return {
          owner: users._id,
          business: users.user_business,
          category_level: 0,
          categoryName: categoryName,
          picture: uploadedImage,
          position: EditSelectionSuccess ? value.position : getCategorylistData.data.length,
          slug: slugName === "" ? categoryName : slugName,
          featured: isFeatured,
          heirarchyname: categoryName
        }
    }
  }
  const dataPrepUpdate = (value) => {

    switch (value.category_level) {
      case 1:
        return {
          owner: users._id,
          business: users.user_business,
          category_level: 1,
          subCategoryName: categoryName,
          picture: uploadedImage,
          _id: value._id,
          featured: isFeatured,
          position: getCategorylistData.data.find((item) => item._id === value._id)?.subcategories?.length,
          slug: slugName === "" ? categoryName.split(" ").join("") : slugName
        }

      case 2:
        return {
          owner: users._id,
          business: users.user_business,
          category_level: 2,
          subSubCategoryName: categoryName,
          picture: uploadedImage,
          _id: value._id,
          featured: isFeatured,
          position: getCategorylistData.data.filter((item) => item._id === value._id)?.subcategories?.length?.find((item) => item._id === value._id)?.subsubcategories?.length,
          slug: slugName === "" ? categoryName.split(" ").join("") : slugName
        }

      default:
        return {
          owner: users._id,
          business: users.user_business,
          category_level: 0,
          categoryName: categoryName,
          picture: uploadedImage,
          _id: value._id,
          position: getCategorylistData.data.length,
          featured: isFeatured,
          slug: slugName === "" ? categoryName.split(" ").join("") : slugName
        }
    }
  }

  const uploadCropper = () => {
    ref.current.open()
  }
  const RemoveImgHandle = () => {
    setUploadedImage('')
  }

  const handelChange = (e, type) => {
    let value = e.target.value
    if (type === "slug") {
      setSlugName(value.split(" ").join(""))
    } else {
      setIsSubmit(false)
      if (value.split("").length > 25) {

      } else {
        setCategoryName(value)

      }
    }
  }

  const uploadImage = (data) => {
    let imgData = data.location;
    setUploadedImage(imgData)
  }

  const Submit = () => {
    setIsSubmit(true)
    if (categoryName) {
      setErrorCreate(false)
      dispatch(createCategory(dataPrep(selectedCategroy)))
    }
  }

  useEffect(() => {

    if (EditSelectionSuccess && EditSelectionData) {
      switch (EditSelectionData.category_level) {
        case 1:
          setCategoryName(EditSelectionData.subCategoryName)
          setUploadedImage(EditSelectionData.picture)
          setSlugName(EditSelectionData.slug)
          setIsFeatured(EditSelectionData.featured)
          break
        case 2:
          setCategoryName(EditSelectionData.subSubCategoryName)
          setUploadedImage(EditSelectionData.picture)
          setSlugName(EditSelectionData.slug)
          setIsFeatured(EditSelectionData.featured)
          break
        default:
          setCategoryName(EditSelectionData.categoryName)
          setUploadedImage(EditSelectionData.picture)
          setSlugName(EditSelectionData.slug)
          setIsFeatured(EditSelectionData.featured)
      }
    }

  }, [EditSelectionData, EditSelectionSuccess])

  const Cancel = () => {
    setCancel(true);
    setCategoryName("");
    setUploadedImage("");
    setSlugName("");
    setSelectedCategroy({});
    setIsFeatured(false);
    setIsSubmit(false);
    setErrorCreate(false);
    setIsSubmit(false)
    dispatch(EditSelectionReset())
  }

  const Update = () => {
    setIsSubmit(true)
    if (EditSelectionData.shop) {
      let data = {
        shop_name: categoryName
      }
      dispatch(patchInstituteInfo(users.user_business, data, users.user_business_type, "", "", true));
      dispatch(EditSelectionReset())
      setCategoryName("")
      setUploadedImage("")
      setSlugName("")
      setIsFeatured(false)
      setIsSubmit(false)
      setErrorCreate(false)
    } else {
      if (categoryName) {
        setErrorCreate(false)
        dispatch(EditCategory(dataPrepUpdate(EditSelectionData)))
      }
    }

  }

  const changeCategroy = (value, item) => {
    setSelectedCategroy(value)
    setHeirarchyname(item)
  }

  return (
    <React.Fragment>
      <div className='categoryFillDetails-container'>
        <div className='categoryFillDetails-wrapper'>
          <div className="formFieldwrap width-65">
            <div className='categoryFillDetails-label-wrapper'>
              <p className='label-heading'>
                Name
              </p>
              {/* <div className='switchBtn-div'>
                <p className='text-3xs w-300 base'>
                  Mark as featured
                </p>
                <SwitchButtonEcom id={'featured'} InputChange={(e) => InputChange(e)} isFeatured={isFeatured} />
              </div> */}
            </div>
            <FormInput
              type="text"
              id="name"
              value={categoryName}
              onChange={(e) => handelChange(e)}
              name="product_Name"
              placeholder="Add a category name"
              maxLength="80"
            />
            <p className='text-3xs w-300 gray pb-5'>Name is how it will appear in your site</p>
            <FormError
              show={categoryName === "" && isSubmit}
              error="Category Name is required."
            />
            <FormError
              show={categoryName && isSubmit && isErrorCreate}
              error="Category with Same Name exist Please Choose another name."
            />
          </div>
          {/* dropdown  start here */}
          {
            !EditSelectionData.shop && <div className="formFieldwrap sidebar-formgroup ">
              {/* <div className="addProduct-align-div ">
              <select
                id="list"
                // name="blood_group"
                defaultValue={false}
              >
                <option value={false}> dsdsd</option>
                <option value={true}>Men</option>
             
              </select>

            </div> */}
              <CategoryDropDown setSelectedCategroy={(value, item) => changeCategroy(value, item)} cancel={cancel} />
              <p className='text-3xs w-300 gray mt-5 '>Categories unlike tags, can have a hierarchy. You might have a Men
                category, and under that have children categories. Upto 3 level of
                category are supported.</p>
            </div>
          }

          {/* upload image section */}

          {
            !EditSelectionData.shop && <div className='categoryFillDetails-uploadImage'>
              <ImageCropper ref={ref} customCropper={true} onUploaded={(e) => uploadImage(e)} />
              {
                uploadedImage ? (
                  <div className='img-container'>
                    <div className='img-div'>
                      <img src={uploadedImage} alt="" />
                    </div>
                    <div className="overlay">
                      <div className='image-icon-div'>
                        <button onClick={() => uploadCropper()}>
                          <i className='ed-icon i-xxxs white icon-pencial'></i>
                        </button>
                        <button onClick={() => RemoveImgHandle()}>
                          <i className='ed-icon i-xs white icon-cross'></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (<button className='button btn-sm btn-o-primary btn-upload' onClick={() => uploadCropper()}>
                  + Upload Image For Category
                </button>)
              }

            </div>
          }

          {/* slug section  */}
          {
            !EditSelectionData.shop &&
            <div className="formFieldwrap mt-20">
              <p className='label-heading'>
                Slug
              </p>
              <FormInput
                type="text"
                id="name"
                value={slugName ? slugName : categoryName}
                onChange={(e) => handelChange(e, "slug")}
                name="product_Name"
                placeholder="Add slug (optional)"
                maxLength="80"
              />
              <p className='text-3xs w-300 gray pb-5'>The ‘slug’ is the URL-friendly version of the name. It is usually all
                lowercase and contains only letters, numbers, and hyphens</p>
              {/* <FormError
              show={slugName === ""}
              error="Category Name is required."
            /> */}
            </div>}

          {/* button section start here */}
          <div className='categoryFillDetails-btnSection'>
            {/* btn disable state */}
            {/* <button className='button add-categoryBtn btn-sm button-gray' disabled={true}>Add new category</button> */}
            {/* btn active state */}
            {EditSelectionSuccess ? (
              <React.Fragment>
                <button className='button btn-sm button-primary' onClick={() => Cancel()}>Cancel</button>
                {updateCategoryLoading ? (

                  <button className='button btn-sm button-primary'>Updating...</button>
                ) : (
                  <>
                    {
                      !EditSelectionData.shop ? (
                        <button className='button btn-sm button-primary' onClick={() => Update()}>Update Category</button>

                      ) : (
                        <button className='button btn-sm button-primary' onClick={() => Update()}>Done</button>
                      )
                    }
                  </>

                )
                }

              </React.Fragment>

            ) : (
              <React.Fragment>
                {createCategoryLoading ? (
                  <button className='button btn-sm button-primary' >Adding...</button>

                ) : (
                  <button className='button btn-sm button-primary' onClick={() => Submit()}>Add new category</button>

                )
                }
              </React.Fragment>
            )
            }

          </div>

        </div>
      </div>
    </React.Fragment >
  )
}

export default CategoryFillDetails