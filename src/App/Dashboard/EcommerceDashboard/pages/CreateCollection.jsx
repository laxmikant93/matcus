import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../../../Common/Form/FormInput';
import './createCollection.scss';
import './productsInCollections.scss'
import CreateCollectionPopUp from '../Component/CreateCollectionPopUp'
import Cropper from '../../../../Common/Cropper';
import { getProductList } from '../../../../store/actions/ecommerce/action/product';
import ProductImage from '../assets/icons/productImage.png';
import { createCollection } from '../../../../store/actions/ecommerce/action/collection';
import CheckboxInput from '../../../../Common/Form/CheckboxInput';
import ValidationFile from '../../../../Classes/ValidationFile';
import FormError from '../../../../Common/Form/FormError';
import Breadcrumb from '../../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../../Common/Breadcrumb/BreadcrumbItem';

const CreateCollection = () => {
  const [openCollection, setOpenCollection] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [collectionImage, setCollectionImage] = useState('');
  const [collectionProductList, setCollectionProductList] = useState([]);
  const [featured, setFeatured] = useState(false);
  const ref = useRef();
  const editImageRef = useRef();
  const [listofProduct, setListofProduct] = useState([]);

  const { adminProductList } = useSelector((state) => state.productList);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    dispatch(getProductList(user.user_business));
  }, []);

  // useEffect(() => {
  //   if (user && user.user_business_business_shop_category.length === 0) {
  //     history('/ecommerce/businessInfo');
  //   }
  // }, [user]);

  useEffect(() => {
    if (adminProductList.success === true) {
      setListofProduct(adminProductList.data.productlist);
    }
  }, [adminProductList]);

  const uploadThumbnail = (data) => {
    let imgData = data.location;
    setCollectionImage(imgData);
  };
  const [collectionNameError, setCollectionNameError] = useState(false)
  const saveCollectionHandler = () => {

    const list = collectionProductList.map((vl) => {
      return (vl._id);
    });
    const collection = {
      collectionName: collectionName,
      picture: collectionImage ? collectionImage : [],
      featured: featured,
      // domain: user.user_business_business_subdomain,
      businessShopId: user.user_business,
    };

    if (ValidationFile.isEmpty(collectionName)) {
      setCollectionNameError(true)
    }
    if (ValidationFile.isNotEmpty(collectionName)) {
      dispatch(createCollection(user.user_business, { collection: collection, products: [...list] }, "id"));
      history('/ecommerce/allCollection');
    }
  };

  const collectionModal = () => {
    setOpenCollection(!openCollection);
  }
  const collectionModalClose = () => {
    setOpenCollection(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const createCollectionRef = useRef(null)
  const handleCreateCollection = () => {
    createCollectionRef.current.open()
  }
  const removeFromListHandler = (id) => {
    // let filterarr = collectionProductList;
    // filterarr = collectionProductList.filter((item) => item._id !== id)
    let filterarr = collectionProductList.filter((item, i) => i !== id)
    setCollectionProductList(filterarr)
    // setCollectionProductList([...filterarr])
  }
  const handleCreateCollectionClose = () => {
    createCollectionRef.current.close()
  }

  const handleCancel = () => {
    history("/ecommerce/allCollection");
  }

  const handleEditCollectionImage = () => {
    editImageRef.current.open();
  }

  const handleDeleteCollectionImage = () => {
    setCollectionImage("");
  }

  return (
    <React.Fragment>
      <div className='dashBoard-home-container'>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/ecommerce/allCollection" title="Collections" />
          <BreadcrumbItem to="/ecommerce/createCollection" title="Add new collection" />
        </Breadcrumb>
        <div className='createCollection-wrapper'>
          <div className='createCollection-top-wrapper inline between-xs between-lg'>
            <p className='text-s w-500'>Collection </p>
            <div className='createCollection-rightsidebar-lower-saveBtn'>
              <button className='button button-o-primary primary btn-oval btn-xs btn-primary-border'
                onClick={handleCancel}
              > Cancel </button>
              <button className='button button-primary btn-oval btn-xs' onClick={() => { saveCollectionHandler() }}>Save </button>

            </div>
          </div>
          <div className='CreateCollection-productAdd-container'>
            <div className='createCollection-leftsidebar'>
              <div className='productInCollection-top-section'>
                <p className='text-s w-500 '>{`Products in collection (${collectionProductList?.length})`}</p>
                {collectionProductList && collectionProductList.length > 0 && <button className='button button-primary  btn-sm ' onClick={handleCreateCollection}>Add More Products</button>}
              </div>
              {<CreateCollectionPopUp createCollectionRef={createCollectionRef} closeModalState={() => handleCreateCollection()} onClose={() => handleCreateCollectionClose()} />}
              <hr className='horizontal-line ' />
              {collectionProductList && collectionProductList.length > 0 ?
                <div className='createInCollection-leftsidebar-lower mt-50'>
                  {
                    collectionProductList && collectionProductList.length > 0 && collectionProductList.map((pr, i) => {
                      return (
                        <div className='createInCollection-products-container' key={i}>
                          <div className='createInCollection-image-div'>
                            <img src={pr && pr.productPicture && pr.productPicture.length > 0 ? pr.productPicture[0] : ProductImage} alt="prodctImage" />
                          </div>
                          <div className='createCollection-textContainer'>
                            <p className='text-xxs w-500 text-center'>{pr.productName}</p>
                          </div>
                          <div className='createInCollection-productcount-div'>
                            <div className='createInCollection-round'><p className='text-xxs'>{pr?.variationCount}</p></div>
                          </div>
                          <div
                            className="cross-div"
                            onClick={() => {
                              removeFromListHandler(i);
                            }} s
                          >
                            <i className='ed-icon i-xs white icon-cross'></i>
                          </div>
                        </div>
                      )
                    })
                  }
                </div> :
                <div className='createCollection-leftsidebar-lower mt-50'>
                  <p className='text-xs  w-400'>Start adding products to your collection</p>
                  <p className='text-2xs w-400 gray mt-5'>Create a new collection to display on your site.</p>
                  <button className='button button-primary btn-oval btn-sm mt-30' onClick={handleCreateCollection}>Add Products</button>
                </div>}
            </div>
            <div className='createCollection-rightsidebar'>
              <p className='text-s w-500 mt-20 e-commerce-card-para'>Collection info. </p>
              <hr className='horizontal-line' />
              <div className='createCollection-rightsidebar-lower '>
                <div className="formFieldwrap ">
                  <p className='label-heading mb-8 w-500 text-s'>
                    Collection name
                  </p>
                  <FormInput
                    type="text"
                    // label="Ribbon"
                    id="collectionName"
                    name="collectionName"
                    value={collectionName}
                    onChange={(e) => { setCollectionName(e.target.value) }}
                    onKeyUp={(e) => { setCollectionName(e.target.value) }}
                    placeholder="e.g. Bags, Summer"
                    maxLength="80"
                  />
                  <FormError show={collectionNameError} error="Collection Name required." />
                </div>
                <div className="ffeatured-wrap ">
                  {/* <p className='label-heading mb-8'>
                    Featured
                  </p> */}
                  <CheckboxInput
                    label={"Featured"}
                    LabelClass={"label-heading eComm-checkbox-center"}
                    className={"eComm-checkbox"}
                    checked={featured}
                    onClick={() => { setFeatured(featured ? false : true) }}
                  />
                </div>
                <div className='createCollection-rightsidebar-lower-imageUpload mt-25'>
                  <p className='label-heading text-s w-500 mb-8'>
                    Collection Image
                  </p>
                  {collectionImage ? (
                    <div className='image-wrpper'>
                      <img className="gallery_img" src={collectionImage} alt="Collection" />

                      <div className='productOverlay'>
                        <div className='productIcon-wrap'>
                          <div className='product-circle'>
                            <i className='ed-icon  white icon-pencial'
                              onClick={handleEditCollectionImage}
                            ></i>
                            <Cropper
                              // minWidth={100}
                              // maxWidth={1000}
                              ref={editImageRef}
                              // defaultRatio={5 / 3}
                              onUploaded={uploadThumbnail}
                              BtnName=""
                              IconClassName=""
                              BtnPropClass=""
                              customCropper={true}
                            />
                          </div>
                          <div className='product-circle'>
                            <i className='ed-icon i-xs white icon-cross'
                              onClick={handleDeleteCollectionImage}
                            ></i>
                          </div>

                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="image-drag">
                      <div className="dragbutton">
                        <span className="set__icon"><i className='icon-plus'>&#43;</i></span>

                        <Cropper
                          minWidth={100}
                          maxWidth={1000}
                          ref={ref}
                          // defaultRatio={5 / 3}
                          onUploaded={uploadThumbnail}
                          // BtnName="+"
                          IconClassName=""
                          BtnPropClass="button-o-silver button-block CropUploadBtn"
                        />

                      </div>
                    </div>

                  )
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateCollectionPopUp list={listofProduct} createCollectionRef={createCollectionRef} closeModalState={() => handleCreateCollection()} onClose={() => handleCreateCollectionClose()} submit={(arr) => { setCollectionProductList([...arr]) }} addedProduct={collectionProductList} />


    </React.Fragment >
  )
}

export default CreateCollection