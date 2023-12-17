import React from 'react'
import FormInput from '../../../../../Common/Form/FormInput'
import FormTextArea from '../../../../../Common/Form/FormTextArea'

const SeoBasic = () => {
  return (
    <>
      <div className="tab-wrap">
        <div className="formFieldwrap">
          <FormInput placeholder="e.g. Bags, Summer" label="Title tag" />
        </div>
        <div className="formFieldwrap">
          <FormTextArea placeholder="e.g. Bags, Summer" label="Title tag" />
        </div>
        <div className="formFieldwrap mb-20">
          <FormInput placeholder="e.g. Bags, Summer" label="URL slug" />
        </div>
        <div className="group-btn flex end-xs mb-30">
          <button className="button button-o-primary mr-20 primary btn-oval">Cancel</button>
          <button className="button button-primary btn-oval">Save</button>
        </div>
      </div>
    </>
  )
}

export default SeoBasic