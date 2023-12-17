import React from 'react';
import './categoryList.scss';
import EcomCard from '../EcomCard/EcomCard';
import CategoryBox from '../CategoryBox/CategoryBox';
import SwitchButton from '../../../../../../Common/Button/SwitchButton';
import { useState } from 'react';

const CategoryList = () => {

  const data = [
    {
      id: 2,
      isParent: true,
      categoryName: 'women',
      productCount: 100,
      children: [{
        id: 1, categoryName: 'tshirt', parentName: 'women', isParent: false, isChildren: true, productCount: 10,
        subChildren: [{ id: 10, categoryName: 'roundtshirt', parentName: 'tshirt', isParent: false, isChildren: false, isSubChildren: true, productCount: 99, }, { id: 32, categoryName: 'Vneck', parentName: 'tshirt', isParent: false, isChildren: false, isSubChildren: true, productCount: 200, }]
      },
      ],
    },
    {
      id: 5,
      isParent: true,
      categoryName: 'Men',
      productCount: 100,
      children: [{
        id: 1, categoryName: 'Pants', parentName: 'Men', isParent: false, isChildren: true, productCount: 500,
        subChildren: [{ id: 10, categoryName: 'formal', parentName: 'Pants', isParent: false, isChildren: false, isSubChildren: true, productCount: 200, }, { id: 90, categoryName: 'Causal', parentName: 'pants', isParent: false, isChildren: false, isSubChildren: true, productCount: 200, }]
      },
      ],
    },

    {
      id: 7,
      isParent: true,
      categoryName: 'baby',
      productCount: 230,
    }
  ]

  const [expendModal, setExpendModal] = useState(false);
  const handleExpend = () => {
    setExpendModal(!expendModal)
  }

  const [expendSubCategory, setExpendSubCategory] = useState("");
  const handleExpendSubCategory = (key) => {
    if (key === expendSubCategory) {
      setExpendSubCategory("")
    } else {
      setExpendSubCategory(key)
    }

  }

  return (
    <React.Fragment>
      <div className='category-list-container'>
        <div className='category-list-heading-div'>
          <p className='text-xs w-400 base'>Category</p>
        </div>
        <hr className='line' />
        <div className='categoryList-wrapper' >
          <div className='categoryList-shopleftsidebar'>
            <div className='shop-box'>
              <p>All products (Shop)</p>
            </div>
          </div>
          <div className='categoryList-shoprightsidebar'>
            <div className='categoryList-switchDiv'>
              <div className='categoryList-switchDiv-leftSidebar'>
                <p>show in header</p>
              </div>
              <div className='categoryList-switchDiv-rightSidebar'>
                <div className='cstm-switch '>
                  <SwitchButton />
                </div>
              </div>
            </div>

          </div>
        </div>
        {/* list of all the categories here */}
        <div className='categoryList-parent-container'>
          {
            data.map((category) => {
              return (
                <div className='categoryList-dropdown' key={category.id} >
                  <div className='categoryList-leftsidebar'>
                    <div className='categoryList-expeped-div'>
                      {
                        <div className={`categoryList-expeped-div-leftSidebar ${category.children ? '' : 'visibilityNone'}`} onClick={handleExpend}>
                          {
                            expendModal ? <i className='ed-icon  base    icon-expendmin'></i> : <i className='ed-icon  base icon-expendPlus'></i>
                          }
                        </div>
                      }
                      {/* parent div show here */}
                      <div className='categoryList-expeped-div-rightSidebar'>
                        <CategoryBox option={category} />
                      </div>
                    </div>
                  </div>

                  {/* // check if have children and show the category box  */}
                  <div className={`lower-category ${expendModal ? '' : 'displayNone'}`}>
                    {
                      category.children && category.children.map((subCategory) => {
                        return (
                          <div className='categoryList-dropDown-div mt-12' key={subCategory.id}>
                            {/* children box is showing here  */}
                            <div className='categoryList-expeped-div position-relative'>
                              {
                                <div className={`categoryList-expeped-div-leftSidebar categoryList-position ${category.children ? '' : 'visibilityNone'}`} onClick={() => handleExpendSubCategory(subCategory.id)}>
                                  {
                                    expendSubCategory === subCategory.id ? <i className='ed-icon  base    icon-expendmin'></i> : <i className='ed-icon  base icon-expendPlus'></i>
                                  }
                                </div>
                              }

                              <div className='categoryList-expeped-div-rightSidebar'>
                                <CategoryBox option={subCategory} />
                              </div>
                            </div>
                            {/* check the sub-children and show the category box */}

                            {expendSubCategory === subCategory.id &&
                              <div className={`lower-category ${expendSubCategory ? '' : 'displayNone'}`}>
                                {
                                  subCategory.subChildren && subCategory.subChildren.map((subChildCategory) => {
                                    return (
                                      <div className='sub-category-dropDown-div mt-12' key={subChildCategory.id}>
                                        {/* sub-children showing here */}
                                        <CategoryBox option={subChildCategory} />
                                      </div>
                                    )
                                  })

                                }
                              </div>}
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>


    </React.Fragment>
  )
}

export default CategoryList