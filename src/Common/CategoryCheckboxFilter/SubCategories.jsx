import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AllSubSubCategoryPush, SubCategoryPush, CategoryPush, SubCategoryPushIfParentSelected, SubSubCategoryPush,
  showRemoveCat, showRemoveSubCat, showRemoveSubSubCat,
  showAddCat, showAddSubCat, showAddSubSubCat
} from "../../store/actions/catergoryFilter";
import GroupOption from "./GroupOption";
import SubSubCategory from "./SubSubCategory";

const SubCategories = ({ data_lvl1, data_lvl2, dropdownNamefirst, dropdownNameSecond, dropdownNameThird, parentChecked }) => {
  const subCategoryRef = useRef();
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const { categoryList, getCategorylistSuccess, getCategorylistData, sendCategoryList } = useSelector((state) => {
    return {
      categoryList: state.catergoryFilter.list.data,
      sendCategoryList: state.catergoryFilter.sendCategoryList,
      getCategorylistSuccess: state.ecomAdmin.list.success,
      getCategorylistData: state.ecomAdmin.list.data,
    }
  })
  useEffect(() => {
    if (categoryList[1]._id.includes(data_lvl2._id)) {
      // categoryList[0]._id.includes(data_lvl1._id)
      setActive(true)
    }
  }, [categoryList])


  // console.log("LINE NO 18",data_lvl1)
  const handleInderminate = (value, checked) => {
    // dispatch(SubCategoryPush(value._id))



    if (parentChecked) {
      dispatch(CategoryPush(data_lvl1._id))
      // TODO:commented -code
      // TODO:commented -code-close

      dispatch(SubCategoryPushIfParentSelected(value._id))
      // ! this dispatch  used when arent selected remove all child and push this 
      // dispatch(AllSubSubCategoryPush(inputFields))
      // dispatch(AllSubSubCategoryPush([]))
      // TODO SHOW 

      dispatch(showRemoveCat(value.categoryId))
      // only add cat because subcat and subsubcat is already added when parent selected
      // dispatch(showAddSubCat(value._id))
      for (let i = 0; i < getCategorylistData.data.length; i++) {
        if (getCategorylistData.data[i]._id === value.categoryId && getCategorylistData.data[i].subcategories.length > 0) {
          for (let j = 0; j < getCategorylistData.data[i].subcategories.length; j++) {
            let num = 0;
            if (getCategorylistData.data[i].subcategories[j]._id === value._id && num === 0) {
              dispatch(showAddSubCat([value._id]))
              num = 1;
            } else {
              dispatch(showRemoveSubCat([getCategorylistData.data[i].subcategories[j]._id]));
              if (getCategorylistData.data[i].subcategories[j].subsubcategories.length > 0) {
                for (let k = 0; k < getCategorylistData.data[i].subcategories[j].subsubcategories.length; k++) {
                  dispatch(showRemoveSubSubCat([getCategorylistData.data[i].subcategories[j].subsubcategories[k]._id]));
                }
              }
            }
          }
        }
      }
      // TODO END

    } else {

      if (checked) {
        // TODO SHOW 
        // remove subcat and add subsubcat
        dispatch(showRemoveSubCat([value._id]));
        // console.log("line no 52",getCategorylistData)
        for (let i = 0; i < getCategorylistData.data.length; i++) {
          if (getCategorylistData.data[i]._id === value.categoryId && getCategorylistData.data[i].subcategories.length > 0) {
            for (let j = 0; j < getCategorylistData.data[i].subcategories.length; j++) {
              // if(!sendCategoryList.category_level_One.includes(getCategorylistData.data[i].subcategories._id) &&getCategorylistData.data[i].subcategories._id=== value._id){
              // dispatch(showRemoveSubCat([getCategorylistData.data[i].subcategories[j]._id]));
              // }

              if (getCategorylistData.data[i].subcategories[j].subsubcategories.length > 0) {
                for (let k = 0; k < getCategorylistData.data[i].subcategories[j].subsubcategories.length; k++) {

                  // console.log(getCategorylistData.data[i].subcategories[j].subsubcategories)
                  // console.log(getCategorylistData.data[i].subcategories._id,"::::::",value._id)
                  if (getCategorylistData.data[i].subcategories[j]._id === value._id) {
                    dispatch(showRemoveSubSubCat([getCategorylistData.data[i].subcategories[j].subsubcategories[k]._id]));
                  }
                }
              }
            }
          }
        }
        // TODO END
        /* let showsubsubcat=[];
        if(value.subsubcategories.length>0){
          for(let j=0;j<value.subsubcategories.length;j++){
            showsubsubcat.push(value.subsubcategories[j]._id)
          }
      } */
        // dispatch(showRemoveSubCat([value._id]))
        // dispatch(showRemoveSubSubCat(showsubsubcat))
        // TODO END
        dispatch(SubCategoryPush(value._id))
        // console.log("ghgfhfhgffg", value)
        // console.log("data_lvl2data_lvl2data_lvl2", data_lvl2)
        // TODO remove all child 


        let subsubCat = []

        if (value.subsubcategories.length > 0) {
          for (let j = 0; j < value.subsubcategories.length; j++) {
            // subsubCat.push(value.subsubcategories[j]._id)
            // dispatch(SubSubCategoryPush(value.subsubcategories[j]))
          }
        }

        // dispatch(AllSubCategoryPush(subCat))
        // dispatch(AllSubSubCategoryPush(subsubCat))
      } else {

        // TODO SHOW 
        // not checked parent and nor checked self then simply add 
        dispatch(showAddSubCat([value._id]))
        // push child too
        dispatch(SubCategoryPush(value._id))
        // !add1

        if (value.subsubcategories.length > 0) {
          for (let i = 0; i < value.subsubcategories.length; i++) {
            dispatch(showAddSubSubCat([value.subsubcategories[i]._id]))
          }
        }

        // TODO END

        if (categoryList[2]._id.length > 0 && value.subsubcategories.length > 0) {
          let inputFields = []

          for (let i = 0; i < value.subsubcategories.length; i++) {
            let index = categoryList[2]._id.includes(value.subsubcategories[i]._id)
            // dispatch(SubSubCategoryPush(value.subsubcategories[i]))
            if (index) {
              dispatch(SubSubCategoryPush(value.subsubcategories[i]))
              // dispatch(SubCategoryPush(value._id))
              // !remove1
            } else {
              inputFields.push(value.subsubcategories[i]._id)
            }
          }
          // dispatch(AllSubSubCategoryPush(inputFields))
        } else {
          // TODO SHOW 
          /*  dispatch(showAddSubCat([]))
           dispatch(showAddSubSubCat([])) */
          // TODO END
          // dispatch(SubCategoryPush(value._id))
          // !remove2
        }
      }
    }
  };
  // console.log(data_lvl2 && data_lvl2.subsubcategories.length > 0, "line 170")
  // console.log("data_lvl2._id", categoryList[1]._id.includes(data_lvl2._id))

  return (
    <li className="GroupOption subcategory-wrap ">
      {/* <div className={`GroupOptLabelWrap ${active ? "subActive" : ""} ${data_lvl2.subsubcategories.length > 0 ? "plus-icon" : "unactive"}`} > */}

      <div className={`GroupOptLabelWrap ${active && data_lvl2.subsubcategories.length > 0 ? "subActive" : ""} ${data_lvl2.subsubcategories.length > 0 ? "plus-icon" : "unactive"}`}>
        {/* <span className="GroupOptCaretIcon" onClick={() => setActive(!active)}>
          &#10095;
        </span> */}
        {<GroupOption active={active}
          Inputname={`${data_lvl2[dropdownNameSecond]}`}

          isChecked={!parentChecked && categoryList[1]._id.includes(data_lvl2._id)}
          handleInderminate={(val, chek) => handleInderminate(val, chek)}
          data={data_lvl2} setActive={() => setActive(!active)}
          lavel={'subcategory'} />}
        {/* <label className="small">
          <input
            type="checkbox"
            ref={subCategoryRef}
            name={data_lvl2[dropdownNameSecond]}
            checked={categoryList[1]._id.includes(data_lvl2._id)}
            onChange={() => handleInderminate(data_lvl2)}
          />
        </label>
        <span
          className="GroupOptionLabel"
          title={data_lvl2[dropdownNameSecond]}
          onClick={() => setActive(!active)}
        >
          {data_lvl2[dropdownNameSecond]}
        </span> */}
      </div>
      {data_lvl2.subsubcategories.length > 0 ? active && data_lvl2.subsubcategories.map((item, key) => {
        return (
          <SubSubCategory show={true}
            data_lvl1={data_lvl1}
            data_lvl2={data_lvl2}
            data_lvl3={item}
            grandParentChecked={categoryList[0]._id.includes(data_lvl1._id)}
            parentChecked={categoryList[1]._id.includes(data_lvl2._id)}
            dropdownNamefirst={dropdownNamefirst}
            dropdownNameSecond={dropdownNameSecond}
            dropdownNameThird={dropdownNameThird}
          />
        )
      }) : (
        ""
      )}
    </li>
  );
};

export default SubCategories;
