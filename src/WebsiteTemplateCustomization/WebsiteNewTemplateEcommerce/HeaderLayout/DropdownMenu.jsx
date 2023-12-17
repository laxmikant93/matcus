import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllCategory, showAddCat, showAddSubCat, showAddSubSubCat, CategoryPush, SubCategoryPush, SubSubCategoryPush } from '../../../store/actions/catergoryFilter';

const DropdownMenu = ({ dropdownPosition, refDrop, MouseLeave, dropdown, hoverId, Successdata, Categoryitem }) => {
  const Mouseover = () => {
    MouseLeave()
  }
  const history = useNavigate();
  const dispatch = useDispatch();

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
    <React.Fragment>
      <div onMouseLeave={Mouseover} ref={refDrop} className={`sub-Category_menu ${dropdownPosition ? "Right" : ""} ${dropdown && hoverId === Categoryitem._id ? "visible" : "invisible"}`}>
        <ul className="subCategory">
          {
            Successdata && Categoryitem?.subcategories && Categoryitem?.subcategories.length >= 1 && (
              Categoryitem?.subcategories.map((subCategoryitem, key) => {
                return (
                  <>
                    <li className="dropList" key={key}>
                      <button onClick={() => { handleSubCategoryNavbarFilter(subCategoryitem) }} className="buttonList">
                        <h5 >{subCategoryitem?.subCategoryName}</h5>
                      </button>
                      {
                        Successdata && subCategoryitem?.subsubcategories && subCategoryitem?.subsubcategories.length > 0 ? (
                          subCategoryitem?.subsubcategories.map((subsubitem, key) => (

                            <button onClick={() => { handleSubSubCategoryNavbarFilter(subsubitem) }} className="buttonList">
                              {/* <NavLink to={`/category/${subsubitem?.slug}`} key={key}> */}
                              <p className="subsubitems">{subsubitem?.subSubCategoryName}</p>
                              {/* </NavLink> */}
                            </button>

                          ))
                        ) : ("")
                      }
                    </li>
                  </>
                )
              })
            )
          }
        </ul>
      </div>
    </React.Fragment>
  )
}

export default DropdownMenu