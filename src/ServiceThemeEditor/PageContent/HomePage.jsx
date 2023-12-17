import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckboxInput from '../../Common/Form/CheckboxInput'
import { editWebsiteTemplatePages } from '../../store/actions/serviceWebsiteTemplate'
import "./Pages.scss"

const Home = ({ payloadData, updateOnHeader, updateOnFooter, data }) => {
  const [payloadArray, setPayloadArray] = useState([])
  const { user } = useSelector((state) => {
    return {
      user: state.user
    }
  })
  
  const [checked, setChecked] = useState({})

  useEffect(() => {
    if (data) {
      let checkedItem = data.find((item) => item.path === '/')
      setChecked(checkedItem)
    }
  }, [data])
  const { homecomponenthideData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const dragItem = useRef()
  const dragOverItem = useRef()
  const [sectionArray, setSectionArray] = useState(
    [{
      title: "Banner Image",
      class: "icon-gallery",
      field: "BannerImage",
      show: true
    },
    {
      title: "About us",
      class: "icon-theedot",
      field: "Aboutus",
      show: true
    },
    {
      title: "Principal’s Welcome",
      class: "icon-theedot",
      field: "PrincipalWelcome",
      show: true
    },
    {
      title: "Meet Our Teachers",
      class: "icon-theedot",
      field: "Faculty",
      show: true
    },
    {
      title: "School’s Facilities",
      class: "icon-theedot",
      field: "Services",
      show: true
    },
    {
      title: "Services",
      class: "icon-theedot",
      field: "BookingServices",
      show: true
    },
    {
      title: "Categories",
      class: "icon-theedot",
      field: "BookingCategories",
      show: true
    },
    // {
    //   title: "Fee structure",
    //   class: "icon-theedot",
    //   field: "Feestructure"
    // },
    // {
    //   title: "Announcements",
    //   class: "icon-theedot",
    //   field: "Announcements"
    // },
    // {
    //   title: "Miscellaneous",
    //   class: "icon-theedot",
    //   field: "Miscellaneous"
    // },
    // {
    //   title: "FAQs",
    //   class: "icon-theedot",
    //   field: "FAQs"
    // }, 
    // {
    //   title: "Vacancy",
    //   class: "icon-theedot",
    //   field: "Vacancy"
    // },
    // {
    //   title: "Admission",
    //   class: "icon-theedot",
    //   field: "Admission"
    // },
    {
      title: "Contact",
      class: "icon-theedot",
      field: "Contact",
      show: true
    },
    ])
  const dispatch = useDispatch()
  function handleHideShow(state, field, index) {
    let array = payloadArray
    let array1 = sectionArray
    if (state === "check") {
      array.push(field)
      array1[index]['show'] = true
    } else if (state === "uncheck") {
      let myIndex = array.indexOf(field);
      array.splice(myIndex, 1);
      array1[index]['show'] = false
    }
    setSectionArray([...array1])
    payloadData([...array1])
    setPayloadArray([...array1])
  }
  const showOnMenuList = (e, type) => {
    if (type === "header") {
      let dataHeader = {
        component: "Home",
        isActive: e.target.checked,
        path: "/",
        title: "Home",
        titleKey: "",
      }

      updateOnHeader(dataHeader)
    } else {
      let dataFooter = {
        component: "WebsiteAbout",
        isActive: e.target.checked,
        path: "/",
        title: "Home",
        titleKey: "",
      }
      updateOnFooter(dataFooter)
    }
  }
  useEffect(() => {
    setPayloadArray(homecomponenthideData.length && homecomponenthideData[0].homeSectionHideData)
  }, [homecomponenthideData])

  useEffect(() => {
    if (homecomponenthideData.length && homecomponenthideData[0].homeSectionHideData.length > 0) {
      setSectionArray([...homecomponenthideData[0].homeSectionHideData])
    }
  }, [homecomponenthideData])
  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  const drop = (e) => {
    const copyListItems = [...sectionArray];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setSectionArray(copyListItems);
    // var tempArr = copyListItems.filter(function (item) {
    //   return payloadArray.includes(item.field);
    // });
    // let data = tempArr.map((item) => {
    //   return item.field
    // })
    payloadData([...copyListItems])
    let payload = {
      sectionHide: {
        // homeSectionHide: data,
        homeSectionHideData: copyListItems.length ? copyListItems : sectionArray
      },
      industry: user.user_business_type,
      business: user.user_institute,
      owner: user._id
    }
    dispatch(editWebsiteTemplatePages(payload))

  };
  return (
    <>
      <ul className="dropList-wrapper">
        {
          sectionArray.length ?
            sectionArray.map((item, index) => {
              return (
                // add 'listDisable' when eye is clicked
                <li className={`droplist_item  mb-10 ${item.show === true? '':'listDisable'}`} draggable={true}
                  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop}
                  key={index}
                >
                  <div className="wrap">
                    <button><i className='icon-6dot'></i></button> {item.title}
                  </div>
                  {
                    item.show === true ?
                      (<button><i className="icon-eye" onClick={() => handleHideShow("uncheck", item.field, index)}></i></button>) :
                      (<button><i className="icon-hiddenEye" onClick={() => handleHideShow("check", item.field, index)}></i></button>)
                  }

                </li>
              )
            }) : ""
        }

        <hr className='hr-line' />

        <li className="checkbox-group">
        <CheckboxInput label="Show this page on Header" checked={checked.showOnHeader} onChange={(e) => showOnMenuList(e, "header")} />
          <CheckboxInput label="Show this page on Footer" checked={checked.showOnFooter} onChange={(e) => showOnMenuList(e, 'footer')} />
        </li>

        {/* <li className="droplist_item mb-10">
          <div className="wrap">
            <button><i className="icon-theedot"></i></button>About us
          </div>
          {
            hide ? (<button><i className="icon-hiddenEye" onClick={handleHideShow}></i></button>) :
              (<button><i className="icon-eye" onClick={handleHideShow}></i></button>)
          }
        </li>
        <li className="droplist_item mb-10">
          <div className="wrap">
            <button><i className="icon-theedot"></i></button>Announcements
          </div>
          {
            hide ? (<button><i className="icon-hiddenEye" onClick={handleHideShow}></i></button>) :
              (<button><i className="icon-eye" onClick={handleHideShow}></i></button>)
          }
        </li>
        <li className="droplist_item mb-10">
          <div className="wrap">
            <button><i className="icon-theedot"></i></button>Principal’s Welcome
          </div>
          {
            hide ? (<button><i className="icon-hiddenEye" onClick={handleHideShow}></i></button>) :
              (<button><i className="icon-eye" onClick={handleHideShow}></i></button>)
          }
        </li>
        <li className="droplist_item mb-10">
          <div className="wrap">
            <button><i className="icon-theedot"></i></button>Meet Our Teachers
          </div>
          {
            hide ? (<button><i className="icon-hiddenEye" onClick={handleHideShow}></i></button>) :
              (<button><i className="icon-eye" onClick={handleHideShow}></i></button>)
          }
        </li>
        <li className="droplist_item mb-10">
          <div className="wrap">
            <button><i className="icon-theedot"></i></button>School’s Facilities
          </div>
          {
            hide ? (<button><i className="icon-hiddenEye" onClick={handleHideShow}></i></button>) :
              (<button><i className="icon-eye" onClick={handleHideShow}></i></button>)
          }
        </li>
        <li className="droplist_item mb-10">
          <div className="wrap">
            <button><i className="icon-theedot"></i></button>Sneak Peak
          </div>
          {
            hide ? (<button><i className="icon-hiddenEye" onClick={handleHideShow}></i></button>) :
              (<button><i className="icon-eye" onClick={handleHideShow}></i></button>)
          }
        </li>
        <li className="droplist_item mb-10">
          <div className="wrap">
            <button><i className="icon-theedot"></i></button>Fee structure
          </div>
          {
            hide ? (<button><i className="icon-hiddenEye" onClick={handleHideShow}></i></button>) :
              (<button><i className="icon-eye" onClick={handleHideShow}></i></button>)
          }
        </li>
        <li className="droplist_item mb-10">
          <div className="wrap">
            <button><i className="icon-theedot"></i></button>Miscellaneous
          </div>
          {
            hide ? (<button><i className="icon-hiddenEye" onClick={handleHideShow}></i></button>) :
              (<button><i className="icon-eye" onClick={handleHideShow}></i></button>)
          }
        </li>
        <li className="droplist_item mb-10">
          <div className="wrap">
            <button><i className="icon-theedot"></i></button>FAQs
          </div>
          {
            hide ? (<button><i className="icon-hiddenEye" onClick={handleHideShow}></i></button>) :
              (<button><i className="icon-eye" onClick={handleHideShow}></i></button>)
          }
        </li>
        <li className="droplist_item mb-10">
          <div className="wrap">
            <button><i className="icon-theedot"></i></button>Vacancy
          </div>
          {
            hide ? (<button><i className="icon-hiddenEye" onClick={handleHideShow}></i></button>) :
              (<button><i className="icon-eye" onClick={handleHideShow}></i></button>)
          }
        </li>
        <li className="droplist_item mb-10">
          <div className="wrap">
            <button><i className="icon-theedot"></i></button>Contact
          </div>
          {
            hide ? (<button><i className="icon-hiddenEye" onClick={handleHideShow}></i></button>) :
              (<button><i className="icon-eye" onClick={handleHideShow}></i></button>)
          }
        </li> */}
      </ul>
    </>
  )
}

export default Home