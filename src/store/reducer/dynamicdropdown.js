import { Dynamic_Drop_Down_Types } from "../actions/DynamicDropDown/action"

const DROP_DOWN_INITIAL_STATE = {
    dropdowntitle:{
        value:""
    }
}


const dynamicdropdown = (state = DROP_DOWN_INITIAL_STATE, { type, payload }) => {

    console.log("payload",payload)
    switch (type) {
      case Dynamic_Drop_Down_Types.OPEN_Dynamic_Drop_Down_Types:
        return ({
          ...state,
          dropdowntitle:{
            value:payload.value,
            active:payload.active,
          }
        });

        default : return DROP_DOWN_INITIAL_STATE
    }
}
export default dynamicdropdown;