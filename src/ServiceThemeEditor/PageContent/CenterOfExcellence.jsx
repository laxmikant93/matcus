import React, { useState } from 'react'
import { useEffect } from 'react'
import CheckboxInput from '../../Common/Form/CheckboxInput'
import "./Pages.scss"

const CenterOfExcellence = ({ updateOnHeader, updateOnFooter, data }) => {

  const showOnMenuList = (e, type) => {
    if (type === "header") {
      let dataHeader = {
        component: "WebsiteAbout",
        isActive: e.target.checked,
        showOnHeader: e.target.checked,
        path: "/center-of-excellence",
        title: "Center Of Excellence",
        titleKey: "",
      }
      updateOnHeader(dataHeader)
    } else {
      let dataFooter = {
        component: "WebsiteAbout",
        isActive: e.target.checked,
        showOnFooter: e.target.checked,
        path: "/center-of-excellence",
        title: "Center Of Excellence",
        titleKey: "",
      }
      updateOnFooter(dataFooter)
    }
  }
  const [checked, setChecked] = useState({})
  useEffect(() => {
    if (data) {
      let checkedItem = data.find((item) => item.path === '/center-of-excellence')
      setChecked(checkedItem)
    }
  }, [data])

  return (
    <>
      <ul className="dropList-wrapper">
        <li className="checkbox-group">
          <CheckboxInput label="Show this page on Header" checked={checked.showOnHeader} onChange={(e) => showOnMenuList(e, "header")} />
          <CheckboxInput label="Show this page on Footer" checked={checked.showOnFooter} onChange={(e) => showOnMenuList(e, 'footer')} />
        </li>
      </ul>
    </>
  )
}

export default CenterOfExcellence