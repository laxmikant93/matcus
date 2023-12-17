import React, { useEffect, useState } from 'react'
import CheckboxInput from '../../Common/Form/CheckboxInput'
import "./Pages.scss"

const FAQs = ({ updateOnHeader, updateOnFooter, data }) => {
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
      let checkedItem = data.find((item) => item.path === "/faqs")
      setChecked(checkedItem)
    }
  }, [data])
  return (
    <>
      <ul className="dropList-wrapper">
      <hr className='hr-line' />
        <li className="checkbox-group">
          <CheckboxInput label="Show this page on Header" checked={checked.showOnHeader} onChange={(e) => showOnMenuList(e, "header")} />
          <CheckboxInput label="Show this page on Footer" checked={checked.showOnFooter} onChange={(e) => showOnMenuList(e, 'footer')} />
        </li>
      </ul>
    </>
  )
}

export default FAQs