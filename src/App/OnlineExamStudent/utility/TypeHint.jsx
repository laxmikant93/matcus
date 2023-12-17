import { string } from 'prop-types';

const hintTypeOption = {
    multi: "Select multiple answers.",
    single: "Select only single answer.",
    subjective: "Write your answer in text area box. Also you can upload the file",
    tf: "Select only single answer."
};

const TypeHint = ({ type }) => {
    return (type && hintTypeOption[type]) ? hintTypeOption[type] : null
}

TypeHint.propTypes = {
    type: string
}

export default TypeHint
