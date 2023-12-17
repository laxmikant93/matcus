import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { rating } from "../../../../store/actions/Testimonial";

function Rating({ onRatingClick, ratingValue, ratingStar, IsClickable }) {
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(rating(currentValue));
  }, [dispatch, currentValue]);

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

Rating.defaultProps = {
  name: Math.random(),
  onRatingClick: () => { },
  onError: () => { },
  label: undefined,
};
export default Rating;

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

//kriassha
// function Star({ hightlight }) {
//   return (
//     <FontAwesomeIcon
//       icon={faStar}
//       className={`${hightlight ? "text-warning" : "text-light"}`}
//     />
//   );
// }

// function Rating({ fill, total }) {
//   let allStars = [];
//   for (let index = 1; index <= total; index++) {
//     allStars.push(<Star hightlight={fill >= index} />);
//   }
//   return allStars;
//   // return getStar(fill, total)
// }

// Star.defaultProps = {
//   hightlight: false,
// };

// Rating.defaultProps = {
//   fill: 0,
//   total: 5,
// };
