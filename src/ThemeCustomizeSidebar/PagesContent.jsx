import React, { useState } from 'react'
import "./themesidebar.scss"
import HomePage from "./PageContent/HomePage"
import About from "./PageContent/About"
import Addmission from "./PageContent/Addmission"
import Announcements from "./PageContent/Announcements"
import Contact from "./PageContent/Contact"
import FAQs from "./PageContent/FAQs"
import FeeStructure from "./PageContent/FeeStructure"
import Gallery from "./PageContent/Gallery"
import Miscellaneous from "./PageContent/Miscellaneous"
import OurTeam from "./PageContent/OurTeam"
import SchoolFacilities from "./PageContent/SchoolFacilities"
import Vacancy from "./PageContent/Vacancy"
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { editWebsiteTemplatePages } from '../store/actions/WebsiteTemplate'
import { useRef } from 'react'

const PagesContent = () => {
  const [itemlist, setItemList] = useState(-1)
  const { dynamicHeaderData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { homecomponenthideData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { user } = useSelector((state) => {
    return {
      user: state.user
    }
  })
  const dragOverItem = useRef()
  const dragItem = useRef()
  const [menuList, setMenuList] = useState([])
  const [itemName, setItemName] = useState('')
  function handleItemList(index, title) {
    setItemName(title)
    setItemList(itemlist === index ? -1 : index)
  }
  const dispatch = useDispatch()
  const [payloadData, setPayloadData] = useState([])

  const handlePayload = (item) => {
    setPayloadData(item)
  }
  useEffect(() => {
    if (dynamicHeaderData) {
      setMenuList(dynamicHeaderData.dynamic_header)
    }
  }, [dynamicHeaderData])


  const updateHeader = (item, index) => {
    // setHeader(item)
    let array = menuList
    array[index]['showOnHeader'] = item.isActive
    setMenuList([...array])
  }

  const updateFooter = (item, index) => {
    let array = menuList
    array[index]['showOnFooter'] = item.isActive
    setMenuList([...array])
  }
  const handleSave = (item) => {
    if (item === "Home") {
      let data = {
        sectionHide: {
          homeSectionHide: [],
          homeSectionHideData: payloadData
        },
        dynamic_header: { dynamic_header: menuList },
        industry: user.user_business_type,
        institute: user.user_institute,
        owner: user._id
      }
      dispatch(editWebsiteTemplatePages(data))

    } else if (item === "About") {
      let data = {
        sectionHide: {
          aboutSectionHideData: payloadData,
        },
        industry: user.user_business_type,
        institute: user.user_institute,
        owner: user._id,
        dynamic_header: { dynamic_header: menuList },
      }
      dispatch(editWebsiteTemplatePages(data))
    } else {
      let data = {
        dynamic_header: { dynamic_header: menuList },
        industry: user.user_business_type,
        institute: user.user_institute,
        owner: user._id,
      }
      dispatch(editWebsiteTemplatePages(data))
    }
    setItemList(-1)
  }
  useEffect(() => {
    if (itemName === "Home") {
      setPayloadData(homecomponenthideData[0].homeSectionHideData)
    } else if (itemName === "About") {
      setPayloadData(homecomponenthideData[0].aboutSectionHideData)
    }
  }, [homecomponenthideData, itemName, itemlist])




  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = (e) => {
    const copyListItems = [...menuList];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setMenuList(copyListItems);
    let data = {
      dynamic_header: { dynamic_header: copyListItems },
      industry: user.user_business_type,
      institute: user.user_institute,
      owner: user._id,
    }
    dispatch(editWebsiteTemplatePages(data))
  };
  return (
    <>
      <ul className="PagesContent-wrapper">
        {
          menuList.length ?
            menuList.filter((item) => item.path !== "/doctors").map((item, index) => (
              <>
                <div className={`Item-wrap ${index === itemlist ? "active" : ""}`} key={index}  draggable={true}
                  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop}>
                  <li className={`listItem-wrap ${index === itemlist ? "activeDrop" : ""}`} key="id"  >
                    {
                      index === itemlist ?
                        <React.Fragment>
                          <div className='listItemWrap-drapIcon'>
                            <i className='icon-6dot '></i>
                             <span>{(subheadersData && subheadersData[item.titleKey]) || item.title}</span>
                             {/* <i className={`${'icon-check'} ${index === itemlist ? "active" : ""}`} onClick={() => handleSave(item.title)}></i>  */}
                          </div>
                          <div className='listItemWrap-saveWrap' onClick={() => handleSave(item.title)}>
                            <span className='text-2xs w-500 primary save-btn'>Save</span>
                          </div>
                          </React.Fragment> :
                        <React.Fragment>
                          <div className='listItemWrap-drapIcon'>
                            <i className='icon-6dot '></i>
                            <span>{(subheadersData && subheadersData[item.titleKey]) || item.title}</span>
                           </div>
                           <div className='listItmWrap-icon'>
                           <i className={`${'icon-setting'} ${index === itemlist ? "active" : ""}`} onClick={() => handleItemList(index, item.title)}></i>
                           </div>
                        </React.Fragment>
                    }

                  </li>
                  {
                    itemlist === index &&
                    <>
                      {
                        item.path === "/" ? <HomePage payloadData={handlePayload} updateOnHeader={(item) => updateHeader(item, index)} updateOnFooter={(item) => updateFooter(item, index)} data={menuList} /> :
                          item.path === "/aboutus" ? <About payloadData={handlePayload} updateOnHeader={(item) => updateHeader(item, index)} updateOnFooter={(item) => updateFooter(item, index)} data={menuList} /> :
                            item.path === "/faculty" ? <OurTeam updateOnHeader={(item) => updateHeader(item, index)} updateOnFooter={(item) => updateFooter(item, index)} data={menuList} /> :
                              item.path === "/admission" ? <Addmission updateOnHeader={(item) => updateHeader(item, index)} updateOnFooter={(item) => updateFooter(item, index)} data={menuList} /> :
                                item.path === "/feestructure" ? <FeeStructure updateOnHeader={(item) => updateHeader(item, index)} updateOnFooter={(item) => updateFooter(item, index)} data={menuList} /> :
                                  item.path === "/services" ? <SchoolFacilities updateOnHeader={(item) => updateHeader(item, index)} updateOnFooter={(item) => updateFooter(item, index)} data={menuList} /> :
                                    item.path === "/announcements" ? <Announcements updateOnHeader={(item) => updateHeader(item, index)} updateOnFooter={(item) => updateFooter(item, index)} data={menuList} /> :
                                      item.path === "/miscellaneous" ? <Miscellaneous updateOnHeader={(item) => updateHeader(item, index)} updateOnFooter={(item) => updateFooter(item, index)} data={menuList} /> :
                                        item.path === "/gallery" ? <Gallery updateOnHeader={(item) => updateHeader(item, index)} updateOnFooter={(item) => updateFooter(item, index)} data={menuList} /> :
                                          item.path === "/faqs" ? <FAQs updateOnHeader={(item) => updateHeader(item, index)} updateOnFooter={(item) => updateFooter(item, index)} data={menuList} /> :
                                            item.path === "/contactus" ? <Contact updateOnHeader={(item) => updateHeader(item, index)} updateOnFooter={(item) => updateFooter(item, index)} data={menuList} /> :
                                              item.path === "/vacancy" ? <Vacancy updateOnHeader={(item) => updateHeader(item, index)} updateOnFooter={(item) => updateFooter(item, index)} data={menuList} /> :
                                                ""
                      }
                    </>
                  }
                </div>
              </>
            )) : "No records"
        }
      </ul>
    </>
  )
}

export default PagesContent