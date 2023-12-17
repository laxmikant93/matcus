import React, { useEffect } from 'react';
import { useState } from 'react';
import CategoryFillDetails from './CategoryFillDetail/CategoryFillDetails';
import CategoryList from './CategoryList/CategoryList';
import EcomCard from './EcomCard/EcomCard';
import './createCategory.scss'
import Loader from '../../Dashboard/EcommerceDashboard/Component/Loader/Loader';
import { useSelector } from 'react-redux';

const CreateCategory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [catergoriesList, setCategoriesList] = useState(0)
  const [CategorylistData, setCategorylistData] = useState([])
  const { users, getCategorylistSuccess, getCategorylistData, getCategoryEditSuccess, getbusinessInfoSuccess,
    getbusinessInfoData } = useSelector((state) => {
      return {
        users: state.user,
        getbusinessInfoSuccess: state.businessInfo.getInstituiteData.success,
        getbusinessInfoData: state.businessInfo.getInstituiteData.data,
        getCategorylistSuccess: state.ecomAdmin.list.success,
        getCategorylistData: state.ecomAdmin.list.data,
        getCategorylistUncategorizedCount: state.ecomAdmin.list.data.UncategorizedCount,
        getCategoryEditSuccess: state.ecomAdmin.edit.success
      }
    })
  useEffect(() => {

    if (getCategorylistSuccess && getCategorylistData.data) {
      setCategorylistData(getCategorylistData.data)
    }

  }, [getCategorylistSuccess,
    getCategorylistData.data])
  useEffect(() => {
    if (getCategorylistSuccess && CategorylistData) {
      let totalCount = 0
      for (let i = 0; i < CategorylistData.length; i++) {
        for (let j = 0; j < CategorylistData[i].subcategories.length; j++) {
          for (let k = 0; k < CategorylistData[i].subcategories[j].subsubcategories.length; k++) {
            totalCount = totalCount + 1
          }
          totalCount = totalCount + 1
        }
        totalCount = totalCount + 1
      }
      setCategoriesList(totalCount)

    }
  }, [getCategorylistSuccess, CategorylistData])

  return (
    <React.Fragment>
      <div className='create-category-container'>
        <div className='text-top-wrapper'>
          <h2 className='text-md w-500 base'>Categories ({catergoriesList + 1}) <span className='text-md lgray'></span></h2>
        </div>
        <div className='card-contaier'>
          <EcomCard >
            <div className='create-category-card-container'>
              <div className='card-container-heading-div'>
                <h2 className='text-s w-500 base'>Create a category </h2>
              </div>
              <hr className='line' />
              <div className='create-category-section'>
                <div className='create-category-leftSidebar'>
                  <CategoryList />
                </div>
                <div className='vline'></div>
                <div className='create-category-rightSidebar'>
                  <CategoryFillDetails />
                  {/* when is loading use 'Loader' loader */}
                  {/* <Loader /> */}
                </div>
              </div>
            </div>
          </EcomCard>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CreateCategory