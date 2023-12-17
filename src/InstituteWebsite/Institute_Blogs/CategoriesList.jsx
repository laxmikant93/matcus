import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import AppLink from '../../Common/AppLink';
import NoDataAvailable from '../../Common/NoDataAvailable';
import BackgroundDefault from "../../assets/images/img/BackgroundDefault.png"
import { useNavigate } from 'react-router-dom';
import { getCategoryLists } from '../../store/actions/instituteblogs';
import GrayAuthTheme from '../../Common/Theme/GrayAuthTheme';
import { useState } from 'react';
import CategoryWiseBlogList from './CategoryWiseBlogList';

const CategoriesList = () => {

  let dispatch = useDispatch();
  let history = useNavigate();

  const [categoryBlogs, setcategoryBlogs] = useState(false);
  const [categoryId, setcategoryId] = useState("");

  const { user, insId, categories, getCategoryListSuccess } = useSelector((state) => {
    return {
      user: state.user,
      insId: state.user.user_institute,
      categories: state.instituteblogs.getCategoryLists.data,
      getCategoryListSuccess: state.instituteblogs.getCategoryLists.success,
    }
  })

  useEffect(() => {
    dispatch(getCategoryLists(insId, user._id));
  }, [dispatch, insId, user._id])

  const handleOnClick = (id) => {
    setcategoryBlogs(true);
    setcategoryId(id);
  }

  return (
    <GrayAuthTheme>
      {categoryBlogs ? <CategoryWiseBlogList blogId={categoryId} /> :
        <div className="pageInCenter">
          <div className="text-xl w-500">Categories</div>
          {getCategoryListSuccess ?
            categories.length ? categories.map((item, i) => {
              return (
                <div className="gridRow" key={i}
                // onClick={() => handlePreviewButton(item._id)}
                >
                  <ul className="topInfo">
                    <li className="col col-3" data-head="Icon/Image">
                      <div className="ServiceListThubnail">
                        <img
                          className="TableThumbnail"
                          src={
                            !item.category_cover_image || item.category_cover_image === ""
                              ? BackgroundDefault
                              : item.category_cover_image
                          }
                          alt="Category Thumbnail"
                        />
                      </div>
                    </li>
                    <li className="col col-3" data-head="Title">
                      <p className="text-sm primary w-500">{item.category_title}</p>
                    </li>
                    <li className="col col-4" data-head="Description">
                      <div className="">
                        {item.category_desc.length > 180 ?
                          ` ${item.category_desc.slice(0, 180)}... ` : item.category_desc}

                        {item.category_desc.length > 180 &&
                          // <AppLink to={`/website-blogs-by-category/${item._id}`}>
                          //   Read More
                          // </AppLink>
                          <button onClick={() => handleOnClick(item._id)}> Read More</button>
                        }
                      </div>
                    </li>
                  </ul>
                </div>
              );
            })
              : <NoDataAvailable title="No Records Found." />
            :
            <div className="loadingGridData">
              <i className="ed-loadingGrid"></i>
            </div>
          }
        </div>
      }
    </GrayAuthTheme >
  );
}

export default CategoriesList;
