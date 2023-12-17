/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import ReactDomF from "react-dom";
import { useSelector } from "react-redux";
import { string, func } from "prop-types";

function StateSelect({ name, value, id, onSelect, onEvent, label, className, disableEffect }) {
    const stateSelectRef = useRef(null);
    const stateList = useSelector(state => state.countries.states);
    const handleStateChange = e => {
        onSelect(e.target.value)
        onEvent(e)
    }


    useEffect(() => {
        if (!disableEffect) {
            if (stateList.length > 0 && value) {
                // const tada = stateList.indexOf(value, 0)
                // let defaultState = stateList.includes(value)
                stateSelectRef.current.value = value
            }
            if (!value) {
                stateSelectRef.current.value = ''

            }
            const evt = new Event("change", { "bubbles": true, "cancelable": false });
            ReactDomF.findDOMNode(stateSelectRef.current).dispatchEvent(evt)

        }
    }, [stateList])
    const [focusLabel, setFocusLabel] = useState(false)
    // console.log(value)

    return <>
        <div className="cstmSelectWrap">
            <div className={`form-group ${(focusLabel || value) && "caretup"}`}>
                <select
                    className={`select-control ${className}`}
                    ref={stateSelectRef}
                    name={name}
                    onBlur={() => setFocusLabel(false)}
                    id={id}
                    onFocus={() => setFocusLabel(true)}
                    value={value}
                    onChange={handleStateChange}
                >
                    <option value="">* Select State</option>
                    {stateList.map(statename => <option key={Math.random()} value={statename}>{statename}</option>)}
                </select>
                <label className={`animLabel ${((label && value) || (focusLabel)) && "show"}`} htmlFor={id}>
                    {label}
                </label>
            </div>
        </div>
    </>
}

StateSelect.defaultProps = {
    name: "state",
    value: "",
    onSelect: () => { },
    onEvent: () => { }
}

StateSelect.propTypes = {
    name: string.isRequired,
    value: string,
    onSelect: func.isRequired,
    onEvent: func
}

export default StateSelect