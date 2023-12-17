import React from "react";

const GalleryFilter = ({
  className,
  VideosGalleryList,
  ImagesGalleryList,
  allGalleryList,
  ActiveTab,
  ...props
}) => {
  return (
    <React.Fragment>
      <div className="galleryFilter">
        <button
          type="button"
          className={ActiveTab === "All" ? "active tabBtn" : "tabBtn"}
          onClick={() => allGalleryList()}
        >
          All
        </button>
        <button
          type="button"
          className={ActiveTab === "Images" ? "active tabBtn" : "tabBtn"}
          onClick={() => ImagesGalleryList()}
        >
          Images
        </button>
        <button
          type="button"
          className={ActiveTab === "Videos" ? "active tabBtn" : "tabBtn"}
          onClick={() => VideosGalleryList()}
        >
          Videos
        </button>
      </div>
    </React.Fragment>
  );
};

export default GalleryFilter;
