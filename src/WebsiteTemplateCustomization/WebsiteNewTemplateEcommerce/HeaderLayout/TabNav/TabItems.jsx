import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { clearAllCategory, showAddCat, showAddSubCat, showAddSubSubCat, CategoryPush } from '../../../../store/actions/catergoryFilter'
import { useDispatch } from 'react-redux';

const TabItems = ({ title, activeTab, id, setactiveTab }) => {
  const history = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const handle = () => {
  //     setactiveTab(id);
  //     console.log(id, "line10")
  //   }
  //   document.addEventListener("mousedown", handle)
  //   document.addEventListener('touchstart', handle);
  //   return () => {
  //     document.removeEventListener("mousedown", handle)
  //     document.removeEventListener("touchstart", handle)
  //   }
  // }, [])

  // console.log(activeTab, id, "line18")

  const handleClick = () => {
    setactiveTab(id);
  };
  const RedirectPush = (item) => {
    history(item)
  }

  const handleCategoryNavbarFilter = (Categoryitem) => {
    dispatch(clearAllCategory())
    dispatch(CategoryPush(Categoryitem._id))
    dispatch(showAddCat(Categoryitem._id))
    if (Categoryitem.subcategories.length > 0) {
      for (let i = 0; i < Categoryitem.subcategories.length; i++) {
        dispatch(showAddSubCat(Categoryitem.subcategories[i]._id))
        if (Categoryitem.subcategories[i].subsubcategories.length > 0) {
          dispatch(showAddSubSubCat(Categoryitem.subcategories[i]._id))
        }
      }
    }
    history("/products")
  }


  return (
    <React.Fragment>
      {
        !title.show_on_header &&
        <li className={`dropList ${activeTab === id ? "active" : ""}`} key={title._id}>
          <button
            onMouseEnter={handleClick}
            // onClick={() => RedirectPush(`/category/${title?.slug}`)}
            onClick={() => { handleCategoryNavbarFilter(title) }}
            className="buttonList"
          >
            {title?.categoryName}
          </button>
        </li>
      }
    </React.Fragment>
  )
}

export default TabItems