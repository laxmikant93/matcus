import React, { useState, useRef } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import TabBody from './TabBody';
import TabItems from './TabItems';

const TabNavbar = ({ MouseLeave, refDrop, shopDropdown, hoverId, successData, id }) => {
  const dropRef = useRef()
  const [scrollX, setscrollX] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(false);
  const [ActiveTab, setActiveTab] = useState("");
  const { getAllData, getloading, getsuccess } = useSelector((state) => {
    return {
      getAllData: state.ecomAdmin.list.data,
      getloading: state.ecomAdmin.list.loading,
      getsuccess: state.ecomAdmin.list.success,
    };
  })
  useEffect(() => {
    if (getAllData &&
      !getloading &&
      getsuccess) {
      for (let i = 0; i < getAllData.data.length; i++) {
        if (getAllData.data[i].show_on_header === false && getAllData.data[i].subcategories.length > 0) {
          setActiveTab(getAllData.data[i]._id)
          break
        } else {

        }
      }
      // console.log("line 23", getAllData.data[0]._id)

    }
  }, [getAllData,
    getloading,
    getsuccess])

  const Mouseover = () => {
    MouseLeave()
  }

  const scroll = (scrollOffset) => {
    dropRef.current.scrollLeft += scrollOffset;
    setscrollX(scrollX + scrollOffset);

    // for checking if the scoll has end 
    if (
      Math.floor(dropRef.current.scrollWidth - dropRef.current.scrollLeft) <=
      dropRef.current.offsetWidth
    ) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false)
    }
  };
  const scrollCheck = () => {
    // for checking scroll width 
    setscrollX(dropRef.current.scrollLeft);
    if (
      Math.floor(dropRef.current.scrollWidth - dropRef.current.scrollLeft) <=
      dropRef.current.offsetWidth
    ) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  };
  // useEffect(() => {
  //   scrollCheck()
  // }, [])

  useEffect(() => {
    //Check width of the scollings
    if (
      dropRef.current &&
      dropRef?.current?.scrollWidth === dropRef?.current?.offsetWidth
    ) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
    return () => { };
  }, [dropRef?.current?.scrollWidth, dropRef?.current?.offsetWidth]);


  return (
    <React.Fragment>
      <div onMouseLeave={Mouseover} ref={refDrop} className={`dropdown_menu ${shopDropdown && hoverId === "shop" ? "visible" : "invisible"}`}>
        <div className="tab-header">
          {scrollX !== 0 && (
            <button className="arrow" onClick={() => scroll(-150)}><i className={`arrow-left`}>&#10094;</i></button>
          )}
          <ul className="drop-head" ref={dropRef} onScroll={scrollCheck}>
            {
              successData ? getAllData?.data.map((item, key) => (
                <React.Fragment key={key}>
                  <TabItems
                    successData={successData}
                    getAllData={getAllData}
                    title={item}
                    id={item._id}
                    activeTab={ActiveTab}
                    setactiveTab={setActiveTab}
                  />
                </React.Fragment>
              )) : ""
            }
          </ul>
          {
            !scrollEnd && (
              <button className="arrow Posi-right" onClick={() => scroll(150)}><i className="arrow-right">&#10095;</i></button>
            )
          }
          {
            successData && getAllData.data.map((item) => (
              <>
                <TabBody
                  id={item._id}
                  data={item}
                  successData={successData}
                  activeTab={ActiveTab}
                />
              </>
            ))
          }
        </div>
      </div>
    </React.Fragment >
  )
}

export default TabNavbar