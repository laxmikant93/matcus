import React from 'react'
import { NavLink } from 'react-router-dom'
import { clearAllCategory, showAddCat, showAddSubCat, showAddSubSubCat, CategoryPush, SubCategoryPush, SubSubCategoryPush } from '../../../../store/actions/catergoryFilter'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TabBody = ({ id, activeTab, successData, data, children }) => {
  // console.log(data.subcategories, "lineno 4 subcategories")
  const dispatch = useDispatch();
  const history = useNavigate();


  const handleSubCategoryNavbarFilter = (subCategoryitem) => {
    dispatch(clearAllCategory())
    dispatch(SubCategoryPush(subCategoryitem._id))
    dispatch(showAddSubCat(subCategoryitem._id))
    if (subCategoryitem.subsubcategories.length > 0) {
      for (let i = 0; i < subCategoryitem.subsubcategories.length; i++) {
        dispatch(showAddSubSubCat(subCategoryitem.subsubcategories[i]._id))
      }
    }
    history("/products")
  }

  const handleSubSubCategoryNavbarFilter = (subsubitem) => {
    dispatch(clearAllCategory())
    dispatch(SubSubCategoryPush(subsubitem))
    dispatch(showAddSubSubCat(subsubitem._id))
    history("/products")
  }

  return (
    activeTab === id ?
      <React.Fragment key={id}>
        <div className="TabBody">
          {
            successData && data.subcategories.map((subcategory) => (
              <>
                <div>
                  <button onClick={() => { handleSubCategoryNavbarFilter(subcategory) }} className="buttonList">
                    {/* <NavLink to={`/category/${subcategory.slug}`}> */}
                    <h4 className="subCategory">{subcategory?.subCategoryName}</h4>
                    {/* </NavLink> */}
                  </button>
                  {
                    successData && subcategory?.subsubcategories.map((subsubcategory) => (
                      <>
                        <button onClick={() => { handleSubSubCategoryNavbarFilter(subsubcategory) }} className="buttonList">
                          {/* <NavLink to={`/category/${subsubcategory.slug}`}> */}
                          <small className="subSubCategoroy" key={subsubcategory._id}>{subsubcategory.subSubCategoryName}</small>
                          {/* </NavLink> */}
                        </button>
                      </>
                    ))
                  }
                </div>
              </>
            ))
          }
        </div>
      </React.Fragment>
      : null
  )
}

export default TabBody