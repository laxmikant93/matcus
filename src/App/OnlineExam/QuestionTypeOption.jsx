import { forwardRef } from "react";
import { bool, func, string } from "prop-types";

const QuestionTypeOption = forwardRef(
  ({ title, icon, active, onSelect, eventId }) => {
    return (
      <li
        aria-label={eventId}
        onClick={() => onSelect(eventId)}
        className={`input-q-type ${active ? "active" : ""}`}
      >
        {icon && <i className={`ed-icon i-s base ${icon}`}></i>}
        <span className="text">{title}</span>
      </li>
    );
  }
);

QuestionTypeOption.defaultProps = {
  title: "",
  icon: undefined,
  active: false,
  onSelect: () => {},
  eventId: Math.random().toFixed(6),
};

QuestionTypeOption.propTypes = {
  title: string.isRequired,
  icon: string,
  active: bool,
  onSelect: func,
  eventId: string,
};

export default QuestionTypeOption;
