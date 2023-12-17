import React, { useState } from "react";
import SearchUserByUsername from "../../Common/SearchUserByUsername";
const UserSearchDemo = () => {

    const [searchInput, setSearchInput] = useState([Math.random().toFixed(6)])

    const addMore = () => {
        const allInput = searchInput;
        const addedInput = [
            ...allInput,
            Math.random().toFixed(6)
        ]
        setSearchInput(addedInput)
    }

    const selectedItem = user => {
    }

    const handleRemove = inputkey => {
        const inputKeyList = searchInput
        const allItems = inputKeyList.filter(inputItemKey => inputItemKey !== inputkey)
        setSearchInput(allItems)
    }

    return <div style={{ margin: "3rem" }}>
        {
            searchInput.map(inputItem => <div><SearchUserByUsername inputkey={inputItem} onSelect={(selectedUser) => selectedItem(selectedUser)} /> <button onClick={() => handleRemove(inputItem)}>Remove</button></div>)
        }
        <button className="button btn-o-mgray btn-sm" onClick={addMore}>Add More</button>
    </div>
}

export default UserSearchDemo