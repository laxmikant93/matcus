import React, { useState, useRef } from "react";
// import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import {
  AllSubSubCategoryPush, SubCategoryPush, CategoryPush, SubCategoryPushIfParentSelected, SubSubCategoryPush,
  showRemoveCat, showRemoveSubCat, showRemoveSubSubCat,
  showAddCat, showAddSubCat, showAddSubSubCat
} from "../../store/actions/catergoryFilter";


const SubSubCategory = ({ data_lvl1, data_lvl2, data_lvl3, dropdownNamefirst, dropdownNameSecond, dropdownNameThird, parentChecked, grandParentChecked }) => {

  const subCategoryRef = useRef();
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const { categoryList, sendCategoryList, getCategorylistData } = useSelector((state) => {
    return {
      categoryList: state.catergoryFilter.list.data,
      sendCategoryList: state.catergoryFilter.sendCategoryList,
      getCategorylistData: state.ecomAdmin.list.data,
    }
  })
  const courseSelect = () => {

  }

  const handleInderminate = (event) => {
    // console.log(event.target.value)
    if (grandParentChecked) {
      function removeCategoryIdFromLevel0() {
        // console.log("cateforyId", data_lvl3.categoryId)
      }
      removeCategoryIdFromLevel0()
      // console.log("grand paranent selected")
      dispatch(CategoryPush(data_lvl3.categoryId))
      dispatch(SubSubCategoryPush(data_lvl3))
      // TODO SHOW
      // rem cat  && remALl SUbCAt && add SUBSUBCAT
      dispatch(showRemoveCat(data_lvl3.categoryId));
      for (let i = 0; i < getCategorylistData.data.length; i++) {
        if (getCategorylistData.data[i]._id === data_lvl3.categoryId && getCategorylistData.data[i].subcategories.length > 0) {
          for (let j = 0; j < getCategorylistData.data[i].subcategories.length; j++) {
            // if(!sendCategoryList.category_level_One.includes(getCategorylistData.data[i].subcategories._id) &&getCategorylistData.data[i].subcategories._id=== value._id){
            dispatch(showRemoveSubCat([getCategorylistData.data[i].subcategories[j]._id]));
            // }

            if (getCategorylistData.data[i].subcategories[j].subsubcategories.length > 0) {
              for (let k = 0; k < getCategorylistData.data[i].subcategories[j].subsubcategories.length; k++) {
                dispatch(showRemoveSubSubCat([getCategorylistData.data[i].subcategories[j].subsubcategories[k]._id]));
                if (getCategorylistData.data[i].subcategories[j].subsubcategories[k]._id === data_lvl3._id) {
                  dispatch(showAddSubSubCat([getCategorylistData.data[i].subcategories[j].subsubcategories[k]._id]));
                }
              }
            }
          }
        }
      }



    }
    else if (parentChecked) {
      function removeSubCategoryIdFromLevel1() {
        // console.log("SubcateforyId", data_lvl3.subCategoryId)
      }
      removeSubCategoryIdFromLevel1()
      // console.log(" paranent selected")
      dispatch(SubCategoryPush(data_lvl3.subCategoryId))
      dispatch(SubSubCategoryPush(data_lvl3))

      // TODO SHOW
      dispatch(showAddSubSubCat(data_lvl3._id));
      dispatch(showRemoveSubCat(data_lvl3.subCategoryId));



    }
    else {
      dispatch(SubSubCategoryPush(data_lvl3))
      // todo show add 
      // if(exist "data_lvl3._id
      //  "then remove else add from sendCategoryList )

      if (sendCategoryList.category_level_Two.length === 0) {
        dispatch(showAddSubSubCat(data_lvl3._id));
      }

      for (let i = 0; i < sendCategoryList.category_level_Two.length; i++) {
        // console.log("endCategoryList.category_level_Two",sendCategoryList.category_level_Two,"data_lvl3._id",data_lvl3._id)
        if (sendCategoryList.category_level_Two.includes(data_lvl3._id)) {
          dispatch(showRemoveSubSubCat(data_lvl3._id));
        } else {
          dispatch(showAddSubSubCat(data_lvl3._id));
        }
      }


    }

    // if (grandParentChecked) {
    //   dispatch(CategoryPush(data_lvl1._id))
    //   let inputFields = []
    //   for (let i = 0; i < value.subsubcategories.length; i++) {
    //     console.log("line 26", value.subsubcategories[i]._id)
    //     let index = categoryList[2]._id.includes(value.subsubcategories[i]._id)
    //     if (index) {

    //     } else {
    //       inputFields.push(value.subsubcategories[i]._id)
    //     }
    //   }
    //   for (let i = 0; i < data_lvl1.subcategories.length; i++) {
    //     console.log("line 38", data_lvl1.subcategories[i]._id)
    //     let index = categoryList[1]._id.includes(data_lvl1.subcategories[i]._id)
    //     console.log("line no 40", index)
    //     if (index) {

    //     } else {
    //       inputFields.push(value.subsubcategories[i]._id)
    //       console.log("line 44", data_lvl1.subcategories[i]._id)
    //     }
    //   }
    //   dispatch(SubCategoryPushIfParentSelected(value._id))
    //   dispatch(AllSubSubCategoryPush(inputFields))
    // } else {

    //   if (checked) {
    //     dispatch(SubCategoryPush(value._id))

    //     let subsubCat = []

    //     if (value.subsubcategories.length > 0) {
    //       for (let j = 0; j < value.subsubcategories.length; j++) {
    //         subsubCat.push(value.subsubcategories[j]._id)
    //       }
    //     }

    //     // dispatch(AllSubCategoryPush(subCat))
    //     dispatch(AllSubSubCategoryPush(subsubCat))
    //   } else {
    //     if (categoryList[2]._id.length > 0 && value.subsubcategories.length > 0) {
    //       let inputFields = []
    //       for (let i = 0; i < value.subsubcategories.length; i++) {
    //         console.log("line 26", value.subsubcategories[i]._id)
    //         let index = categoryList[2]._id.includes(value.subsubcategories[i]._id)
    //         if (index) {

    //         } else {
    //           inputFields.push(value.subsubcategories[i]._id)
    //         }
    //       }
    //       dispatch(AllSubSubCategoryPush(inputFields))
    //     } else {
    //       dispatch(SubCategoryPush(value._id))
    //     }
    //   }
    // }
  };
  // let checked =
  //   courseClassRoomSelection[courseid] &&
  //   classroomData.length === courseClassRoomSelection[courseid].length;

  // if (courseRef.current) {
  //   if (
  //     courseClassRoomSelection[courseid] &&
  //     courseClassRoomSelection[courseid].length > 0 &&
  //     !checked
  //   ) {
  //     courseRef.current.indeterminate = true;
  //     // courseRef.current.nextSibling.classList.add("CheckDash");
  //   } else {
  //     courseRef.current.indeterminate = false;
  //     // courseRef.current.nextSibling.classList.remove("CheckDash");
  //   }

  // courseRef.current.indeterminate =
  //   courseClassRoomSelection[courseid] &&
  //     courseClassRoomSelection[courseid].length > 0
  //     ? !checked
  //     : false;
  // }
  // return checked;


  return (
    <li className="GroupOption subsubcategory-wrapper">
      <div className={`GroupOptLabelWrap ${active ? "subsubActive" : ""}`}>
        <label className="small checkbox-padding">
          <input
            type="checkbox"
            ref={subCategoryRef}
            name={data_lvl3[dropdownNameThird]}
            checked={!(parentChecked || grandParentChecked) && categoryList[2]._id.includes(data_lvl3._id)}
            value={data_lvl3}
            // handleInderminate={(val, chek) => handleInderminate(val, chek)}
            // setActive={() => setActive(!active)}
            onChange={(e) => { handleInderminate(e) }}
          />
        </label>
        <span
          className={`GroupOptionLabel subsubactegory-icon`}
          title={data_lvl3[dropdownNameThird]}
          onClick={() => setActive(!active)}
        >
          {data_lvl3[dropdownNameThird]}
        </span>
      </div >
      {/* {
        data_lvl1["subcategories"].length > 0 && active && (
          // <ClassRoomSelect show={true} classroomData={classroomData} />
        )
      } */}
    </li>
  );
};

export default SubSubCategory;
