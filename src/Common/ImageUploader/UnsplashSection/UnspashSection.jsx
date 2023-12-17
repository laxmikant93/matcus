import React, { useEffect } from "react";
import SearchControl from "../../SearchControl";
import "./unspashSection.scss";
// import AppleImage from '../../../assets/images/img/appleImage.png';
import Check from "../../../assets/images/img/check.png";
import { useState } from "react";
import Request from "../../../Classes/Request";
// import axios from 'axios';
import { useCallback } from "react";
import { debounce } from "./commonFunction";
import { useRef } from "react";
import { useSelector } from "react-redux";

const UnspashSection = ({
  toggleState,
  multiSelect,
  selectedUnsplashImages,
  search,
  uploadLimit,
  buttonLoading
}) => {
  const UnsplashImageRequest = new Request();
  const listInnerRef = useRef();
  const {user}=useSelector((state)=>{
    return{
      user:state.user
    }
  })
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [unsplashList, setUnsplashList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSelect = (item,object) => {
    console.log(object)
    if (imageList.find((i) => i.src === item)) {
      let images = imageList;
      let index = images.findIndex((i) => i.src === item);
      images.splice(index, 1);
      setImageList([...images]);
    } else {
      if (imageList.length < uploadLimit) {
        if (multiSelect) {
          let images = imageList;
          images.push({
            business: user.user_business,
            owner: user._id,
            src: item,
            title:object?.description,
            desc: "",
            alt: object?.alt_description,
            size: 0,
            key: "",
            type: "img",
          });
          setImageList([...images]);
        } else {
          let images = [];
          images.push({
            business:user.user_business,
            owner: user._id,
            src:item,
            title: object?.description,
            desc: "",
            alt: object?.alt_description,
            size:0,
            key: "",
            type: "img",
          });
          setImageList([...images]);
        }
      }
    }
  };

  const handleUpload = () => {
    selectedUnsplashImages(imageList);
  };
  useEffect(() => {
    setImageList([]);
  }, [toggleState]);

  useEffect(() => {
    const fetchData = async () => {
      const UnsplashImageRequest = new Request();
      setLoading(true);
      await UnsplashImageRequest.get(
        UnsplashImageRequest.url(
          `/webneed-middleware/unsplashImageList/?search=${search}&page=${page}`,
          "middleware"
        ),
        (success) => {
          setLoading(false);
          setUnsplashList([...unsplashList, ...success.data]);
          // setUnsplashList(success.data)
        },
        (error) => {
          //console.log(error)
        }
      );
    };
    // call the function
    fetchData().catch(console.error);
    // make sure to catch any error
  }, [page, search]);

  const handleSearch = async (value) => {
    listInnerRef.current.scrollTop = 0;
    await UnsplashImageRequest.get(
      UnsplashImageRequest.url(
        `/webneed-middleware/unsplashImageList/?search=${value}`,
        "middleware"
      ),
      (success) => {
        setLoading(false);
        setUnsplashList(success.data);
      },
      (error) => {
        //console.log(error)
      }
    );
  };
  const onScroll = async () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef?.current;
      if (Math.round(scrollTop + clientHeight) === scrollHeight) {
        if (searchTerm) {
          await UnsplashImageRequest.get(
            UnsplashImageRequest.url(
              `/webneed-middleware/unsplashImageList/?search=${searchTerm}&page=${
                page + 1
              }`,
              "middleware"
            ),
            (success) => {
              setLoading(false);
              setUnsplashList([...unsplashList, ...success.data]);
            },
            (error) => {
              //console.log(error)
            }
          );
        } else {
          setPage(page + 1);
        }
      }
    }
  };
  const optimizedFn = useCallback(debounce(handleSearch), []);
  return (
    <React.Fragment>
      <div className="unspashSection-container">
        <div className="searchSection">
          <SearchControl
            classNameWrappper="tableSearchbar"
            placeholder="Search..."
            defaultValue={search}
            onChange={(e) => optimizedFn(e.target.value)}
            reset={(e) => optimizedFn(e.target.value)}
            onKeyUp={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div
          className="unsplash-image-container"
          onScroll={onScroll}
          ref={listInnerRef}
        >
          <div className="unsplash-image-wrapper">
            {unsplashList.length
              ? unsplashList.map((item, key) => {
                  return (
                    <React.Fragment key={key}>
                      <div
                        className="unsplash-list"
                        key={key}
                        onClick={() => handleSelect(item.urls.regular,item)}
                      >
                        <img src={item.urls.regular} alt={item.alt} />
                        {imageList.find((i)=>i.src===item.urls.regular) && 
                          <div className="div-check">
                            <img src={Check} alt="" />
                          </div>
                        }
                      </div>
                      {/* 
                      <div className='unsplash-list' key={key} onClick={() => handleSelect(item.urls.regular)} >
                        <img src={item.urls.regular} alt={item.alt} />
                        {imageList.includes(item.urls.regular) &&
                          <div className='div-check'>
                            <img src={Check} alt="" />
                          </div>}
                      </div>

                      <div className='unsplash-list' key={key} onClick={() => handleSelect(item.urls.regular)} >
                        <img src={item.urls.regular} alt={item.alt} />
                        {imageList.includes(item.urls.regular) &&
                          <div className='div-check'>
                            <img src={Check} alt="" />
                          </div>}
                      </div> */}
                    </React.Fragment>
                  );
                })
              : "Not Found..."}
          </div>
        </div>

        <div className="unsplash-btn-wrapper">
          <p className="text-3xs w-300 base">
            <span>
              This image is provided by Unsplash. By using it, you agree to
              comply with{" "}
            </span>{" "}
            <a href="https://unsplash.com/" rel="noreferrer" target="_blank">
              <span className="primary">Unsplash ‘s terms. Learn more</span>
            </a>{" "}
          </p>
          {buttonLoading?<button
            className="button btn-xs button-primary"
            
          >
            Loading...
          </button>:<button
            className="button btn-xs button-primary"
            onClick={handleUpload}
          >
            Add to Page{" "}
          </button>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UnspashSection;
