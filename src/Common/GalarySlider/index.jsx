import React, { useEffect, useState } from "react";
import "./GallerySlider.scss";
function GalarySlider({
  startFromIndex = 0,
  sliderContent,
  closeModel,
  sliderForImage = true,
}) {
  const [current, setCurrent] = useState(0);
  const length = sliderContent.length;
  const [flag, setflag] = useState("");

  useEffect(() => {
    setCurrent(startFromIndex);
  }, [startFromIndex]);

  const getNexImage = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const getPrevImage = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && !flag) {
      setflag(`${Math.random()}-prev`);
    } else if (e.key === "ArrowRight" && !flag) {
      setflag(`${Math.random()}-next`);
    } else if (e.key === "Escape" && !flag) {
      closeModel();
    }
  });

  useEffect(() => {
    if (flag.includes("prev")) {
      getPrevImage();
    } else if (flag.includes("next")) {
      getNexImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);

  return (
    <div className="gallerySliderWrapper">
      <button
        className="prev-button"
        onClick={getPrevImage}
        // onKeyDown={getPrevImageOnLeftKeyPress}
      >
        <i></i>
      </button>
      <div className="gallerySliderContent">
        {sliderContent.map((slide, index) => {
          return (
            <div key={slide._id}>
              {sliderForImage
                ? index === current && <img src={slide.image} alt="galary" />
                : index === current && (
                    <video src={slide.video} controls autoPlay loop />
                  )}
            </div>
          );
        })}
      </div>
      <span className="closeModal" onClick={() => closeModel()}></span>
      <button
        className="next-button"
        onClick={getNexImage}
        // onKeyDown={getNexImageOnRightKeyPress}
      >
        <i></i>
      </button>
    </div>
  );
}

export default GalarySlider;
