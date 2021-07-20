import { SET_DOMAIN_FOR_SHOP } from '../constants/actionsConstants';

let initialState = {
  selected: {
    tld: null,
    name: null,
  },
};

const domainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DOMAIN_FOR_SHOP:
      return {
        ...state,
        selected: {
          tld: action.payload.tld,
          name: action.payload.name,
        },
      };
    default:
      return state;
  }
};

export default domainReducer;
