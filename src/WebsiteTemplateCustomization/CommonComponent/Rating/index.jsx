import { useEffect, useState } from "react";
import styled from 'styled-components';

const StarIcon = styled.i`
color: #737373;
font-size: 15px;
`;

const ActiveStarIcon = styled.i`
color: #F3CD03;
font-size: 18px;
`;
function Rating({ onRatingClick, ratingValue, ratingStar, IsClickable }) {
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

  return (
    <div className="ratingStarWrap" style={styles.stars}>
      {stars.map((_, index) => {
        return (
          <span
            key={index}
            onClick={() => IsClickable && handleClick(index + 1)}
          >
            {currentValue > index ? (
              <ActiveStarIcon>&#9733;</ActiveStarIcon>
            ) : (
              <StarIcon>&#9733;</StarIcon>
            )}
          </span>
        );
      })}
      {IsClickable && (
        <span className="text-sm">{currentValue ? currentValue : 0}/5</span>
      )}
      {/* {currentValue ? currentValue : 0}/5 */}
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
  // pageInCenter: {
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItem: "center",
  // },
  stars: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "5px",
    padding: "5px 0",
  },
};
