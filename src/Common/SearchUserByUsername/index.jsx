import React, { useEffect, useState } from "react"
import { forwardRef } from "react"
import { getTeacherUsernameData } from "../../store/actions/editteacherlist";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../Form/FormInput";
import FormError from "../Form/FormError";

const SearchUserByUsername = forwardRef(({ name, onSelect, inputkey, subjectId, institute, visitor, usertype, validate, courseid, kind, industry, ...props }, ref) => {

    const dispatch = useDispatch();
    const [error, setError] = useState(false);

    const [username, setUsername] = useState("");
    const [hideSuggestion, setHideSuggestion] = useState(false)

    const { usernameSearchState } = useSelector((state) => {
        return {

            usernameSearchState: state.editteacherlist.teacherusername,

        }

    });

    useEffect(() => {
        if (visitor) {
            if (name) {
                setUsername(name)
            }
        }
    }, [name, visitor])
    let typing;

    const handleHeaderSearchInput = (evt) => {
        setUsername(evt.target.value)
        setHideSuggestion(!evt.target.value)
        clearTimeout(typing);
        let usernameSearch = true
        typing = setTimeout(() => {
            if (visitor) {
                dispatch(getTeacherUsernameData(institute, usertype, courseid, evt.target.value, kind, inputkey, subjectId, usernameSearch, industry));
            }
            else if (subjectId) {
                dispatch(getTeacherUsernameData(institute, usertype, courseid, evt.target.value, kind, inputkey, subjectId, usernameSearch, industry))
            } else {
                dispatch(getTeacherUsernameData(institute, usertype, courseid, evt.target.value, kind, inputkey, "", usernameSearch, industry))
            }
        }, 800)

        if (!evt.target.value) {
            clearTimeout(typing)
        }
    }


    const handleSelected = user => {
        setUsername(user.userData.email)
        setHideSuggestion(true)
        onSelect({
            inputkey,
            ...user
        })
    }

    useEffect(() => {
        if (username) {
            setError(validate && !username.trim())
        }

    }, [validate, username])

    return <React.Fragment>
        <FormInput
            {...props}
            onChange={handleHeaderSearchInput}
           
            value={username}
            onFocus={(e) => setHideSuggestion(false)}
            className={error ? "errorInput" : ""}
            ref={ref} />
        <FormError show={error} error="Email required." />
        <ul>
            {
                usernameSearchState.loading ?
                    <li>
                        Loading...
                    </li>
                    :
                    !hideSuggestion && (usernameSearchState.data.length > 0 && usernameSearchState?.inputKey === inputkey) ?
                        usernameSearchState.data.map(searchItem => <li onClick={() => handleSelected(searchItem)}>
                            FullName :  {searchItem.userData.fullname} -  Email : <small>{searchItem.userData.email}</small>
                        </li>)
                        :
                        <li></li>

            }

        </ul>
    </React.Fragment>

})

SearchUserByUsername.defaultProps = {
    onSelect: () => { },
    inputkey: Math.random().toFixed(6),
    onChange: () => { },
    validate: false
}

export default SearchUserByUsername