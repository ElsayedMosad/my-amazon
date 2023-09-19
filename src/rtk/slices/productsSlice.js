import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
};


export const productsSlice = createSlice({
  name: "productsSlice",
  initialState,

  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload

    }
  },
});

export const {
  setProduct,

} = productsSlice.actions;
export default productsSlice.reducer;
