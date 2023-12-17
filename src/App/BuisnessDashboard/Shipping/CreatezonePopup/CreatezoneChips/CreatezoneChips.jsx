import React, { useState } from 'react'

const CreatezoneChips = () => {
  const [metaInputWrapper, setMetaInputWrapper] = useState(false);
  const [metakeywords, setMetaKeywords] = useState([]);
  return (
    <div>
      <div className={`meta-keywords-wrapper ${metaInputWrapper ? 'meta-keywords-border' : ''}`} onClick={() => setMetaInputWrapper(!metaInputWrapper)}>
        {/* <p className="placeholder  text-xxs w-300">Enter meta keywords</p>
                      <p className="text-xxs w-500 base" > hello people</p> */}
        <div className="meta-keywords-wrap">
          {
            metakeywords.length ? metakeywords.map((options, key) => (
              <div className="chips-container" >
                <div role={'button'} onClick={() => handleDelete(key)} className="chip-button"><span className="chip-name">{options}</span> <i className="icon-chipCross "></i></div>
              </div>
            )) : ""
          }
          <div className="input-container">
            <input type="text" placeholder="Enter meta keywords" value={keyword} onChange={handleInput} onKeyUp={handleInput} onKeyDown={(e) => e.key === "Enter" ? handleSave(e) : e.key === "Backspace" && !e.target.value && handleRemove(e)} name="meta_input" className="meta-keyword-input" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatezoneChips