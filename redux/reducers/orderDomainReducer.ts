import {
  DELETE_ORDERED_DOMAIN,
  SET_ORDERED_DOMAINS,
  SET_PENDING_DOMAIN,
} from '../constants/actionsConstants';

let initialState = {
  domains: [],
  inPending: [],
};

const orderDomainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PENDING_DOMAIN:
      if (action.payload.targetTld) {
        const index = state.inPending.findIndex(
          (i) => i === action.payload.targetTld
        );
        if (index > -1) {
          return {
            ...state,
            inPending: [...state.inPending.filter((d, s) => s !== index)],
          };
        } else {
          return {
            ...state,
            inPending: [...state.inPending, action.payload.targetTld],
          };
        }
      }

    case SET_ORDERED_DOMAINS:
      return {
        ...state,
        domains: action.payload.domains,
      };
    case DELETE_ORDERED_DOMAIN:
      return {
        ...state,
        domains: state.domains.filter(
          (domain) => domain.tld.tld !== action.payload.targetTld
        ),
      };

    default:
      return state;
  }
};

export default orderDomainReducer;
