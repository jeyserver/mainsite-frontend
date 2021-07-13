let initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload.products] };
    case 'DELETE_FROM_CART':
      if (action.payload.id) {
        const productIndexInCart = state.cart.findIndex(
          (product) => product.id === action.payload.id
        );

        if (productIndexInCart) {
          const newCart = [...state.cart].splice(productIndexInCart, 1);
          return { ...state, cart: newCart };
        }
      }
      return state;
    default:
      return state;
  }
};

export default cartReducer;
