import React from 'react'
import AppLink from '../../../../../Common/AppLink'
import Card from '../../../../../Common/Card'
import CardBody from '../../../../../Common/Card/CardBody'
import FormTextArea from '../../../../../Common/Form/FormTextArea'
import FormInput from '../../../../../Common/Form/FormInput'

const SeoShare = () => {
  return (
    <>
      <div className="tab-wrap">
        <h4 className="mb-10">Social Share</h4>
        <p className="mb-20">Open graph (og) tags are used by social networks
          like Facebook & Whatsapp to display text and an
          image when this page is shared.</p>
        <p className="mb-10">Preview on social media</p>

        <Card>
          <div className="img-wrap">
            <img src="https://english.cdn.zeenews.com/sites/default/files/2021/04/02/927067-mschfsatan-shoes-1024x643.jpg" className="img-fluid" alt="" />
          </div>
          <CardBody>
            <h5 className="mb-5">Nike Shoe | Sale</h5>
            <p>Men Grey Renew Retaliation 3 Training Shoes</p>
            <AppLink to="https: // www.nike.com" target="_blank" className="text-xs">
              https: // www.nike.com
            </AppLink>
          </CardBody>
        </Card>
        <div className="formFieldwrap">
          <FormInput placeholder="Bags | Nike" label="og:title" />
        </div>
        <div className="formFieldwrap mb-20">
          <FormTextArea placeholder="Add a short desciption of this
            page here..." label="Title tag" />
        </div>
        <div className="group-btn flex end-xs">
          <button className="button button-o-primary mr-20 primary btn-oval">Cancel</button>
          <button className="button button-primary btn-oval">Save</button>
        </div>
      </div>
    </>
  )
}

export default SeoShare