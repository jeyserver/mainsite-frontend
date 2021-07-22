import { SET_DOMAIN_FOR_SHOP } from '../constants/actionsConstants';

export interface domainReducerType {
  selected: {
    tld: string | null;
    name: string | null;
  };
  loadingForRoundDomains: boolean;
}

let initialState: domainReducerType = {
  selected: {
    tld: null,
    name: null,
  },
  loadingForRoundDomains: false,
};

const domainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DOMAIN_FOR_SHOP:
      if (action.payload.loading) {
        return {
          ...state,
          loadingForRoundDomains: true,
        };
      } else if (!action.payload.loading && !action.payload.error) {
        return {
          ...state,
          selected: {
            tld: action.payload.tld,
            name: action.payload.name,
          },
          loadingForRoundDomains: false,
        };
      } else {
        return {
          ...state,
          loadingForRoundDomains: false,
        };
      }
    default:
      return state;
  }
};

export default domainReducer;
