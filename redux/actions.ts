import axios from 'axios';
import {
  RESTORE_AUTH_STATE,
  AUTHENTICATE,
  DEAUTHENTICATE,
  SET_ORDERED_DOMAINS,
  DELETE_ORDERED_DOMAIN,
  SET_PENDING_DOMAIN,
  SET_DOMAIN_FOR_SHOP,
  TOGGLE_THEME,
  GET_THEME_FROM_LOCALSTORAGE,
} from './constants/actionsConstants';
import { NotificationManager } from 'react-notifications';
import router from 'next/router';

export const setDomainForShopAction = (domain) => {
  return {
    type: SET_DOMAIN_FOR_SHOP,
    payload: domain,
  };
};

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

export const setDiscountAction = (discount) => {
  return {
    type: 'SET_DISCOUNT',
    payload: { ...discount },
  };
};

export const setCartItems = (cartItems) => {
  return {
    type: 'SET_CART_ITEMS',
    payload: { cartItems },
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

export const deleteFromCartLoading = (id) => {
  return {
    type: 'DELETE_FROM_CART_LOADING',
    payload: { id },
  };
};

export const clearCartAction = (cart) => {
  return {
    type: 'CLEAR_CART',
    payload: { ...cart },
  };
};

export const setDiscount = (code) => {
  return async (dispatch) => {
    dispatch(setDiscountAction({ loading: true }));

    axios(
      'https://jsonblob.com/api/jsonBlob/91805bd8-e961-11eb-9e75-7fa330839e1c'
    )
      .then(() => {
        dispatch(
          setDiscountAction({
            loading: false,
            code: code,
            percentage: 30,
            error: null,
          })
        );
      })
      .catch((err) => {
        NotificationManager.error(
          'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
          'خطا'
        );
        dispatch(
          setDiscountAction({
            loading: false,
            error: 'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
          })
        );
      });
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
    dispatch(deleteFromCartLoading(id));

    axios(
      'https://jsonblob.com/api/jsonBlob/d3196d4f-e2e1-11eb-b284-d50b7a049077'
    )
      .then(() => {
        dispatch(deleteFromCartLoading(id));
        dispatch(deleteFromCartAction(id));
      })
      .catch((err) => {
        dispatch(deleteFromCartLoading(id));
        NotificationManager.error(
          'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
          'خطا'
        );
      });
  };
};

export const clearCart = () => {
  return async (dispatch) => {
    dispatch(clearCartAction({ loading: true }));

    axios(
      'https://jsonblob.com/api/jsonBlob/d3196d4f-e2e1-11eb-b284-d50b7a049077'
    )
      .then(() => {
        dispatch(clearCartAction({ loading: false }));
      })
      .catch((err) => {
        dispatch(clearCartAction({ loading: false, error: err }));
        NotificationManager.error(
          'ارتباط با سامانه بدرستی انجام نشد، لطفا مجددا تلاش کنید.',
          'خطا'
        );
      });
  };
};

export const setDomainForShop = (domain) => {
  return async (dispatch) => {
    dispatch(setDomainForShopAction(domain));
    router.push('/order/domain');
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
