import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AppLink from "../../../Common/AppLink";
import { getMainBusiCollectionName, getShowOnHeaderCollections } from "../../../store/actions/bookAppointment";
import { selectRouteForPreview, setParamId } from "../../../store/actions/serviceWebsiteTemplate";
const HeaderMenuList = ({ preview,showOn }) => {
  const { dynamicHeaderData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { route, previewData } = useSelector((state) => state.serviceTemplate.getTemplate)

  const [activeIndex, setActiveIndex] = useState(false);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch()
  const history = useNavigate()
  const handleOnClick = (index) => {
    setActiveIndex(index); // remove the curly braces
  };


  // const handleCollectionRoute = (id, keyindex) => {
  //   if (id) {
  //     history(`/collection/${id}`);
  //     setActiveIndex(keyindex)
  //   }
  // };
  const { pathname } = useLocation()
  const handleSelectPage = (item) => {
    dispatch(selectRouteForPreview(item, true))
  }
  const handelSelectSelection=(item,paramID)=>{
    dispatch(selectRouteForPreview(item, true))
    if(paramID){
      dispatch(setParamId(paramID))
    }
  }

  const { user, ownerID, getShowOnHeaderCollectionData, getMainBusiCollection, instituteData, getShowOnHeaderCollectionSuccess,
    getMainBusiCollectionSuccess, success } = useSelector((state) => {
      return {
        ownerID: state.user._id,
        user: state.user,
        businesstype: state.user.user_business_type,
        getDisableDataData: state.bookAppointment.getDisableData.data,
        getShowOnHeaderCollectionData: state.bookAppointment.getShowOnHeaderCollection.data,
        getShowOnHeaderCollectionSuccess: state.bookAppointment.getShowOnHeaderCollection.success,
        getMainBusiCollection: state.bookAppointment.getMainBusiCollection.data,
        getMainBusiCollectionSuccess: state.bookAppointment.getMainBusiCollection.success,
        instituteData: state.serviceTemplate.getTemplate.data.instituteData,
        success: state.serviceTemplate.getTemplate.success
      }
    })

  useEffect(() => {
    if (success) {
      dispatch(getShowOnHeaderCollections(instituteData._id, instituteData.owner, "Services"))
    }
  }, [dispatch, instituteData._id, instituteData.owner, success])

  useEffect(() => {
    if (success) {
      dispatch(getMainBusiCollectionName("Services", instituteData._id, instituteData.owner))
    }
  }, [dispatch, instituteData._id, instituteData.owner, ownerID, success, user.user_business_type]);

  const renderDataPreview = (index, headerMenuList, collectionnameShow) => {
    return (
      <li key={index} onClick={() => handleOnClick(index)} className={activeIndex === index ? "active" : ""}>
        <button onClick={() => handleSelectPage(headerMenuList.path)}>
          {collectionnameShow ? (getMainBusiCollection.data.main_business_collection_name) : ((subheadersData && subheadersData[headerMenuList.titleKey]) || headerMenuList.title)}
        </button>
      </li>
    )
  }
  const renderDataPreviewSection = (index, headerMenuList, collectionnameShow,vlaue) => {
    return (
      <li key={index} onClick={() => handleOnClick(index)} className={activeIndex === index ? "active" : ""}>
        <button onClick={() => handelSelectSelection(`${"/collection"+`/`+vlaue}`,vlaue)}>
          {collectionnameShow ? (vlaue) : ((subheadersData && subheadersData[headerMenuList.titleKey]) || headerMenuList.title)}
        </button>
      </li>
    )
  }
  const renderDataNoNPreview = (index, headerMenuList, collectionnameShow) => {
    return (
      <li key={index} onClick={() => handleOnClick(index)} className={headerMenuList.path === pathname ? "active" : ""}>
        <NavLink to={headerMenuList.path}>
          {collectionnameShow ? (getMainBusiCollection.data.main_business_collection_name) : ((subheadersData && subheadersData[headerMenuList.titleKey]) || headerMenuList.title)}
        </NavLink>
      </li>
    )
  }
  const renderDataNoNPreviewSection = (index, headerMenuList, collectionnameShow,vlaue) => {
    console.log(index,"line 82")
    return (
      <li key={index} onClick={() => handleOnClick(index)} className={`${headerMenuList.path+`/`+vlaue}` === pathname ? "active" : ""}>
        <NavLink to={`${"/collection"+`/`+vlaue}`}>
          {collectionnameShow ? (vlaue) : ((subheadersData && subheadersData[headerMenuList.titleKey]) || headerMenuList.title)}
        </NavLink>
      </li>
    )
  }

  return (
    <React.Fragment>
      <>{
        getShowOnHeaderCollectionSuccess && getMainBusiCollectionSuccess ? (
          <>{dynamicHeaderData && dynamicHeaderData.dynamic_header && dynamicHeaderData.dynamic_header.length > 0 && dynamicHeaderData.dynamic_header.filter((item) => item.path !== "/doctors").map((headerMenuList, index) => {
            return (
              <React.Fragment>
                {preview ? (
                  <React.Fragment>
                  {headerMenuList.path === "/collections" ? (
                    <React.Fragment>
                      {console.log(showOn,headerMenuList[showOn])}
                      {
                        headerMenuList[showOn] ? (
                          <> 
                          {renderDataPreview(index, headerMenuList, true)}
                          {getShowOnHeaderCollectionData && getShowOnHeaderCollectionData.length > 0&&getShowOnHeaderCollectionData.map((check,key)=>{
                            return(
                              renderDataPreviewSection(index, headerMenuList,true,check.urlSlug)
                            )
                          })}
                          </>
                         
                        ) : (
                          <>
                            {getShowOnHeaderCollectionData && getShowOnHeaderCollectionData.length > 0&&getShowOnHeaderCollectionData.map((check,key)=>{
                              return(
                                renderDataPreviewSection(index, headerMenuList,true,check.urlSlug)
                              )
                            })}
                          </>
                        )
                      }
                    </React.Fragment>
                  ) : (
                    headerMenuList[showOn]&&renderDataPreview(index, headerMenuList, false)
                  )}
                </React.Fragment>
                ) : (
                  <React.Fragment>
                    {headerMenuList.path === "/collections" ? (
                      <React.Fragment>
                        {
                          headerMenuList[showOn] ? (
                            <> 
                            {renderDataNoNPreview(index, headerMenuList, true)}
                            {getShowOnHeaderCollectionData && getShowOnHeaderCollectionData.length > 0&&getShowOnHeaderCollectionData.map((check,key)=>{
                              return(
                                renderDataNoNPreviewSection(index, headerMenuList,true,check.urlSlug)
                              )
                            })}
                            </>
                           
                          ) : (
                            <>
                              {getShowOnHeaderCollectionData && getShowOnHeaderCollectionData.length > 0&&getShowOnHeaderCollectionData.map((check,key)=>{
                                return(
                                  renderDataNoNPreviewSection(index, headerMenuList,true,check.urlSlug)
                                )
                              })}
                            </>
                          )
                        }
                      </React.Fragment>
                    ) : (
                      headerMenuList[showOn]&& renderDataNoNPreview(index, headerMenuList, false)
                    )}
                  </React.Fragment>
                )
                }
              </React.Fragment>
            );
          })}
          </>
        ) : (
          ""
        )
      }
      </>

    </React.Fragment>
  )
}
export default HeaderMenuList