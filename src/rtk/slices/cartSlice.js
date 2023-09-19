import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartProducts: [],
};


export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,

  reducers: {
    setCartProducts: (state, action) => {
      state.cartProducts = action.payload
    },
    addToCart: (state, action) => {
      const findIndex = state.cartProducts.findIndex(
        (element) => element.id === action.payload.id
      );
      findIndex === -1
        ? state.cartProducts.push({ ...action.payload, quantity: 1 })
        : state.cartProducts[findIndex].quantity++;

    },
    deleteProduct: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartProducts = [];
    },
    increaseQuantity: (state, action) => {
      let product = state.cartProducts.find(
        (product) => product.id === action.payload
      );
      product.quantity++;
    },
    decreaseQuantity: (state, action) => {
      let product = state.cartProducts.find(
        (product) => product.id === action.payload
      );
      product.quantity !== 1 ? product.quantity-- : "";
    },
  },
});

export const {
  setCartProducts,
  addToCart,
  deleteProduct,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
