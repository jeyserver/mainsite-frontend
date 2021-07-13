import axios from 'axios';
import {
  RESTORE_AUTH_STATE,
  AUTHENTICATE,
  DEAUTHENTICATE,
} from './constants/actionsConstants';
import { NotificationManager } from 'react-notifications';
import router from 'next/router';

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

export const toggleCartLoadingAction = () => {
  return {
    type: 'TOGGLE_CART_LOADING',
  };
};

export const addToCartAction = (products) => {
  return {
    type: 'ADD_TO_CART',
    payload: { products },
  };
};

export const deleteFromCartAction = (id) => {
  return {
    type: 'DELETE_FROM_CART',
    payload: { id },
  };
};

export const addToCart = (products) => {
  return async (dispatch) => {
    dispatch(toggleCartLoadingAction());

    axios(
      'https://jsonblob.com/api/jsonBlob/d3196d4f-e2e1-11eb-b284-d50b7a049077'
    )
      .then(() => {
        dispatch(toggleCartLoadingAction());
        dispatch(
          addToCartAction(products.filter((product) => product !== undefined))
        );
        router.push('/order/cart/review');
      })
      .catch(() => {
        NotificationManager.error(
          'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
          'خطا'
        );
        dispatch(toggleCartLoadingAction());
      });
  };
};

export const deleteFromCart = (id) => {
  return async (dispatch) => {
    dispatch(deleteFromCartAction(id));
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
