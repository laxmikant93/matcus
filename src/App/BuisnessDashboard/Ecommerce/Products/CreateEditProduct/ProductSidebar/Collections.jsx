import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ValidationFile from "../../../../../../Classes/ValidationFile";
import CheckboxInput from "../../../../../../Common/Form/CheckboxInput";
import FormError from "../../../../../../Common/Form/FormError";
import FormInput from "../../../../../../Common/Form/FormInput";
import { createAddProductCollection, resetCreateAddProductCollection } from "../../../../../../store/actions/ecommerce/action/collection";
import CrossIcon from '../../../../../Dashboard/EcommerceDashboard/assets/icons/cross.svg'
const Collections = ({ onLoadCollections }) => {
  const dispatch = useDispatch()
  const { users, collectionList, collectionListSuccess, postCollectionData, postCollectionSuccess, productDetails } = useSelector((state) => {
    return {
      users: state.user,
      collectionList: state.collectionList.addProductCollectionList.data,
      collectionListSuccess: state.collectionList.addProductCollectionList.success,
      postCollectionData: state.collectionList.createAddProductCollection.data,
      postCollectionSuccess: state.collectionList.createAddProductCollection.success,
      productDetails: state.productList.getSingleProduct.data,
    }
  })
  const [showForm, setShowForm] = useState(false)
  const [collectionIds, setCollectionIds] = useState([])
  const [collectionName, setCollectionName] = useState("")
  const [collectionError, setCollectionError] = useState("")
  // const [collActive, setCollActive] = useState(false)
  const { _id } = useParams()

  useEffect(() => {
    if (productDetails && _id) {
      setCollectionIds(productDetails.product.collectionId);
    }
  }, [productDetails])

  const handleSelect = (e) => {
    let inputChecked = e.target.checked
    let inputValue = e.target.value
    let array = collectionIds
    if (inputChecked) {
      array.push(inputValue)
    } else {
      let index = array.indexOf(inputValue)
      array.splice(index, 1)
    }
    setCollectionIds([...array])
  }
  const handleInput = (e) => {
    setCollectionName(ValidationFile.spaceNotAccept(e.target.value))
    setCollectionError(ValidationFile.isEmpty(e.target.value))
  }
  let collection = {
    businessShopId: users.user_business,
    collectionName: collectionName
  }
  const saveCollection = () => {
    if (ValidationFile.isEmpty(collectionName)) {
      setCollectionError(true)
    }
    if (ValidationFile.isNotEmpty(collectionName)) {
      dispatch(createAddProductCollection(users.user_business, { collection: collection }, true))

    }
  }
  const handleCancel = () => {
    setShowForm(false)
    setCollectionError(false)
    setCollectionName("")
  }
  useEffect(() => {
    onLoadCollections({
      collectionIds: collectionIds
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionIds])
  useEffect(() => {
    if (postCollectionSuccess) {
      setShowForm(false)
      let array = collectionIds
      if (postCollectionData.collActive === true) {
        array.push(postCollectionData?._id)
        setCollectionIds([...array])
      }
      setCollectionName("")
      dispatch(resetCreateAddProductCollection())
    }
  }, [collectionIds, dispatch, postCollectionData._id, postCollectionData.collActive, postCollectionSuccess])
  return (
    <React.Fragment>
      <div className='addProduct-container  sectionGap'>
        <div className='e-commerce-wrap'>
          <p className='sidebar-heading '>Collections</p>
          <hr className='horizontal-line' />
          <div className='sidebar-collection-wrap side-padding'>
            <div className='sidebar-collection-checkbox-wrap'>
              {collectionListSuccess ?
                collectionList && collectionList.length > 0 && collectionList.map((cl, i) => {
                  return (
                    <>
                      <CheckboxInput
                        label={cl.collectionName}
                        LabelClass={"label-heading eComm-checkbox-center"}
                        className={"eComm-checkbox"}
                        value={cl._id}
                        key={i}
                        checked={collectionIds.includes(cl._id)}
                        onChange={handleSelect}
                      />
                    </>
                  );
                }) : "Loading..."
              }

              {/* when click on create collection this screen will be shown */}
              {showForm && <div className='add-collection-screen-wrap'>
                {/* <CheckboxInput
                  label={""}
                  LabelClass={"label-heading eComm-checkbox-center"}
                  className={"eComm-checkbox"}
                  onChange={(e) => setCollActive(e.target.checked)}
                  checked={collActive}
                /> */}
                <div className="formFieldwrap sidebar-formgroup width-65">
                  <FormInput
                    type="text"
                    // label="name"
                    id="name"
                    name="add-collection"
                    value={collectionName}
                    placeholder=""
                    maxLength="80"
                    onChange={handleInput}
                  />
                  <FormError show={collectionError} error="Collection name required." />
                </div>
                <div className='collection-btn-wrap'>
                  <button className='btn-square btn-cross' onClick={handleCancel}>
                    <img src={CrossIcon} alt="cross icon" />
                  </button>
                  <button className='btn-square' onClick={saveCollection}>
                    <i className='ed-check'></i>
                  </button>
                </div>
              </div>}
              <div className='add-more-btn-wrap add-more-btn-pt-0' onClick={() => setShowForm(true)}>
                <button className='add-another-option-btn'>
                  <span><i className='ed-icon icon-plus-add primary i-xs'></i></span>
                  <span className='w-400'>Create Collection</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Collections