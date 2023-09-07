import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
};


export const amazonSlice = createSlice({
  name: "amazonSlice",
  initialState,

  reducers: {
    setCartProducts: (state, action) => {
      state.products = action.payload
    },
    addToCart: (state, action) => {
      const findIndex = state.products.findIndex(
        (element) => element.id === action.payload.id
      );
      findIndex === -1
        ? state.products.push({ ...action.payload, quantity: 1 })
        : state.products[findIndex].quantity++;

    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.products = [];
    },
    increaseQuantity: (state, action) => {
      let product = state.products.find(
        (product) => product.id === action.payload
      );
      product.quantity++;
    },
    decreaseQuantity: (state, action) => {
      let product = state.products.find(
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
} = amazonSlice.actions;
export default amazonSlice.reducer;
