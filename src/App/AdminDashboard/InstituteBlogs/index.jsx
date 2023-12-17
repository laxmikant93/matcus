import React from 'react'
import AppLink from '../../../Common/AppLink'
import Breadcrumb from '../../../Common/Breadcrumb'
import BreadcrumbItem from '../../../Common/Breadcrumb/BreadcrumbItem'
import GrayAuthTheme from '../../../Common/Theme/GrayAuthTheme'

const InstituteBlogs = () => {
  return (
    <GrayAuthTheme>
      <div className="pageInCenter">
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/blogs" title="Blogs" />
        </Breadcrumb>
        <React.Fragment>
          <div className="formFieldwrap">
            <div className="formFieldwrap">
              <AppLink
                to="/blog-list"
                className="button button-primary btn-oval button-sm button-block"
              >
                Blog List
              </AppLink>
            </div>
            {/* <div class="formFieldwrap">
              <AppLink
                to="/blog-comments"
                className="button button-primary btn-oval button-sm button-block"
              >
                Blog Comments
              </AppLink>
            </div> */}
            <div class="formFieldwrap">
              <AppLink
                to="/blog-categories"
                className="button button-primary btn-oval button-sm button-block"
              >
                Blog Categories
              </AppLink>
            </div>
          </div>
        </React.Fragment >
      </div>
    </GrayAuthTheme>
  )
}
export default InstituteBlogs