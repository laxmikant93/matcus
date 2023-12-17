import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  AllSubCategoryPush, AllSubSubCategoryPush, CategoryPush,
  showRemoveCat, showRemoveSubCat, showRemoveSubSubCat,
  showAddCat, showAddSubCat, showAddSubSubCat
} from "../../store/actions/catergoryFilter";
import GroupOption from "./GroupOption";
import SubCategories from "./SubCategories";

const Category = ({ data_lvl1, dropdownNamefirst, dropdownNameSecond, dropdownNameThird }) => {
  const categoryRef = useRef();
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const { categoryList } = useSelector((state) => {
    return {
      categoryList: state.catergoryFilter.list.data
    }
  })
  useEffect(() => {
    if (categoryList[0]._id.includes(data_lvl1._id)) {
      // categoryList[0]._id.includes(data_lvl1._id)
      setActive(true)
    }
  }, [categoryList])

  // console.log(data_lvl1, dropdownNamefirst, dropdownNameSecond, dropdownNameThird, "lime 10")
  const handleInderminate = (value, checked) => {
    if (checked) {
      dispatch(CategoryPush(value._id))
      let subCat = []
      let subsubCat = []

      // TODO show

      //! remove  subCat from Cat
      dispatch(showRemoveCat(value._id))

      //! remove  subCat from subCat
      let showsubcat = []
      let showsubsubcat = []
      if (value.subcategories.length > 0) {
        for (let i = 0; i < value.subcategories.length; i++) {
          showsubcat.push(value.subcategories[i]._id)
          if (value.subcategories[i].subsubcategories.length > 0) {
            for (let j = 0; j < value.subcategories[i].subsubcategories.length; j++) {
              showsubsubcat.push(value.subcategories[i].subsubcategories[j]._id)
            }
          }
        }
      }
      dispatch(showRemoveSubCat(showsubcat))
      dispatch(showRemoveSubSubCat(showsubsubcat))
      //! remove subsubCat from subsubCat
      // dispatch(showRemoveSubSubCat([]))



      // for (let i = 0; i < value.subcategories.length; i++) {
      //   // console.log("line 26", value.subcategories[i]._id)
      //   let inputFields = value.subcategories
      //   let index = inputFields[2]._id.indexOf(value.subcategories[i]._id)
      //   subCat[2]._id.splice(index, 1)
      //   subCat.push(value.subcategories[i]._id)
      //   if (value.subcategories[i].subsubcategories) {
      //     if (value.subcategories[i].subsubcategories.length > 0) {
      //       for (let j = 0; j < value.subcategories[i].subsubcategories.length; j++) {
      //         subsubCat.push(value.subcategories[i].subsubcategories[j]._id)
      //       }
      //     }
      //   }
      // }
      dispatch(AllSubCategoryPush(subCat))
      dispatch(AllSubSubCategoryPush(subsubCat))
    } else {
      // TODO SHOW
      // ! add cat
      // console.log(value._id)
      dispatch(showAddCat(value._id))
      // ! add All subcat

      // ! add ALL subsubcat

      let showsubcat = []
      let showsubsubcat = []
      if (value.subcategories.length > 0) {
        for (let i = 0; i < value.subcategories.length; i++) {
          showsubcat.push(value.subcategories[i]._id)
          if (value.subcategories[i].subsubcategories.length > 0) {
            for (let j = 0; j < value.subcategories[i].subsubcategories.length; j++) {
              showsubsubcat.push(value.subcategories[i].subsubcategories[j]._id)
            }
          }
        }
      }
      dispatch(showAddSubCat(showsubcat))
      dispatch(showAddSubSubCat(showsubsubcat))
      // TODO SHOW END



      if (value.subcategories.length > 0) {
        // console.log(value.subcategories, "line 22")
        let subCat = []
        let subsubCat = []
        for (let i = 0; i < value.subcategories.length; i++) {
          // console.log("line 26", value.subcategories[i]._id)
          subCat.push(value.subcategories[i]._id)
          if (value.subcategories[i].subsubcategories) {
            if (value.subcategories[i].subsubcategories.length > 0) {
              for (let j = 0; j < value.subcategories[i].subsubcategories.length; j++) {
                subsubCat.push(value.subcategories[i].subsubcategories[j]._id)
              }
            }
          }
        }
        // console.log(subsubCat, "line 32", subCat, value._id)
        dispatch(AllSubCategoryPush([]))
        dispatch(AllSubSubCategoryPush([]))
        dispatch(CategoryPush(value._id))


      } else {
        dispatch(CategoryPush(value._id))
      }
    }
  };

  return (
    <li className="GroupOption category-wrapper">
      <div className={`GroupOptLabelWrap ${active ? "cateActive" : ""}`}>
        {/* <span className="GroupOptCaretIcon" onClick={() => setActive(!active)}>
          &#10095;
        </span> */}
        <span
          className={`GroupOptionLabel`}
          title={data_lvl1[dropdownNamefirst]}
          onClick={() => setActive(!active)}
        >
          {data_lvl1[dropdownNamefirst]}
        </span>
      </div>
      {active && <GroupOption
        active={active}
        Inputname={`All ${data_lvl1[dropdownNamefirst]}`}
        isChecked={categoryList[0]._id.includes(data_lvl1._id)}
        handleInderminate={(val, chek) => handleInderminate(val, chek)}
        data={data_lvl1}
        setActive={() => setActive(!active)}
        showGroupOption={true} lavel={'category'} />}

      {
        data_lvl1.subcategories.length > 0 ? active && data_lvl1.subcategories.map((item, key) => {
          return (
            <React.Fragment>
              <SubCategories show={true} data_lvl1={data_lvl1} data_lvl2={item} dropdownNamefirst={dropdownNamefirst} dropdownNameSecond={dropdownNameSecond} dropdownNameThird={dropdownNameThird}
                parentChecked={categoryList[0]._id.includes(data_lvl1._id)} />
            </React.Fragment>
          )
        }) : (
          ""
        )
      }
    </li >
  );
};

export default Category;
