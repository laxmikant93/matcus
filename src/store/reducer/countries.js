import { COUNTRY_STATE_ACTION_TYPES } from "../actions/countries/actionTypes";
import  allCountries from "../actions/countries/countries.json";

const COUNTRY_INIT_STATE = {
  list: allCountries.countries,
  states: [],
};

const countries = (state = COUNTRY_INIT_STATE, { type, payload }) => {
  switch (type) {
    case COUNTRY_STATE_ACTION_TYPES.GET_STATES_BY_COUNTRY:
      const countryItem = state.list.find(country => country.country === payload)
      const stateList = (countryItem && countryItem.states.length > 0) ? countryItem.states : []
      return ({
        ...state,
        states: stateList
      })

    default:
      return state;
  }
};
export default countries;