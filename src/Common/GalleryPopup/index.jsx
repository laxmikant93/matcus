import React from "react";
import { connect } from "react-redux";
import {
  GalleryPopupMapStateToProps,
  GalleryPopupMapDispatchToProps,
} from "./GalleryPopupMapDispatch";
class GalleryPopup extends React.Component {
  constructor() {
    super();

    this.state = {
      startLoading: true,
      hidePrev: false,
      hideNext: false,
      activeIndex: 0,
      gallerylength: 0,
    };
  }

  handleGalleryPopupClose = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        startLoading: true,
        hidePrev: false,
        hideNext: false,
        activeIndex: 0,
      };
    });
    this.props.hideGalleryPopup();
  };

  componentDidUpdate() {
    const { show, galleryid, data } = this.props.galleryImages;
    if (this.state.startLoading && show) {
      this.setState((prevState) => {
        return { ...prevState, startLoading: false };
      });
      this.props.loadgallery(galleryid, this.props.Kind);
    }

    if (data.length !== this.state.gallerylength) {
      this.setState((prevState) => {
        return {
          ...prevState,
          gallerylength: data.length,
          hideNext: false,
        };
      });
    }
  }

  handleNext = () => {
    const { data, more } = this.props.galleryImages;
    if (!this.state.hideNext || this.state.activeIndex < data.length) {
      let nextIndex = this.state.activeIndex + 1;
      this.setState(
        (prevState) => {
          return {
            ...prevState,
            activeIndex: nextIndex,
            hidePrev: false,
            hideNext: data.length === ++nextIndex,
          };
        },
        () => {
          if (more && this.state.hideNext) {
            this.loadmore();
          }
        }
      );
    }
  };

  handlePrevious = () => {
    let prevIndex = this.state.activeIndex - 1;
    this.setState((prevState) => {
      return {
        ...prevState,
        activeIndex: prevIndex,
        hidePrev: prevIndex < 1,
        hideNext: false,
      };
    });
  };

  loadmore = () => {
    const { skip, galleryid } = this.props.galleryImages;
    let limit = 10;
    this.props.loadgallerymore(galleryid, limit, skip);
  };

  render() {
    const { loading, data, show } = this.props.galleryImages;

    let filteredImages = [];
    filteredImages = data.filter((item) => item.kind === "images");
    let imagesCount = filteredImages.length;

    let filteredVideo = [];
    filteredVideo = data.filter((item) => item.kind === "videos");
    let VideoCount = filteredVideo.length;

    return (
      <div className={`gallery-lightbox LightboxShowing-${show}`}>
        <span
          className="closeModal text-xxs gray"
          onClick={this.handleGalleryPopupClose}
        ></span>
        <div className="gallery-lightbox-wrapper">
          <div className="gallery-lightbox-Head">
            <div className="row">
              <div className="col-md-12">
                {data.length > 0 && (
                  <h3 className="heading white text-sm w-300">
                    {data[0].gallery_title}
                  </h3>
                )}
                {/* {total > 1 && this.props.Kind == ""(
                  <>
                    <p className="silver">{`${imagesCount} image${total > 1 ? "s" : ""
                      }`}</p>
                    <p className="silver">{`${VideoCount} video${total > 1 ? "s" : ""
                      }`}</p>
                  </>

                )} */}
                {imagesCount > 0 && (
                  <p className="silver">{`${imagesCount} image${imagesCount > 1 ? "s" : ""
                    }`}</p>
                )}
                {VideoCount > 0 && (
                  <p className="silver">{`${VideoCount} video${VideoCount > 1 ? "s" : ""
                    }`}</p>
                )}
              </div>
            </div>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : data.length > 0 ? (
            <>
              {data.length > 1 && (
                <>
                  <button
                    className="prev-button"
                    disabled={this.state.hidePrev || !this.state.activeIndex}
                    onClick={this.handlePrevious}
                    type="button"
                    aria-pressed="false"
                  >
                    <i></i>
                  </button>{" "}
                  <button
                    className="next-button"
                    disabled={this.state.hideNext}
                    onClick={this.handleNext}
                    type="button"
                  >
                    <i></i>
                  </button>
                </>
              )}

              {
                <div className="gallery-lightbox-body">
                  {data[this.state.activeIndex].images ? (
                    <img
                      className="gallery-lightbox-image"
                      src={data[this.state.activeIndex].images}
                      height={400}
                      width={600}
                      alt={data[this.state.activeIndex]._id}
                    />
                  ) : (
                    <video width="720" height="360" controls>
                      <source src={data[this.state.activeIndex].videos} />
                    </video>
                  )}
                  {data.length > 0 && (
                    <p className="gallery-img-desc mt-20">
                      {data[this.state.activeIndex].description}
                    </p>
                  )}
                </div>
              }
            </>
          ) : (
            <div>No Image</div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  GalleryPopupMapStateToProps,
  GalleryPopupMapDispatchToProps
)(GalleryPopup);
