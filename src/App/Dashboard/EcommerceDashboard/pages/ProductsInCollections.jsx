import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FormInput from '../../../../Common/Form/FormInput';
import './createCollection.scss';
import './productsInCollections.scss';
import ProductImage from '../assets/images/Collections_default.jpg'
import AppLink from '../../../../Common/AppLink';
import { editCollection, getCollectionDetail } from '../../../../store/actions/ecommerce/action/collection';
import CreateCollectionPopUp from '../Component/CreateCollectionPopUp';
import { getProductList } from '../../../../store/actions/ecommerce/action/product';
import Cropper from '../../../../Common/Cropper';
import CheckboxInput from '../../../../Common/Form/CheckboxInput';
import BreadcrumbItem from '../../../../Common/Breadcrumb/BreadcrumbItem';
import Breadcrumb from '../../../../Common/Breadcrumb';

const ProductsInCollections = () => {
  const [openCollection, setOpenCollection] = useState(false);
  // const [productList, setProductList] = useState([]);
  const [selectedProductList, setSelectedProductList] = useState([]);
  const [collectionData, setCollectionData] = useState({});
  const [listofProduct, setListofProduct] = useState([]);
  const ref = useRef();
  const editImageRef = useRef();
  const { collectionDetail } = useSelector((state) => state.collectionList);
  const { adminProductList } = useSelector((state) => state.productList);
  const user = useSelector((state) => state.user);
  const [idsOfproduct, setIdsOfproduct] = useState([])
  const { collId } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  // const createCollectionRef = useRef(null);

  useEffect(() => {
    dispatch(getCollectionDetail(collId, user.user_business));
    dispatch(getProductList(user.user_business));
  }, []);

  useEffect(() => {
    if (collectionDetail.success === true && collectionDetail.data && collectionDetail.data.collectionInfo) {
      setSelectedProductList(collectionDetail.data.products);
      setCollectionData(collectionDetail.data.collectionInfo);
      // collectionDetail.data.products.forEach((item) => (idsOfproduct.push(item._id)))
      const coll = collectionDetail.data.products.map(v => (v._id));
      setIdsOfproduct([...coll]);
    }
  }, [collectionDetail]);

  useEffect(() => {
    if (adminProductList.success === true && adminProductList.data && adminProductList.data.productlist && adminProductList.data.productlist.length) {
      setListofProduct(adminProductList.data.productlist);
    }
  }, [adminProductList]);
  // useEffect(() => {
  //   if (selectedProductList && selectedProductList.length) {
  //     selectedProductList.forEach((item) =>
  //       idsOfproduct.push(item._id))
  //   }
  // }, [selectedProductList]);

  const collectionModalClose = () => {
    setOpenCollection(false);
    createCollectionRef.current.close();
  }

  // let idsOfproduct = []
  // console.log(idsOfproduct, "idsOfproduct 6333333333")
  const collectionProductsHandler = (data, type) => {
    let coll = { ...collectionData };
    let templist = [...selectedProductList];
    // const templist = [...data];
    if (type === 'prod') {
      templist = [...data]
      // let ProductIDs = idsOfproduct
      // console.log(ProductIDs, "ProductIDs ")
      // let idArr = templist.length ? templist.map(v => v._id) : [];
      if (data && (data.length || [])) {
        const ids = data.map(v => v._id);
        setIdsOfproduct([...ids]);
        // data.forEach((vl, i) => {
        // if (!idArr.includes(vl._id)) {
        //   idArr.push(vl._id);
        //   ProductIDs.push(vl._id);
        //   templist.push(vl);
        //   console.log("if idArr idsOfproduct ", idArr, idsOfproduct)
        // }
        // });
      }
      // coll.productId = [...idArr];
      // data.forEach((item, i) => {
      //   if (!idsOfproduct.includes(item._id)) {
      //     idsOfproduct.push(item._id)
      //     templist.push(item)
      //   }
      // })
      // if (data && data.length) idsOfproduct = data.map(v => v._id);
    }
    if (type === 'featured') {
      coll.featured = data;
    }
    if (type === 'name') {
      coll.collectionName = data;
    }
    if (type === 'delete') {
      coll.picture = data;
    }
    setCollectionData({ ...coll, domain: user.user_business_business_subdomain });
    setSelectedProductList([...templist]);
  };

  const uploadThumbnail = (data) => {
    let coll = { ...collectionData };
    coll.picture = [data.location];
    setCollectionData({ ...coll, domain: user.user_business_business_subdomain });
  };

  const removeFromListHandler = (ind, id) => {
    let arr = selectedProductList;
    let coll = { ...collectionData };
    let index = idsOfproduct.indexOf(id);
    idsOfproduct.splice(index, 1);
    arr.splice(ind, 1);
    setSelectedProductList([...arr]);
    setCollectionData({ ...coll });
  };
  const collSubmitHandler = () => {
    dispatch(editCollection(user.user_business, collId, { collection: collectionData, products: idsOfproduct },));
    history('/ecommerce/allCollection')
  };
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const createCollectionRef = useRef(null)

  const handleCreateCollection = () => {
    createCollectionRef.current.open()
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


  return (
    <React.Fragment>
      <div className="dashBoard-home-container">
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/ecommerce/allCollection" title="Collections" />
          <BreadcrumbItem to={`/ecommerce/productsInCollection/${collId}`} title="Edit collection" />
        </Breadcrumb>
        <div className="createCollection-wrapper ">
          <div className="createCollection-top-wrapper  inline between-lg between-xs align-center">
            <p className="text-s w-500">{collectionData?.collectionName}</p>
            <div className="createCollection-rightsidebar-lower-saveBtn">
              <button className='button button-o-primary primary btn-oval btn-xs btn-primary-border '
                onClick={handleCancel}
              >Cancel</button>
              <button
                className="button button-primary btn-oval btn-sm"
                onClick={() => {
                  collSubmitHandler();
                }}
              >
                Save
              </button>

            </div>
          </div>
          <div className="CreateCollection-productAdd-container">
            <div className="createCollection-leftsidebar">
              <div className="productInCollection-top-section">
                <p className="text-s w-500 ">
                  Products in collection {selectedProductList?.length}
                </p>
                <button
                  onClick={() => {
                    handleCreateCollection()
                  }}
                  // setOpenCollection(true);
                  // to="/ecommerce-createCollection"
                  className="add-product-button"
                >
                  <span className="mt-5">
                    <i className="ed-icon icon-plus-add primary  i-xxxs"></i>
                  </span>{" "}
                  Add Products{" "}
                </button>

                <CreateCollectionPopUp list={listofProduct} createCollectionRef={createCollectionRef} closeModalState={() => handleCreateCollection()} onClose={() => handleCreateCollectionClose()} submit={(arr) => { collectionProductsHandler([...arr], "prod") }} addedProduct={selectedProductList}
                />
              </div>
              <hr className="horizontal-line " />
              <div className="createInCollection-leftsidebar-lower mt-25">
                {selectedProductList &&
                  selectedProductList.length > 0 ?
                  selectedProductList.map((item, index) => {
                    return (
                      <div
                        className="createInCollection-products-container"
                        key={index}
                      >
                        <div className="createInCollection-image-div">
                          <img
                            src={
                              item.productPicture &&
                                item.productPicture.length > 0
                                ? item.productPicture[0]
                                : ProductImage
                            }
                            alt="prodctImage"
                          />
                        </div>
                        <div className="createCollection-textContainer">
                          <p className="text-xxs w-500 text-center">
                            {item.productName}
                          </p>
                        </div>
                        <div className="createInCollection-productcount-div">
                          <div className="createInCollection-round">
                            <p className="text-xxs">{item?.variationCount}</p>
                          </div>
                        </div>
                        <div
                          className="cross-div"
                          onClick={() => {
                            removeFromListHandler(index, item._id);
                          }}
                        >
                          <i className='ed-icon i-xs white icon-cross'></i>
                        </div>
                      </div>
                    );
                  }) : (<div className='no-collection-grid mt-25'>
                    <p className='text-xs  w-400'>Start adding products to your collection</p>
                    <p className='text-2xs w-400 gray mt-5'>Create a new collection to display on your site.</p>
                    <div>
                      <button className='button button-primary btn-oval btn-sm mt-30'
                        onClick={() => {
                          handleCreateCollection()
                        }}>Add Products</button>
                    </div>

                  </div>)}
              </div>
            </div>
            <div className="createCollection-rightsidebar">
              <p className="text-s w-00 mt-20 e-commerce-card-para">
                Products in collection{" "}
              </p>
              <hr className="horizontal-line" />
              <div className="createCollection-rightsidebar-lower ">
                <div className="formFieldwrap ">
                  <p className="label-heading text-s w-500 mb-8">Collection name</p>
                  <FormInput
                    type="text"
                    // label="Ribbon"
                    id="collectionName"
                    name="collectionName"
                    value={collectionData.collectionName}
                    placeholder="e.g. Bags, Summer"
                    maxLength="80"
                    onChange={(e) => {
                      collectionProductsHandler(e.target.value, "name");
                    }}
                  />
                </div>
                <div className="ffeatured-wrap ">
                  {/* <p className='label-heading mb-8'>
                Featured
              </p> */}
                  <CheckboxInput
                    label={"Featured"}
                    LabelClass={"label-heading eComm-checkbox-center"}
                    className={"eComm-checkbox"}
                    checked={collectionData.featured}
                    onClick={() => {
                      collectionData.featured
                        ? collectionProductsHandler(false, "featured")
                        : collectionProductsHandler(true, "featured");
                    }}
                  />
                </div>
                <div className="createCollection-rightsidebar-lower-imageUpload mt-30">
                  <p className="label-heading text-s w-500 mb-8">Collection Image</p>
                  {collectionData &&
                    collectionData.picture &&
                    collectionData.picture.length > 0 ? (
                    collectionData.picture[0] ? <>
                      <div className="createInCollection-rightImage-div">
                        <>
                          <img
                            src={collectionData.picture[0]} alt=""
                          />
                          <>
                            <div className="productsInCollection-buttons-wrap">
                            </div>
                          </>
                        </>
                        <div>
                        </div>
                        <div className='productOverlay'>
                          <div className='productIcon-wrap'>
                            <div className='product-circle'>
                              <span>
                                <i className='ed-icon i-xxs white icon-pencial'
                                  onClick={handleEditCollectionImage}
                                ></i>
                              </span>
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
                              <i className='ed-icon i-xs white icon-cross' onClick={() => {
                                collectionProductsHandler([], "delete");
                              }}></i>
                            </div>

                          </div>
                        </div>
                      </div> </>

                      :
                      <div className="image-drag">
                        <div className="dragbutton">
                          <span className="set__icon">
                            <i className="icon-plus">&#43;</i>
                          </span>
                          <Cropper
                            minWidth={100}
                            maxWidth={1000}
                            ref={ref}
                            // defaultRatio={5 / 3}
                            onUploaded={uploadThumbnail}
                            BtnName=""
                            IconClassName=""
                            BtnPropClass=""
                          />
                        </div>
                      </div>
                  ) : (
                    <div className="image-drag">
                      <div className="dragbutton">
                        <span className="set__icon">
                          <i className="icon-plus">&#43;</i>
                        </span>
                        <Cropper
                          minWidth={100}
                          maxWidth={1000}
                          ref={ref}
                          // defaultRatio={5 / 3}
                          onUploaded={uploadThumbnail}
                          BtnName=""
                          IconClassName=""
                          BtnPropClass=""
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
      {openCollection && listofProduct.length && (
        // <CreateCollectionPopUp
        //   list={listofProduct}
        //   show={openCollection}
        //   onClose={collectionModalClose}
        //   submit={(arr) => {
        //     collectionProductsHandler([...arr], "prod");
        //   }}
        //   addedProduct={productList}
        // />
        <CreateCollectionPopUp list={listofProduct} createCollectionRef={createCollectionRef} closeModalState={() => handleCreateCollection()} onClose={() => handleCreateCollection()} submit={(arr) => { collectionProductsHandler([...arr], "prod") }} addedProduct={selectedProductList} />
      )}
    </React.Fragment >
  );
}

export default ProductsInCollections