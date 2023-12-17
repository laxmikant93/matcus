import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { string, func, bool } from "prop-types"
import ReactDomF from "react-dom";
import { DynamicClassroomHeader } from '../UserElement';
import { setClassroom } from "../../store/actions/teacherselect"
import SelectInput from './SelectInput';



const SelectTeacherClassRoom = ({ name, value, onSelect, onEvent, error }) => {

    const classroomSelectRef = useRef(null);
    const [selected, setselected] = useState("")
    const [course, setcourse] = useState("")
    const dispatch = useDispatch()

    const { selectedCourse, assignedClassroom, classroomassigned } = useSelector(state => state.teacherselect);

    const handleOptionChange = e => {
        const { value } = e.target
        setselected(value)
        onSelect(value);
        onEvent(e)
    }

    const dispatchEvent = () => {
        if (!value) {
            onSelect("")
            setselected("")
            classroomSelectRef.current.value = "";
        }
        const evt = new Event("change", { "bubbles": false, "cancelable": false });
        ReactDomF.findDOMNode(classroomSelectRef.current).dispatchEvent(evt)
    }

    useEffect(() => {
        if (selectedCourse !== course) {
            setcourse(selectedCourse)
            dispatchEvent()
        }
        dispatch(setClassroom(classroomassigned[selectedCourse]))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCourse])

    useEffect(() => {
        dispatch(setClassroom(classroomassigned[selectedCourse]))
    }, [selectedCourse, classroomassigned, dispatch])


    return (
        <div className={`formFieldwrap`}>
            <SelectInput className={error ? "errorInput" : ""} label={`Select ${DynamicClassroomHeader}`} ref={classroomSelectRef} name={name} defaultValue={value} value={selected || value} onChange={handleOptionChange}>
                {!value && <option value="">Select {DynamicClassroomHeader()}</option>}
                {
                    assignedClassroom.length && assignedClassroom.map((classroom, index) =>
                        <option key={index} value={classroom.classroom}>{classroom.classroomname}</option>)
                }
            </SelectInput>
            {/* <label className="animLabel" htmlFor="select_classroom">
                Select {DynamicClassroomHeader()}
            </label> */}
        </div>
    )
}

SelectTeacherClassRoom.defaultProps = {
    name: "teacherclassroom",
    value: "",
    onSelect: () => { },
    onEvent: () => { },
    error: false
}

SelectTeacherClassRoom.propTypes = {
    name: string.isRequired,
    value: string,
    onSelect: func.isRequired,
    onEvent: func,
    error: bool
}

export default SelectTeacherClassRoom
