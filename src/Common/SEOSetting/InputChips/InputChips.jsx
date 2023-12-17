import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './inputChips.scss';

const InputChips = ({ metaKeyData, getMetaKeywords }) => {
  const [metaInputWrapper, setMetaInputWrapper] = useState(false);
  const [keyword, setKeyword] = useState("")
  const [metaKeywords, setMetaKeywords] = useState([]);


  useEffect(() => {
    setMetaKeywords(getMetaKeywords)
  }, [getMetaKeywords])

  // console.log(getMetaKeywords)
  const handleInput = (e) => {
    let inputValue = e.target.value
    let key = e.key
    // console.log(key, e)
    setKeyword(inputValue)

  }

  const handleSave = (e) => {
    let key = e.key
    let inputValue = e.target.value
    let array = metaKeywords ?? []
    if (inputValue) {
      if (key === 'Enter') {
        array.push(inputValue)
        setKeyword("")
        setMetaKeywords([...array])
        // metaKeyData([...array])
      }
    }
  }

  const handleRemove = (e) => {
    if (metaKeywords.length > 0) {
      handleDelete(metaKeywords.length - 1)
    }
  }

  useEffect(() => {
    metaKeyData(metaKeywords)
  }, [metaKeywords])

  const handleDelete = (i) => {
    let array = metaKeywords
    array.splice(i, 1)
    setMetaKeywords([...array])
  }

  // const metakeywords = ['RED', 'GREEEN', 'BLUE'];

  return (
    <div className='chipInput-container'>
      <div className="formFieldwrap ">
        <label className='label-heading'>
          Meta keywords
        </label>
        <div className={`meta-keywords-wrapper ${metaInputWrapper ? 'meta-keywords-border' : ''}`} onClick={() => setMetaInputWrapper(!metaInputWrapper)}>
          {/* <p className="placeholder  text-xxs w-300">Enter meta keywords</p>
                      <p className="text-xxs w-500 base" > hello people</p> */}
          <div className="meta-keywords-wrap">
            {
              metaKeywords?.length ? metaKeywords?.map((options, key) => (
                <div className="chips-container" >
                  <div
                    role={'button'}
                    onClick={() => handleDelete(key)}
                    className="chip-button">
                    <span className="chip-name">
                      {options}
                    </span>
                    <i className="icon-chipCross "></i></div>
                </div>
              )) : ""
            }
            <div className="input-container">
              <input type="text"
                placeholder="Enter meta keywords"
                value={keyword}
                onChange={handleInput}
                onKeyUp={handleInput}
                name="meta_input"
                className="meta-keyword-input"
                onKeyDown={(e) => e.key === "Enter" ? handleSave(e) : e.key === "Backspace" && !e.target.value && handleRemove(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputChips