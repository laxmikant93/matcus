import React, { forwardRef, useState } from 'react'
import CheckboxInput from '../../Form/CheckboxInput';
import "../MyFiles/myFiles.scss";


const FilterOptions = forwardRef(({ applyFilter, filter, className }, ref) => {
  const [selectedFilter, setSelectedFilter] = useState(filter || [])
  const filterArray = [
    { value: "img", show: "Images" },
    { value: "video", show: "Videos" },
    { value: "file", show: "Files" },
    { value: "music", show: "Audio" },
  ];
  const handleSelect = (e, value) => {
    let array = selectedFilter
    if (e.target.checked) {
      array.push(value)
    } else {
      let index = array.indexOf(value)
      array.splice(index, 1)
    }
    setSelectedFilter([...array])
  }
  const apply = () => {
    applyFilter(selectedFilter)
  }
  return (
    <div ref={ref} className={className}>
      {
        filterArray.map((item, key) => {
          return (
            <div className="collection-latest-wrap" key={key}>
              <CheckboxInput
                label={item.show}
                LabelClass={"label-heading eComm-checkbox-center"}
                className={"eComm-checkbox check-box-wrap"}
                value={item.value}
                key={key}
                checked={selectedFilter.includes(item.value)}
                onChange={(e) => handleSelect(e, item.value)}
              />
            </div>
          )
        })
      }
      <div className="btn-wrap inline">
        <button className="button btn-oval button-primary btn-apply" onClick={() => apply()}>Apply</button>
      </div>
    </div>
  )
})
export default FilterOptions