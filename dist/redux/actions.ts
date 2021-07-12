import axios from 'axios';
import {
  RESTORE_AUTH_STATE,
  AUTHENTICATE,
  DEAUTHENTICATE,
  SET_ORDERED_DOMAINS,
  DELETE_ORDERED_DOMAIN,
  SET_PENDING_DOMAIN,
} from './constants/actionsConstants';

export const setOrderedDomainsAction = (domains) => {
  return {
    type: SET_ORDERED_DOMAINS,
    payload: { domains },
  };
};

export const deleteOrderedDomainAction = (targetTld) => {
  return {
    type: DELETE_ORDERED_DOMAIN,
    payload: { targetTld },
  };
};

export const setPendingDomainAction = (targetTld) => {
  return {
    type: SET_PENDING_DOMAIN,
    payload: { targetTld },
  };
};

export const authenticateAction = (user) => {
  return {
    type: AUTHENTICATE,
    payload: user,
  };
};

export const deAuthenticateAction = () => {
  return {
    type: DEAUTHENTICATE,
  };
};

export const restoreState = (authState) => {
  return {
    type: RESTORE_AUTH_STATE,
    payload: authState,
  };
};

export const setOrderedDomains = (domains) => {
  return async (dispatch) => {
    dispatch(setOrderedDomainsAction(domains));
  };
};

export const deleteOrderedDomain = (targetTld) => {
  return async (dispatch) => {
    dispatch(setPendingDomainAction(targetTld));

    axios
      .get(
        'https://jsonblob.com/api/jsonBlob/964cc80e-e274-11eb-a96b-6b620e600ebe'
      )
      .then(() => {
        dispatch(deleteOrderedDomainAction(targetTld));
        dispatch(setPendingDomainAction(targetTld));
      })
      .catch((err) => {
        dispatch(setPendingDomainAction(targetTld));
      });
  };
};

export const login = (loginDetails) => {
  return async (dispatch) => {
    try {
      dispatch(deAuthenticateAction());
      // login code. And storing data in result variable
      // dispatch(authenticateAction(result));
    } catch (e) {
      dispatch(deAuthenticateAction());
    }
  };
};

export const signUp = (signUpDetails) => {
  return async (dispatch) => {
    try {
      dispatch(deAuthenticateAction());
      // Signup code. And storing data in result variable
      dispatch(authenticateAction({ name: 'مهدی' }));
    } catch (e) {
      dispatch(deAuthenticateAction());
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(deAuthenticateAction());
  };
};

export const restore = (savedState) => {
  return (dispatch) => {
    dispatch(restoreState(savedState));
  };
};
