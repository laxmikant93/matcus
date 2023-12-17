import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { sendRating } from "../../../store/actions/publicProfile";
// import { rating } from "../../../store/actions/Testimonial";

function StarRating({ onRatingClick, ratingValue, ratingStar, IsClickable }) {
  // const dispatch = useDispatch();
  const [currentValue, setCurrentValue] = useState(0);
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    onRatingClick(value);
    setCurrentValue(value);
  };

  useEffect(() => {
    ratingValue !== undefined && setCurrentValue(ratingValue);
    ratingStar && setCurrentValue(ratingStar);
  }, [ratingValue, ratingStar]);

  // useEffect(() => {
  // dispatch(sendRating(currentValue));
  // }, [dispatch, currentValue]);

  return (
    <div style={styles.pageInCenter}>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <i
              key={index}
              className={`ed-icon icon-star i-xs StarRatingCst
                ${currentValue > index ? "bsPink" : "mgray"}
              `}
              onClick={() => IsClickable && handleClick(index + 1)}
            ></i>
          );
        })}
        {IsClickable && (
          <span className="text-sm">{currentValue ? currentValue : 0}/5</span>
        )}
        {/* {currentValue ? currentValue : 0}/5 */}
      </div>
    </div>
  );
}

StarRating.defaultProps = {
  name: Math.random(),
  onRatingClick: () => { },
  onError: () => { },
  label: undefined,
};

export default StarRating;

const styles = {
  pageInCenter: {
    display: "flex",
    flexDirection: "column",
    alignItem: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
};
