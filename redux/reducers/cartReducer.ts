export interface cart {
  cartItems: any[];
  discount: {
    code: string | null;
    percentage: number;
    loading: boolean;
    error: string | null;
  };
  loading: boolean;
  itemsInLoading: number[];
}

let initialState: cart = {
  cartItems: [],
  discount: {
    code: null,
    percentage: 0,
    loading: false,
    error: null,
  },
  loading: false,
  itemsInLoading: [],
};

const cartReducer = (state = initialState, action): cart => {
  switch (action.type) {
    case 'SET_CART_ITEMS':
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };
    case 'SET_DISCOUNT':
      if (action.payload.loading) {
        return {
          ...state,
          discount: {
            ...state.discount,
            loading: true,
          },
        };
      } else if (!action.payload.loading && !action.payload.error) {
        return {
          ...state,
          discount: {
            ...state.discount,
            code: action.payload.code,
            percentage: action.payload.percentage,
            loading: false,
          },
        };
      } else {
        return {
          ...state,
          discount: {
            ...state.discount,
            loading: false,
            error: action.payload.error,
          },
        };
      }
    case 'TOGGLE_CART_LOADING':
      return { ...state, loading: !state.loading };
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [...state.cartItems, ...action.payload.products],
      };
    case 'DELETE_FROM_CART':
      if (action.payload.id) {
        const newCartItems = [...state.cartItems].filter(
          (product) => product.id !== action.payload.id
        );
        return {
          ...state,
          cartItems: newCartItems,
        };
      }
      return state;
    case 'DELETE_FROM_CART_LOADING':
      if (action.payload.id) {
        const isItemExist = state.itemsInLoading.some(
          (id) => id === action.payload.id
        );

        if (isItemExist) {
          const newItmes = [...state.itemsInLoading].filter(
            (id) => id !== action.payload.id
          );
          return {
            ...state,
            itemsInLoading: newItmes,
          };
        } else {
          const newItmes = [...state.itemsInLoading, action.payload.id];
          return {
            ...state,
            itemsInLoading: newItmes,
          };
        }
      }

    case 'CLEAR_CART':
      if (action.payload.loading) {
        return {
          ...state,
          loading: true,
        };
      } else if (!action.payload.loading && !action.payload.error) {
        return initialState;
      } else {
        return {
          ...state,
          loading: false,
        };
      }
    default:
      return state;
  }
};

export default cartReducer;
