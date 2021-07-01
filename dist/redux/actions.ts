import {
  RESTORE_AUTH_STATE,
  AUTHENTICATE,
  DEAUTHENTICATE,
  TOGGLE_THEME,
  GET_THEME_FROM_LOCALSTORAGE,
} from './constants/actionsConstants';

export const getThemeFromLocalStorageAction = () => {
  return {
    type: GET_THEME_FROM_LOCALSTORAGE,
  };
};

export const toggleThemeAction = () => {
  return {
    type: TOGGLE_THEME,
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

export const getThemeFromLocalStorage = () => {
  return async (dispath) => {
    dispath(getThemeFromLocalStorageAction());
  };
};

export const toggleTheme = () => {
  return async (dispath) => {
    dispath(toggleThemeAction());
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
