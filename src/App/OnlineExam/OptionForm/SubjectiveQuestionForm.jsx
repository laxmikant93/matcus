import { func } from "prop-types";
import { useEffect } from "react";

function SubjectiveQuestionForm({ onUpdated }) {
  useEffect(() => {
    onUpdated({
      isValid: true,
      options: [],
      answer: [],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      onUpdated({
        isValid: false,
        options: [],
        answer: [],
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <p className="pb-10">
      Note: Text box and file upload fields will be displayed to the
      participant.
    </p>
  );
}

SubjectiveQuestionForm.defaultProps = {
  onUpdated: () => {},
};
SubjectiveQuestionForm.propTypes = {
  onUpdated: func,
};

export default SubjectiveQuestionForm;
