import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckboxInput from '../../Common/Form/CheckboxInput'
import { editWebsiteTemplatePages } from '../../store/actions/WebsiteTemplate'
import "./Pages.scss"
const About = ({ payloadData, updateOnHeader, updateOnFooter, data }) => {
  const [payloadArray, setPayloadArray] = useState([])
  const [sectionArray, setSectionArray] = useState([
    {
      title: "About us",
      class: "icon-theedot",
      field: "Aboutus",
      show:true
    },
    {
      title: "Our Mission",
      class: "icon-theedot",
      field: "Mission",
      show:true
    },
    {
      title: "Our Vision",
      class: "icon-theedot",
      field: "Vission",
      show:true
    },
    {
      title: "Principal's Message",
      class: "icon-theedot",
      field: "PrincipalWelcome",
      show:true
    },
    {
      title: "Videos",
      class: "icon-theedot",
      field: "Videos",
      show:true
    },
  ])
  const { user } = useSelector((state) => {
    return {
      user: state.user
    }
  })
  const dragItem = useRef()
  const dragOverItem = useRef()

  const dispatch = useDispatch()
  const { homecomponenthideData } = useSelector((state) => state.websiteTemplate.getTemplate.data)

  function handleHideShow(state, field,index) {
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
    payloadData([...array1])
    setSectionArray([...array1])
    setPayloadArray([...array1])
  }

  const showOnMenuList = (e, type) => {
    if (type === "header") {
      let dataHeader = {
        component: "WebsiteAbout",
        isActive: e.target.checked,
        path: "/aboutus",
        title: "About",
        titleKey: "",
      }

      updateOnHeader(dataHeader)
    } else {
      let dataFooter = {
        component: "WebsiteAbout",
        isActive: e.target.checked,
        path: "/aboutus",
        title: "About",
        titleKey: "",
      }
      updateOnFooter(dataFooter)
    }
  }
  const [checked, setChecked] = useState({})
  useEffect(() => {
    if (data) {
      let checkedItem = data.find((item) => item.path === '/aboutus')
      setChecked(checkedItem)
    }
  }, [data])
  useEffect(() => {
    setSectionArray(homecomponenthideData.length && homecomponenthideData[0].aboutSectionHideData)
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
    let payload = {
      sectionHide: {
        aboutSectionHide:[],
        aboutSectionHideData: copyListItems.length ? copyListItems : sectionArray
      },
      industry: user.user_business_type,
      institute: user.user_institute,
      owner: user._id,
      dynamic_header: { dynamic_header: data }
    }
    dispatch(editWebsiteTemplatePages(payload))

  };
  return (
    <>
      <ul className="dropList-wrapper">
        {
          sectionArray.length ?
            sectionArray.map((item,index) => {
              return (
                <li className={`droplist_item mb-10 ${item.show === true? '':'listDisable'}`} draggable={true}
                onDragStart={(e) => dragStart(e, index)}
                onDragEnter={(e) => dragEnter(e, index)}
                onDragEnd={drop}>
                  <div className="wrap">
                    <button><i className='icon-6dot'></i></button>{item.title}
                  </div>
                  {
                   item.show===true ?
                      (<button><i className="icon-eye" onClick={() => handleHideShow("uncheck", item.field,index)}></i></button>) :
                      (<button><i className="icon-hiddenEye" onClick={() => handleHideShow("check", item.field,index)}></i></button>)
                  }

                </li>
              )
            }) : ""
        }
          <hr className='hr-line' />
        <li className="checkbox-group">
          <CheckboxInput label="Show this page on Header" checked={checked.showOnHeader} onChange={(e) => showOnMenuList(e, "header")} />
          <CheckboxInput label="Show this page on Footerr" checked={checked.showOnFooter} onChange={(e) => showOnMenuList(e, 'footer')} />
        </li>
      </ul>
    </>
  )
}

export default About